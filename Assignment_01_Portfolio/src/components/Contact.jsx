import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 4000);
    }
  };

  return (
    <section id="contact" className="section">
      <h2 className="section-title">Contact Information</h2>
      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-icon">
              <Mail size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Email Me</div>
              <div style={{ fontWeight: 600 }}>alex.morgan@devportfolio.com</div>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <Phone size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Call Me</div>
              <div style={{ fontWeight: 600 }}>+1 (555) 234-5678</div>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <MapPin size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Location</div>
              <div style={{ fontWeight: 600 }}>San Francisco, California</div>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send a Message</h3>
          {submitted ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}>
              <CheckCircle size={20} /> Thank you! Your message has been sent successfully.
            </div>
          ) : (
            <>
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  rows="4"
                  className="form-control"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                Send Message <Send size={18} />
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
