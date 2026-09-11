import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../services/authService';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const token = authenticateUser(username, password);

    if (!token) {
      setError('Invalid Username or Password');
      return;
    }

    localStorage.setItem('token', token);

    // Decode token to get role
    const payload = JSON.parse(atob(token.split('.')[1]));

    // Redirect based on role
    switch (payload.role) {
      case 'Admin':
        navigate('/admin');
        break;
      case 'Editor':
        navigate('/editor');
        break;
      case 'Viewer':
        navigate('/viewer');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        width: '350px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
          RBAC Login
        </h2>
        
        {error && (
          <div style={{
            color: '#dc3545',
            backgroundColor: '#f8d7da',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Login
          </button>
        </form>

        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Demo Credentials:</h4>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>
            <strong>Admin:</strong> admin_24bai71005@cuchd.in / admin_24BAI71005
          </p>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>
            <strong>Editor:</strong> editor_24bai71005@cuchd.in / editor_24BAI71005
          </p>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>
            <strong>Viewer:</strong> viewer_24bai71005@cuchd.in / viewer_24BAI71005
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;