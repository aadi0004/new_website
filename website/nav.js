/**
 * QuantumAI — Shared Navigation + Footer Component
 */

// Global DOM Helpers
var $ = s => document.querySelector(s);
var $$ = s => [...document.querySelectorAll(s)];

// Auto-detect environment: use /api in production (same Vercel domain), localhost:5000 in dev
window.BACKEND_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:5000'
  : '';


const NAV_LINKS = [
  { href: 'index.html', label: 'Home', key: 'home' },
  { href: 'about.html', label: 'About', key: 'about' },
  { href: 'solutions.html', label: 'Solutions', key: 'solutions' },
  { href: 'platforms.html', label: 'Products', key: 'platforms' },
  { href: 'industries.html', label: 'Industries', key: 'industries' },
];

const FOOTER_COLS = [
  {
    heading: 'Solutions',
    links: [
      { label: 'Internal AI Assistants', href: 'solutions.html' },
      { label: 'AI Agents & Automation', href: 'solutions.html' },
      { label: 'Voice AI Calling Agent', href: 'solutions.html#voice-agent' },
      { label: 'Custom ML Engineering', href: 'solutions.html' },
    ]
  },
  {
    heading: 'Products',
    links: [
      { label: 'EduAssist AI', href: 'platforms.html' },
      { label: 'HireFlow AI', href: 'platforms.html' },
      { label: 'ClaimSense AI', href: 'platforms.html' },
      { label: 'VoiceAgent Pro', href: 'platforms.html' },
      { label: 'ContentForge AI', href: 'platforms.html' },
    ]
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: 'about.html' },
      { label: 'Industries', href: 'industries.html' },
      { label: 'Contact', href: 'contact.html' },
      { label: 'Book Demo', href: 'book-demo.html' },
    ]
  }
];

/* ── Detect active page ───────────────────────────────────── */
function getActivePage() {
  const page = document.body.dataset.page || '';
  if (page) return page;
  const file = location.pathname.split('/').pop().replace('.html', '') || 'home';
  return file === '' || file === 'index' ? 'home' : file;
}

