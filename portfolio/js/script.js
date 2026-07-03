/* =========================================================
   GURU KARTHICK N S — PORTFOLIO SCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  initCursorGlow();
  initNav();
  initProgress();
  initRevealOnScroll();
  initCounters();
  initSkillBars();
  initLightbox();
});

/* ---------------- Cursor-following glow ---------------- */
function initCursorGlow(){
  const glow = document.getElementById('cursor-glow');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || window.matchMedia('(hover: none)').matches){
    glow.style.display = 'none';
    return;
  }
  let x = window.innerWidth / 2, y = window.innerHeight / 2;
  let cx = x, cy = y;

  window.addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; });

  function loop(){
    cx += (x - cx) * 0.08;
    cy += (y - cy) * 0.08;
    glow.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(loop);
  }
  loop();
}

/* ---------------- Nav ---------------- */
function initNav(){
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

/* ---------------- Scroll progress bar ---------------- */
function initProgress(){
  const fill = document.getElementById('progress-fill');
  function update(){
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (scrolled / max) * 100 : 0;
    fill.style.width = pct + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ---------------- Reveal on scroll ---------------- */
function initRevealOnScroll(){
  const items = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting){
        setTimeout(() => entry.target.classList.add('in'), (entry.target.dataset.delay || 0));
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((item, i) => {
    item.dataset.delay = (i % 4) * 60;
    obs.observe(item);
  });
}

/* ---------------- Animated counters ---------------- */
function initCounters(){
  const counters = document.querySelectorAll('.stat-num');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}

function animateCounter(el){
  const target = parseFloat(el.dataset.count);
  const isDecimal = el.dataset.decimal === 'true';
  const duration = 1400;
  const start = performance.now();

  function frame(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = isDecimal ? value.toFixed(2) : Math.round(value);
    if (progress < 1) requestAnimationFrame(frame);
    else el.textContent = isDecimal ? target.toFixed(2) : target;
  }
  requestAnimationFrame(frame);
}

/* ---------------- Skill bars ---------------- */
function initSkillBars(){
  const bars = document.querySelectorAll('.bar-fill');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.style.width = entry.target.dataset.pct + '%';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => obs.observe(b));
}

/* ---------------- Lightbox for certificates ---------------- */
function initLightbox(){
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const issuer = document.getElementById('lightbox-issuer');
  const closeBtn = document.getElementById('lightbox-close');
  const cards = document.querySelectorAll('.cert-card');

  cards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Open certificate: ' + card.dataset.title);

    function open(){
      img.src = card.dataset.img;
      img.alt = card.dataset.title;
      title.textContent = card.dataset.title;
      issuer.textContent = `${card.dataset.issuer} · ${card.dataset.date}`;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    card.addEventListener('click', open);
    card.addEventListener('keypress', (e) => { if (e.key === 'Enter') open(); });
  });

  function close(){
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}
