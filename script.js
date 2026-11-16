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

// Aktiviraj sklopivi meni tek nakon povezivanja svih događaja.
menuButton.hidden = false;
document.documentElement.classList.add('js');
document.querySelector('#year').textContent = new Date().getFullYear();
