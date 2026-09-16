# Assignment 10 — Movie Search Application

A cinema database and movie discovery application built using React, OMDb API, custom debouncing hooks, and LocalStorage.

## Requirements Implemented
- **Movie Search**: Real-time query search fetching movie titles, release year, poster image, and type.
- **Search Optimization (Debouncing)**: Implements custom `useDebounce` hook to prevent excessive API requests while typing.
- **Movie Details Modal**: Deep spec inspector displaying plot summary, director, cast, IMDb ratings, genre, runtime, and box office.
- **Ratings & Poster Fallbacks**: IMDb rating badges and custom fallback placeholder imagery.
- **Pagination**: Interactive page switching controls (`Next` / `Previous`) recalculating total pages.
- **Favorites System**: Add/remove movies to personal favorites list with instant toggle and LocalStorage persistence.
- **Fallback Service**: Includes fallback mock data service so the application functions out-of-the-box even without an API key configured.

## Environment Setup
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Insert your OMDb API key into `VITE_OMDB_API_KEY`.

## Installation & Running
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
```
