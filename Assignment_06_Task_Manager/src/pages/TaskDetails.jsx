import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, AlertCircle, CheckCircle2, Trash2, Tag } from 'lucide-react';

export default function TaskDetails({ tasks, onCompleteTask, onDeleteTask }) {
  const { id } = useParams(); // URL Parameter extraction!
  const navigate = useNavigate();

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <AlertCircle size={48} color="#ef4444" style={{ marginBottom: '1rem' }} />
        <h2>Task Not Found</h2>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>No task exists with ID "{id}".</p>
        <Link to="/tasks" className="btn btn-primary">
          Back to Tasks
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete task ${task.id}?`)) {
      onDeleteTask(task.id);
      navigate('/tasks');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} className="btn" style={{ background: 'rgba(255,255,255,0.08)', color: 'white', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> Back
      </button>

      <div className="form-card" style={{ maxWidth: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: '#818cf8', fontWeight: 600 }}>Task ID: {task.id}</span>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem' }}>{task.title}</h1>
          </div>
          <span className={`badge priority-${task.priority.toLowerCase()}`} style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
            {task.priority} Priority
          </span>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', background: 'rgba(15,23,42,0.6)', padding: '0.85rem 1.25rem', borderRadius: '8px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', color: '#94a3b8' }}>
            <Tag size={16} color="#818cf8" /> Category: <strong style={{ color: 'white' }}>{task.category}</strong>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', color: '#94a3b8' }}>
            <Clock size={16} color="#fbbf24" /> Raised At: <strong style={{ color: 'white' }}>{task.raisedAt}</strong>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', color: '#94a3b8' }}>
            <Calendar size={16} color="#f472b6" /> Due Date: <strong style={{ color: 'white' }}>{task.dueDate}</strong>
          </span>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#94a3b8' }}>Task Description</h3>
          <p style={{ fontSize: '1rem', lineHeight: '1.7', whiteSpace: 'pre-wrap', background: 'rgba(15,23,42,0.4)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
            {task.description}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
          <div>
            Status: <strong style={{ color: task.status === 'Closed' ? '#34d399' : '#fbbf24', fontSize: '1.1rem' }}>{task.status}</strong>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {task.status !== 'Closed' && (
              <button
                className="btn btn-success"
                onClick={() => {
                  onCompleteTask(task.id);
                  navigate('/tasks');
                }}
              >
                <CheckCircle2 size={16} /> Mark Completed
              </button>
            )}
            <button className="btn btn-danger" onClick={handleDelete}>
              <Trash2 size={16} /> Delete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
