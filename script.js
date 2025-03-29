fetch('/Attachments/bkgd.txt')
  .then(res => res.text())
  .then(text => {
    const positions = [
      { top: '15%', left: '30%' }, 
      { top: '15%', left: '60%' }, 
      { top: '40%', left: '45%' }  
    ];

    positions.forEach(pos => {
      const asciiEl = document.createElement('div');
      asciiEl.className = 'ascii-message';
      asciiEl.style.position = 'absolute';
      asciiEl.style.top = pos.top;
      asciiEl.style.left = pos.left;
      asciiEl.innerHTML = `<pre>${text}</pre>`;
      document.body.appendChild(asciiEl);
      });
    });
