const html        = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
});

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  highlightActiveNav();
});

const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

function highlightActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 120;

  sections.forEach(section => {
    const sectionTop    = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId     = section.getAttribute('id');
    const navLink       = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        navLink.classList.add('active');
      }
    }
  });
}

const typedEl = document.getElementById('typedText');
const phrases = [
  'CS Engineering Student',
  'Java Developer',
  'AI / ML Enthusiast',
  'Full-Stack Explorer',
  'Problem Solver ',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingSpeed = 80;

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 45;
  } else {
    typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 80;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    // Pause at full word
    typingSpeed = 1800;
    isDeleting  = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting  = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 400;
  }

  setTimeout(typeLoop, typingSpeed);
}

setTimeout(typeLoop, 800);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement
          ? [...entry.target.parentElement.children].filter(c => c.classList.contains('reveal'))
          : [];
        const idx = siblings.indexOf(entry.target);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);

        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70; // navbar height
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

document.querySelectorAll('.project-card, .cert-card, .achieve-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -4;
    const rotateY = ((x - cx) / cx) *  4;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 120);
  });
});

document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      width:60px; height:60px;
      background:rgba(255,255,255,0.3);
      transform:translate(-50%,-50%) scale(0);
      animation: ripple-anim .5s linear;
      left:${e.offsetX}px; top:${e.offsetY}px;
      pointer-events:none;
    `;
    pill.style.position = 'relative';
    pill.style.overflow = 'hidden';
    pill.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple-anim {
    to { transform: translate(-50%,-50%) scale(3); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

const backToTop = document.createElement('button');
backToTop.innerHTML = `<i class='bx bx-chevron-up'></i>`;
backToTop.setAttribute('aria-label', 'Back to top');
backToTop.style.cssText = `
  position: fixed;
  bottom: 2rem; right: 2rem;
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--clr-accent);
  color: var(--clr-primary);
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(94,163,163,.45);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity .3s, transform .3s;
  z-index: 990;
`;
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.style.opacity  = '1';
    backToTop.style.transform = 'translateY(0)';
  } else {
    backToTop.style.opacity  = '0';
    backToTop.style.transform = 'translateY(10px)';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const footerCopy = document.querySelector('.footer-copy');
if (footerCopy) {
  footerCopy.innerHTML = footerCopy.innerHTML.replace(
    '2024',
    new Date().getFullYear()
  );
}

const eduObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = document.querySelectorAll('.edu-card');
      cards.forEach((c, i) => {
        setTimeout(() => {
          c.querySelector('.edu-dot').style.background      = 'var(--clr-accent)';
          c.querySelector('.edu-dot').style.borderColor     = 'var(--clr-accent)';
          c.querySelector('.edu-dot').style.boxShadow       = '0 0 0 4px rgba(94,163,163,.2)';
        }, i * 200);
      });
      eduObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const eduSection = document.querySelector('.education-timeline');
if (eduSection) eduObserver.observe(eduSection);

console.log('%c HK Portfolio Loaded ✅ ', 'background:#5ea3a3;color:#0f1f2b;font-weight:bold;font-size:14px;padding:4px 10px;border-radius:4px;');
