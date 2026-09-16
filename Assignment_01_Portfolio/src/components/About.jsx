import React from 'react';
import { User, Target, Award } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="section">
      <h2 className="section-title">About Me</h2>
      <div className="about-grid">
        <div className="about-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#818cf8' }}>
            <User size={22} /> Background & Passion
          </h3>
          <p>
            I am a passionate software engineer with over 4 years of experience crafting modern user interfaces, backend services, and scalable architecture.
          </p>
          <p>
            My mission is to create seamless user journeys, elegant code architectures, and high-impact digital products.
          </p>
          <div className="info-pills">
            <span className="pill">Frontend Architecture</span>
            <span className="pill">React & Redux</span>
            <span className="pill">REST & GraphQL APIs</span>
          </div>
        </div>

        <div className="about-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#c084fc' }}>
            <Target size={22} /> Core Focus
          </h3>
          <p>
            Focused on clean code standards, accessibility, state management patterns, micro-frontends, and optimized performance metrics.
          </p>
          <div className="info-pills" style={{ marginTop: '2rem' }}>
            <span className="pill">Location: San Francisco, CA</span>
            <span className="pill">Status: Available for Work</span>
            <span className="pill">Experience: 4+ Years</span>
          </div>
        </div>
      </div>
    </section>
  );
}