/* ── Inject Navbar ────────────────────────────────────────── */
function injectNav() {
  const active = getActivePage();

  const navLinksHTML = NAV_LINKS.map(l => `
    <a href="${l.href}" class="nav-link${active === l.key ? ' active' : ''}">${l.label}</a>
  `).join('');

  const mobileLinksHTML = NAV_LINKS.map(l => `
    <a href="${l.href}" class="mobile-link">${l.label}</a>
  `).join('');

  const header = document.createElement('header');
  header.className = 'navbar';
  header.id = 'navbar';
  header.innerHTML = `
    <div class="container nav-inner">
      <a href="index.html" class="logo" aria-label="QuantumAI Solutions">
        <div class="logo-icon"><i class="fa-solid fa-atom"></i></div>
        <span class="logo-text">Quantum<span class="gradient-text">AI</span></span>
      </a>
      <nav class="nav-links" id="nav-links" role="navigation" aria-label="Main navigation">
        ${navLinksHTML}
      </nav>
      <div class="nav-cta">
        <a href="contact.html" class="btn btn-ghost">Contact</a>
        <a href="book-demo.html" class="btn btn-primary">Book Demo</a>
      </div>
      <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;
  document.body.prepend(header);

  // Mobile menu
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.id = 'mobile-menu';
  mobileMenu.setAttribute('role', 'dialog');
  mobileMenu.setAttribute('aria-modal', 'true');
  mobileMenu.innerHTML = `
    <nav>
      ${mobileLinksHTML}
      <a href="contact.html" class="mobile-link">Contact</a>
      <a href="book-demo.html" class="btn btn-primary mt-3">Book Demo</a>
    </nav>
  `;
  header.insertAdjacentElement('afterend', mobileMenu);
}

/* ── Inject Footer ────────────────────────────────────────── */
function injectFooter() {
  const colsHTML = FOOTER_COLS.map(col => `
    <div class="footer-col">
      <h5>${col.heading}</h5>
      ${col.links.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
    </div>
  `).join('');

  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="footer-inner container">
      <div class="footer-brand">
        <a href="index.html" class="logo">
          <div class="logo-icon"><i class="fa-solid fa-atom"></i></div>
          <span class="logo-text">Quantum<span class="gradient-text">AI</span></span>
        </a>
        <p>Production-grade AI engineering for modern enterprises. We build AI agents, RAG systems, and automation platforms that scale.</p>
        <div class="footer-socials">
          <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="#" aria-label="Twitter"><i class="fa-brands fa-twitter"></i></a>
          <a href="contact.html" aria-label="Contact"><i class="fa-solid fa-envelope"></i></a>
        </div>
      </div>
      <div class="footer-links">${colsHTML}</div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-inner">
        <p>© <span id="footer-year"></span> QuantumAI Solutions</p>
        <div class="footer-pills">
          <span>SOC 2 Ready</span><span>ISO 27001</span><span>GDPR</span>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
}

/* ── Navbar Scroll Behaviour ──────────────────────────────── */
function initNavScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ── Hamburger ────────────────────────────────────────────── */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  const open = () => { btn.classList.add('open'); menu.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { btn.classList.remove('open'); menu.classList.remove('open'); document.body.style.overflow = ''; };

  btn.addEventListener('click', () => btn.classList.contains('open') ? close() : open());
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  menu.addEventListener('click', e => { if (e.target === menu) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ── Footer Year ──────────────────────────────────────────── */
function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Smooth Scroll ────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navH = (document.getElementById('navbar')?.offsetHeight) || 72;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
    });
  });
}

/* ── Scroll Reveal ────────────────────────────────────────── */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const io = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  items.forEach(el => io.observe(el));
}

/* ── Animated Counters ────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('.counter[data-target]');
  const io = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { runCounter(e.target); io.unobserve(e.target); } }),
    { threshold: 0.6 }
  );
  counters.forEach(c => io.observe(c));
}
function runCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const isFloat = String(target).includes('.');
  const duration = 1600;
  const start = performance.now();
  const step = now => {
    const val = target * (1 - Math.pow(1 - Math.min((now - start) / duration, 1), 3));
    el.textContent = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
    if ((now - start) < duration) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}

/* ── Particle Canvas ──────────────────────────────────────── */
function initParticles() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];
  const COLORS = ['rgba(14,165,233,', 'rgba(20,184,166,', 'rgba(34,211,238,', 'rgba(168,85,247,'];
  const COUNT = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 14000));
  const MAX_DIST = 140;

  const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', () => { resize(); buildPts(); });

  class Pt {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W; this.y = Math.random() * H;
      this.vx = (Math.random() - .5) * .28; this.vy = (Math.random() - .5) * .28;
      this.r = Math.random() * 1.3 + .4;
      this.color = COLORS[Math.random() < .85 ? Math.floor(Math.random() * 3) : 3];
      this.alpha = Math.random() * .4 + .08;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < -10) this.x = W + 10; if (this.x > W + 10) this.x = -10;
      if (this.y < -10) this.y = H + 10; if (this.y > H + 10) this.y = -10;
    }
    draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = this.color + this.alpha + ')'; ctx.fill(); }
  }

  const buildPts = () => { pts = Array.from({ length: COUNT }, () => new Pt()); };
  buildPts();

  const drawLines = () => {
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d2 = dx * dx + dy * dy;
      if (d2 < MAX_DIST * MAX_DIST) {
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = `rgba(14,165,233,${(1 - Math.sqrt(d2) / MAX_DIST) * .1})`; ctx.lineWidth = .5; ctx.stroke();
      }
    }
  };

  const loop = () => { ctx.clearRect(0, 0, W, H); pts.forEach(p => { p.update(); p.draw(); }); drawLines(); requestAnimationFrame(loop); };
  loop();
}

/* ── Form Helpers ─────────────────────────────────────────── */
function showFB(el, msg, type) {
  if (!el) return;
  el.textContent = msg;
  el.className = `form-feedback ${type}`;
  el.style.opacity = '1';
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.style.opacity = '0'; }, 7000);
}
function setLoading(btn, on) {
  if (!btn) return;
  btn.disabled = on;
  btn.classList.toggle('loading', on);
}
function validEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function validate(form, fb) {
  for (const f of form.querySelectorAll('[required]')) {
    if (!f.value.trim()) { showFB(fb, 'Please fill in all required fields.', 'error'); f.focus(); return false; }
    if (f.type === 'email' && !validEmail(f.value)) { showFB(fb, 'Please enter a valid email address.', 'error'); f.focus(); return false; }
  }
  return true;
}

async function submitForm(formEl, btnEl, fbEl, endpoint) {
  if (!validate(formEl, fbEl)) return;
  setLoading(btnEl, true);
  const base = window.BACKEND_URL || '';
  try {
    const res = await fetch(`${base}/api/${endpoint}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(formEl)))
    });
    const data = await res.json();
    showFB(fbEl, data.message, data.success ? 'success' : 'error');
    if (data.success) formEl.reset();
  } catch {
    showFB(fbEl, '⚠️ Server offline. Please try again later or email info@quantumai.in', 'error');
  } finally {
    setLoading(btnEl, false);
  }
}


/* ── Inject AI Widget (OmniDim-inspired floating button) ──── */
function injectAIWidget() {
  const widget = document.createElement('a');
  widget.className = 'ai-widget';
  widget.href = 'contact.html';
  widget.innerHTML = '<i class="fa-solid fa-robot"></i> <span>Ask QuantumAI</span>';
  document.body.appendChild(widget);
}

/* ── FAQ Accordion ────────────────────────────────────────── */
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item.active').forEach(el => el.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });
}

/* ── Announcement Bar ─────────────────────────────────────── */
function initAnnounce() {
  const bar = document.getElementById('announce-bar');
  const btn = document.getElementById('announce-close');
  if (!bar || !btn) return;
  if (sessionStorage.getItem('announce-dismissed')) {
    bar.classList.add('hidden');
    document.body.classList.remove('has-announce');
    return;
  }
  btn.addEventListener('click', () => {
    bar.classList.add('hidden');
    document.body.classList.remove('has-announce');
    sessionStorage.setItem('announce-dismissed', '1');
  });
}

/* ── Boot ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();
  injectAIWidget();
  initNavScroll();
  initHamburger();
  initSmoothScroll();
  initScrollReveal();
  initCounters();
  initParticles();
  setFooterYear();
  initFAQ();
  initAnnounce();
});
