import React, { useState, useEffect } from 'react';
import { searchMoviesAPI } from './services/movieService';
import { useDebounce } from './hooks/useDebounce';
import MovieDetailsModal from './components/MovieDetailsModal';
import { Film, Search, Heart, Star, ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('Inception');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce search input for optimization!

  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Favorites state persisted in LocalStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('omdb_movie_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('omdb_movie_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const loadMovies = async (query, p) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await searchMoviesAPI(query, p);
      setMovies(data.movies);
      setTotalResults(data.totalResults);
    } catch (err) {
      setError(err.message);
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setPage(1);
      loadMovies(debouncedSearchTerm, 1);
    }
  }, [debouncedSearchTerm]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    loadMovies(debouncedSearchTerm, newPage);
  };

  const toggleFavorite = (movie) => {
    const exists = favorites.some((f) => f.imdbID === movie.imdbID);
    if (exists) {
      setFavorites(favorites.filter((f) => f.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const displayedMovies = showFavoritesOnly ? favorites : movies;
  const totalPages = Math.ceil(totalResults / 10) || 1;

  return (
    <div className="movie-app">
      <header className="header">
        <div className="brand">
          <Film size={32} />
          <span>CineSearch Pro</span>
        </div>

        <button
          className="fav-btn"
          style={{ background: showFavoritesOnly ? '#e11d48' : undefined, color: showFavoritesOnly ? 'white' : undefined }}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          <Heart size={18} fill={showFavoritesOnly ? 'white' : '#e11d48'} />
          <span>Favorites ({favorites.length})</span>
        </button>
      </header>

      <main className="container">
        {/* Search Bar */}
        {!showFavoritesOnly && (
          <div className="search-card">
            <Search size={22} color="#94a3b8" />
            <input
              type="text"
              className="search-input"
              placeholder="Search movies by title (e.g. Inception, Matrix, Batman)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
            {showFavoritesOnly ? 'Your Favorite Movies Collection' : `Search Results for "${debouncedSearchTerm}"`}
          </h2>
          {!showFavoritesOnly && totalResults > 0 && (
            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Total Results: {totalResults}</span>
          )}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#94a3b8' }}>
            <Loader2 size={44} style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
            <p>Searching OMDb movie database...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && !showFavoritesOnly && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#ef4444' }}>
            <AlertCircle size={48} style={{ marginBottom: '1rem' }} />
            <h3>{error}</h3>
            <p style={{ color: '#94a3b8' }}>Try adjusting your search query.</p>
          </div>
        )}

        {/* Empty Favorites */}
        {showFavoritesOnly && favorites.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#94a3b8' }}>
            <Heart size={48} style={{ marginBottom: '1rem' }} />
            <h3>No Favorite Movies Saved</h3>
            <p>Click the heart icon on any movie poster to save it to your favorites list.</p>
          </div>
        )}

        {/* Movie Grid */}
        {!loading && displayedMovies.length > 0 && (
          <div className="movie-grid">
            {displayedMovies.map((movie) => {
              const isFav = favorites.some((f) => f.imdbID === movie.imdbID);

              return (
                <div
                  key={movie.imdbID}
                  className="movie-card"
                  onClick={() => setSelectedMovieId(movie.imdbID)}
                >
                  <div className="poster-wrapper">
                    <img
                      src={movie.Poster !== 'N/A' ? movie.Poster : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=600'}
                      alt={movie.Title}
                      className="movie-poster"
                    />
                    <div
                      className="fav-heart-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(movie);
                      }}
                    >
                      <Heart size={18} fill={isFav ? '#e11d48' : 'none'} color={isFav ? '#e11d48' : 'white'} />
                    </div>
                  </div>

                  <div className="movie-info">
                    <div className="movie-title">{movie.Title}</div>
                    <div className="movie-year">{movie.Year} • {movie.Type}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && !showFavoritesOnly && totalResults > 10 && (
          <div className="pagination">
            <button
              className="page-btn"
              disabled={page <= 1}
              onClick={() => handlePageChange(page - 1)}
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <span style={{ fontWeight: 600 }}>Page {page} of {totalPages}</span>
            <button
              className="page-btn"
              disabled={page >= totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </main>

      {/* Movie Details Modal */}
      <MovieDetailsModal
        imdbID={selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
        isFavorite={favorites.some((f) => f.imdbID === selectedMovieId)}
        onToggleFavorite={toggleFavorite}
      />

      <footer className="footer">
        <p>© {new Date().getFullYear()} CineSearch Pro. Built with React & OMDb API.</p>
      </footer>
    </div>
  );
}
