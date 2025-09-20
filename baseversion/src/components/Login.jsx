import { useState } from 'react';
import { login } from '../utils/api';
import { connectWallet, signMessage, switchToShardeum } from '../utils/blockchain';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async () => {
    try {
      await switchToShardeum();
      const { signer, address } = await connectWallet();
      const message = `Login: ${Date.now()}`;
      const signature = await signMessage(message, signer);
      const response = await login(email, password, address, signature, message);
      localStorage.setItem('token', response.data.token);
      setSuccess('Login successful!');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default Login;