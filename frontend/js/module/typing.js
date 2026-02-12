// frontend/module/typing.js

// role typing
class typeRole {
  constructor(el, texts) {
    this.el = el;
    this.texts = texts;
    this.txtIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  // typing effect
  type() {
    const currentFullText = this.texts[this.txtIndex];

    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    this.el.textContent = currentFullText.substring(0, this.charIndex);

    let typeSpeed = this.isDeleting ? 50 : 100;

    if (!this.isDeleting && this.charIndex === currentFullText.length) {
      typeSpeed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.txtIndex = (this.txtIndex + 1) % this.texts.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// export function typing effec
export const initTyping = () => {
  const typingEL = document.getElementById("typing-text");
  if (typingEL) {

    // role | u can change this
    new typeRole(typingEL, [
      "Web Developer",
      "Prompt Designer",
      "Problem Solver",
      "Security Enthusiast",
      "Reverse Engineer",
      "Linux Enthusiast",
    ]);
  }
};