// ── MOBILE MENU TOGGLE ──────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const mobileNav  = document.getElementById('mobileNav');

menuToggle?.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    // Animate hamburger to X
    menuToggle.classList.toggle('active');
});

// Close mobile nav when a link is clicked
mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('active');
    });
});

// ── SMOOTH SCROLL WITH OFFSET ───────────────────────────────────
// CSS scroll-margin-top handles the offset for anchor clicks,
// but this JS reinforces it for any programmatic scrolling.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;

        // Close mobile nav if open
        mobileNav?.classList.remove('open');
        menuToggle?.classList.remove('active');

        // CSS scroll-margin-top already handles the offset visually,
        // but we prevent the default jump so smooth scrolling kicks in.
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ── ACTIVE NAV LINK HIGHLIGHT ───────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav a[href^="#"], .mobile-nav a[href^="#"]');
const navH = () => parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === `#${entry.target.id}`
                );
            });
        }
    });
}, {
    rootMargin: `-${navH() + 10}px 0px -60% 0px`,
    threshold: 0
});

sections.forEach(s => observer.observe(s));

// ── HEADER SCROLL SHADOW ────────────────────────────────────────
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
        ? '0 4px 24px rgba(100,60,100,.12)'
        : '0 2px 20px rgba(100,60,100,.06)';
}, { passive: true });

// ── SECTION ENTRANCE ANIMATION ──────────────────────────────────
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('section').forEach(s => {
    s.style.animationPlayState = 'paused';
    sectionObserver.observe(s);
});

console.log('Portfolio loaded ✨');