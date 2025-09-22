// src/app.js
import './style.css';
import { initPreloader } from './loader.js';
import { initOnboarding } from './onboarding.js';
import { initMain } from './main.js';

window.addEventListener('DOMContentLoaded', () => {
  const onboarding = document.getElementById('onboarding');
  const room = document.getElementById('room');

  // hide room until onboarding completes
  if (room) room.hidden = true;

  // preload decorative images (put files in public/images/)
  ['/images/moomin1_sticker.png', '/images/moomin2_sticker.png'].forEach((p) => {
    const i = new Image();
    i.src = new URL(p, import.meta.env.BASE_URL).href;
  });

  // Part 1: preloader
  initPreloader?.();

  // When loading finishes, run onboarding (Part 2)
  window.addEventListener(
    'preloader:done',
    () => {
      initOnboarding?.({ totalMs: 10000 });

      // When onboarding ends, reveal room and start Three
      window.addEventListener(
        'onboarding:done',
        () => {
          onboarding?.remove();
          if (room) room.hidden = false;

          // boot the 3D scene
          initMain({ canvasSelector: '#experience-canvas' });
        },
        { once: true }
      );
    },
    { once: true }
  );
});
