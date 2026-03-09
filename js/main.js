/* ===================================
   THE ROOT ALTAR — Main JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initFAQAccordion();
  initParticles();
  initFilterTabs();
});

/* --- Navigation --- */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  const navLinks = document.querySelectorAll('.nav__link');

  // Scroll effect
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
    // Trigger on load
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --- Scroll Reveal (IntersectionObserver) --- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --- FAQ Accordion --- */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
        }
      });

      // Toggle current
      item.classList.toggle('open', !isOpen);
      answer.style.maxHeight = isOpen ? '0' : answer.scrollHeight + 'px';
    });
  });
}

/* --- Floating Particles (Hero) --- */
function initParticles() {
  const container = document.querySelector('.hero__particles');
  if (!container) return;

  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('hero__particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = 60 + Math.random() * 40 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = 4 + Math.random() * 4 + 's';
    particle.style.width = 2 + Math.random() * 3 + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

/* --- Filter Tabs (Shop Page) --- */
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  const products = document.querySelectorAll('.product-card[data-category]');

  if (!tabs.length || !products.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.dataset.filter;

      // Filter products
      products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
          product.style.display = '';
          product.style.opacity = '0';
          product.style.transform = 'translateY(10px)';
          setTimeout(() => {
            product.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            product.style.opacity = '1';
            product.style.transform = 'translateY(0)';
          }, 50);
        } else {
          product.style.display = 'none';
        }
      });
    });
  });
}

/* --- Smooth scroll for anchor links --- */
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;

  const target = document.querySelector(anchor.getAttribute('href'));
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
