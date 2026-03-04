// frontend/js/main.js

// import module
import { initNavigation } from './module/navigation.js';
import { LanguageManager } from './module/language.js';
import { initTyping } from './module/typing.js';
import { initComponents } from './module/ui.js';
import { initCopyButton } from './module/util.js';

document.addEventListener("DOMContentLoaded", () => {
  console.log("JS okeyyy...");

  // execute module
  initNavigation();
  LanguageManager.init();
  initTyping();
  initComponents();
  initCopyButton();
});