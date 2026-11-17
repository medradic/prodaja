'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const header = document.querySelector('.header');
const mobileViewport = window.matchMedia('(max-width: 800px)');

function closeMenu({ restoreFocus = false } = {}) {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Otvori meni');
  if (restoreFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Zatvori meni' : 'Otvori meni');
});

navigation.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (!mobileViewport.matches) return;
    closeMenu();
    // Fokus prelazi na odabranu sekciju, umesto da ostane u skrivenom meniju.
    const target = document.querySelector(link.hash);
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
  });
});

document.addEventListener('click', event => {
  if (!header.contains(event.target)) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu({ restoreFocus: true });
  }
});
header.addEventListener('focusout', event => {
  if (!header.contains(event.relatedTarget)) closeMenu();
});
mobileViewport.addEventListener('change', () => closeMenu());

// Tema: svetla ili tamna, pamti se u browseru ako je dostupno.
const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = () => root.dataset.theme || (prefersDark.matches ? 'dark' : 'light');

function syncTheme() {
  const isDark = currentTheme() === 'dark';
  themeButton.setAttribute('aria-label', isDark ? 'Uključi svetlu temu' : 'Uključi tamnu temu');
  const background = getComputedStyle(root).getPropertyValue('--bg').trim();
  if (root.dataset.theme) {
    document.querySelectorAll('meta[name="theme-color"]').forEach(meta => meta.setAttribute('content', background));
  }
}
themeButton.addEventListener('click', () => {
  root.dataset.theme = currentTheme() === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('tema', root.dataset.theme); } catch (e) { /* bez pamćenja */ }
  syncTheme();
});
prefersDark.addEventListener('change', syncTheme);

// Aktivna stavka menija prati sekciju na ekranu.
const navLinks = [...navigation.querySelectorAll('a')];
const sections = navLinks.map(link => document.querySelector(link.hash)).filter(Boolean);
function setActive(id) {
  navLinks.forEach(link => {
    const active = link.hash === '#' + id;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
if ('IntersectionObserver' in window) {
  const visible = new Map();
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => visible.set(entry.target.id, entry.intersectionRatio));
    const best = sections.reduce((a, b) => ((visible.get(b.id) || 0) > (visible.get(a.id) || 0) ? b : a));
    if (visible.get(best.id) > 0) setActive(best.id);
  }, { rootMargin: '-64px 0px -40% 0px', threshold: [0, .1, .25, .5, .75, 1] });
  sections.forEach(section => spy.observe(section));
}

// Kartice se blago pojavljuju pri skrolovanju.
const revealItems = document.querySelectorAll('[data-reveal]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reducedMotion) {
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const index = [...revealItems].indexOf(entry.target) % 3;
      entry.target.style.transitionDelay = index * 70 + 'ms';
      entry.target.classList.add('is-visible');
      entry.target.addEventListener('transitionend', () => { entry.target.style.transitionDelay = ''; }, { once: true });
      reveal.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  revealItems.forEach(item => reveal.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

// Kopiranje telefona i mejla.
const copyStatus = document.querySelector('#copy-status');
if (navigator.clipboard && window.isSecureContext) {
  document.querySelectorAll('.copy').forEach(button => {
    button.hidden = false;
    const label = button.querySelector('span');
    let timer;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        button.classList.add('is-done');
        label.textContent = 'Kopirano';
        copyStatus.textContent = 'Kopirano: ' + button.dataset.copy;
        clearTimeout(timer);
        timer = setTimeout(() => {
          button.classList.remove('is-done');
          label.textContent = 'Kopiraj';
          copyStatus.textContent = '';
        }, 1800);
      } catch (e) {
        label.textContent = 'Nije uspelo';
        setTimeout(() => { label.textContent = 'Kopiraj'; }, 1800);
      }
    });
  });
}

// Aktiviraj dugmad i sklopivi meni tek nakon povezivanja svih događaja.
menuButton.hidden = false;
themeButton.hidden = false;
syncTheme();
root.classList.add('js');
document.querySelector('#year').textContent = new Date().getFullYear();
