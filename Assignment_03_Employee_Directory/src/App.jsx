import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import EmployeeModal from './components/EmployeeModal';
import { initialEmployees } from './data/initialEmployees';
import { Search, Plus, UserCheck, Building, Phone, MapPin, Trash2, Edit3, AlertCircle } from 'lucide-react';

export default function App() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  
  // Delete confirm state
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Filter employees
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.phone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'ALL' || emp.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const departments = ['ALL', ...new Set(employees.map((e) => e.department))];

  // Save (Add or Edit)
  const handleSaveEmployee = (empData) => {
    if (editingEmployee) {
      setEmployees(employees.map((e) => (e.id === empData.id ? empData : e)));
    } else {
      setEmployees([empData, ...employees]);
    }
  };

  // Delete
  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      setEmployees(employees.filter((e) => e.id !== deleteTargetId));
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        {/* Stats Summary */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon"><UserCheck size={24} /></div>
            <div>
              <div className="stat-val">{employees.length}</div>
              <div className="stat-lbl">Total Employee Count</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              <Building size={24} />
            </div>
            <div>
              <div className="stat-val">{departments.length - 1}</div>
              <div className="stat-lbl">Active Departments</div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-box">
            <Search size={18} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search employee by name, ID, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <select
              className="select-input"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d === 'ALL' ? 'All Departments' : d}
                </option>
              ))}
            </select>

            <button
              className="btn btn-primary"
              onClick={() => {
                setEditingEmployee(null);
                setIsModalOpen(true);
              }}
            >
              <Plus size={18} /> Add Employee
            </button>
          </div>
        </div>

        {/* Employee Cards List */}
        {filteredEmployees.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#94a3b8' }}>
            <AlertCircle size={48} style={{ marginBottom: '1rem' }} />
            <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>No Employees Found</h3>
            <p>Try clearing filters or search terms.</p>
          </div>
        ) : (
          <div className="employee-grid">
            {filteredEmployees.map((emp) => (
              <div key={emp.id} className="emp-card">
                <div className="emp-header">
                  <div>
                    <h3 className="emp-name">{emp.name}</h3>
                    <span className="emp-id">{emp.id}</span>
                  </div>
                  <span className="emp-badge">{emp.gender}</span>
                </div>

                <div className="emp-details">
                  <div className="emp-row">
                    <Building size={16} color="#60a5fa" />
                    <span>Dept: <span className="val">{emp.department}</span></span>
                  </div>

                  <div className="emp-row">
                    <Phone size={16} color="#34d399" />
                    <span>Phone: <span className="val">{emp.phone}</span></span>
                  </div>

                  <div className="emp-row">
                    <MapPin size={16} color="#f472b6" />
                    <span>Local: <span className="val">{emp.localAddress}</span></span>
                  </div>

                  <div className="emp-row">
                    <MapPin size={16} color="#a78bfa" />
                    <span>Permanent: <span className="val">{emp.permanentAddress}</span></span>
                  </div>
                </div>

                <div className="emp-actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => {
                      setEditingEmployee(emp);
                      setIsModalOpen(true);
                    }}
                  >
                    <Edit3 size={15} /> Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setDeleteTargetId(emp.id)}
                  >
                    <Trash2 size={15} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add / Edit Modal */}
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEmployee}
        editingEmployee={editingEmployee}
      />

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '1rem', color: '#ef4444' }}>Confirm Delete</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Are you sure you want to delete employee record <strong>{deleteTargetId}</strong>? This action cannot be undone.
            </p>
            <div className="modal-footer">
              <button
                className="btn"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
                onClick={() => setDeleteTargetId(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                style={{ background: '#ef4444', color: 'white' }}
                onClick={handleDeleteConfirm}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
