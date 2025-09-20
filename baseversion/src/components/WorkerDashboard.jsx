import { useState, useEffect } from 'react';
import { getContributions, workerAction } from '../utils/api';
import { connectWallet, switchToShardeum } from '../utils/blockchain';

function WorkerDashboard() {
  const [contributions, setContributions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchContributions = async () => {
    try {
      await switchToShardeum();
      const { address } = await connectWallet();
      const response = await getContributions(address); // Workers can view all contributions
      setContributions(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const handleAction = async (action, contributionId) => {
    try {
      await switchToShardeum();
      const response = await workerAction(action, contributionId);
      setSuccess(`${action} successful! Tx Hash: ${response.data.txHash}`);
      setError('');
      fetchContributions(); // Refresh contributions
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setSuccess('');
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  return (
    <div>
      <h2>Worker Dashboard</h2>
      <h3>Pending Contributions</h3>
      <ul>
        {contributions
          .filter((c) => !c.approved && !c.disapproved)
          .map((contrib, index) => (
            <li key={index}>
              User: {contrib.user}, Location: {contrib.location}, Worker ID: {contrib.workerId}
              {contrib.imageUrl && <img src={contrib.imageUrl} alt="Contribution" style={{ maxWidth: '200px' }} />}
              <button onClick={() => handleAction('approve', index)}>Approve</button>
              <button onClick={() => handleAction('disapprove', index)}>Disapprove</button>
            </li>
          ))}
      </ul>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default WorkerDashboard;