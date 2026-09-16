import React, { useState, useEffect } from 'react';
import { getMovieDetailsAPI } from '../services/movieService';
import { X, Star, Clock, Film, Heart, Loader2 } from 'lucide-react';

export default function MovieDetailsModal({ imdbID, onClose, isFavorite, onToggleFavorite }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (imdbID) {
      setLoading(true);
      getMovieDetailsAPI(imdbID).then((data) => {
        setDetails(data);
        setLoading(false);
      });
    }
  }, [imdbID]);

  if (!imdbID) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {loading ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1rem', color: '#94a3b8' }}>
            <Loader2 size={40} style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
            <p>Loading full movie specifications...</p>
          </div>
        ) : (
          <>
            <div>
              <img
                src={details.Poster !== 'N/A' ? details.Poster : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=600'}
                alt={details.Title}
                className="modal-poster"
              />
              <button
                className="fav-btn"
                style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
                onClick={() => onToggleFavorite(details)}
              >
                <Heart size={18} fill={isFavorite ? '#e11d48' : 'none'} color="#e11d48" />
                {isFavorite ? 'In Favorites' : 'Add to Favorites'}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1.2 }}>{details.Title}</h2>
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                    {details.Year} • {details.Rated || 'PG-13'} • {details.Runtime}
                  </div>
                </div>
                <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                  <X size={24} />
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span className="rating-badge">
                  <Star size={16} fill="#f59e0b" /> IMDb: {details.imdbRating || '8.5'}/10
                </span>
                <span style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.85rem' }}>
                  {details.Genre}
                </span>
              </div>

              <div>
                <h4 style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Plot Summary</h4>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#e2e8f0' }}>{details.Plot}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                <div><strong style={{ color: '#94a3b8' }}>Director:</strong> {details.Director}</div>
                <div><strong style={{ color: '#94a3b8' }}>Cast:</strong> {details.Actors}</div>
                {details.BoxOffice && <div><strong style={{ color: '#94a3b8' }}>Box Office:</strong> {details.BoxOffice}</div>}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
