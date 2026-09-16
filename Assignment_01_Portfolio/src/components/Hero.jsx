import React from 'react';
import { ArrowRight, Download, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="pill" style={{ width: 'fit-content', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sparkles size={14} /> Full Stack Developer & UI/UX Specialist
        </div>
        <h1>
          Building <span className="highlight-text">Digital Experiences</span> That Matter.
        </h1>
        <p className="hero-subtitle">
          Hi! I'm Alex. I specialize in designing and engineering high-performance web applications using modern React, Node.js, and cloud ecosystems.
        </p>
        <div className="cta-buttons">
          <a href="#contact" className="btn btn-primary">
            Get In Touch <ArrowRight size={18} />
          </a>
          <a href="#about" className="btn btn-secondary">
            View Resume <Download size={18} />
          </a>
        </div>
      </div>
      <div className="hero-avatar-card">
        <div className="avatar-wrapper">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
            alt="Alex Morgan Avatar"
            className="avatar-img"
          />
        </div>
      </div>
    </section>
  );
}
