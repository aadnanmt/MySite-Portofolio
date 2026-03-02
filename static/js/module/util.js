// frontend/module/util.js

// debounce function
export const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// copy to clipboard btn
export const initCopyButton = () => {
  const codeBlok = document.querySelectorAll('.codehilite');

  codeBlok.forEach(block => {
    // prevent double btn
    if (block.querySelector('.copy-btn')) return;

    // create btn
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.innerHTML = '<i class="far fa-copy"></i> Copy';

    block.appendChild(btn);

    // logic click
    btn.addEventListener('click', () => {
      const code = block.querySelector('pre').innerText;

      navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.innerHTML;
        
        // feedback copy
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.classList.add('copied');

        // reset 2.5s
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('copied');
        }, 2500);
      }).catch(err => {
        console.error('Copy fail: ', err);
      });
    });
  });
};