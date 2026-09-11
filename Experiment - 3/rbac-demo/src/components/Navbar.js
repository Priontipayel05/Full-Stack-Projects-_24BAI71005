import { useNavigate } from 'react-router-dom';
import { getUsername, getRole, logout } from '../utils/token';

function Navbar() {
  const navigate = useNavigate();
  const username = getUsername();
  const role = getRole();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      backgroundColor: '#333',
      color: 'white',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    }}>
      <div>
        <h2 style={{ margin: 0 }}>RBAC Demo App</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span>Welcome, {username}</span>
        <span style={{
          backgroundColor: '#007bff',
          padding: '5px 10px',
          borderRadius: '5px'
        }}>
          Role: {role}
        </span>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 15px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;