(() => {
    fetch('/Attachments/bkgd.txt')
      .then(res => res.text())
      .then(text => {
        const asciiEl = document.createElement('div');
        asciiEl.className = 'ascii-message';
        asciiEl.style.bottom = '5%';
        asciiEl.style.left = '5%';
        asciiEl.innerHTML = `<pre>${text}</pre>`;
        document.body.appendChild(asciiEl);
      })
      .catch(err => {
        console.error("ASCII Load Error:", err);
      });
  })();
  