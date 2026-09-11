import { useNavigate } from 'react-router-dom';

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '60vh'
    }}>
      <h1 style={{ color: '#dc3545', fontSize: '48px' }}>403</h1>
      <h2>Access Denied</h2>
      <p>You do not have permission to access this page.</p>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Back to Login
      </button>
    </div>
  );
}

export default Unauthorized;