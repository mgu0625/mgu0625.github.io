(() => {
    fetch('/Attachments/bkgd.txt')
        .then(res => res.text())
        .then(text => {
        const positions = [
            { top: '65%', left: '20%' }, // Left
        ];
    
        positions.forEach(pos => {
            const asciiEl = document.createElement('div');
            asciiEl.className = 'ascii-message';
            asciiEl.style.top = pos.top;
            asciiEl.style.left = pos.left;
            asciiEl.innerHTML = `<pre>${text}</pre>`;
            document.body.appendChild(asciiEl);
        });
        })
        .catch(err => {
        console.error("ASCII Load Error:", err);
        });
    })();