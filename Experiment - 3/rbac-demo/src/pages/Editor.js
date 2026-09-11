import Navbar from '../components/Navbar';

function Editor() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>Editor Dashboard</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
          
          {/* Manage Content Card */}
          <div style={cardStyle}>
            <h3>📝 Manage Content</h3>
            <p>Create, edit, and manage website content</p>
            <button style={buttonStyle}>Manage Content</button>
          </div>

          {/* Edit Articles Card */}
          <div style={cardStyle}>
            <h3>✏️ Edit Articles</h3>
            <p>Write and edit articles for publication</p>
            <button style={buttonStyle}>Edit Articles</button>
          </div>

          {/* View Reports Card */}
          <div style={cardStyle}>
            <h3>📈 View Reports</h3>
            <p>Access content performance reports</p>
            <button style={buttonStyle}>View Reports</button>
          </div>
        </div>

        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#e7f3ff', borderRadius: '10px' }}>
          <h3>Editor Privileges:</h3>
          <ul>
            <li>Manage website content</li>
            <li>Edit and publish articles</li>
            <li>View content reports</li>
            <li>Cannot access user management</li>
            <li>Cannot modify system settings</li>
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
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px'
};

export default Editor;