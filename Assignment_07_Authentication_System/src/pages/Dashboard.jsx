import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, LogOut, Key, UserCheck, Clock, FileText } from 'lucide-react';

export default function Dashboard() {
  const { user, token, logout } = useAuth();

  return (
    <div>
      <div className="protected-dashboard">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.6rem', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', borderRadius: '10px' }}>
              <ShieldCheck size={28} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Protected Admin Dashboard</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Authenticated Access Granted</p>
            </div>
          </div>

          <button className="btn btn-logout" onClick={logout}>
            <LogOut size={16} /> End Session (Logout)
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid var(--border)', padding: '1rem', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>
              <UserCheck size={16} color="#818cf8" /> Authenticated User
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '0.25rem' }}>{user?.username}</div>
          </div>

          <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid var(--border)', padding: '1rem', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>
              <ShieldCheck size={16} color="#34d399" /> Role Designation
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '0.25rem' }}>{user?.role}</div>
          </div>

          <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid var(--border)', padding: '1rem', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>
              <Clock size={16} color="#fbbf24" /> Session Start
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '0.25rem' }}>{user?.loginTime}</div>
          </div>
        </div>

        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Key size={18} color="#818cf8" /> Simulated JWT Bearer Token Payload
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
          Below is the simulated JSON Web Token generated upon login and safely stored in browser storage:
        </p>

        <div className="jwt-box">
          <strong style={{ color: '#818cf8' }}>Bearer Token:</strong> {token}
        </div>
      </div>
    </div>
  );
}
