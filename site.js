'use strict';
// Navigation is fully visible when JavaScript is unavailable.
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
if (header && toggle && nav) {
  toggle.hidden = false;
  header.classList.add('nav-ready');
  const setOpen = open => {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('span').textContent = open ? '×' : '+';
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  matchMedia('(min-width: 761px)').addEventListener('change', () => setOpen(false));
}
// Content stays visible in HTML. Motion only adds a short visual cue.
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const running = new Set();
let pageVisible = !document.hidden;
const animateOnce = (element, frames, options) => {
  if (!element || motion.matches || !pageVisible || !element.animate) return;
  const animation = element.animate(frames, options);
  running.add(animation);
  animation.addEventListener('finish', () => running.delete(animation), { once: true });
  animation.addEventListener('cancel', () => running.delete(animation), { once: true });
};
const stopMotion = () => {
  running.forEach(animation => animation.cancel());
  running.clear();
};
motion.addEventListener('change', () => { if (motion.matches) stopMotion(); });
document.addEventListener('visibilitychange', () => {
  pageVisible = !document.hidden;
  if (!pageVisible) stopMotion();
});
const hero = document.querySelector('.hero-copy');
if (hero) {
  [hero.querySelector('.eyebrow'), hero.querySelector('h1'), hero.querySelector('.hero-lede'),
    hero.querySelector('.hero-actions .text-link')].forEach((piece, index) => animateOnce(piece,
      [{ opacity: .78, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 360, delay: index * 65, easing: 'cubic-bezier(.2,.7,.3,1)' }));
}
if (!motion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateOnce(entry.target,
          [{ opacity: .82, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 480, easing: 'cubic-bezier(.2,.7,.3,1)' });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.reveal, .section-heading, .steps li, .journey-card, .plan, .privacy-grid, .final-cta .wrap, .site-footer .footer-top, .document-hero, .document-body section').forEach(card => observer.observe(card));
  motion.addEventListener('change', () => {
    if (motion.matches) {
      observer.disconnect();
      stopMotion();
    }
  });
  document.addEventListener('visibilitychange', () => { if (!pageVisible) observer.disconnect(); });
}
const gallery = document.querySelector('.screen-gallery');
const controls = document.querySelector('.gallery-controls');
if (gallery && controls) {
  controls.hidden = false;
  const cards = [...gallery.querySelectorAll('figure')];
  const previous = controls.querySelector('.gallery-prev');
  const next = controls.querySelector('.gallery-next');
  const count = controls.querySelector('.gallery-count');
  let index = 0;
  const update = () => {
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    index = Math.max(0, Math.min(cards.length - 1, Math.round(gallery.scrollLeft / step)));
    previous.disabled = index === 0;
    next.disabled = index === cards.length - 1;
    count.textContent = `${index + 1} of ${cards.length}`;
  };
  const move = direction => {
    const target = Math.max(0, Math.min(cards.length - 1, index + direction));
    gallery.scrollTo({ left: cards[target].offsetLeft - cards[0].offsetLeft, behavior: motion.matches ? 'instant' : 'smooth' });
  };
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  gallery.addEventListener('scroll', update, { passive: true });
  gallery.addEventListener('keydown', event => {
    if (event.target === gallery && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  addEventListener('resize', update, { passive: true });
}

document.querySelectorAll('.faq-list details').forEach(details => {
  details.addEventListener('toggle', () => {
    if (details.open) animateOnce(details.querySelector('p'),
      [{ opacity: .72, transform: 'translateY(-4px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 200, easing: 'ease-out' });
  });
});

const displayedAddress = document.querySelector('#support-email-address');
const copyEmail = document.querySelector('#copy-support-email');
const copyStatus = document.querySelector('#support-copy-status');
if (displayedAddress && copyEmail && copyStatus) {
  copyEmail.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(displayedAddress.textContent);
      copyStatus.textContent = 'Email address copied.';
      copyEmail.textContent = 'Copied';
      animateOnce(copyEmail, [{ transform: 'scale(.97)' }, { transform: 'scale(1)' }],
        { duration: 180, easing: 'ease-out' });
    } catch {
      copyStatus.textContent = 'Could not copy automatically. Select the address shown above to copy it.';
    }
  });
}

const guideLinks = [...document.querySelectorAll('.document-layout aside a[href^="#"]')];
if (guideLinks.length && 'IntersectionObserver' in window) {
  const byId = new Map(guideLinks.map(link => [link.hash.slice(1), link]));
  const guideObserver = new IntersectionObserver(entries => {
    const current = entries.find(entry => entry.isIntersecting);
    if (!current) return;
    guideLinks.forEach(link => link.removeAttribute('aria-current'));
    byId.get(current.target.id)?.setAttribute('aria-current', 'location');
  }, { rootMargin: '-18% 0px -72% 0px' });
  document.querySelectorAll('.document-body section[id]').forEach(section => guideObserver.observe(section));
}
