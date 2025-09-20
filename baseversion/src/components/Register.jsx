import { useState } from 'react';
import { register } from '../utils/api';
import { connectWallet, signMessage, switchToShardeum } from '../utils/blockchain';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isWorker, setIsWorker] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    try {
      await switchToShardeum();
      const { signer, address } = await connectWallet();
      const message = `Register: ${Date.now()}`;
      const signature = await signMessage(message, signer);
      const response = await register(email, password, address, signature, message, isWorker);
      localStorage.setItem('token', response.data.token);
      setSuccess('Registration successful!');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <label>
        <input
          type="checkbox"
          checked={isWorker}
          onChange={(e) => setIsWorker(e.target.checked)}
        />
        Register as Worker
      </label>
      <button onClick={handleRegister}>Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default Register;