import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-title">
          <GraduationCap size={32} color="#2563eb" />
          <span>EduPortal — Student Information Portal</span>
        </div>
      </div>
    </header>
  );
}
