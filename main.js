/* ─── MAIN.JS — Mounika Meduri Portfolio V2 ─── */

// ── 1. SCROLL PROGRESS BAR ─────────────────────────────────
const scrollBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const total = document.body.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / total) * 100;
  scrollBar.style.width = progress + '%';
});

// ── 2. NAVBAR SHADOW ON SCROLL ─────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 50
    ? '0 4px 24px rgba(0,0,0,0.4)'
    : 'none';
});

// ── 3. HAMBURGER MENU ──────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = ''; s.style.opacity = '';
    });
  });
});

// ── 4. THEME TOGGLE ────────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = themeToggle.querySelector('.theme-icon');

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  themeIcon.textContent = next === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', next);
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

// ── 5. TYPING EFFECT ───────────────────────────────────────
const phrases = [
  'build reliable data pipelines.',
  'engineer Databricks transformations.',
  'develop automation agents.',
  'ensure data quality at scale.',
  'love solving problems with code.',
];

let phraseIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typed');

function type() {
  if (!typedEl) return;
  const phrase = phrases[phraseIdx];
  typedEl.textContent = isDeleting
    ? phrase.substring(0, charIdx--)
    : phrase.substring(0, charIdx++);

  let delay = isDeleting ? 40 : 70;

  if (!isDeleting && charIdx === phrase.length + 1) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 400;
  }
  setTimeout(type, delay);
}

type();

// ── 6. HERO REVEAL ON LOAD ─────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
window.addEventListener('load', () => {
  reveals.forEach(el => {
    const delay = parseInt(el.getAttribute('data-delay') || 0);
    setTimeout(() => el.classList.add('visible'), delay);
  });
});

// ── 7. SCROLL REVEAL ───────────────────────────────────────
const scrollRevealEls = document.querySelectorAll('.scroll-reveal');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.getAttribute('data-delay') || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

scrollRevealEls.forEach(el => observer.observe(el));

// ── 8. COUNTER ANIMATION ───────────────────────────────────
const counters = document.querySelectorAll('.counter');

const countObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseFloat(el.getAttribute('data-target'));
      const isFloat = target % 1 !== 0;
      let current = 0;
      const step  = target / 60;

      const update = () => {
        current += step;
        if (current >= target) {
          el.textContent = isFloat ? target.toFixed(1) : Math.floor(target);
        } else {
          el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
          requestAnimationFrame(update);
        }
      };
      requestAnimationFrame(update);
      countObserver.unobserve(el);
    });
  },
  { threshold: 0.4 }
);

counters.forEach(el => countObserver.observe(el));

// ── 9. ACTIVE NAV LINK HIGHLIGHT ───────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 130) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent-2)';
    }
  });
});

// ── 10. FLOATING PARTICLE CANVAS ───────────────────────────
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const NUM_PARTICLES = 70;
const particles = [];

class Particle {
  constructor() { this.reset(true); }

  reset(random = false) {
    this.x  = Math.random() * canvas.width;
    this.y  = random ? Math.random() * canvas.height : canvas.height + 10;
    this.r  = Math.random() * 1.8 + 0.4;
    this.vy = -(Math.random() * 0.4 + 0.15);
    this.vx = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y < -10) this.reset();
  }

  draw() {
    const theme = document.documentElement.getAttribute('data-theme');
    const color = theme === 'light' ? '60,100,180' : '100,200,220';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color},${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < NUM_PARTICLES; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}

animateParticles();
