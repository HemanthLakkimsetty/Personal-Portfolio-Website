// Enhanced 3D Portfolio JavaScript

// DOM Elements
let nav = document.querySelector(".nav-3d");
let scrollBtn = document.querySelector(".scroll-button a");
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");

// Typing Animation
const typingText = document.querySelector('.typing');
const cursor = document.querySelector('.cursor');
const words = ['beautiful websites', 'amazing applications', 'innovative solutions', 'digital experiences'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => {
      isDeleting = true;
    }, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  const speed = isDeleting ? 100 : 150;
  setTimeout(typeWriter, speed);
}

// Start typing animation
setTimeout(typeWriter, 1000);

// Show/hide sticky navigation and scroll button based on scroll position
window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("sticky");
    scrollBtn.style.display = "flex";
  } else {
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
  }
};

// Side Navigation Menu
// Open side navigation
menuBtn.onclick = function () {
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  scrollBtn.style.pointerEvents = "none";
};

// Close side navigation
cancelBtn.onclick = function () {
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  scrollBtn.style.pointerEvents = "auto";
};

// Close side navigation when a menu link is clicked
let navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
    body.style.overflow = "auto";
    scrollBtn.style.pointerEvents = "auto";
  });
});

// 3D Mouse Movement Effect
document.addEventListener('mousemove', (e) => {
  const shapes = document.querySelectorAll('.shape');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.5;
    const xOffset = (x - 0.5) * speed * 50;
    const yOffset = (y - 0.5) * speed * 50;
    
    shape.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${x * 360}deg)`;
  });
});

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.skill-card, .project-card, .education-card, .contact-item');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Skill Progress Animation
function animateSkillProgress() {
  const progressBars = document.querySelectorAll('.progress');
  
  progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
}

// Trigger skill animation when skills section is visible
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkillProgress();
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Parallax Effect for Background Shapes
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll('.shape');
  
  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.5;
    const yPos = -(scrolled * speed);
    shape.style.transform = `translateY(${yPos}px)`;
  });
});

// 3D Card Tilt Effect
document.querySelectorAll('.skill-card, .project-card, .education-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Counter Animation for Stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseFloat(counter.textContent);
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = current.toFixed(2);
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      aboutObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (aboutSection) {
  aboutObserver.observe(aboutSection);
}

// Form Submission Handler
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
    const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
    const message = formData.get('message') || contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Certificate Link Handler
document.querySelectorAll('.certificate-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Simulate certificate opening
    const skillCard = link.closest('.skill-card');
    skillCard.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
      skillCard.style.transform = 'scale(1)';
      // In a real implementation, you would open the certificate here
      alert('Certificate would open in a new tab');
    }, 300);
  });
});

// Project Link Handler
document.querySelectorAll('.project-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    const projectCard = link.closest('.project-card');
    projectCard.style.transform = 'scale(1.02)';
    
    setTimeout(() => {
      projectCard.style.transform = 'scale(1)';
      // In a real implementation, you would navigate to the project
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        window.open(href, '_blank');
      }
    }, 300);
  });
});

// Loading Animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Performance Optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Apply throttling to scroll events
window.onscroll = throttle(window.onscroll, 16); // ~60fps

// Add some fun interactive elements
document.addEventListener('DOMContentLoaded', () => {
  // Add click sound effect to buttons
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      // Create a subtle ripple effect
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.3)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.left = '50%';
      ripple.style.top = '50%';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.marginLeft = '-10px';
      ripple.style.marginTop = '-10px';
      
      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Dark Mode Toggle Functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const documentBody = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
documentBody.setAttribute('data-theme', currentTheme);

// Update toggle button icon based on current theme
function updateToggleIcon() {
  const icon = darkModeToggle.querySelector('i');
  if (documentBody.getAttribute('data-theme') === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// Initialize toggle icon
updateToggleIcon();

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
  const currentTheme = documentBody.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  documentBody.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateToggleIcon();
  
  // Add smooth transition effect
  documentBody.style.transition = 'all 0.3s ease';
});

// Add smooth transitions for theme switching
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('*');
  elements.forEach(element => {
    element.style.transition = 'all 0.3s ease';
  });
});

// Profile Image Animation
document.addEventListener('DOMContentLoaded', () => {
  const profileImage = document.querySelector('.profile-image');
  if (profileImage) {
    profileImage.style.opacity = '0';
    profileImage.style.transform = 'scale(0.8) translateY(20px)';
    
    setTimeout(() => {
      profileImage.style.transition = 'all 0.8s ease';
      profileImage.style.opacity = '1';
      profileImage.style.transform = 'scale(1) translateY(0)';
    }, 500);
  }
});
