console.log('📜 [QuantumAI] script.js loading...');
/**
 * QuantumAI — Premium Script
 * Lovable-NexusAI inspired: teal network canvas, spring reveals, typewriter,
 * smooth counters, mobile menu, forms, floating CTA
 */

var API_BASE = window.BACKEND_URL || 'http://localhost:5000';


/* ─── DOM helpers are now in nav.js ────────────────────────── */

/* ─── Kickoff ──────────────────────────────────────────────── */
function kickoff() {
    console.log('🚀 [QuantumAI] Initializing components...');

    const run = (name, fn) => {
        try {
            if (typeof fn === 'function') {
                fn();
                console.log(`✅ [QuantumAI] ${name} initialized`);
            }
        } catch (e) {
            console.error(`❌ [QuantumAI] ${name} failed:`, e);
        }
    };

    // Base Components
    run('Particles', typeof initParticles === 'function' ? initParticles : null);
    run('Navbar', typeof initNavbar === 'function' ? initNavbar : null);
    run('MobileMenu', typeof initMobileMenu === 'function' ? initMobileMenu : null);
    run('SmoothScroll', typeof initSmoothScroll === 'function' ? initSmoothScroll : null);
    run('ScrollReveal', typeof initScrollReveal === 'function' ? initScrollReveal : null);
    run('Counters', typeof initCounters === 'function' ? initCounters : null);
    run('FooterYear', typeof setYear === 'function' ? setYear : null);

    // Feature Components
    run('Typewriter', typeof initTypewriter === 'function' ? initTypewriter : null);
    run('Forms', typeof initForms === 'function' ? initForms : null);
    run('FloatingCTA', typeof initFloatingCTA === 'function' ? initFloatingCTA : null);
    run('ChartBars', typeof animateChartBars === 'function' ? animateChartBars : null);
    run('TiltEffect', typeof init3DTilt === 'function' ? init3DTilt : null);

    // OmniDim New Features
    run('FAQ', typeof initFAQ === 'function' ? initFAQ : null);
    run('AnnouncementBar', typeof initAnnounce === 'function' ? initAnnounce : null);
    run('UseCasePills', typeof initUseCasePills === 'function' ? initUseCasePills : null);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', kickoff);
} else {
    kickoff();
}

/* ══════════════════════════════════════════════════════════════
   FAQ ACCORDION — OmniDim-inspired expand/collapse
═══════════════════════════════════════════════════════════════ */
function initFAQ() {
    document.querySelectorAll('.faq-q').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const wasActive = item.classList.contains('active');
            // Close all others
            document.querySelectorAll('.faq-item.active').forEach(el => el.classList.remove('active'));
            // Toggle clicked
            if (!wasActive) item.classList.add('active');
        });
    });
}

/* ══════════════════════════════════════════════════════════════
   ANNOUNCEMENT BAR — Dismiss handler with sessionStorage
═══════════════════════════════════════════════════════════════ */
function initAnnounce() {
    const bar = document.getElementById('announce-bar');
    const btn = document.getElementById('announce-close');
    if (!bar || !btn) return;

    // If already dismissed this session, hide immediately
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

/* ══════════════════════════════════════════════════════════════
   USE-CASE PILLS — Click to fill hero prompt textarea
═══════════════════════════════════════════════════════════════ */
function initUseCasePills() {
    const ta = document.querySelector('.hero-prompt-box textarea');
    if (!ta) return;
    const templates = {
        'Lead Qualification': 'I need an AI agent that qualifies incoming leads through automated conversations and routes high-intent prospects to my sales team.',
        'Voice AI Agent': 'I want an AI voice agent that makes outbound calls, books appointments, and sends follow-up emails automatically.',
        'RAG Knowledge Base': 'Build me a RAG-powered knowledge base from my company documents so employees can get instant AI answers.',
        'HR Automation': 'Automate my recruitment pipeline — screen resumes with AI, rank candidates, and schedule interviews automatically.',
        'Content Generation': 'I need ContentForge AI to generate platform-specific titles, descriptions, and hashtags from my photos/videos.',
        'Customer Support': 'Deploy an AI chatbot trained on our product docs that handles 80% of customer queries without human intervention.'
    };
    document.querySelectorAll('.use-case-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            const key = pill.textContent.trim();
            ta.value = templates[key] || key;
            ta.focus();
            // Highlight active pill
            document.querySelectorAll('.use-case-pill').forEach(p => p.style.borderColor = '');
            pill.style.borderColor = 'rgba(14, 165, 233, .5)';
        });
    });
}

/* ══════════════════════════════════════════════════════════════
   0. 3D TILT EFFECT (Leonardo.ai inspired)
   Cards tilt toward cursor on hover with perspective transform
═══════════════════════════════════════════════════════════════ */
function init3DTilt() {
    const cards = document.querySelectorAll('.tilt-card');
    if (!cards.length) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
}

