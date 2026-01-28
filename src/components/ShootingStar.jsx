import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/ShootingStar.css';

const ShootingStar = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = particlesRef.current;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Theme-aware color palettes
    const getParticleColor = () => {
      if (isDark) {
        // Light golden/champagne colors for dark theme (more white-ish)
        const colors = [
          { r: 255, g: 248, b: 220 },  // Cornsilk (very light)
          { r: 255, g: 250, b: 230 },  // Light cream
          { r: 255, g: 245, b: 210 },  // Pale champagne
          { r: 255, g: 240, b: 200 },  // Light gold
          { r: 250, g: 235, b: 190 },  // Soft champagne
          { r: 255, g: 253, b: 240 },  // Almost white gold
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      } else {
        // LinkedIn blue sky colors for light theme
        const colors = [
          { r: 10, g: 102, b: 194 },   // LinkedIn primary blue
          { r: 0, g: 119, b: 181 },    // LinkedIn blue
          { r: 40, g: 130, b: 200 },   // Light sky blue
          { r: 70, g: 150, b: 220 },   // Bright sky blue
          { r: 100, g: 170, b: 235 },  // Lighter blue
          { r: 0, g: 90, b: 160 },     // Deep blue
          { r: 56, g: 136, b: 206 },   // Medium blue
          { r: 30, g: 110, b: 190 },   // Ocean blue
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
    };

    // Particle class - small with moderate life
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 0.4 + 0.2;  // Tiny: 0.2-0.6px
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.life = 1;
        this.decay = Math.random() * 0.025 + 0.015;  // Faster decay for shorter trail
        this.color = getParticleColor();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.size *= 0.995;
      }

      draw(ctx) {
        if (this.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.life * 0.9;
        ctx.beginPath();

        // Create gradient for glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 1)`);
        gradient.addColorStop(0.3, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.5)`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Trail particle - tiny with moderate life
    class TrailParticle {
      constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 0.3 + 0.1;  // Very tiny: 0.1-0.4px
        const speed = Math.random() * 2.5 + 0.8;
        this.speedX = Math.cos(angle + (Math.random() - 0.5) * 0.8) * speed;
        this.speedY = Math.sin(angle + (Math.random() - 0.5) * 0.8) * speed;
        this.life = 1;
        this.decay = Math.random() * 0.03 + 0.02;  // Faster decay for shorter trail
        this.color = getParticleColor();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedX *= 0.98;
        this.speedY *= 0.98;
        this.life -= this.decay;
      }

      draw(ctx) {
        if (this.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.life * 0.7;
        ctx.beginPath();

        // Add glow effect to trail particles
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 2.5
        );
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 1)`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Mouse move handler
    let lastX = 0;
    let lastY = 0;
    let isFirst = true;

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (isFirst) {
        lastX = x;
        lastY = y;
        isFirst = false;
        return;
      }

      const dx = x - lastX;
      const dy = y - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      // Create particles based on movement speed (reduced for better performance)
      const particleCount = Math.min(Math.floor(distance / 3), 12);

      for (let i = 0; i < particleCount; i++) {
        const t = i / particleCount;
        const px = lastX + dx * t;
        const py = lastY + dy * t;

        // Main glowing particles
        particles.push(new Particle(px, py));

        // Trail particles (reduced for better performance)
        for (let j = 0; j < 3; j++) {
          particles.push(new TrailParticle(px, py, angle + Math.PI));
        }
      }

      lastX = x;
      lastY = y;
      mouseRef.current = { x, y };
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles = particles.filter(particle => {
        particle.update();
        particle.draw(ctx);
        return particle.life > 0;
      });
      particlesRef.current = particles;

      animationRef.current = requestAnimationFrame(animate);
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="shooting-star-canvas"
    />
  );
};

export default ShootingStar;
