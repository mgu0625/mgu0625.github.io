// js/app.js
// for state machine and router-ish navigation for homepage
import { initPreloader } from './loader.js';

window.addEventListener('DOMContentLoaded', () => {
  // 1) run the loader after DOM is ready
  initPreloader();

  // 2) when loader finishes, show onboarding (then auto-advance to home)
  window.addEventListener('preloader:done', () => {
    const onboarding = document.getElementById('onboarding');
    const room       = document.getElementById('room');

    if (onboarding) {
      onboarding.hidden = false;

      // auto-advance after ~8s
      setTimeout(() => {
        onboarding.remove();
        if (room) room.hidden = false;
      }, 8800);
    } else if (room) {
      room.hidden = false;
    }
  });
});
