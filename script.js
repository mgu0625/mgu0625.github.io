const NUM_ASCII_COPIES = 7;

fetch('/Attachments/bkgd.txt')
  .then(res => res.text())
  .then(text => {
    const positions = [
        { top: '15%', left: '30%' }, // Left ear
        { top: '15%', left: '60%' }, // Right ear
        { top: '40%', left: '45%' }  // Head/center
];