// for preloader + onboarding
// 5-second loader: 0.5s ellipsis → typewriter → hex fill → finish

export function initPreloader() {
  const root   = document.getElementById('preloader');
  const bootEl = document.getElementById('bootText');
  const hexes  = Array.from(document.querySelectorAll('#hexLoader .hex'));
  const sticker= document.getElementById('sticker');
  if (!root || !bootEl || !hexes.length || !sticker) return;

  // Lines to type (you can edit these anytime)
  const lines = [
    'Boot sequence: ',
    'alchemy_kernel.sys',
    '> Mounting breedingphotons.imo',
    '> ./Initiating__tea__protocol__404.exe'
  ];

  // Timings
  const TOTAL_MS = 5000;
  const ELLIPSIS_MS = 500;       // the initial “...” pause you wanted
  const TYPE_MS  = 2200;         // how long to type all lines
  const HEX_MS   = 2200;         // how long to fill 6 hexes
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- 1) Ellipsis cue (CSS adds dots animation) ---
  bootEl.classList.add('is-ellipsis');

  // --- 2) Sticker flip: toggle between two PNGs ---
  const stickerA = 'assets/images/moomin1_sticker.png';
  const stickerB = 'assets/images/moomin2_sticker.png';
  let flipToB = true;
  let flipTimer = null;
  function startStickerFlip(){
    if (prefersReduced) { sticker.src = stickerA; return; }
    sticker.src = stickerA;
    flipTimer = setInterval(()=>{
      sticker.src = flipToB ? stickerB : stickerA;
      flipToB = !flipToB;
    }, 700); // gentle flip cadence
  }
  function stopStickerFlip(){ if (flipTimer) clearInterval(flipTimer); }

  // --- 3) Typewriter ---
  function typeAll() {
    return new Promise(resolve=>{
      const full = lines.join('\n');
      if (prefersReduced) { bootEl.textContent = full; return resolve(); }
      const delay = Math.max(12, Math.floor(TYPE_MS / Math.max(1, full.length)));
      let i = 0;
      bootEl.textContent = '';
      (function tick(){
        bootEl.textContent += full[i] ?? '';
        i++;
        if (i < full.length) setTimeout(tick, delay);
        else resolve();
      })();
    });
  }

  // --- 4) Hex fill sequence (colors are in CSS via nth-child) ---
  function fillHexes() {
    return new Promise(resolve=>{
      if (prefersReduced) { hexes.forEach(h=>h.classList.add('on')); return resolve(); }
      const per = Math.max(100, Math.floor(HEX_MS / hexes.length));
      let i = 0;
      (function tick(){
        if (i >= hexes.length) return resolve();
        hexes[i].classList.add('on');
        // blink the last one a bit
        if (i === hexes.length - 1){
          setTimeout(()=>hexes[i].classList.remove('on'), per * 0.5);
          setTimeout(()=>hexes[i].classList.add('on'),    per * 0.85);
        }
        i++; setTimeout(tick, per);
      })();
    });
  }

  // Orchestrate
  startStickerFlip();
  setTimeout(async () => {
    // Remove ellipsis, then type, then hexes, then finish
    bootEl.classList.remove('is-ellipsis');
    await typeAll();
    await fillHexes();

    // Fade out and signal done
    root.style.transition = 'opacity 240ms ease';
    root.style.opacity = '0';
    stopStickerFlip();
    setTimeout(()=>{
      root.remove();
      window.dispatchEvent(new CustomEvent('preloader:done'));
    }, 240);
  }, ELLIPSIS_MS);
}
