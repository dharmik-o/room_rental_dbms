import { useState } from 'react';
import "../styles/Login.css"

const Login = () => {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login submission here (e.g., validate credentials)
    console.log(`Role: ${role}, Username: ${username}, Password: ${password}`);
  };

  return (
    <div className="login-container">
      <div className="role-buttons">
        <button
          className={`role-button ${role === 'owner' ? 'selected' : ''}`}
          onClick={() => handleRoleSelection('owner')}
        >
          Owner
        </button>
        <button
          className={`role-button ${role === 'user' ? 'selected' : ''}`}
          onClick={() => handleRoleSelection('user')}
        >
          User
        </button>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
