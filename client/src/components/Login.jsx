import { useState } from 'react';
import "../styles/Login.css"
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [userId,SetUserId] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login submission here (e.g., validate credentials)
    console.log(`Role: ${role}, Username: ${username}, Password: ${password}`);
    try{
      const response = await fetch('http://localhost:5000/api/auth/login',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({username, password}),
      });
      const data = await response.json();
      console.log("Response Data:", data);
      if(response.ok){
        localStorage.setItem('user_id',data.user_id);
        localStorage.setItem('role',data.role)
        localStorage.setItem('username',data.name);
        data.role ==='owner' ? navigate('/owner') : navigate('/user');
      }else{
        alert(data.error);
      }
    }catch(err){
      console.error(err);
    }
  };

  return (
    <div className="login-container">

      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
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
