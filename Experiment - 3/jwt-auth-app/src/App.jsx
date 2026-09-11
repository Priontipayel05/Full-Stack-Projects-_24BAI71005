import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    setMessage("Login successful!");
  };

  const fillCredentials = (selectedEmail, selectedPassword) => {
    setEmail(selectedEmail);
    setPassword(selectedPassword);
    setMessage("");
  };

  return (
    <div className="app">

      {/* Navigation */}
      <nav className="navbar">

        <div className="brand">
          <div className="brand-icon">🛡️</div>
          <span>JWT Authv2.0</span>
        </div>

        <button className="menu-button">
          ☰
        </button>

      </nav>

      {/* Main content */}
      <main className="main-container">

        <div className="security-badge">
          ✨ Secure Access
        </div>

        <section className="login-card">

          <div className="shield-icon">
            🛡️
          </div>

          <h1>Welcome Back</h1>

          <p className="subtitle">
            Sign in to your secure dashboard
          </p>

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>

            </div>

            {/* Password */}
            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? "🙈" : "👁"}
                </button>

              </div>

            </div>

            {/* Login button */}
            <button
              type="submit"
              className="login-button"
            >
              <span>Sign In</span>
              <span>→</span>
            </button>

          </form>

          {message && (
            <div
              className={
                message === "Login successful!"
                  ? "success-message"
                  : "error-message"
              }
            >
              {message}
            </div>
          )}

          {/* Demo credentials */}
          <div className="demo-section">

            <h3>Demo Credentials</h3>

            <div className="credentials-grid">

              <button
                className="credential-card"
                onClick={() =>
                  fillCredentials(
                    "admin.24BAI71013@CUCHD.IN",
                    "admin123"
                  )
                }
              >

                <div className="avatar admin">
                  A
                </div>

                <div className="credential-info">

                  <strong>
                    Admin
                  </strong>

                  <span>
                    admin.24BAI71013@CUCHD.IN
                  </span>

                  <small>
                    Click to fill
                  </small>

                </div>

              </button>

              <button
                className="credential-card"
                onClick={() =>
                  fillCredentials(
                    "user.24BAI71013@CUCHD.IN",
                    "user123"
                  )
                }
              >

                <div className="avatar user">
                  U
                </div>

                <div className="credential-info">

                  <strong>
                    User
                  </strong>

                  <span>
                    user.24BAI71013@CUCHD.IN
                  </span>

                  <small>
                    Click to fill
                  </small>

                </div>

              </button>

            </div>

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="footer">

        <span className="footer-icon">
          ✓
        </span>

        <span>
          Secured with JWT authentication
          <strong>
            {" "}• 256-bit encryption
          </strong>
        </span>

      </footer>

    </div>
  );
}

export default App;