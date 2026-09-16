import React from 'react';
import { NavLink } from 'react-router-dom';
import { CheckSquare, LayoutDashboard, ListTodo, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="brand">
        <CheckSquare size={28} />
        <span>TaskTrack Pro</span>
      </NavLink>

      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <ListTodo size={18} /> All Tasks
        </NavLink>
        <NavLink to="/add-task" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <PlusCircle size={18} /> Add Task
        </NavLink>
        <NavLink to="/completed" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <CheckCircle2 size={18} /> Completed
        </NavLink>
      </nav>
    </header>
  );
}
