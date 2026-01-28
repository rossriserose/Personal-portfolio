import React from 'react';
import '../styles/Certifications.css';

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialUrl: 'https://aws.amazon.com/certification/',
      icon: '🏆'
    },
    {
      id: 2,
      title: 'Google Cloud Professional Data Engineer',
      issuer: 'Google Cloud',
      date: '2022',
      credentialUrl: 'https://cloud.google.com/certification/',
      icon: '☁️'
    },
    {
      id: 3,
      title: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'The Linux Foundation',
      date: '2023',
      credentialUrl: 'https://www.cncf.io/certification/cka/',
      icon: '⚙️'
    },
    {
      id: 4,
      title: 'Full Stack Web Development Bootcamp',
      issuer: 'Udemy',
      date: '2020',
      credentialUrl: 'https://www.udemy.com/',
      icon: '📚'
    },
    {
      id: 5,
      title: 'Advanced JavaScript & React',
      issuer: 'Frontend Masters',
      date: '2021',
      credentialUrl: 'https://frontendmasters.com/',
      icon: '⚛️'
    },
    {
      id: 6,
      title: 'Docker & Kubernetes Mastery',
      issuer: 'Udemy',
      date: '2022',
      credentialUrl: 'https://www.udemy.com/',
      icon: '🐳'
    },
    {
      id: 7,
      title: 'GraphQL Complete Course',
      issuer: 'Scrimba',
      date: '2022',
      credentialUrl: 'https://scrimba.com/',
      icon: '📡'
    },
    {
      id: 8,
      title: 'Machine Learning Specialization',
      issuer: 'Coursera',
      date: '2023',
      credentialUrl: 'https://www.coursera.org/',
      icon: '🤖'
    },
    {
      id: 9,
      title: 'TypeScript Advanced Patterns',
      issuer: 'egghead.io',
      date: '2023',
      credentialUrl: 'https://egghead.io/',
      icon: '📝'
    }
  ];

  return (
    <section id="certifications" className="card">
      <div className="card-content">
        <div className="section-header">
          <h2 className="section-title">Certifications</h2>
        </div>

        <div className="certifications-grid">
          {certifications.map((cert) => (
            <a
              key={cert.id}
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="certification-card"
            >
              <div className="certification-icon">{cert.icon}</div>
              <h3 className="certification-title">{cert.title}</h3>
              <p className="certification-issuer">{cert.issuer}</p>
              <p className="certification-date">{cert.date}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
