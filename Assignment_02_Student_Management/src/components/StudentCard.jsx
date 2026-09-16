import React from 'react';
import { Award, BookOpen, Hash } from 'lucide-react';

export default function StudentCard({ name, rollNumber, department, semester, cgpa, photo }) {
  return (
    <div className="student-card">
      <div className="card-banner">
        <div className="photo-wrapper">
          <img src={photo} alt={name} className="student-photo" />
        </div>
      </div>
      <div className="card-body">
        <div>
          <h3 className="student-name">{name}</h3>
          <span className="roll-number">{rollNumber}</span>
        </div>

        <div className="details-list">
          <div className="detail-item">
            <span className="detail-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <BookOpen size={14} /> Department
            </span>
            <span className="detail-value">{department}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Hash size={14} /> Semester
            </span>
            <span className="detail-value">Semester {semester}</span>
          </div>

          <div className="detail-item" style={{ marginTop: '0.25rem' }}>
            <span className="detail-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Award size={14} /> CGPA Score
            </span>
            <span className="cgpa-badge">{cgpa.toFixed(2)} / 4.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