/* ══════════════════════════════════════════════════════════════
   1. PARTICLE NETWORK CANVAS
   Teal / blue dots connected by thin lines — matching NexusAI
═══════════════════════════════════════════════════════════════ */
function initParticles() {
    const canvas = $('#bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, pts = [];

    // NexusAI-style: mostly teal/cyan with some purple accents
    const COLORS = [
        'rgba(14,165,233,', // sky blue
        'rgba(20,184,166,', // teal
        'rgba(34,211,238,', // cyan
        'rgba(168,85,247,', // purple (rare)
    ];
    const MAX_DIST = 150;
    const COUNT = Math.min(110, Math.floor((window.innerWidth * window.innerHeight) / 12000));

    const resize = () => {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', () => { resize(); buildPoints(); });

    class Point {
        constructor() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.vx = (Math.random() - 0.5) * 0.28;
            this.vy = (Math.random() - 0.5) * 0.28;
            this.r = Math.random() * 1.4 + 0.5;
            this.color = COLORS[Math.random() < 0.85 ? Math.floor(Math.random() * 3) : 3];
            this.alpha = Math.random() * 0.45 + 0.1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            // Wrap edges
            if (this.x < -10) this.x = W + 10;
            if (this.x > W + 10) this.x = -10;
            if (this.y < -10) this.y = H + 10;
            if (this.y > H + 10) this.y = -10;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.alpha + ')';
            ctx.fill();
        }
    }

    const buildPoints = () => {
        pts = Array.from({ length: COUNT }, () => new Point());
    };
    buildPoints();

    const drawLines = () => {
        for (let i = 0; i < pts.length; i++) {
            for (let j = i + 1; j < pts.length; j++) {
                const dx = pts[i].x - pts[j].x;
                const dy = pts[i].y - pts[j].y;
                const d2 = dx * dx + dy * dy;
                if (d2 < MAX_DIST * MAX_DIST) {
                    const dist = Math.sqrt(d2);
                    const alpha = (1 - dist / MAX_DIST) * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(pts[i].x, pts[i].y);
                    ctx.lineTo(pts[j].x, pts[j].y);
                    ctx.strokeStyle = `rgba(14,165,233,${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    };

    const loop = () => {
        ctx.clearRect(0, 0, W, H);
        pts.forEach(p => { p.update(); p.draw(); });
        drawLines();
        requestAnimationFrame(loop);
    };
    loop();
}

/* ══════════════════════════════════════════════════════════════
   2. NAVBAR
═══════════════════════════════════════════════════════════════ */
function initNavbar() {
    const nav = $('#navbar');
    if (!nav) return;
    const links = $$('.nav-link');

    const update = () => {
        nav.classList.toggle('scrolled', window.scrollY > 30);
        // Highlight active section
        const sections = $$('section[id]');
        let current = '';
        const navH = nav.offsetHeight;
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - navH - 40) current = s.id;
        });
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
}

/* ══════════════════════════════════════════════════════════════
   3. MOBILE MENU
═══════════════════════════════════════════════════════════════ */
function initMobileMenu() {
    const btn = $('#hamburger');
    const menu = $('#mobile-menu');
    if (!btn || !menu) return;

    const open = () => { btn.classList.add('open'); menu.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; };
    const close = () => { btn.classList.remove('open'); menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };
    const toggle = () => btn.classList.contains('open') ? close() : open();

    btn.addEventListener('click', toggle);
    $$('.mobile-link, .mobile-menu .btn').forEach(el => el.addEventListener('click', close));
    menu.addEventListener('click', e => { if (e.target === menu) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ══════════════════════════════════════════════════════════════
   4. SMOOTH SCROLL
═══════════════════════════════════════════════════════════════ */
function initSmoothScroll() {
    $$('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (!target) return;
            e.preventDefault();
            const navH = ($('#navbar')?.offsetHeight) || 72;
            const top = target.getBoundingClientRect().top + window.scrollY - navH;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

/* ══════════════════════════════════════════════════════════════
   5. SCROLL REVEAL (IntersectionObserver)
   Uses 'spring' out easing already defined in CSS.
═══════════════════════════════════════════════════════════════ */
function initScrollReveal() {
    const items = $$('.reveal');
    if (!items.length) return;
    const io = new IntersectionObserver(
        entries => entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
            }
        }),
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    items.forEach(el => io.observe(el));
}

/* ══════════════════════════════════════════════════════════════
   6. ANIMATED COUNTERS (IntersectionObserver triggered)
═══════════════════════════════════════════════════════════════ */
function initCounters() {
    const counters = $$('.counter[data-target]');
    if (!counters.length) return;

    const io = new IntersectionObserver(
        entries => entries.forEach(e => {
            if (e.isIntersecting) {
                runCounter(e.target);
                io.unobserve(e.target);
            }
        }),
        { threshold: 0.6 }
    );
    counters.forEach(c => io.observe(c));
}

function runCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1600; // ms
    const isFloat = String(target).includes('.');
    const start = performance.now();

    const step = now => {
        const p = Math.min((now - start) / duration, 1);
        // Ease-out cubic
        const val = target * (1 - Math.pow(1 - p, 3));
        el.textContent = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
}

/* ══════════════════════════════════════════════════════════════
   7. TYPEWRITER HERO
═══════════════════════════════════════════════════════════════ */
function initTypewriter() {
    const el = $('#typewriter-text');
    if (!el) return;

    const phrases = [
        'Intelligent AI Systems',
        'Production-Grade AI Agents',
        'RAG-Powered Knowledge Bases',
        'Multi-Agent Orchestration',
        'Workflow Automation',
    ];

    let pi = 0, ci = 0, deleting = false, paused = false;

    const tick = () => {
        if (paused) return;
        const phrase = phrases[pi];
        if (!deleting) {
            el.textContent = phrase.slice(0, ++ci);
            if (ci === phrase.length) { paused = true; setTimeout(() => { deleting = true; paused = false; tick(); }, 2200); return; }
            setTimeout(tick, 58);
        } else {
            el.textContent = phrase.slice(0, --ci);
            if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
            setTimeout(tick, 28);
        }
    };
    setTimeout(tick, 700);
}

/* ══════════════════════════════════════════════════════════════
   8. CHART BAR ANIMATION
═══════════════════════════════════════════════════════════════ */
function animateChartBars() {
    const bars = $$('.c-bar');
    if (!bars.length) return;
    setInterval(() => {
        bars.forEach((b, i) => {
            b.classList.remove('active');
            const isSaturday = i === bars.length - 2;
            b.style.height = isSaturday ? '95%' : `${Math.floor(Math.random() * 45) + 48}%`;
            if (isSaturday) b.classList.add('active');
        });
    }, 2800);
}

/* ══════════════════════════════════════════════════════════════
   9. FORMS — fetch to backend API
═══════════════════════════════════════════════════════════════ */
function initForms() {
    wireForm('demo-form', 'demo-submit', 'demo-feedback', 'demo');
    wireForm('contact-form', 'contact-submit', 'contact-feedback', 'contact');
    wireNewsletter();
}

function wireForm(formId, btnId, fbId, endpoint) {
    const form = $(`#${formId}`);
    const btn = $(`#${btnId}`);
    const fb = $(`#${fbId}`);
    if (!form) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();
        if (!validate(form, fb)) return;

        setLoading(btn, true);
        const payload = Object.fromEntries(new FormData(form));

        try {
            const res = await fetch(`${API_BASE}/api/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            const data = await res.json();
            if (data.success) { showFB(fb, data.message, 'success'); form.reset(); }
            else { showFB(fb, data.error || 'Something went wrong.', 'error'); }
        } catch {
            showFB(fb, '⚠️ Backend offline. Please email us directly at info@quantumai.in', 'error');
        } finally {
            setLoading(btn, false);
        }
    });
}

function wireNewsletter() {
    const form = $('#newsletter-form');
    const btn = $('#nl-submit');
    const fb = $('#nl-feedback');
    if (!form) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const email = $('#nl-email')?.value?.trim();
        if (!email || !validEmail(email)) { showFB(fb, 'Please enter a valid email.', 'error'); return; }

        setLoading(btn, true);
        try {
            const res = await fetch(`${API_BASE}/api/newsletter`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
            const data = await res.json();
            showFB(fb, data.message, data.success ? 'success' : 'error');
            if (data.success) form.reset();
        } catch {
            showFB(fb, 'Could not subscribe right now.', 'error');
        } finally {
            setLoading(btn, false);
        }
    });
}

/* Form helpers */
function validate(form, fb) {
    for (const f of form.querySelectorAll('[required]')) {
        if (!f.value.trim()) { showFB(fb, 'Please fill in all required fields.', 'error'); f.focus(); return false; }
        if (f.type === 'email' && !validEmail(f.value)) { showFB(fb, 'Please enter a valid email address.', 'error'); f.focus(); return false; }
    }
    return true;
}
const validEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

function showFB(el, msg, type) {
    if (!el) return;
    el.textContent = msg;
    el.className = `form-feedback ${type}`;
    el.style.opacity = '1';
    clearTimeout(el._timer);
    el._timer = setTimeout(() => { el.style.opacity = '0'; }, 7000);
}

function setLoading(btn, on) {
    if (!btn) return;
    btn.disabled = on;
    btn.classList.toggle('loading', on);
}

/* ══════════════════════════════════════════════════════════════
   10. FLOATING CTA
═══════════════════════════════════════════════════════════════ */
function initFloatingCTA() {
    const cta = $('#floating-cta');
    if (!cta) return;
    window.addEventListener('scroll', () => {
        cta.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
}

/* ══════════════════════════════════════════════════════════════
   11. YEAR
═══════════════════════════════════════════════════════════════ */
function setYear() {
    const el = $('#footer-year');
    if (el) el.textContent = new Date().getFullYear();
}
