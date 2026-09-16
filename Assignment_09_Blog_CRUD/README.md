# Assignment 09 — Blog Application using CRUD

A full CRUD Blog Application built using React, Axios, and JSON Server as a mock REST API.

## Requirements Implemented
- **CRUD Operations**: Complete Create, Read, Update, and Delete functionality powered by Axios (`GET`, `POST`, `PUT`, `DELETE`).
- **Media Content**: Blog posts support rich text, cover images, and embedded video media.
- **Content Constraint**: Enforces a strict maximum limit of **1000 words** per blog post with live word counter validation.
- **JSON Server Integration**: Uses `db.json` containing a `blogs` collection on `http://localhost:3001/blogs`. Includes a fallback mock service if JSON Server is offline.
- **Search Functionality**: Instant keyword filtering across post title, author, and body.
- **Error & Loading UI**: Visual loading spinners during requests, error alerts for API failures, and empty state cards.

## Setup Instructions

### Option A: Running with JSON Server (Recommended)
1. In a separate terminal window, launch the JSON Server:
   ```bash
   npm run server
   ```
2. Launch the React Vite development server:
   ```bash
   npm run dev
   ```

### Option B: Direct Run (Standalone)
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
```
