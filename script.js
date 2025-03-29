fetch('/Attachments/bkgd.txt')
  .then(res => res.text())
  .then(text => {
    const positions = [
      { top: '15%', left: '30%' }, // Left ear
      { top: '15%', left: '60%' }, // Right ear
      { top: '40%', left: '45%' }  // Head/center
    ];

    positions.forEach(pos => {
      const asciiEl = document.createElement('div');
      asciiEl.className = 'ascii-message';
      asciiEl.style.top = pos.top;
      asciiEl.style.left = pos.left;
      asciiEl.innerHTML = `<pre>${text}</pre>`;
      document.body.appendChild(asciiEl);
    });
  });
