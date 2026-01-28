import React, { useState, useEffect } from 'react';
import '../styles/Testimonials.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;
  const autoSlideInterval = 5000; // 5 seconds

  const testimonials = [
    {
      id: 1,
      name: 'Sasun Martirosyan',
      role: 'CEO & Co-Founder',
      company: 'ResCode',
      image: '/image/persons/47.jpg',
      text: 'Levon\'s ability to architect scalable microservices while maintaining code quality is remarkable. He led our migration from monolithic to distributed systems, reducing latency by 60% while improving developer velocity. His mentorship style is exceptional - he doesn\'t just solve problems, he teaches you how to think about them.',
      rating: 5
    },
    {
      id: 2,
      name: 'Mathieu BERNARD',
      role: 'CTO & Co-Founder',
      company: 'ETIXIO',
      image: '/image/persons/14.jpg',
      text: 'We brought Levon in to lead our blockchain integration project, and he delivered far beyond expectations. His deep understanding of Web3, combined with practical DevOps expertise, transformed our product roadmap. He\'s the rare developer who can speak the language of both engineers and executives.',
      rating: 5
    },
    {
      id: 3,
      name: 'Michael Thompson',
      role: 'Engineering Director',
      company: 'SITE IT NOW',
      image: '/image/persons/16.jpg',
      text: 'In 2 years working together, Levon handled projects that typically required 3-4 developers. His frontend optimization work on our flagship product improved Lighthouse scores from 45 to 98. What impressed me most was his proactive approach to identifying and solving problems before they impact production.',
      rating: 5
    },
    {
      id: 4,
      name: 'Arman Manukyan',
      role: 'Frontend Developer',
      company: 'ResCode',
      image: '/image/persons/60.jpg',
      text: 'Working with Levon as a designer was collaborative and inspiring. He understands the "why" behind design decisions and implements them with pixel-perfect accuracy. His responsive design implementations are always accessible and performant. He\'s a developer who truly cares about the user experience.',
      rating: 5
    },
    {
      id: 5,
      name: 'Julien Goumet',
      role: 'CEO & Co-Founder',
      company: 'ETIXIO',
      image: '/image/persons/15.jpg',
      text: 'Levon was instrumental in our Series A success. He not only built the technical foundation that impressed investors, but also communicated our technical vision clearly to non-technical stakeholders. His work on our AI-powered recommendations engine increased user engagement by 40%.',
      rating: 5
    },
    {
      id: 6,
      name: 'Dr. Bernardo Martinez',
      role: 'Senior Platform Architect',
      company: 'Cloud Infrastructure Ltd',
      image: '/image/persons/17.jpg',
      text: 'Levon\'s understanding of distributed systems and containerization is exceptional. He designed our Kubernetes infrastructure that now handles 10M+ daily requests with 99.99% uptime. His documentation and knowledge-sharing sessions elevated the entire platform engineering team.',
      rating: 5
    },
    {
      id: 7,
      name: 'Peter Bergström',
      role: 'CTO',
      company: 'Nordic Tech Ventures',
      image: '/image/persons/18.jpg',
      text: 'We engaged Levon for a critical API redesign project. He completed it in 40% less time than estimated, with comprehensive documentation and 95% test coverage. His GraphQL expertise helped us reduce client-side data fetching by 70%.',
      rating: 5
    },
    {
      id: 8,
      name: 'Alicia Chen',
      role: 'Product Lead',
      company: 'SaaS Innovations',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      text: 'Levon\'s full-stack capabilities are genuinely rare. He delivered our entire mobile-first application redesign, handling everything from React component architecture to Node.js backend optimization. The result was a 15-point increase in our NPS score.',
      rating: 5
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = testimonials.length - itemsPerSlide;
      return prevIndex === maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = testimonials.length - itemsPerSlide;
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getVisibleTestimonials = () => {
    const startIndex = currentIndex;
    return testimonials.slice(startIndex, startIndex + itemsPerSlide);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section id="testimonials" className="card">
      <div className="card-content">
        <div className="section-header">
          <h2 className="section-title">Testimonials</h2>
        </div>

        <div className="testimonials-carousel">
          <div className="carousel-container">
            <div className="testimonials-grid">
              {getVisibleTestimonials().map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-header">
                    <img src={testimonial.image} alt={testimonial.name} className="testimonial-avatar" />
                    <div className="testimonial-info">
                      <h3 className="testimonial-name">{testimonial.name}</h3>
                      <p className="testimonial-role">{testimonial.role}</p>
                      <p className="testimonial-company">{testimonial.company}</p>
                    </div>
                  </div>

                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                  </div>

                  <p className="testimonial-text">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button className="carousel-button prev" onClick={prevSlide} aria-label="Previous testimonials">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          <button className="carousel-button next" onClick={nextSlide} aria-label="Next testimonials">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>

          {/* Dots */}
          <div className="carousel-dots">
            {[...Array(testimonials.length - itemsPerSlide + 1)].map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
