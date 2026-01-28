import React, { useState } from 'react';
import '../styles/About.css';

const About = () => {
  const [expanded, setExpanded] = useState(true);

  const fullText = `Senior Full-Stack Developer\n · clean code · real impact\nIf you’re looking for a dependable contributor to move your project forward, let’s talk.`;

  const shortText = fullText.slice(0, 600);

  return (
    <section id="about" className="card">
      <div className="card-content">
        <div className="section-header">
          <h2 className="section-title">About</h2>
        </div>

        <div className="about-text">
          <p>{expanded ? fullText : `${shortText}...`}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
