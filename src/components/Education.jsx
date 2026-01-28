import React from 'react';
import '../styles/Education.css';

const Education = () => {
  return (
    <section id="education" className="card">
      <div className="card-content">
        <div className="section-header">
          <h2 className="section-title">Education</h2>
        </div>

        <div className="education-item">
          <div className="education-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <div className="education-content">
            <h3 className="education-school">Yerevan State University</h3>
            <p className="education-degree">Bachelor of Science in Computer Science</p>
            <p className="education-period">09/2013 - 06/2017</p>
            <p className="education-description">
              GPA: 4.8 / 5.0
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
