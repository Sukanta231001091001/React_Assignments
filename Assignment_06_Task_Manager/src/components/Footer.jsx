import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} TaskTrack Pro. Powered by React Router & LocalStorage.</p>
    </footer>
  );
}
