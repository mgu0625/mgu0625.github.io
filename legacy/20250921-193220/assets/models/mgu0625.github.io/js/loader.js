// js/loader.js
export function initPreloader() {
  const root   = document.getElementById('preloader');
  const bootEl = document.getElementById('bootText');
  const hexes  = Array.from(document.querySelectorAll('#hexLoader .hex'));
  if (!root || !bootEl || !hexes.length) return;

  const lines = [
    'Boot sequence: ',
    '> tmux -s breedingphotons.imo',
    '> ./Initiating__tea__404.exe'
  ];

  // Longer total duration (~8.1s)
  const ELLIPSIS_MS = 800;   // 0.8s before typing
  const TYPE_MS     = 3500;  // ~3.5s for all text
  const HEX_MS      = 4000;  // ~3.3s to fill all 6 hexes
  const FADE_MS     = 250;
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 0) pre-typing dots
  bootEl.classList.add('is-ellipsis');

  // 1) typewriter
  function typeAll(){
    return new Promise(resolve=>{
      const full = lines.join('\n');
      if (prefersReduced){ bootEl.textContent = full; return resolve(); }
      const delay = Math.max(14, Math.floor(TYPE_MS / Math.max(1, full.length)));
      let i = 0; bootEl.textContent = '';
      (function tick(){
        bootEl.textContent += full[i] ?? '';
        i++;
        if (i < full.length) setTimeout(tick, delay); else resolve();
      })();
    });
  }

  // 2) hex fill
  function fillHexes(){
    return new Promise(resolve=>{
      if (prefersReduced){ hexes.forEach(h=>h.classList.add('on')); return resolve(); }
      const per = Math.max(140, Math.floor(HEX_MS / hexes.length));
      let i = 0;
      (function tick(){
        if (i >= hexes.length) return resolve();
        hexes[i].classList.add('on');
        if (i === hexes.length - 1){
          setTimeout(()=>hexes[i].classList.remove('on'), per * 0.5);
          setTimeout(()=>hexes[i].classList.add('on'),    per * 0.85);
        }
        i++; setTimeout(tick, per);
      })();
    });
  }

  // Orchestrate
  setTimeout(async ()=>{
    bootEl.classList.remove('is-ellipsis');
    await typeAll();
    await fillHexes();
    root.style.transition = `opacity ${FADE_MS}ms ease`;
    root.style.opacity = '0';
    setTimeout(()=>{
      root.remove();
      window.dispatchEvent(new CustomEvent('preloader:done'));
    }, FADE_MS);
  }, ELLIPSIS_MS);
}
