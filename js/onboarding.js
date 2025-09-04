// js/onboarding.js
export function initOnboarding({
  totalMs = 10000,       // total time this scene lives (10s)
  ellipsisMs = 800,      // pre-typing “...”
  typeMs = 3800          // how long to type the whole line
} = {}) {
  const root   = document.getElementById('onboarding');
  const typed  = document.getElementById('ob-typed');
  if (!root || !typed) return;

  // The line we’ll type (spelling fixed to "Beautiful")
  const line = "> Moomin says Let's Go Create Something Strange and Beautiful!";

  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) show the onboarding screen
  root.hidden = false;

  // 2) ellipsis pre-cue
  typed.classList.add('is-ellipsis');

  // 3) start typing after the ellipsis pause
  setTimeout(() => {
    typed.classList.remove('is-ellipsis');

    if (prefersReduced) {
      typed.textContent = line;
    } else {
      const delay = Math.max(12, Math.floor(typeMs / Math.max(1, line.length)));
      let i = 0;
      typed.textContent = '';
      (function tick(){
        typed.textContent += line[i] ?? '';
        i++;
        if (i < line.length) setTimeout(tick, delay);
      })();
    }
  }, ellipsisMs);

  // 4) end the scene exactly at totalMs
  setTimeout(() => {
    // Let app.js decide what to show next
    window.dispatchEvent(new CustomEvent('onboarding:done'));
  }, totalMs);
}
