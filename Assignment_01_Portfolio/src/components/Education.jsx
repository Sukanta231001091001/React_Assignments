import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Education() {
  const educationData = [
    {
      year: '2020 - 2024',
      role: 'B.Tech in Computer Science & Engineering',
      institution: 'Stanford University - GPA: 3.9/4.0',
      description: 'Specialized in Software Engineering, Distributed Systems, and Human-Computer Interaction.'
    },
    {
      year: '2018 - 2020',
      role: 'Higher Secondary Education (STEM)',
      institution: 'St. Xavier International Academy',
      description: 'Graduated with Distinction in Mathematics, Physics, and Computer Science.'
    },
    {
      year: '2023',
      role: 'Full Stack React & Cloud Certification',
      institution: 'AWS & Meta Certified Developer',
      description: 'Advanced credentials in React design patterns and AWS Serverless Architecture.'
    }
  ];

  return (
    <section id="education" className="section">
      <h2 className="section-title">Education & Certifications</h2>
      <div className="timeline">
        {educationData.map((item, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-year">{item.year}</div>
            <h3 className="timeline-role" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <GraduationCap size={20} color="#6366f1" /> {item.role}
            </h3>
            <div className="timeline-inst">{item.institution}</div>
            <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
