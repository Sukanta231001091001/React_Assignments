# Assignment 04 — Weather Dashboard

A weather application built using React demonstrating API integration, `fetch`, `async/await`, and `useEffect`.

## Features Implemented
- **OpenWeatherMap API Integration**: Supports live API key lookup via environment variables.
- **Displayed Metrics**: Temperature (°C), Humidity (%), Wind Speed (m/s), Weather Icon, Sunrise & Sunset times.
- **Search by City**: Live search bar with instant submit and quick city presets.
- **Loading State**: Custom CSS animated spinner while fetching weather metrics.
- **Error Handling**: Handles invalid city errors, missing API key notices, and network disruptions gracefully.
- **Mock Fallback**: Includes a fallback mock weather service so the application runs immediately without requiring an API key.

## Environment Setup
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Insert your OpenWeatherMap API key into `VITE_OPENWEATHER_API_KEY`.

## Installation & Running
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
```
