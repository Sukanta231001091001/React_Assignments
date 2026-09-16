import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Shield, Lock, LogOut } from 'lucide-react';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <Shield size={26} />
        <span>SecureAuth Portal</span>
      </Link>

      {isAuthenticated ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="user-badge">
            <Lock size={14} color="#34d399" />
            <span>Logged in as <strong>{user?.username}</strong></span>
          </div>
          <button className="btn btn-logout" onClick={logout}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      ) : (
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Session: Unauthenticated</span>
      )}
    </header>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="auth-wrapper">
          <div className="simulation-banner">
            ⚡ FRONTEND AUTHENTICATION SIMULATION — JWT & ROUTE PROTECTION DEMO
          </div>

          <Navbar />

          <main className="container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>

          <footer className="footer">
            <p>© {new Date().getFullYear()} SecureAuth System. Built with React, Context API, and LocalStorage.</p>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
