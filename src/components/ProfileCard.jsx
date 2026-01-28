import React, { useState, useEffect } from 'react';
import '../styles/ProfileCard.css';

// Optimized banner images - reduced for better performance
const bannerImages = [
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=400&fit=crop',
];

// Simplified transition effects for better performance
const transitionEffects = [
  'fade-zoom',
  'slide-left',
  'slide-right',
];

const ProfileCard = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [prevBanner, setPrevBanner] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionEffect, setTransitionEffect] = useState('fade-zoom');

  useEffect(() => {
    // Set random initial banner on load
    const initial = Math.floor(Math.random() * bannerImages.length);
    setCurrentBanner(initial);
    setPrevBanner(initial);

    // Change banner every 20 seconds (reduced frequency for better performance)
    const interval = setInterval(() => {
      // Pick random transition effect
      const randomEffect = transitionEffects[Math.floor(Math.random() * transitionEffects.length)];
      setTransitionEffect(randomEffect);
      setIsTransitioning(true);

      // Store current as previous before changing
      setCurrentBanner((prev) => {
        setPrevBanner(prev);
        return (prev + 1) % bannerImages.length;
      });

      // End transition after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1200);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="profile-card card">
      {/* Cover/Banner Image - Dynamic with creative transitions */}
      <div className="profile-banner">
        {/* Previous image (stays visible during transition) */}
        <div
          className="banner-image banner-prev"
          style={{ backgroundImage: `url(${bannerImages[prevBanner]})` }}
        />
        {/* Current image with transition effect */}
        <div
          className={`banner-image banner-current ${isTransitioning ? `transitioning ${transitionEffect}` : 'visible'}`}
          style={{ backgroundImage: `url(${bannerImages[currentBanner]})` }}
        />
        <div className="banner-overlay"></div>
      </div>

      {/* Profile Photo */}
      <div className="profile-photo-wrapper">
        <div className="profile-photo">
          <img src="/image/profile.jpg" alt="Levon Petrosyan" />
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        <div className="profile-main">
          <div className="profile-info">
            <h1 className="profile-name">Levon Petrosyan</h1>
            <p className="profile-headline">
              Senior Full Stack Developer | Web | Mobile | AI/ML | Blockchain | 8+ Years Experience
            </p>
            <p className="profile-location">
              Abelyan street, Ajapnyak, Yerevan, Armenia
              <span className="separator">·</span>
              <a href="#contact" className="contact-info-link">Contact info</a>
            </p>
          </div>

          <div className="profile-company">
            <a href="https://rescode.am/" target="_blank" rel="noopener noreferrer" className="company-item">
              <div className="company-logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <span className="company-name">ResCode</span>
            </a>
            <a href="https://am.linkedin.com/school/polytech-armenia/" target="_blank" rel="noopener noreferrer" className="company-item">
              <div className="company-logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <span className="company-name">National Polytechnic University of Armenia</span>
            </a>
          </div>
        </div>

        <div className="profile-actions">
          <a href="#contact" className="btn btn-primary">
            <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
              <path d="M8 1a5 5 0 00-5 5v1H2a1 1 0 00-1 1v6a1 1 0 001 1h12a1 1 0 001-1V8a1 1 0 00-1-1h-1V6a5 5 0 00-5-5zm3 6H5V6a3 3 0 116 0v1z" />
            </svg>
            Open to
          </a>
          <a href="mailto:vahramoront@proton.me" className="btn btn-outline">
            Message
          </a>
          <a
            href="https://www.linkedin.com/in/vahram-oront-7003973a6"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            More
          </a>
        </div>

        <div className="profile-highlights">
          <div className="highlight-box">
            <span className="highlight-text">Open to work</span>
            <p className="highlight-detail">Full Stack Developer, Blockchain Engineer, and AI/ML roles</p>
            <a href="#contact" className="highlight-link">Show details</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
