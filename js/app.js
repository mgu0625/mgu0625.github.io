// for state machine and router-ish navigation for homepage

import { initPreloader } from './loader.js';

// Start loader as soon as the module loads
initPreloader();

// When the loader ends, reveal your onboarding (or go straight home)
window.addEventListener('preloader:done', () => {
  // Example: show #onboarding if you have it
  const onboarding = document.getElementById('onboarding');
  const room       = document.getElementById('room'); // homepage shell
  if (onboarding) {
    onboarding.hidden = false;
    // if you want onboarding to auto-advance after ~5s, do it here
    setTimeout(() => {
      onboarding.remove();
      if (room) room.hidden = false;
    }, 5000);
  } else {
    // no onboarding yet? just show homepage
    if (room) room.hidden = false;
  }
});
