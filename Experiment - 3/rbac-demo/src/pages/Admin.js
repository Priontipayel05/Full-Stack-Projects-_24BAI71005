import Navbar from '../components/Navbar';

function Admin() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>Admin Dashboard</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
          
          {/* User Management Card */}
          <div style={cardStyle}>
            <h3>👥 User Management</h3>
            <p>Manage all users, create new accounts, and assign roles</p>
            <button style={buttonStyle}>Manage Users</button>
          </div>

          {/* Reports Card */}
          <div style={cardStyle}>
            <h3>📊 Reports</h3>
            <p>View all system reports and analytics</p>
            <button style={buttonStyle}>View Reports</button>
          </div>

          {/* Settings Card */}
          <div style={cardStyle}>
            <h3>⚙️ Settings</h3>
            <p>Configure system settings and preferences</p>
            <button style={buttonStyle}>Open Settings</button>
          </div>

          {/* Admin Actions */}
          <div style={cardStyle}>
            <h3>🔒 Admin Actions</h3>
            <p>Access administrative functions and system logs</p>
            <button style={buttonStyle}>Admin Panel</button>
          </div>
        </div>

        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#e7f3ff', borderRadius: '10px' }}>
          <h3>Admin Privileges:</h3>
          <ul>
            <li>Full system access</li>
            <li>User management capabilities</li>
            <li>System configuration</li>
            <li>View all reports</li>
            <li>Manage content</li>
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
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px'
};

export default Admin;