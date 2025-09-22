// src/app.js
import './style.css'; // or './css/layout.css' if that's where your CSS is
import { initPreloader } from './loader.js';
import { initOnboarding } from './onboarding.js';
import { initMain } from './main.js';

window.addEventListener('DOMContentLoaded', () => {
  const room = document.getElementById('room');
  const onboarding = document.getElementById('onboarding');

  const hasPreloader  = typeof initPreloader  === 'function';
  const hasOnboarding = typeof initOnboarding === 'function';

  const startMain = () => {
    console.info('▶️ Booting 3D scene');
    if (room) room.hidden = false;
    initMain({ canvasSelector: '#experience-canvas' });
  };

  // If no preloader/onboarding implemented yet, just start
  if (!hasPreloader && !hasOnboarding) {
    return startMain();
  }

  // Otherwise, run the sequence: preloader -> onboarding -> main
  if (room) room.hidden = true;

  console.info('⏳ Starting preloader…');
  try { hasPreloader && initPreloader(); } catch (e) { console.warn('preloader error', e); }

  window.addEventListener('preloader:done', () => {
    console.info('✅ Preloader done');
    if (hasOnboarding) {
      console.info('🎬 Starting onboarding…');
      try { initOnboarding({ totalMs: 10000 }); } catch (e) { console.warn('onboarding error', e); startMain(); }
    } else {
      startMain();
    }
  }, { once: true });

  window.addEventListener('onboarding:done', () => {
    console.info('✅ Onboarding done');
    onboarding?.remove();
    startMain();
  }, { once: true });

  // Safety net: if nothing fires, start anyway after 3s
  setTimeout(() => {
    if (room?.hidden) {
      console.warn('⚠️ No events fired; starting main as fallback');
      startMain();
    }
  }, 3000);
});
