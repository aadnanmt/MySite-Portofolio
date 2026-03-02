// frontend/module/particle.js
import { debounce } from './util.js';

// export particle bg
export class particleSys {
  constructor() {
    this.canvas = document.getElementById("particle-canvas");
    this.btn = document.getElementById("canvas-btn");
    
    // feature new
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.animationId = null;

    // refactor | use variabel
    const mobileBP = 768; 
    const forMobile = window.innerWidth < mobileBP;

    // config based on device
    this.config = {
      color: forMobile ? "rgba(0, 240, 255, 1.0)" : "rgba(0, 240, 255, 0.8)",
      lineColor: forMobile ? "rgba(0, 240, 255, 0.4)" : "rgba(0, 240, 255, 0.15)",
      count: forMobile ? 30 : 60,
      range: forMobile ? 100 : 190,
      speed: 0.5
    };

    // cache|load state from localStorage
    this.isRunning = localStorage.getItem("canvas-state") !== "false";
    this.init();
  }

  init() {
    // disable for blog pge
    if (window.location.pathname.startsWith('/blog')) {
      if (this.canvas) this.canvas.style.display = 'none';
      if (this.btn) this.btn.style.display = 'none';
      return;
    }

    this.resize();
    this.createParticle();
    this.updateButtonUI();

    // hide canvas
    if (this.isRunning) {
      this.canvas.classList.remove("canvas-hidden");
      this.loop();
    } else {
      this.canvas.classList.add("canvas-hidden");
    }

    // feature new | debounce 
    window.addEventListener("resize", debounce(() => {
      this.resize();
      this.createParticle();
    }, 150));

    // button listener
    if (this.btn) {
      this.btn.addEventListener("click", () => this.toggle());
    }
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createParticle() {
    this.particles = [];
    for (let i = 0; i < this.config.count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * this.config.speed,
        vy: (Math.random() - 0.5) * this.config.speed
      });
    }
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];

      // bounce logic
      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;
      p.x += p.vx;
      p.y += p.vy;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      this.ctx.fillStyle = this.config.color;
      this.ctx.fill();

      // loop optimize
      for (let j = i + 1; j < this.particles.length; j++) {
        let p2 = this.particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.config.range) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = this.config.lineColor;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
  }

  // looping particle
  loop() {
    if (!this.isRunning) return;
    this.update();
    this.animationId = requestAnimationFrame(() => this.loop());
  }

  // toggle particle | on of
  toggle() {
    this.isRunning = !this.isRunning;
    localStorage.setItem("canvas-state", this.isRunning);
    this.updateButtonUI();

    if (this.isRunning) {
      this.canvas.classList.remove("canvas-hidden");
      this.resize();
      this.loop();
    } else {
      this.canvas.classList.add("canvas-hidden");
      cancelAnimationFrame(this.animationId);
    }
  }

  // update btn particle
  updateButtonUI() {
    if (!this.btn) return;
    if (this.isRunning) {
      this.btn.innerText = "ON";
      this.btn.style.color = "var(--cyan)";
    } else {
      this.btn.innerText = "OFF";
      this.btn.style.color = "rgba(255,255,255,0.5)";
    }
  }
}
// export particle
export const initParticle = () => {
  new particleSys();
};