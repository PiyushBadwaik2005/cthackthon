import { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import SubmitReport from './components/SubmitReport';
import WorkerDashboard from './components/WorkerDashboard';

function App() {
  const [view, setView] = useState('register');

  return (
    <div>
      <nav>
        <button onClick={() => setView('register')}>Register</button>
        <button onClick={() => setView('login')}>Login</button>
        <button onClick={() => setView('profile')}>Profile</button>
        <button onClick={() => setView('report')}>Submit Report</button>
        <button onClick={() => setView('worker')}>Worker Dashboard</button>
      </nav>
      {view === 'register' && <Register />}
      {view === 'login' && <Login />}
      {view === 'profile' && <UserProfile />}
      {view === 'report' && <SubmitReport />}
      {view === 'worker' && <WorkerDashboard />}
    </div>
  );
}

export default App;