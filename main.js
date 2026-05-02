/* =============================================
   CIVILYTICS — JavaScript principal
   ============================================= */

/* ── Configuración WhatsApp (editar aquí) ── */
const WA_NUMBER = '591XXXXXXXXX'; // [PLACEHOLDER] — reemplazar con número real: ej. 59176543210
const WA_MSG    = encodeURIComponent('Hola, me interesa conocer más sobre los servicios de Civilytics para mi proyecto.');
const WA_URL    = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

/* ── Aplicar URL de WhatsApp a todos los botones y links ── */
function initWhatsApp() {
  document.querySelectorAll('[data-wa]').forEach(el => {
    el.href = WA_URL;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });
}

/* ── Navbar: scroll effect + highlight sección activa ── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const onScroll = () => {
    // scrolled class
    navbar.classList.toggle('scrolled', window.scrollY > 30);

    // active link
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Menú hamburguesa (mobile) ── */
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const open = links.classList.contains('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.querySelector('.icon-menu').style.display = open ? 'none' : 'block';
    toggle.querySelector('.icon-close').style.display = open ? 'block' : 'none';
  });

  // Cerrar al hacer click en un link
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.querySelector('.icon-menu').style.display = 'block';
      toggle.querySelector('.icon-close').style.display = 'none';
    });
  });
}

/* ── Reveal on scroll (Intersection Observer) ── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach(el => observer.observe(el));
}

/* ── FAQ Acordeón ── */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item   = q.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Cerrar todos
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Abrir si no estaba abierto
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ── Animación de contadores numéricos ── */
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString('es-BO');
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

/* ── Smooth scroll para links internos ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 70; // altura del navbar
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ── Logo fallback (si no existe la imagen) ── */
function initLogoFallback() {
  const logos = document.querySelectorAll('.nav-logo-img, .footer-logo-img');
  logos.forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      img.nextElementSibling && (img.nextElementSibling.style.display = 'block');
    });
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initWhatsApp();
  initNavbar();
  initMobileMenu();
  initReveal();
  initFAQ();
  initCounters();
  initSmoothScroll();
  initLogoFallback();
});
