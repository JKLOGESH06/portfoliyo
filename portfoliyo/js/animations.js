/**
 * Advanced Bidirectional Scroll & Interactive Visual Animation Engine
 * Features:
 *  - 3D Magnetic Card Tilt & Dynamic Cursor Spotlight
 *  - Interactive Hero Circuit Canvas & Particle Node Network
 *  - Electric Cursor Halo & Trailing Physics
 *  - Kinetic Letter-by-Letter Wave-In Headings
 *  - Button Ripple Feedback Effects
 *  - Bidirectional Scroll Reveals
 */

class AnimationEngine {
  constructor() {
    this.initTheme();
    this.initMobileMenu();
    this.initElectricCursor();
    this.initHeroCanvas();
    this.initButtonRipples();
  }

  /* ─── Theme / Dark Mode ─────────────────────────────────────── */
  initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved === 'dark' || (!saved && prefersDark);
    document.documentElement.classList.toggle('dark', dark);
    this.updateThemeButton(dark);

    document.getElementById('themeToggle')?.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      this.updateThemeButton(isDark);
    });
  }

  updateThemeButton(isDark) {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.innerHTML = isDark ? '☀️' : '🌙';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  /* ─── Mobile Menu ───────────────────────────────────────────── */
  initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* ─── Custom Electric Cursor Follower ────────────────────────── */
  initElectricCursor() {
    const cursor = document.getElementById('electricCursor');
    if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100, mouseY = -100;
    let cursorX = -100, cursorY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const loop = () => {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    // Expand cursor on interactive elements
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, .chip, .sim-btn, .skill-panel, .timeline-card, .entry-card')) {
        cursor.classList.add('active');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, .chip, .sim-btn, .skill-panel, .timeline-card, .entry-card')) {
        cursor.classList.remove('active');
      }
    });
  }

  /* ─── Interactive Hero Circuit Canvas (Particle Network) ──────── */
  initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    window.addEventListener('resize', () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    });

    const numNodes = 42;
    const nodes = [];
    const mouse = { x: null, y: null, radius: 140 };

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1.5,
        pulse: Math.random() * Math.PI,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      const lineColor = isDark ? 'rgba(224, 141, 69, ' : 'rgba(200, 117, 47, ';
      const nodeColor = isDark ? '#E08D45' : '#C8752F';

      // Update & Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        n.pulse += 0.03;
        const currentRadius = n.radius + Math.sin(n.pulse) * 0.8;

        // Mouse gravity interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - dist) / mouse.radius;
            n.x -= Math.cos(angle) * force * 1.5;
            n.y -= Math.sin(angle) * force * 1.5;
          }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(1, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.shadowColor = nodeColor;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect Nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.35;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = lineColor + alpha + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
  }

  /* ─── 3D Magnetic Card Tilt & Spotlight ─────────────────────── */
  init3DTiltCards() {
    const cards = document.querySelectorAll(
      '.skill-panel, .timeline-card, .learning-card, .soft-card, .entry-card, .career-card, .featured-card, .proj-card'
    );

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg tilt
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  /* ─── Kinetic Letter-by-Letter Wave-In Headings ───────────── */
  initKineticHeadings() {
    const titles = document.querySelectorAll('.section-title');
    titles.forEach((title) => {
      if (title.dataset.splitDone) return;
      const text = title.textContent.trim();
      title.innerHTML = '';
      title.dataset.splitDone = 'true';

      [...text].forEach((char, idx) => {
        const span = document.createElement('span');
        span.className = 'char-span';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.transitionDelay = `${idx * 0.028}s`;
        title.appendChild(span);
      });
    });
  }

  /* ─── Button Click Copper Ripple Effect ────────────────────── */
  initButtonRipples() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn');
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('btn-ripple');

      const existingRipple = btn.getElementsByClassName('btn-ripple')[0];
      if (existingRipple) existingRipple.remove();

      btn.appendChild(circle);
    });
  }

  /* ─── Scroll Reveal (bidirectional) ────────────────────────── */
  initScrollReveals() {
    this._observeRevealElements();
    this._initScrollSpy();
    this.initKineticHeadings();
    this.init3DTiltCards();
  }

  _observeRevealElements() {
    const THRESHOLD = 0.12;
    const ROOT_MARGIN = '0px 0px -48px 0px';

    const allRevealables = [
      ...Array.from(document.querySelectorAll('.reveal')).map(el => ({ el })),
      ...Array.from(document.querySelectorAll('.reveal-left')).map(el => ({ el })),
      ...Array.from(document.querySelectorAll('.reveal-right')).map(el => ({ el })),
      ...Array.from(document.querySelectorAll('.reveal-zoom')).map(el => ({ el })),
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add('revealed');
        } else {
          if (target.dataset.hasRevealed) {
            target.classList.remove('revealed');
          }
        }
        if (isIntersecting) target.dataset.hasRevealed = '1';
      });
    }, { threshold: THRESHOLD, rootMargin: ROOT_MARGIN });

    allRevealables.forEach(({ el }) => observer.observe(el));
  }

  _initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(sec => spy.observe(sec));
  }
}

window.AnimationEngine = AnimationEngine;
