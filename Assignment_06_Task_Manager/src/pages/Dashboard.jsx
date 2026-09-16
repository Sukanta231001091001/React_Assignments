import React from 'react';
import { Link } from 'react-router-dom';
import { ListTodo, Clock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export default function Dashboard({ tasks }) {
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === 'Pending' || t.status === 'Raised').length;
  const completed = tasks.filter((t) => t.status === 'Closed').length;
  const highPriority = tasks.filter((t) => t.priority === 'High' && t.status !== 'Closed').length;

  const recentTasks = tasks.slice(0, 3);

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem' }}>Task Dashboard Overview</h1>

      <div className="dash-grid">
        <div className="dash-card">
          <div className="dash-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
            <ListTodo size={28} />
          </div>
          <div>
            <div className="dash-value">{total}</div>
            <div className="dash-label">Total Registered Tasks</div>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
            <Clock size={28} />
          </div>
          <div>
            <div className="dash-value">{pending}</div>
            <div className="dash-label">Pending / Active Tasks</div>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <CheckCircle2 size={28} />
          </div>
          <div>
            <div className="dash-value">{completed}</div>
            <div className="dash-label">Completed / Closed Tasks</div>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
            <AlertCircle size={28} />
          </div>
          <div>
            <div className="dash-value">{highPriority}</div>
            <div className="dash-label">High Priority Active</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Recent Task Activities</h2>
        <Link to="/tasks" className="btn btn-primary">
          View All Tasks <ArrowRight size={16} />
        </Link>
      </div>

      <div className="tasks-grid">
        {recentTasks.map((t) => (
          <div key={t.id} className="task-card">
            <div className="task-header">
              <span className="task-title">{t.title}</span>
              <span className={`badge priority-${t.priority.toLowerCase()}`}>{t.priority}</span>
            </div>
            <p className="task-desc">{t.description}</p>
            <div className="meta-row">
              <span>Category: <strong>{t.category}</strong></span>
              <span>Status: <strong style={{ color: t.status === 'Closed' ? '#34d399' : '#fbbf24' }}>{t.status}</strong></span>
            </div>
            <div className="task-actions" style={{ marginTop: '0.75rem' }}>
              <Link to={`/tasks/${t.id}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                View Full Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
