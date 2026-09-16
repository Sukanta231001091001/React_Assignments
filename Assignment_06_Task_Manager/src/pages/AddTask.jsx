import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ArrowLeft } from 'lucide-react';

export default function AddTask({ onAddTask }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('High');
  const [category, setCategory] = useState('Academic');
  const [dueDate, setDueDate] = useState('28 Aug 2026');
  const [status, setStatus] = useState('Raised');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please fill out all required task fields.');
      return;
    }

    const newTask = {
      id: `TSK-${Math.floor(800 + Math.random() * 100)}`,
      title,
      description,
      priority,
      category,
      raisedAt: new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }),
      dueDate,
      status
    };

    onAddTask(newTask);
    navigate('/tasks');
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn" style={{ background: 'rgba(255,255,255,0.08)', color: 'white', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> Back
      </button>

      <div className="form-card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PlusCircle size={24} color="#818cf8" /> Create New Task
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Header / Title *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Complete React Router Assignment"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Task Description *</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Detailed description of task objectives and requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Priority Level</label>
              <select className="form-control" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Academic">Academic</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Due Date</label>
              <input
                type="text"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Initial Status</label>
              <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Raised">Raised</option>
                <option value="Pending">Pending</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
              Submit Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
