import React from 'react';
import StudentCard from './StudentCard';
import { UserX } from 'lucide-react';

export default function StudentList({ students }) {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <UserX size={48} style={{ marginBottom: '1rem', color: '#9ca3af' }} />
        <h3>No Student Records Found</h3>
        <p>Try resetting filters or adjusting your search term.</p>
      </div>
    );
  }

  return (
    <div className="student-grid">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          name={student.name}
          rollNumber={student.rollNumber}
          department={student.department}
          semester={student.semester}
          cgpa={student.cgpa}
          photo={student.photo}
        />
      ))}
    </div>
  );
}
