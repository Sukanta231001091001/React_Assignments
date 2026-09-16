import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

export default function BlogModal({ isOpen, onClose, onSave, editingBlog }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    image: '',
    video: '',
    date: new Date().toISOString().slice(0, 10)
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (editingBlog) {
      setFormData(editingBlog);
    } else {
      setFormData({
        title: '',
        author: '',
        content: '',
        image: '',
        video: '',
        date: new Date().toISOString().slice(0, 10)
      });
    }
    setError('');
  }, [editingBlog, isOpen]);

  if (!isOpen) return null;

  // Word count calculation
  const wordCount = formData.content.trim() ? formData.content.trim().split(/\s+/).length : 0;
  const isWordLimitExceeded = wordCount > 1000;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError('Blog Title is required.');
      return;
    }
    if (!formData.author.trim()) {
      setError('Author Name is required.');
      return;
    }
    if (!formData.content.trim()) {
      setError('Blog Content is required.');
      return;
    }
    if (isWordLimitExceeded) {
      setError('Blog Content exceeds the maximum limit of 1000 words.');
      return;
    }

    const payload = editingBlog
      ? { ...editingBlog, ...formData }
      : { id: String(Date.now()), ...formData };

    onSave(payload);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3>{editingBlog ? 'Edit Blog Article' : 'Publish New Blog Article'}</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#8b949e', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(248,81,73,0.2)', border: '1px solid rgba(248,81,73,0.4)', color: '#ff7b72', padding: '0.65rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Article Title *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter compelling article title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Author Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Alex Morgan"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Publication Date</label>
              <input
                type="date"
                className="form-control"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label>Blog Content (Text, max 1000 words) *</label>
              <span style={{ fontSize: '0.8rem', color: isWordLimitExceeded ? '#ff7b72' : '#8b949e', fontWeight: 600 }}>
                {wordCount} / 1000 words
              </span>
            </div>
            <textarea
              className="form-control"
              rows="6"
              placeholder="Write your blog content here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            ></textarea>
            {isWordLimitExceeded && (
              <div className="word-limit-warning">
                ⚠️ Content exceeds 1000 words limit! Please reduce text length before saving.
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Cover Image URL (Optional)</label>
            <input
              type="text"
              className="form-control"
              placeholder="https://images.unsplash.com/photo-..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Embed Video URL (Optional YouTube embed link)</label>
            <input
              type="text"
              className="form-control"
              placeholder="https://www.youtube.com/embed/..."
              value={formData.video}
              onChange={(e) => setFormData({ ...formData, video: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={onClose} className="btn" style={{ background: 'rgba(255,255,255,0.08)', color: 'white' }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isWordLimitExceeded}>
              <Check size={16} /> {editingBlog ? 'Update Blog' : 'Publish Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
