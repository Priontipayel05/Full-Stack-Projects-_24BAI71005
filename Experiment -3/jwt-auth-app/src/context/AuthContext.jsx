import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Manual JWT decode function (replaces jwt-decode package)
const decodeJWT = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    // Decode base64 payload
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists and is valid
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = decodeJWT(token);
        if (decoded) {
          // Check if token is expired
          if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('token');
            setUser(null);
          } else {
            setUser(decoded);
          }
        } else {
          localStorage.removeItem('token');
          setUser(null);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          // Mock users
          const users = {
            'admin.24BAI71013@CUCHD.IN': {
              id: 1,
              email: 'admin.24BAI71013@CUCHD.IN',
              password: 'a.24BAI71013',
              role: 'admin',
              name: 'Admin User'
            },
            'user.24BAI71013@CUCHD.IN': {
              id: 2,
              email: 'user.24BAI71013@CUCHD.IN',
              password: 'u.24BAI71013',
              role: 'user',
              name: 'Regular User'
            }
          };

          const userData = users[email];
          if (userData && userData.password === password) {
            // Generate JWT token (in real app, this would come from server)
            const token = generateMockToken(userData);
            resolve({ success: true, token, user: userData });
          } else {
            resolve({ success: false, message: 'Invalid credentials' });
          }
        }, 1000);
      });

      if (response.success) {
        localStorage.setItem('token', response.token);
        const decoded = decodeJWT(response.token);
        setUser(decoded);
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Mock JWT generation (for demonstration)
  const generateMockToken = (userData) => {
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour
    };
    
    // Simple base64 encoding (for demo purposes only)
    const base64Header = btoa(JSON.stringify(header));
    const base64Payload = btoa(JSON.stringify(payload));
    const signature = btoa(JSON.stringify({ secret: 'your-secret-key' }));
    
    return `${base64Header}.${base64Payload}.${signature}`;
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};