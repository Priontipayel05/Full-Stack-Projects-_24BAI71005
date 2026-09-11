import Navbar from '../components/Navbar';

function Viewer() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>Viewer Dashboard</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
          
          {/* View Content Card */}
          <div style={cardStyle}>
            <h3>👁️ View Content</h3>
            <p>Browse and read available content</p>
            <button style={buttonStyle}>View Content</button>
          </div>

          {/* View Reports Card */}
          <div style={cardStyle}>
            <h3>📊 View Reports</h3>
            <p>Access read-only reports</p>
            <button style={buttonStyle}>View Reports</button>
          </div>

          {/* Profile Card */}
          <div style={cardStyle}>
            <h3>👤 Profile</h3>
            <p>View and update your profile information</p>
            <button style={buttonStyle}>My Profile</button>
          </div>
        </div>

        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#e7f3ff', borderRadius: '10px' }}>
          <h3>Viewer Privileges:</h3>
          <ul>
            <li>Read-only access to content</li>
            <li>View reports</li>
            <li>Manage personal profile</li>
            <li>Cannot edit or create content</li>
            <li>No administrative access</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px'
};

export default Viewer;