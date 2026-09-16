import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

export default function EmployeeModal({ isOpen, onClose, onSave, editingEmployee }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    department: 'Engineering',
    gender: 'Male',
    phone: '',
    localAddress: '',
    permanentAddress: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (editingEmployee) {
      setFormData(editingEmployee);
    } else {
      setFormData({
        id: `EMP-${Math.floor(100 + Math.random() * 900)}`,
        name: '',
        department: 'Engineering',
        gender: 'Male',
        phone: '',
        localAddress: '',
        permanentAddress: ''
      });
    }
    setError('');
  }, [editingEmployee, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Employee Name is required.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Phone Number is required.');
      return;
    }
    if (!formData.localAddress.trim()) {
      setError('Local Address is required.');
      return;
    }
    if (!formData.permanentAddress.trim()) {
      setError('Permanent Address is required.');
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{editingEmployee ? 'Edit Employee Details' : 'Add New Employee'}</h3>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', padding: '0.6rem 1rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Employee ID</label>
              <input
                type="text"
                className="form-control"
                value={formData.id}
                disabled
                style={{ opacity: 0.7 }}
              />
            </div>

            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Sarah Jenkins"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Department Name</label>
              <select
                className="form-control"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              >
                <option value="Engineering">Engineering</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                className="form-control"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group full">
              <label>Phone Number *</label>
              <input
                type="text"
                className="form-control"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-group full">
              <label>Local Address *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Current residence street, city..."
                value={formData.localAddress}
                onChange={(e) => setFormData({ ...formData, localAddress: e.target.value })}
              />
            </div>

            <div className="form-group full">
              <label>Permanent Address *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Permanent home address..."
                value={formData.permanentAddress}
                onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Check size={16} /> {editingEmployee ? 'Update Employee' : 'Save Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
