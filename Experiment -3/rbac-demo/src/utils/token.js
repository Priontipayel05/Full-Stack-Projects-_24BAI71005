export const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    
    // Check if token has expired
    if (payload.exp && payload.exp < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }
    
    return payload;
  } catch (error) {
    localStorage.removeItem("token");
    return null;
  }
};

export const getRole = () => {
  const user = getUser();
  return user?.role;
};

export const getUsername = () => {
  const user = getUser();
  return user?.username;
};

export const isAuthenticated = () => {
  return getUser() !== null;
};

export const logout = () => {
  localStorage.removeItem("token");
};