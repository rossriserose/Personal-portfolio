import React from 'react';
import '../styles/Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 8,
      name: 'Coldi.ai-Multi-Tenant-Web-Application',
      liveUrl: 'https://coldi.ai/',
      sourceUrl: 'https://github.com/rossriserose/Coldi.ai-Multi-Tenant-Web-Application',
      thumbnail: '/image/projects/project8.jpg',
      tagline: 'A production-ready multi-tenant web application for Coldi.ai that enables clients to test their Retell.ai bots with real voice calls, track call metrics, and manage billing with real-time updates.',
      duration: 'Feb 2023 - June 2024',
      technologies: [
        'TypeScript', 'Python', 'Rust', 'Next.js', 'React', 'Node.js',
        'Synapse/Matrix', 'PostgreSQL', 'Redis', 'XRP Ledger', 'XUMM',
        'Docker', 'AWS EC2', 'Socket.io', 'Tailwind CSS'
      ]
    },
    {
      id: 9,
      name: 'Freelancy-FreelanceSystem',
      liveUrl: 'https://www.freelancy.app/',
      sourceUrl: 'https://github.com/rossriserose/Freelancy-FreelanceSystem',
      thumbnail: '/image/projects/project9.jpg',
      tagline: 'Freelancy is a full-stack freelance management system built with Laravel 10 API, Vue 3, and Tailwind CSS. It connects clients and freelancers with features like real-time messaging, JWT authentication, live search with filtering, customizable profiles, and role-based access.',
      duration: 'Feb 2023 - June 2024',
      technologies: [
        'TypeScript', 'Python', 'Rust', 'Next.js', 'React', 'Node.js',
        'Synapse/Matrix', 'PostgreSQL', 'Redis', 'XRP Ledger', 'XUMM',
        'Docker', 'AWS EC2', 'Socket.io', 'Tailwind CSS'
      ]
    },
    {
      id: 11,
      name: 'Dapper-Ecommerce-Website',
      liveUrl: 'https://dapperr.shop/',
      sourceUrl: 'https://github.com/rossriserose/Dapper-Ecommerce',
      thumbnail: '/image/projects/project11.jpg',
      tagline: 'Experience seamless online shopping with my dynamic, feature-rich solution. Boasting a responsive design, secure Node.js and MongoDB backend, and user-friendly Bootstrap and EJS frontend.',
      duration: 'Feb 2023 - June 2024',
      technologies: [
        'TypeScript', 'Python', 'Rust', 'Next.js', 'React', 'Node.js',
        'Synapse/Matrix', 'PostgreSQL', 'Redis', 'XRP Ledger', 'XUMM',
        'Docker', 'AWS EC2', 'Socket.io', 'Tailwind CSS'
      ]
    },
    {
      id: 10,
      name: 'Foodify-Food-Website',
      liveUrl: 'https://foodify-fpt.vercel.app/home',
      sourceUrl: 'https://github.com/rossriserose/foodify-tai',
      thumbnail: '/image/projects/project10.jpg',
      tagline: 'Foodify web for user who can buy food or drink on the website',
      duration: 'Feb 2023 - June 2024',
      technologies: [
        'TypeScript', 'Python', 'Rust', 'Next.js', 'React', 'Node.js',
        'Synapse/Matrix', 'PostgreSQL', 'Redis', 'XRP Ledger', 'XUMM',
        'Docker', 'AWS EC2', 'Socket.io', 'Tailwind CSS'
      ]
    },
    {
      id: 7,
      name: 'Healthcare Dashboard',
      liveUrl: 'https://healthcare-dashboard-brown.vercel.app/',
      sourceUrl: 'https://github.com/rossriserose/Healthcare-Dashboard',
      thumbnail: '/image/projects/project7.jpg',
      tagline: 'A static, responsive healthcare dashboard built with React and CSS Modules/Global CSS — replicates a clean, professional design with anatomy visuals, upcoming schedule, calendar, and more.',
      duration: 'Feb 2023 - June 2024',
      technologies: [
        'TypeScript', 'Python', 'Rust', 'Next.js', 'React', 'Node.js',
        'Synapse/Matrix', 'PostgreSQL', 'Redis', 'XRP Ledger', 'XUMM',
        'Docker', 'AWS EC2', 'Socket.io', 'Tailwind CSS'
      ]
    },
    {
      id: 5,
      name: 'Kleva Handbags',
      liveUrl: 'https://kleva-handbags.vercel.app/',
      sourceUrl: 'https://github.com/rossriserose/kleva-handbags',
      thumbnail: '/image/projects/project6.jpg',
      tagline: 'Internal catalog for a local business that tracks brand-new (Mpya) and second-hand (Mtumba) handbags.',
      duration: 'Feb 2023 - June 2024',
      technologies: [
        'TypeScript', 'Python', 'Rust', 'Next.js', 'React', 'Node.js',
        'Synapse/Matrix', 'PostgreSQL', 'Redis', 'XRP Ledger', 'XUMM',
        'Docker', 'AWS EC2', 'Socket.io', 'Tailwind CSS'
      ]
    },
    {
      id: 6,
      name: 'Pack Hydrogen Theme Blueprint',
      liveUrl: 'https://hydrogen.packdigital.com/',
      sourceUrl: 'https://github.com/rossriserose/pack-hydrogen-theme-blueprint',
      thumbnail: '/image/projects/project5.jpg',
      tagline: 'A fully-featured Shopify Hydrogen starter theme packed with versatile components designed to seamlessly integrate with Pack and Shopify Hydrogen',
      duration: 'Feb 2023 - June 2024',
      technologies: [
        'TypeScript', 'Python', 'Rust', 'Next.js', 'React', 'Node.js',
        'Synapse/Matrix', 'PostgreSQL', 'Redis', 'XRP Ledger', 'XUMM',
        'Docker', 'AWS EC2', 'Socket.io', 'Tailwind CSS'
      ]
    },
    {
      id: 1,
      name: 'Shopify Hydrogen Storefront',
      liveUrl: 'https://hydrogen-19458824104.us-central1.run.app/',
      sourceUrl: 'https://github.com/rossriserose/shopify-hydrogen',
      thumbnail: '/image/projects/project4.jpg',
      tagline: 'Shopify Hydrogen headless storefront',
      duration: 'Feb 2023 - June 2024',
      technologies: [
        'TypeScript', 'Python', 'Rust', 'Next.js', 'React', 'Node.js',
        'Synapse/Matrix', 'PostgreSQL', 'Redis', 'XRP Ledger', 'XUMM',
        'Docker', 'AWS EC2', 'Socket.io', 'Tailwind CSS'
      ]
    },
    {
      id: 2,
      name: 'Les-Chaises Shop',
      liveUrl: 'https://les-chaises.vercel.app/',
      sourceUrl: 'https://github.com/rossriserose/Les-Chaises',
      thumbnail: '/image/projects/project3.jpg',
      tagline: 'Shopify Chair Store made with Next.js and Tailwind CSS',
      duration: 'May 2020 - Oct 2022',
      technologies: [
        'Vue 3', 'Nuxt3', 'Vuex', 'Pinia', 'Node.js', 'Express',
        'MySQL', 'Sequelize', 'AWS EC2', 'RDS', 'S3', 'CloudFront',
        'Lambda', 'API Gateway', 'Cognito', 'Docker'
      ]
    },
    {
      id: 3,
      name: 'Surgery Status Board',
      liveUrl: 'https://surgery-status-board.netlify.app/',
      sourceUrl: 'https://github.com/rossriserose/Surgery-Status-Board',
      thumbnail: '/image/projects/project1.jpg',
      tagline: 'Surgery Status Board is a role-based dashboard that tracks and displays the real-time status of surgical patients in a hospital.',
      duration: 'July 2019 - Mar 2020',
      technologies: [
        'Next.js', 'TypeScript', 'Go', 'React', 'Tailwind CSS',
        'Stable Diffusion', 'Redux', 'MySQL', 'Elasticsearch',
        'Docker', 'AWS', 'Canvas APIs', 'Discord Bot'
      ]
    },
    {
      id: 4,
      name: 'DECIDIM-ZUERICH',
      liveUrl: 'https://mitwirken.stadt-zuerich.ch/',
      sourceUrl: 'https://github.com/rossriserose/DECIDIM-ZUERICH',
      thumbnail: '/image/projects/project2.jpg',
      tagline: 'Participation portal for the city of Zurich, based on Decidim.',
      duration: 'July 2019 - Mar 2020',
      technologies: [
        'Next.js', 'TypeScript', 'Go', 'React', 'Tailwind CSS',
        'Stable Diffusion', 'Redux', 'MySQL', 'Elasticsearch',
        'Docker', 'AWS', 'Canvas APIs', 'Discord Bot'
      ]
    },
  ];

  return (
    <section id="projects" className="card projects-section">
      <div className="card-content">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              {/* Project Thumbnail */}
              <div className="project-thumbnail">
                <img src={project.thumbnail} alt={project.name} className="thumbnail-img" />
                <div className="thumbnail-overlay">
                  <div className="project-links">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link live-demo">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                      </svg>
                      Live Demo
                    </a>
                    <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="project-link source-code">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                      </svg>
                      Source Code
                    </a>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="project-info">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-tagline">{project.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
