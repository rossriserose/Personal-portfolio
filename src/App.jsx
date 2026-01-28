import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import ProfileCard from './components/ProfileCard';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ShootingStar from './components/ShootingStar';
import Background3D from './components/Background3D';
import ChatBot from './components/ChatBot';
import WeatherWidget from './components/WeatherWidget';
import './styles/App.css';
import './styles/Blog.css';

// Fade-in section wrapper component
const FadeInSection = ({ children }) => {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      {children}
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Blog panel handlers
  const openBlogPost = (post) => {
    setSelectedBlogPost(post);
  };

  const closeBlogPost = () => {
    setSelectedBlogPost(null);
  };

  // Close blog panel on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedBlogPost(null);
      }
    };

    if (selectedBlogPost) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedBlogPost]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app">
      <Background3D />
      <ShootingStar />
      <Navbar />
      <main className="main-content">
        <div className="container">
          <div className="main-column">
            <div style={{marginTop: "20px"}}></div>
            <FadeInSection>
              <ProfileCard />
            </FadeInSection>
            <FadeInSection>
              <About />
            </FadeInSection>
            <FadeInSection>
              <Experience />
            </FadeInSection>
            <FadeInSection>
              <Skills />
            </FadeInSection>
            <FadeInSection>
              <Projects />
            </FadeInSection>
            <FadeInSection>
              <Testimonials />
            </FadeInSection>
            <FadeInSection>
              <Education />
            </FadeInSection>
            <FadeInSection>
              <Certifications />
            </FadeInSection>
            <FadeInSection>
              <Blog onPostClick={openBlogPost} />
            </FadeInSection>
            <FadeInSection>
              <Contact />
            </FadeInSection>
          </div>
        </div>
      </main>
      <Footer />
      <ChatBot />
      {/* <WeatherWidget /> */}

      {/* Blog Detail Side Panel - At root level for proper z-index stacking */}
      <div className={`blog-panel-overlay ${selectedBlogPost ? 'active' : ''}`} onClick={closeBlogPost} />
      <div className={`blog-side-panel ${selectedBlogPost ? 'active' : ''}`}>
        <div className="panel-header">
          <h3 className="panel-title">Blog Post</h3>
          <button className="panel-close" onClick={closeBlogPost}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
            </svg>
          </button>
        </div>

        {selectedBlogPost && (
          <div className="panel-content">
            <div className="panel-image">
              <img src={selectedBlogPost.image} alt={selectedBlogPost.title} />
            </div>

            <div className="panel-body">
              <span className="panel-date">{selectedBlogPost.date}</span>
              <h2 className="panel-post-title">{selectedBlogPost.title}</h2>

              <div className="panel-text">
                {selectedBlogPost.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="panel-author">
                <img src="/image/profile.jpg" alt="Levon Petrosyan" className="panel-author-avatar" />
                <div className="panel-author-info">
                  <span className="panel-author-name">Levon Petrosyan</span>
                  <span className="panel-author-title">Senior Full Stack Developer</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
