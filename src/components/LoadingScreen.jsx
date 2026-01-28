import React, { useState, useEffect } from 'react';
import '../styles/LoadingScreen.css';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1.5;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Calculate the stroke dasharray for pie effect
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="loading-screen">
      {/* Animated background */}
      <div className="loading-bg">
        <div className="loading-bg-gradient"></div>
        <div className="loading-bg-circles">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`floating-circle circle-${i + 1}`}></div>
          ))}
        </div>
        <div className="loading-bg-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}></div>
          ))}
        </div>
      </div>

      <div className="loading-content">
        {/* Pie Loading Circle */}
        <div className="pie-loader-container">
          <svg className="pie-loader" viewBox="0 0 140 140">
            {/* Background circle */}
            <circle
              className="pie-bg"
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              className="pie-progress"
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
            {/* Inner glow circle */}
            <circle
              className="pie-inner-glow"
              cx="70"
              cy="70"
              r="45"
              fill="none"
              strokeWidth="2"
            />
          </svg>

          {/* Percentage in center */}
          <div className="pie-center">
            <span className="pie-percent">{Math.round(progress)}%</span>
          </div>

          {/* Orbiting dots */}
          <div className="orbit-container">
            <div className="orbit-dot dot-1"></div>
            <div className="orbit-dot dot-2"></div>
            <div className="orbit-dot dot-3"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="loading-text-container">
          <h1 className="loading-main-text">Loading</h1>
          <div className="loading-dots-text">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>

        {/* Subtle tagline */}
        <p className="loading-subtitle">Preparing something awesome</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
