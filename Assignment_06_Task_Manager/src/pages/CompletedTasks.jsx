import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Eye, Trash2 } from 'lucide-react';

export default function CompletedTasks({ tasks, onDeleteTask }) {
  const completedTasks = tasks.filter((t) => t.status === 'Closed');

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <CheckCircle2 size={32} color="#34d399" /> Completed Tasks Archive
      </h1>

      {completedTasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#94a3b8' }}>
          <h3>No completed tasks yet.</h3>
          <p>Mark active tasks as complete to see them archived here.</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {completedTasks.map((t) => (
            <div key={t.id} className="task-card" style={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}>
              <div className="task-header">
                <div>
                  <div className="task-title" style={{ textDecoration: 'line-through', opacity: 0.8 }}>{t.title}</div>
                  <span className="cat-badge">{t.category}</span>
                </div>
                <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>Closed</span>
              </div>

              <p className="task-desc">{t.description}</p>

              <div className="meta-row">
                <span>Raised: <strong>{t.raisedAt}</strong></span>
                <span>Due: <strong>{t.dueDate}</strong></span>
              </div>

              <div className="task-actions">
                <Link to={`/tasks/${t.id}`} className="btn btn-primary">
                  <Eye size={15} /> Details
                </Link>
                <button className="btn btn-danger" onClick={() => onDeleteTask(t.id)}>
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
