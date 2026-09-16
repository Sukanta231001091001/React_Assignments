# Assignment 06 — Task Manager with Routing

A single-page Task Manager application built using React and React Router featuring dynamic routing, URL parameter extraction, protected routes, and LocalStorage persistence.

## Task Fields Implemented
1. **Task Header** (Title)
2. **Task Description**
3. **Priority**: High / Medium / Low
4. **Category**: Academic / Personal
5. **Raised Date & Time**: Automatically captured upon task creation
6. **Due Date**: Defaults to `28 Aug 2026` or customized date
7. **Status**: Raised / Pending / Closed

## Pages & Routes
- `/` -> **Dashboard**: Overview statistics and recent task activity.
- `/tasks` -> **Tasks List**: Filterable directory (by priority, category, status, search).
- `/add-task` -> **Add Task**: Form with field validation.
- `/tasks/:id` -> **Task Details**: Dynamic route extracting `:id` via `useParams()`.
- `/completed` -> **Completed Tasks**: Archive page of closed tasks.

## Routing Features
- **URL Parameters**: Dynamic URL mapping (`/tasks/:id`).
- **Navigation**: Navbar active link indicators using `NavLink`.
- **Protected Route**: Route protection wrapper (`ProtectedRoute.jsx`).
- **LocalStorage Sync**: Persistent state storage across browser reloads.

## Installation & Running
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
```
