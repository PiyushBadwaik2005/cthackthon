const express = require('express');
const { ethers } = require('ethers');
const { Octokit } = require('@octokit/rest');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const upload = multer({ storage: multer.memoryStorage() });

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = [
  'function balanceOf(address) view returns (uint256)',
  'function registerUser(string email, bytes32 passwordHash, bool isWorker)',
  'function submitContribution(string imageUrl, string location, uint256 workerId)',
  'function approveContribution(uint256 contributionId)',
  'function disapproveContribution(uint256 contributionId)',
  'function getContributionsByUser(address user) view returns (tuple(address user, string imageUrl, string location, uint256 workerId, bool approved, bool disapproved)[])',
  'function users(address) view returns (tuple(string email, bytes32 passwordHash, bool isWorker))',
  'event UserRegistered(address user, string email, bool isWorker)',
  'event ContributionSubmitted(uint256 id, address user, string imageUrl, string location, uint256 workerId)',
  'event ContributionApproved(uint256 id, address user)',
  'event ContributionDisapproved(uint256 id, address user)'
];
const carbonContract = new ethers.Contract(contractAddress, contractABI, wallet);

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const repoOwner = process.env.GITHUB_OWNER;
const repoName = process.env.GITHUB_REPO;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token required' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

function verifySignature(message, signature, address) {
  try {
    const recoveredAddress = ethers.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === address.toLowerCase();
  } catch (error) {
    return false;
  }
}



app.post('/api/register', async (req, res) => {
  try {
    const { email, password, address, signature, message, isWorker } = req.body;
    if (!verifySignature(message, signature, address)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const signer = provider.getSigner(address);
    const tx = await carbonContract.connect(signer).registerUser(email, ethers.utils.formatBytes32String(passwordHash), isWorker);
    await tx.wait();
    const token = jwt.sign({ address, email, isWorker }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password, address, signature, message } = req.body;
    if (!verifySignature(message, signature, address)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    const user = await carbonContract.users(address);
    if (user.email !== email) {
      return res.status(401).json({ error: 'Invalid email' });
    }
    const isValid = await bcrypt.compare(password, ethers.utils.parseBytes32String(user.passwordHash));
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ address, email, isWorker: user.isWorker }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/user/:address', authenticateToken, async (req, res) => {
  try {
    const { address } = req.params;
    if (req.user.address !== address && !req.user.isWorker) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const balance = await carbonContract.balanceOf(address);
    const user = await carbonContract.users(address);
    res.json({
      address,
      balance: ethers.utils.formatEther(balance),
      email: user.email,
      isWorker: user.isWorker
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/contributions/:address', authenticateToken, async (req, res) => {
  try {
    const { address } = req.params;
    if (req.user.address !== address && !req.user.isWorker) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const contributions = await carbonContract.getContributionsByUser(address);
    res.json(contributions.map(c => ({
      user: c.user,
      imageUrl: c.imageUrl,
      location: c.location,
      workerId: c.workerId,
      approved: c.approved,
      disapproved: c.disapproved
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/report', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { location, workerId } = req.body;
    const address = req.user.address;
    const imageBuffer = req.file ? req.file.buffer : null;
    let imageUrl = null;
    if (imageBuffer) {
      const fileName = `${Date.now()}-${req.file.originalname}`;
      const content = imageBuffer.toString('base64');
      const { data: { content: sha } } = await octokit.rest.repos.getContent({
        owner: repoOwner,
        repo: repoName,
        path: fileName
      }).catch(() => ({ data: { content: null } }));
      await octokit.rest.repos.createOrUpdateFileContents({
        owner: repoOwner,
        repo: repoName,
        path: fileName,
        message: `Add report image for ${address}`,
        content,
        sha
      });
      imageUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${fileName}`;
    }
    const signer = provider.getSigner(address);
    const tx = await carbonContract.connect(signer).submitContribution(imageUrl || '', location, parseInt(workerId));
    await tx.wait();
    const contributionId = await carbonContract.nextContributionId() - 1;
    res.json({ success: true, contributionId, imageUrl, txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/worker/:action/:contributionId', authenticateToken, async (req, res) => {
  try {
    const { action, contributionId } = req.params;
    if (!req.user.isWorker) {
      return res.status(403).json({ error: 'Not a worker' });
    }
    let tx;
    if (action === 'approve') {
      tx = await carbonContract.approveContribution(parseInt(contributionId));
    } else if (action === 'disapprove') {
      tx = await carbonContract.disapproveContribution(parseInt(contributionId));
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
