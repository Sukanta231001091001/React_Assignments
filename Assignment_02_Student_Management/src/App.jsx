import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StudentList from './components/StudentList';
import { initialStudents } from './data/studentsData';
import { Search, ArrowUpDown, Filter } from 'lucide-react';

export default function App() {
  const [students] = useState(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [cgpaSort, setCgpaSort] = useState('DESC');

  // Filter students based on search and department
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = departmentFilter === 'ALL' || student.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  // Sort students by CGPA
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (cgpaSort === 'DESC') return b.cgpa - a.cgpa;
    if (cgpaSort === 'ASC') return a.cgpa - b.cgpa;
    return 0;
  });

  const departments = ['ALL', ...new Set(students.map(s => s.department))];

  return (
    <div className="app-container">
      <Header />

      <main style={{ flex: 1 }}>
        <div className="controls-bar">
          <div className="search-box">
            <Search size={18} color="#9ca3af" />
            <input
              type="text"
              placeholder="Search by student name or roll no..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Filter size={16} color="#6b7280" />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="select-control"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === 'ALL' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ArrowUpDown size={16} color="#6b7280" />
              <select
                value={cgpaSort}
                onChange={(e) => setCgpaSort(e.target.value)}
                className="select-control"
              >
                <option value="DESC">CGPA: High to Low</option>
                <option value="ASC">CGPA: Low to High</option>
              </select>
            </div>
          </div>
        </div>

        <StudentList students={sortedStudents} />
      </main>

      <Footer />
    </div>
  );
}
