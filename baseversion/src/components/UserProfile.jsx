import { useState, useEffect } from 'react';
import { getUserInfo, getContributions } from '../utils/api';
import { connectWallet, switchToShardeum } from '../utils/blockchain';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [error, setError] = useState('');

  const fetchUserData = async () => {
    try {
      await switchToShardeum();
      const { address } = await connectWallet();
      const userResponse = await getUserInfo(address);
      const contribResponse = await getContributions(address);
      setUser(userResponse.data);
      setContributions(contribResponse.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {user && (
        <div>
          <p>Address: {user.address}</p>
          <p>Email: {user.email}</p>
          <p>Balance: {user.balance} CSHM</p>
          <p>Role: {user.isWorker ? 'Worker' : 'User'}</p>
        </div>
      )}
      <h3>Contributions</h3>
      <ul>
        {contributions.map((contrib, index) => (
          <li key={index}>
            Location: {contrib.location}, Status: {contrib.approved ? 'Approved' : contrib.disapproved ? 'Disapproved' : 'Pending'}
            {contrib.imageUrl && <img src={contrib.imageUrl} alt="Contribution" style={{ maxWidth: '200px' }} />}
          </li>
        ))}
      </ul>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default UserProfile;