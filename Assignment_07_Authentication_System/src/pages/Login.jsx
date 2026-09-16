import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, Key, Eye, EyeOff, ShieldAlert, CheckCircle } from 'lucide-react';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/dashboard';

  // Password strength algorithm
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'None', color: '#94a3b8', width: '0%' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score, label: 'Weak', color: '#ef4444', width: '33%' };
    if (score <= 4) return { score, label: 'Medium', color: '#f59e0b', width: '66%' };
    return { score, label: 'Strong', color: '#10b981', width: '100%' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username is required.');
      return;
    }
    if (!password.trim()) {
      setError('Password is required.');
      return;
    }

    login(username, password, rememberMe);
    navigate(from, { replace: true });
  };

  if (isAuthenticated) {
    navigate('/dashboard');
  }

  return (
    <div>
      <div className="login-card">
        <div className="login-header">
          <div style={{ display: 'inline-flex', padding: '0.8rem', background: 'rgba(99, 102, 241, 0.15)', borderRadius: '14px', color: '#818cf8', marginBottom: '0.75rem' }}>
            <Lock size={32} />
          </div>
          <h2>User Authentication Portal</h2>
          <p>Frontend Authentication Simulation</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', padding: '0.65rem 1rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldAlert size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username *</label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="form-control"
                placeholder="Enter username (e.g. alex_dev)"
                style={{ paddingLeft: '2.4rem' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password *</label>
            <div style={{ position: 'relative' }}>
              <Key size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Enter password..."
                style={{ paddingLeft: '2.4rem', paddingRight: '2.4rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="strength-meter">
                <div className="strength-bar-bg">
                  <div className="strength-bar-fill" style={{ width: strength.width, backgroundColor: strength.color }}></div>
                </div>
                <div className="strength-text">
                  <span style={{ color: '#94a3b8' }}>Password Strength:</span>
                  <span style={{ color: strength.color }}>{strength.label}</span>
                </div>
              </div>
            )}
          </div>

          {/* Remember User Checkbox */}
          <label className="remember-row">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ accentColor: '#6366f1', width: '16px', height: '16px' }}
            />
            <span>Remember User Session (LocalStorage)</span>
          </label>

          <button type="submit" className="btn btn-primary">
            Sign In to Portal
          </button>
        </form>
      </div>
    </div>
  );
}
