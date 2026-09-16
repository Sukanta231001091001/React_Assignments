import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Helper to generate simulated JWT token
function generateSimulatedJWT(username) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: "1234567890",
      name: username,
      role: "Administrator",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600
    })
  );
  const signature = "SimulatedSignature_a8f9c21b9e";
  return `${header}.${payload}.${signature}`;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Check stored session on load
  useEffect(() => {
    const savedToken = localStorage.getItem('simulated_jwt_token') || sessionStorage.getItem('simulated_jwt_token');
    const savedUser = localStorage.getItem('simulated_auth_user') || sessionStorage.getItem('simulated_auth_user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username, password, rememberMe) => {
    const newToken = generateSimulatedJWT(username);
    const userData = { username, role: 'Administrator', loginTime: new Date().toLocaleTimeString() };

    setToken(newToken);
    setUser(userData);

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('simulated_jwt_token', newToken);
    storage.setItem('simulated_auth_user', JSON.stringify(userData));
    storage.setItem('remember_me_preference', rememberMe ? 'true' : 'false');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('simulated_jwt_token');
    localStorage.removeItem('simulated_auth_user');
    sessionStorage.removeItem('simulated_jwt_token');
    sessionStorage.removeItem('simulated_auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token),
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
