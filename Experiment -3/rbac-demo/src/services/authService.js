const users = [
  {
    username: "admin_24bai71005@cuchd.in",
    password: "admin_24BAI71005",
    role: "Admin",
  },
  {
    username: "editor_24bai71005@cuchd.in",
    password: "editor_24BAI71005",
    role: "Editor",
  },
  {
    username: "viewer_24bai71005@cuchd.in",
    password: "viewer_24BAI71005",
    role: "Viewer",
  },
];

export const authenticateUser = (username, password) => {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return null;

  // Create a simple JWT-like token
  const header = btoa(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT",
    })
  );

  const payload = btoa(
    JSON.stringify({
      username: user.username,
      role: user.role,
      exp: Date.now() + 3600000, // 1 hour expiry
    })
  );

  const signature = btoa("rbac-secret-key");

  return `${header}.${payload}.${signature}`;
};

export const getUsers = () => users;