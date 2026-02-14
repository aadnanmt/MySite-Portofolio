// frontend/module/ui.js

// export components
export const initComponents = () => {

  // footer date
  const yearElement = document.getElementById("current-year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  // back to top
  const toTopButton = document.querySelector('.top');
  if (toTopButton) {
    window.addEventListener('scroll', function () {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = window.scrollY;

      const triggerPoint = (scrollHeight - clientHeight) * 0.88;

      if (scrollTop > triggerPoint) {
        toTopButton.classList.add('show');
      } else {
        toTopButton.classList.remove('show');
      }
    });
  }
};