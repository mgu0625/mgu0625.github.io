import { initPreloader } from './loader.js';
import { initOnboarding } from './onboarding.js';

window.addEventListener('DOMContentLoaded', () => {
  initPreloader();

  // When loading part 1 finishes, run onboarding (part 2)
  window.addEventListener('preloader:done', () => {
    const onboarding = document.getElementById('onboarding');
    const room       = document.getElementById('room');

    // Kick off Part 2 (10s)
    initOnboarding({ totalMs: 10000 });

    // When Part 2 ends, hide it and show the homepage
    window.addEventListener('onboarding:done', () => {
      if (onboarding) onboarding.remove();
      if (room) room.hidden = false;
    }, { once: true });
  });
});
