// src/utils/blockchain.js
import { ethers } from 'ethers';

export const connectWallet = async () => {
  if (!window.ethereum) throw new Error('MetaMask not installed');
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  return { provider, signer, address };
};

export const switchToShardeum = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1F90' }], // 8082 in hex
    });
  } catch (error) {
    if (error.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x1F90',
          chainName: 'Shardeum Unstablenet',
          nativeCurrency: { name: 'SHM', symbol: 'SHM', decimals: 18 },
          rpcUrls: ['https://api-unstable.shardeum.org'],
          blockExplorerUrls: ['https://explorer-unstable.shardeum.org'],
        }],
      });
    } else {
      throw error;
    }
  }
};

export const signMessage = async (message, signer) => {
  return await signer.signMessage(message);
};