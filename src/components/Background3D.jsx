import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import FluidCursor from './FluidCursor';
import '../styles/Background3D.css';

const Background3D = () => {
  const canvasRef = useRef(null);
  const gradientRef = useRef(null);
  const animationRef = useRef(null);
  const gradientAnimationRef = useRef(null);
  const { isDark } = useTheme();

  // Dynamic gradient background animation
  useEffect(() => {
    const gradientElement = gradientRef.current;
    let gradientAngle = 0;
    let colorPhase = 0;

    const animateGradient = () => {
      gradientAngle = (gradientAngle + 0.3) % 360;
      colorPhase = (colorPhase + 0.005) % 1;

      let colors;
      if (isDark) {
        // Dark theme: golden/amber tones shifting
        const hue1 = 35 + Math.sin(colorPhase * Math.PI * 2) * 15; // 20-50 (gold range)
        const hue2 = 45 + Math.cos(colorPhase * Math.PI * 2) * 20; // 25-65
        const hue3 = 30 + Math.sin(colorPhase * Math.PI * 2 + 1) * 10;
        colors = [
          `hsla(${hue1}, 60%, 8%, 1)`,
          `hsla(${hue2}, 50%, 12%, 1)`,
          `hsla(${hue3}, 40%, 6%, 1)`,
          `hsla(${hue1 + 10}, 55%, 10%, 1)`
        ];
      } else {
        // Light theme: LinkedIn blue tones shifting
        const hue1 = 205 + Math.sin(colorPhase * Math.PI * 2) * 10; // 195-215 (blue range)
        const hue2 = 210 + Math.cos(colorPhase * Math.PI * 2) * 15;
        const hue3 = 200 + Math.sin(colorPhase * Math.PI * 2 + 1) * 12;
        colors = [
          `hsla(${hue1}, 70%, 95%, 1)`,
          `hsla(${hue2}, 60%, 92%, 1)`,
          `hsla(${hue3}, 50%, 97%, 1)`,
          `hsla(${hue1 - 5}, 65%, 94%, 1)`
        ];
      }

      gradientElement.style.background = `
        linear-gradient(${gradientAngle}deg, ${colors[0]} 0%, ${colors[1]} 33%, ${colors[2]} 66%, ${colors[3]} 100%)
      `;

      gradientAnimationRef.current = requestAnimationFrame(animateGradient);
    };

    animateGradient();

    return () => {
      if (gradientAnimationRef.current) {
        cancelAnimationFrame(gradientAnimationRef.current);
      }
    };
  }, [isDark]);

  // Atom/molecule canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Theme-aware colors
    const getAtomColor = (opacity) => {
      if (isDark) {
        return `rgba(255, 200, 50, ${opacity})`;
      } else {
        return `rgba(10, 102, 194, ${opacity})`;
      }
    };

    const getElectronColor = (opacity) => {
      if (isDark) {
        return `rgba(255, 180, 100, ${opacity})`;
      } else {
        return `rgba(0, 119, 181, ${opacity})`;
      }
    };

    // Atom class - nucleus with orbiting electrons
    class Atom {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.nucleusSize = Math.random() * 6 + 3;  // 3-9px radius (smaller for more)

        this.velocityX = (Math.random() - 0.5) * 1.2;
        this.velocityY = (Math.random() - 0.5) * 1.2;

        this.opacity = Math.random() * 0.3 + 0.15;

        // Electron orbits (1-3 orbits per atom)
        this.orbitCount = Math.floor(Math.random() * 3) + 1;
        this.orbits = [];

        for (let i = 0; i < this.orbitCount; i++) {
          this.orbits.push({
            radius: this.nucleusSize * (2.5 + i * 1.5),
            angle: Math.random() * Math.PI * 2,
            speed: (Math.random() * 0.04 + 0.02) * (Math.random() > 0.5 ? 1 : -1),
            tilt: Math.random() * 0.7 + 0.2,
            rotation: Math.random() * Math.PI,
            electronCount: Math.floor(Math.random() * 2) + 1
          });
        }
      }

      update() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x < -50 || this.x > canvas.width + 50) {
          this.velocityX *= -1;
          this.x = Math.max(-50, Math.min(canvas.width + 50, this.x));
        }
        if (this.y < -50 || this.y > canvas.height + 50) {
          this.velocityY *= -1;
          this.y = Math.max(-50, Math.min(canvas.height + 50, this.y));
        }

        this.orbits.forEach(orbit => {
          orbit.angle += orbit.speed;
        });

        if (Math.random() < 0.008) {
          this.velocityX += (Math.random() - 0.5) * 0.2;
          this.velocityY += (Math.random() - 0.5) * 0.2;
        }

        const maxSpeed = 1.8;
        this.velocityX = Math.max(-maxSpeed, Math.min(maxSpeed, this.velocityX));
        this.velocityY = Math.max(-maxSpeed, Math.min(maxSpeed, this.velocityY));
      }

      draw(ctx) {
        ctx.save();

        const atomColor = getAtomColor(this.opacity);
        const electronColor = getElectronColor(this.opacity * 1.3);

        // Draw electron orbits
        this.orbits.forEach(orbit => {
          ctx.beginPath();
          ctx.strokeStyle = getAtomColor(this.opacity * 0.25);
          ctx.lineWidth = 0.6;
          ctx.ellipse(
            this.x, this.y,
            orbit.radius, orbit.radius * orbit.tilt,
            orbit.rotation, 0, Math.PI * 2
          );
          ctx.stroke();

          // Draw electrons
          for (let e = 0; e < orbit.electronCount; e++) {
            const electronAngle = orbit.angle + (e * Math.PI * 2 / orbit.electronCount);
            const ex = this.x + Math.cos(electronAngle) * orbit.radius * Math.cos(orbit.rotation)
                      - Math.sin(electronAngle) * orbit.radius * orbit.tilt * Math.sin(orbit.rotation);
            const ey = this.y + Math.cos(electronAngle) * orbit.radius * Math.sin(orbit.rotation)
                      + Math.sin(electronAngle) * orbit.radius * orbit.tilt * Math.cos(orbit.rotation);

            // Electron glow
            const gradient = ctx.createRadialGradient(ex, ey, 0, ex, ey, 3);
            gradient.addColorStop(0, electronColor);
            gradient.addColorStop(1, 'transparent');

            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(ex, ey, 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = electronColor;
            ctx.arc(ex, ey, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        // Draw nucleus glow
        const nucleusGradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.nucleusSize * 1.5
        );
        nucleusGradient.addColorStop(0, atomColor);
        nucleusGradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.fillStyle = nucleusGradient;
        ctx.arc(this.x, this.y, this.nucleusSize * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Nucleus protons
        const protonCount = Math.floor(this.nucleusSize / 2.5) + 2;
        for (let i = 0; i < protonCount; i++) {
          const angle = (i / protonCount) * Math.PI * 2;
          const distance = this.nucleusSize * 0.25;
          const px = this.x + Math.cos(angle) * distance;
          const py = this.y + Math.sin(angle) * distance;

          ctx.beginPath();
          ctx.fillStyle = atomColor;
          ctx.arc(px, py, this.nucleusSize * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = atomColor;
        ctx.arc(this.x, this.y, this.nucleusSize * 0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Molecule bond class
    class MoleculeBond {
      constructor(atom1, atom2) {
        this.atom1 = atom1;
        this.atom2 = atom2;
      }

      draw(ctx, opacity) {
        const dx = this.atom2.x - this.atom1.x;
        const dy = this.atom2.y - this.atom1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const perpX = -dy / distance * 2.5;
        const perpY = dx / distance * 2.5;

        ctx.strokeStyle = getAtomColor(opacity * 0.35);
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        ctx.moveTo(this.atom1.x + perpX, this.atom1.y + perpY);
        ctx.lineTo(this.atom2.x + perpX, this.atom2.y + perpY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.atom1.x - perpX, this.atom1.y - perpY);
        ctx.lineTo(this.atom2.x - perpX, this.atom2.y - perpY);
        ctx.stroke();
      }
    }

    // Free electron class
    class FreeElectron {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.velocityX = (Math.random() - 0.5) * 5;
        this.velocityY = (Math.random() - 0.5) * 5;
        this.size = Math.random() * 1.5 + 0.8;
        this.opacity = Math.random() * 0.5 + 0.25;
        this.trail = [];
        this.maxTrailLength = 10;
      }

      update() {
        this.trail.unshift({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrailLength) {
          this.trail.pop();
        }

        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        if (Math.random() < 0.025) {
          this.velocityX += (Math.random() - 0.5) * 1.2;
          this.velocityY += (Math.random() - 0.5) * 1.2;
        }

        const maxSpeed = 6;
        const speed = Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);
        if (speed > maxSpeed) {
          this.velocityX = (this.velocityX / speed) * maxSpeed;
          this.velocityY = (this.velocityY / speed) * maxSpeed;
        }
      }

      draw(ctx) {
        const color = getElectronColor(this.opacity);

        // Draw trail
        this.trail.forEach((pos, index) => {
          const trailOpacity = (1 - index / this.maxTrailLength) * this.opacity * 0.4;
          ctx.beginPath();
          ctx.fillStyle = getElectronColor(trailOpacity);
          ctx.arc(pos.x, pos.y, this.size * (1 - index / this.maxTrailLength * 0.6), 0, Math.PI * 2);
          ctx.fill();
        });

        // Glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Burst electron class - created on click, fades out
    class BurstElectron {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 6;
        this.velocityX = Math.cos(angle) * speed;
        this.velocityY = Math.sin(angle) * speed;
        this.size = Math.random() * 2 + 1.5;
        this.opacity = 1;
        this.life = 1;
        this.decay = 0.015 + Math.random() * 0.01;
        this.trail = [];
        this.maxTrailLength = 8;
      }

      update() {
        this.trail.unshift({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrailLength) {
          this.trail.pop();
        }

        this.x += this.velocityX;
        this.y += this.velocityY;
        this.life -= this.decay;
        this.opacity = this.life;

        // Slow down gradually
        this.velocityX *= 0.98;
        this.velocityY *= 0.98;
      }

      draw(ctx) {
        if (this.life <= 0) return;

        const color = getElectronColor(this.opacity * 0.8);

        // Draw trail
        this.trail.forEach((pos, index) => {
          const trailOpacity = (1 - index / this.maxTrailLength) * this.opacity * 0.5;
          ctx.beginPath();
          ctx.fillStyle = getElectronColor(trailOpacity);
          ctx.arc(pos.x, pos.y, this.size * (1 - index / this.maxTrailLength * 0.5), 0, Math.PI * 2);
          ctx.fill();
        });

        // Glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      isDead() {
        return this.life <= 0;
      }
    }

    // Array to hold burst electrons
    const burstElectrons = [];

    // Create atoms (reduced for better performance)
    const atomCount = Math.min(Math.floor((canvas.width * canvas.height) / 100000), 12);
    const atoms = [];
    for (let i = 0; i < atomCount; i++) {
      atoms.push(new Atom());
    }

    // Create free electrons (reduced for better performance)
    const freeElectronCount = Math.min(Math.floor((canvas.width * canvas.height) / 150000), 6);
    const freeElectrons = [];
    for (let i = 0; i < freeElectronCount; i++) {
      freeElectrons.push(new FreeElectron());
    }

    // Draw molecular bonds
    const drawMolecularBonds = () => {
      const maxBondDistance = 180;

      for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
          const a1 = atoms[i];
          const a2 = atoms[j];

          const dx = a2.x - a1.x;
          const dy = a2.y - a1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxBondDistance) {
            const opacity = (1 - distance / maxBondDistance) * 0.35;
            const bond = new MoleculeBond(a1, a2);
            bond.draw(ctx, opacity);
          }
        }
      }
    };

    // Click handler to create burst electrons
    const handleClick = (e) => {
      const count = Math.floor(Math.random() * 3) + 3; // 3-5 electrons
      for (let i = 0; i < count; i++) {
        burstElectrons.push(new BurstElectron(e.clientX, e.clientY));
      }
    };

    window.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawMolecularBonds();

      atoms.forEach(atom => {
        atom.update();
        atom.draw(ctx);
      });

      freeElectrons.forEach(electron => {
        electron.update();
        electron.draw(ctx);
      });

      // Update and draw burst electrons
      for (let i = burstElectrons.length - 1; i >= 0; i--) {
        burstElectrons[i].update();
        burstElectrons[i].draw(ctx);
        if (burstElectrons[i].isDead()) {
          burstElectrons.splice(i, 1);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('click', handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDark]);

  return (
    <div className="background-container">
      <div ref={gradientRef} className="dynamic-gradient" />
      <FluidCursor />
      <canvas ref={canvasRef} className="background-3d-canvas" />
    </div>
  );
};

export default Background3D;
