// frontend/js/main.js

// import module
import { initPreloader } from './module/preloader.js';
import { initNavigation } from './module/navigation.js';
import { LanguageManager } from './module/language.js';
import { initTyping } from './module/typing.js';
import { initComponents } from './module/ui.js';
import { initCopyButton } from './module/util.js'; 
import { initParticle } from './module/particle.js';

// import scss
// Pah: frontend/js/main.js => frontend/scss/main.scss
import '../scss/main.scss'; 

document.addEventListener("DOMContentLoaded", () => {
  console.log("JS okeyyy...");

  // execute module
  initPreloader();
  initNavigation();
  LanguageManager.init();
  initTyping();
  initComponents();
  initCopyButton();
  initParticle();
});