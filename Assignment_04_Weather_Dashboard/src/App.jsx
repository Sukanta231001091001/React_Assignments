import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './services/weatherService';
import { Search, CloudSun, Droplets, Wind, Sunrise, Sunset, AlertTriangle, Key } from 'lucide-react';

export default function App() {
  const [cityInput, setCityInput] = useState('');
  const [activeCity, setActiveCity] = useState('London');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const quickCities = ['London', 'Tokyo', 'New York', 'Paris', 'Sydney'];
  const hasApiKey = Boolean(import.meta.env.VITE_OPENWEATHER_API_KEY && import.meta.env.VITE_OPENWEATHER_API_KEY !== 'your_openweather_api_key_here');

  const loadWeather = async (targetCity) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(targetCity);
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(activeCity);
  }, [activeCity]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (cityInput.trim()) {
      setActiveCity(cityInput);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '--:--';
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="weather-app">
      <header className="weather-header">
        <h1 className="app-title">
          <CloudSun size={36} color="#38bdf8" /> Weather Pulse Dashboard
        </h1>
      </header>

      <main className="main-container">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="search-card">
          <Search size={22} color="#94a3b8" />
          <input
            type="text"
            className="search-input"
            placeholder="Search city (e.g. London, Tokyo, Paris)..."
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        {/* Quick Cities */}
        <div className="quick-cities">
          {quickCities.map((c) => (
            <button
              key={c}
              className={`city-pill ${activeCity.toLowerCase() === c.toLowerCase() ? 'active' : ''}`}
              onClick={() => {
                setCityInput(c);
                setActiveCity(c);
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* API Key Notice */}
        {!hasApiKey && (
          <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', padding: '0.75rem 1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <Key size={18} /> Note: Running in demo mode with mock data fallback. Add your live key in <code>.env</code> to call OpenWeather API directly.
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="error-alert">
            <AlertTriangle size={24} />
            <div>
              <strong>Error Loading Weather:</strong> {error}
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p style={{ color: '#94a3b8' }}>Fetching weather metrics for {activeCity}...</p>
          </div>
        )}

        {/* Weather Card Display */}
        {!loading && weather && (
          <div className="weather-card">
            <div className="weather-top">
              <div>
                <h2 className="city-name">{weather.name}, {weather.country}</h2>
                <div className="weather-condition">{weather.condition}</div>
              </div>

              <div className="temp-container">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={weather.condition}
                  className="weather-icon-lg"
                />
                <div className="temp-val">{weather.temp}°C</div>
              </div>
            </div>

            <div className="details-grid">
              <div className="metric-card">
                <div className="metric-icon" style={{ color: '#38bdf8' }}>
                  <Droplets size={24} />
                </div>
                <div>
                  <div className="metric-lbl">Humidity</div>
                  <div className="metric-val">{weather.humidity}%</div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon" style={{ color: '#34d399' }}>
                  <Wind size={24} />
                </div>
                <div>
                  <div className="metric-lbl">Wind Speed</div>
                  <div className="metric-val">{weather.windSpeed} m/s</div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon" style={{ color: '#fbbf24' }}>
                  <Sunrise size={24} />
                </div>
                <div>
                  <div className="metric-lbl">Sunrise Time</div>
                  <div className="metric-val">{formatTime(weather.sunrise)}</div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon" style={{ color: '#f472b6' }}>
                  <Sunset size={24} />
                </div>
                <div>
                  <div className="metric-lbl">Sunset Time</div>
                  <div className="metric-val">{formatTime(weather.sunset)}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="weather-footer">
        <p>© {new Date().getFullYear()} Weather Pulse Dashboard. Built with React & OpenWeatherMap API.</p>
      </footer>
    </div>
  );
}
