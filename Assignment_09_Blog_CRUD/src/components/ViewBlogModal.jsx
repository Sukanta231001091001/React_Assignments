import React from 'react';
import { X, Calendar, User, FileText, Video } from 'lucide-react';

export default function ViewBlogModal({ blog, onClose }) {
  if (!blog) return null;

  const wordCount = blog.content.trim() ? blog.content.trim().split(/\s+/).length : 0;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '750px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#58a6ff', background: 'rgba(47,129,247,0.15)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
              Article ID: {blog.id}
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.4rem', lineHeight: '1.3' }}>
              {blog.title}
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#8b949e', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', color: '#8b949e', fontSize: '0.85rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <User size={16} color="#2f81f7" /> {blog.author}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={16} color="#238636" /> {blog.date}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FileText size={16} color="#a5d6ff" /> {wordCount} words
          </span>
        </div>

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            style={{ width: '100%', maxHeight: '350px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1.5rem' }}
          />
        )}

        <div style={{ fontSize: '1rem', lineHeight: '1.7', color: '#e6edf3', marginBottom: '1.5rem', whiteSpace: 'pre-wrap' }}>
          {blog.content}
        </div>

        {blog.video && (
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem', color: '#58a6ff' }}>
              <Video size={18} /> Embedded Video Media
            </h4>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px' }}>
              <iframe
                src={blog.video}
                title="Blog Video"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button onClick={onClose} className="btn btn-primary">
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
}
