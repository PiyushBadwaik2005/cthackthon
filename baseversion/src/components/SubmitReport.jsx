import { useState } from 'react';
import { submitReport } from '../utils/api';
import { connectWallet, switchToShardeum } from '../utils/blockchain';

function SubmitReport() {
  const [location, setLocation] = useState('');
  const [workerId, setWorkerId] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    try {
      await switchToShardeum();
      const { address } = await connectWallet();
      const response = await submitReport(location, workerId, image, address);
      setSuccess(`Report submitted! Contribution ID: ${response.data.contributionId}`);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Submit Report</h2>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location (e.g., lat,lon)"
      />
      <input
        type="number"
        value={workerId}
        onChange={(e) => setWorkerId(e.target.value)}
        placeholder="Worker ID"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default SubmitReport;