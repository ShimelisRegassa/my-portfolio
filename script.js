/* =====================
   SMOOTH SCROLL
======================== */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* =====================
   FORM SUBMISSION HANDLING
======================== */


/* =====================
   TYPING ANIMATION
======================== */
const phrases = [
  "Frontend Developer.",
  "Competitive Programmer."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const el = document.getElementById('typed');
  if (!el) return;

  const currentWord = phrases[phraseIndex];

  if (!isDeleting) {
    el.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1600);
      return;
    }
  } else {
    el.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(type, isDeleting ? 55 : 90);
}

/* =====================
   SCROLL REVEAL ANIMATION
======================== */
function revealOnScroll() {
  const cards = document.querySelectorAll(
    '.skill-card, .cp-card, .project-card, .tcard, .contact-card, .stat, .contact-form-wrapper'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  cards.forEach(card => {
    card.classList.add('hidden');
    observer.observe(card);
  });
}

/* =====================
   ACTIVE NAV HIGHLIGHT
======================== */
function activeNavOnScroll() {
  const sectionIds = ['about', 'skills', 'projects', 'testimonials', 'contact'];
  const navLinks = document.querySelectorAll('.nav-links a');
  const tabLinks = document.querySelectorAll('.mobile-tab-bar a');

  window.addEventListener('scroll', () => {
    let current = '';
    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        const top = section.getBoundingClientRect().top;
        if (top <= 140) current = id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(current)) {
        link.classList.add('active');
      }
    });

    tabLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  });
}

/* =====================
   SKILL BAR ANIMATION
======================== */
function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.transition = 'width 0.8s ease';
          bar.style.width = width;
        }, 100);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });

  bars.forEach(bar => observer.observe(bar));
}

/* =====================
   INJECT SCROLL REVEAL CSS
======================== */
function injectRevealStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .hidden {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
}

/* =====================
   INIT
======================== */
document.addEventListener('DOMContentLoaded', () => {
  type();
  injectRevealStyles();
  revealOnScroll();
  activeNavOnScroll();
  animateSkillBars();
});  