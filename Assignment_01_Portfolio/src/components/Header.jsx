import React from 'react';
import Navbar from './Navbar';
import { Code2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="header-bar">
      <div className="brand-logo">
        <Code2 size={28} />
        <span>Alex Morgan</span>
      </div>
      <Navbar />
    </header>
  );
}
