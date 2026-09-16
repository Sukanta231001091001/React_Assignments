import React from 'react';

export default function Skills() {
  const skillCategories = [
    {
      category: 'Frontend Development',
      skills: [
        { name: 'React.js / JSX', level: 95 },
        { name: 'JavaScript (ES6+)', level: 90 },
        { name: 'HTML5 & CSS3 / SASS', level: 92 },
        { name: 'Tailwind CSS / MUI', level: 88 }
      ]
    },
    {
      category: 'Backend & Databases',
      skills: [
        { name: 'Node.js & Express', level: 85 },
        { name: 'REST & GraphQL APIs', level: 88 },
        { name: 'MongoDB / PostgreSQL', level: 82 },
        { name: 'Firebase / Supabase', level: 80 }
      ]
    },
    {
      category: 'Tools & Ecosystem',
      skills: [
        { name: 'Git & GitHub Workflows', level: 92 },
        { name: 'Vite / Webpack', level: 85 },
        { name: 'Docker / CI/CD', level: 78 },
        { name: 'UI/UX Design (Figma)', level: 84 }
      ]
    }
  ];

  return (
    <section id="skills" className="section">
      <h2 className="section-title">Technical Skills</h2>
      <div className="skills-grid">
        {skillCategories.map((cat, idx) => (
          <div className="skill-category" key={idx}>
            <h3>{cat.category}</h3>
            {cat.skills.map((s, sIdx) => (
              <div className="skill-item" key={sIdx}>
                <div className="skill-info">
                  <span>{s.name}</span>
                  <span>{s.level}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${s.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
