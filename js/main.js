/* ══════════════════════════════════════════════════════════════
   VALUENCORES — MAIN JS
   Scroll-reveal · Navbar state · Contact form feedback
══════════════════════════════════════════════════════════════ */

/* ── Scroll-reveal observer ── */
(function initReveal() {
  const targets = document.querySelectorAll(
    '.section-inner, .divisions-inner, .gov-wrapper, ' +
    '.network-inner, .contact-inner'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => obs.observe(el));
})();

/* ── Navbar shadow on scroll ── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

/* ── Smooth-scroll for nav anchors ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Contact form ── */
(function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const btn   = form.querySelector('.btn-send');
    const name  = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const msg   = form.querySelector('#message').value.trim();

    if (!name || !email || !msg) {
      showToast('Please fill in all fields.', 'error');
      return;
    }

    btn.textContent = 'Sending…';
    btn.disabled    = true;

    try {
      await fetch('tables/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message: msg })
      });
      showToast('Message sent. We\'ll be in touch.', 'success');
      form.reset();
    } catch {
      showToast('Network error. Please try again.', 'error');
    } finally {
      btn.textContent = 'Send';
      btn.disabled    = false;
    }
  });

  function showToast(text, type) {
    let toast = document.getElementById('vc-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'vc-toast';
      Object.assign(toast.style, {
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%) translateY(20px)',
        padding: '13px 28px',
        borderRadius: '4px',
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '500',
        opacity: '0',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        zIndex: '9999',
        letterSpacing: '0.02em',
        pointerEvents: 'none'
      });
      document.body.appendChild(toast);
    }

    toast.textContent = text;
    toast.style.background = type === 'success' ? '#222' : '#c0392b';
    toast.style.color       = '#fff';
    toast.style.border      = type === 'success' ? '1px solid #444' : '1px solid #e74c3c';

    requestAnimationFrame(() => {
      toast.style.opacity   = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity   = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 3500);
  }
})();

/* ── Stagger child reveals for division cards ── */
(function staggerCards() {
  const cards = document.querySelectorAll('.division-card');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, _) => {
      if (entry.isIntersecting) {
        const idx = [...cards].indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 120);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(c => {
    Object.assign(c.style, {
      opacity:    '0',
      transform:  'translateY(24px)',
      transition: 'opacity 0.65s ease, transform 0.65s ease'
    });
    obs.observe(c);
  });
})();

/* ── Governance org-chart — div-card stagger reveal ── */
(function initGovCards() {
  const cards = document.querySelectorAll('.div-card');
  if (!cards.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(c => obs.observe(c));
})();

/* ── Governance — gov-node fade-in ── */
(function initGovNodes() {
  const nodes = document.querySelectorAll('.gov-node');
  if (!nodes.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.getAttribute('data-aos') || '0') * 120;
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  nodes.forEach(n => {
    Object.assign(n.style, {
      opacity:    '0',
      transform:  'translateY(20px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease, background 0.3s, border-color 0.3s'
    });
    obs.observe(n);
  });
})();
