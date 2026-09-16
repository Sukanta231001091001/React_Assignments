import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Filter, Trash2, CheckCircle2, Eye } from 'lucide-react';

export default function Tasks({ tasks, onCompleteTask, onDeleteTask }) {
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
                          t.description.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === 'ALL' || t.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'ALL' || t.category === categoryFilter;
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Task Directory</h1>
        <Link to="/add-task" className="btn btn-primary">
          <Plus size={18} /> Add New Task
        </Link>
      </div>

      <div className="controls-row">
        <div className="search-box">
          <Search size={18} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select
            className="select-box"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="ALL">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <select
            className="select-box"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="ALL">All Categories</option>
            <option value="Academic">Academic</option>
            <option value="Personal">Personal</option>
          </select>

          <select
            className="select-box"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="Raised">Raised</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#94a3b8' }}>
          <h3>No matching tasks found.</h3>
          <p>Try clearing filters or changing search terms.</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map((t) => (
            <div key={t.id} className="task-card">
              <div className="task-header">
                <div>
                  <div className="task-title">{t.title}</div>
                  <span className="cat-badge" style={{ marginTop: '0.2rem', display: 'inline-block' }}>{t.category}</span>
                </div>
                <span className={`badge priority-${t.priority.toLowerCase()}`}>{t.priority}</span>
              </div>

              <p className="task-desc">{t.description}</p>

              <div className="meta-row">
                <span>Due: <strong>{t.dueDate}</strong></span>
                <span>Status: <strong style={{ color: t.status === 'Closed' ? '#34d399' : '#fbbf24' }}>{t.status}</strong></span>
              </div>

              <div className="task-actions">
                <Link to={`/tasks/${t.id}`} className="btn btn-primary">
                  <Eye size={15} /> Details
                </Link>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {t.status !== 'Closed' && (
                    <button
                      className="btn btn-success"
                      onClick={() => onCompleteTask(t.id)}
                      title="Mark as Complete"
                    >
                      <CheckCircle2 size={16} /> Complete
                    </button>
                  )}
                  <button
                    className="btn btn-danger"
                    onClick={() => onDeleteTask(t.id)}
                    title="Delete Task"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
