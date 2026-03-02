// frontend/module/language.js

// exprot language manager 
export const LanguageManager = {
  data: null, // stor for languange data
  langBtn: document.getElementById("lang-btn"),
  currentLang: localStorage.getItem("site-lang") || "en",

  // async init function
  async init() {
    try {
      const response = await fetch("/static/lang/language.json?v=" + new Date().getTime()); // path to language.json file
      this.data = await response.json();
      this.applyLanguage(this.currentLang);

      // console log language
    } catch (error) {
      console.error("Fail load language data", error);
    }

    // aad event listener to langBtn
    if (this.langBtn) {
      this.langBtn.addEventListener("click", () => this.toggleLanguage());
    }
  },

  // toggle language function
  toggleLanguage() {
    this.currentLang = this.currentLang === "id" ? "en" : "id";
    localStorage.setItem("site-lang", this.currentLang);
    this.applyLanguage(this.currentLang);
  },

  // apply language function
  applyLanguage(lang) {
    if (!this.data) return;

    if (this.langBtn) this.langBtn.textContent = lang.toUpperCase();

    // update element/icon
    const translations = this.data[lang];
    document.querySelectorAll("[data-lang]").forEach((el) => {
      const key = el.getAttribute("data-lang");
      if (translations[key]) {
        const icon = el.querySelector("i");
        if (icon) {
          const iconClone = icon.cloneNode(true);
          el.innerHTML = "";
          el.appendChild(iconClone);
          el.append(" " + translations[key]);
        } else {
          el.innerHTML = translations[key];
        }
      }
    });

    // for form
    const inputs = {
      name: document.querySelector('input[name="name"]'),
      email: document.querySelector('input[name="email"]'),
      msg: document.querySelector('textarea[name="message"]')
    };

    const placeholderChange = lang === "en" ? "_" : "|";
    Object.values(inputs).forEach(input => {
      if (input) input.placeholder = placeholderChange;
    });
  }
};