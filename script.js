const positions = [
    { top: '15%', left: '30%' },
    { top: '15%', left: '60%' },
    { top: '40%', left: '45%' }
  ];
  
  fetch('/Attachments/bkgd.txt')
    .then(res => res.text())
    .then(text => {
      positions.forEach(pos => {
        const asciiEl = document.createElement('div');
        asciiEl.className = 'ascii-message';
        asciiEl.style.top = pos.top;
        asciiEl.style.left = pos.left;
        asciiEl.innerHTML = `<pre>${text}</pre>`;
        document.body.appendChild(asciiEl);
      });
    })
    .catch(err => console.error("Failed to load ASCII art:", err));