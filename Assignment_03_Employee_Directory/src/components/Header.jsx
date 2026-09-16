import React from 'react';
import { Users } from 'lucide-react';

export default function Header() {
  return (
    <header className="navbar">
      <div className="nav-brand">
        <Users size={28} />
        <span>Enterprise Directory System</span>
      </div>
    </header>
  );
}
