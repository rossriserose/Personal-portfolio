import React from 'react';
import '../styles/Skills.css';

const skillsData = {
  'Programming Languages': [
    'JavaScript (ES6+)',
    'TypeScript',
    'Python (AI/ML pipelines, data processing, automation)',
    'Go (high-performance services, concurrency-oriented systems)',
    'Java (enterprise backend services, REST APIs)',
    'C# (.NET backend services, APIs)',
    'PHP (Laravel-based backend systems, legacy platforms)',
    'SQL'
  ],
  'Frontend & Mobile Development': [
    'React',
    'Next.js (SSR/SSG)',
    'Angular',
    'Vue.js',
    'Svelte',
    'React Native (cross-platform mobile apps)',
    'Flutter (cross-platform mobile development)',
    'Android (native Android development, Kotlin/Java integration)',
    'Component-driven architecture',
    'Design systems',
    'State management: Redux, Zustand, Vuex',
    'Performance optimization (Core Web Vitals)',
    'Responsive design',
    'Accessibility (WCAG)'
  ],
  'Backend & API Engineering': [
    'Node.js',
    'NestJS',
    'Express',
    'RESTful APIs',
    'GraphQL',
    'Authentication & Authorization (JWT, OAuth2)',
    'Background jobs, queues, schedulers',
    'API versioning',
    'Contract-first design'
  ],
  'AI / ML & Intelligent Systems': [
    'Integrating LLMs (OpenAI / similar APIs) into production systems',
    'AI-powered features: chatbots, content generation, semantic search',
    'ML pipelines for classification, recommendation, and automation',
    'Data preprocessing',
    'Feature engineering',
    'Model inference integration into real-time applications'
  ],
  'Databases & Data Layer': [
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'Schema design',
    'Migrations',
    'Indexing',
    'Query optimization',
    'Transactions',
    'ORMs: Prisma, TypeORM, Sequelize',
    'Redis for caching and real-time data'
  ],
  'Cloud, DevOps & Infrastructure': [
    'Docker',
    'Containerized deployments',
    'CI/CD: GitHub Actions, GitLab CI',
    'Cloud platforms: AWS, GCP',
    'Infrastructure monitoring',
    'Logging',
    'Alerting',
    'Secure configuration & secrets management'
  ],
  'Architecture & Engineering Practices': [
    'System design',
    'Modular & distributed architectures',
    'Event-driven and service-oriented systems',
    'Clean Architecture',
    'SOLID principles',
    'Test automation (unit, integration, e2e)',
    'Legacy system modernization'
  ],
  'Leadership & Collaboration': [
    'Technical mentoring and code reviews',
    'Agile / Scrum / Kanban',
    'Technical documentation',
    'Architectural decision-making'
  ]
};

const Skills = () => {
  return (
    <section id="skills" className="card">
      <div className="card-content">
        <div className="section-header">
          <h2 className="section-title">Skills</h2>
        </div>

        <div className="skills-container">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category} className="skill-category">
              <h3 className="skill-category-title">{category}</h3>
              <div className="skills-list">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <span className="skill-name">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
