# Assignment 07 — Authentication System

A client-side authentication application built using React demonstrating `AuthContext`, route protection (`ProtectedRoute`), simulated JWT bearer token generation, and LocalStorage persistence.

> [!NOTE]
> **Frontend Authentication Simulation**: This application simulates enterprise authentication token generation and session persistence entirely in the frontend.

## Features & Validations Implemented
- **Login Portal**: Login form requiring Username & Password inputs.
- **Password Strength Meter**: Real-time visual evaluation (Weak, Medium, Strong) based on length, digits, uppercase characters, and special symbols.
- **Remember User**: Checkbox option to persist simulated JWT token across browser sessions (LocalStorage vs SessionStorage).
- **JWT Token Simulation**: Generates a standard three-part Base64-encoded bearer token containing header, payload, and signature.
- **Protected Dashboard**: Guards access to administrative routes (`ProtectedRoute.jsx`). Unauthenticated users are redirected to `/login`.
- **Logout Action**: Clears tokens and resets user context state.

## Installation & Running
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
```
