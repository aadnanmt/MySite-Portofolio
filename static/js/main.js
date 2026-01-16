document.addEventListener("DOMContentLoaded", () => {
    console.log("System Initialized... [Optimized Mode]");

    // ===== PRELOADER MANAGER =======
    const handlePreloader = () => {
        const preloader = document.getElementById("preloader");
        if (!preloader) return;

        window.addEventListener("load", () => {
            setTimeout(() => {
                preloader.style.opacity = "0";
                setTimeout(() => {
                    preloader.style.display = "none";
                }, 500);
            }, 1500);
        });
    };
    handlePreloader();

    // ==== SMOOTH SCROLL & NAVIGATION ======
    window.scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    const initNavigation = () => {
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");
        const navLinks = document.querySelectorAll(".nav-link");

        if (hamburger && navMenu) {
            hamburger.addEventListener("click", () => {
                hamburger.classList.toggle("active");
                navMenu.classList.toggle("active");
            });

            navLinks.forEach((link) => {
                link.addEventListener("click", () => {
                    hamburger.classList.remove("active");
                    navMenu.classList.remove("active");
                });
            });
        }
    };
    initNavigation();

    // ====== PARTICLE SYSTEM ======
    class ParticleSystem {
        constructor() {
            this.canvas = document.getElementById("particle-canvas");
            this.btn = document.getElementById("canvas-btn");
            if (!this.canvas) return;

            this.ctx = this.canvas.getContext("2d");
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.particles = [];
            this.animationId = null;

            // Config
            this.config = {
                color: "rgba(0, 240, 255, 0.8)",
                lineColor: "rgba(0, 240, 255, 0.15)",
                count: window.innerWidth < 768 ? 30 : 60,
                range: 190,
                speed: 0.5
            };

            // State
            this.isRunning = localStorage.getItem("canvas-state") != "false";

            this.init();
        }

        init() {
            this.resize();
            this.createParticles();

            // UI Init
            if (this.isRunning) {
                this.canvas.classList.remove("canvas-hidden");
                this.loop();
            } else {
                this.canvas.classList.add("canvas-hidden");
            }
            this.updateButtonUI();

            // Event Listeners
            window.addEventListener("resize", () => {
                this.resize();
                // Optional: recreate particles on huge resize to adjust density
                this.createParticles();
            });

            if (this.btn) {
                this.btn.addEventListener("click", () => this.toggle());
            }
        }

        resize() {
            this.width = this.canvas.width = window.innerWidth;
            this.height = this.canvas.height = window.innerHeight;
        }

        createParticles() {
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

                // Bounce logic
                if (p.x < 0 || p.x > this.width) p.vx *= -1;
                if (p.y < 0 || p.y > this.height) p.vy *= -1;
                p.x += p.vx;
                p.y += p.vy;

                // Draw Particle
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                this.ctx.fillStyle = this.config.color;
                this.ctx.fill();

                // Draw Connections
                for (let j = i; j < this.particles.length; j++) {
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

        loop() {
            if (!this.isRunning) return;
            this.update();
            this.animationId = requestAnimationFrame(() => this.loop());
        }

        toggle() {
            this.isRunning = !this.isRunning;
            localStorage.setItem("canvas-state", this.isRunning);

            if (this.isRunning) {
                this.canvas.classList.remove("canvas-hidden");
                this.resize();
                this.loop();
            } else {
                this.canvas.classList.add("canvas-hidden");
                cancelAnimationFrame(this.animationId);
            }
            this.updateButtonUI();
        }

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
    new ParticleSystem();

    // ===== LANGUAGE ======
    const LanguageManager = {
        data: null, // Cache storage
        langBtn: document.getElementById("lang-btn"),
        currentLang: localStorage.getItem("site-lang") || "en",

        async init() {
            // Load data once
            try {
                const response = await fetch("/static/lang/language.json");
                this.data = await response.json();
                this.applyLanguage(this.currentLang);
            } catch (error) {
                console.error("Critical: Failed to load language data", error);
            }

            if (this.langBtn) {
                this.langBtn.addEventListener("click", () => this.toggleLanguage());
            }
        },

        toggleLanguage() {
            this.currentLang = this.currentLang === "id" ? "en" : "id";
            localStorage.setItem("site-lang", this.currentLang);
            this.applyLanguage(this.currentLang);
        },

        applyLanguage(lang) {
            if (!this.data) return;

            if (this.langBtn) this.langBtn.textContent = lang.toUpperCase();

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

            const inputs = {
                name: document.querySelector('input[name="name"]'),
                email: document.querySelector('input[name="email"]'),
                msg: document.querySelector('textarea[name="message"]')
            };

            const placeholderVal = lang === "en" ? "_" : "";
            Object.values(inputs).forEach(input => {
                if (input) input.placeholder = placeholderVal;
            });
        }
    };
    LanguageManager.init();

    // TYPING
    class TypeWriter {
        constructor(el, texts) {
            this.el = el;
            this.texts = texts;
            this.txtIndex = 0;
            this.charIndex = 0;
            this.isDeleting = false;
            this.type();
        }

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

    const typeEl = document.getElementById("typing-text");
    if (typeEl) {
        new TypeWriter(typeEl, [
            "Web Developer",
            "Prompt Designer",
            "Problem Solver",
            "Penetration Tester",
            "Reverse Engineer",
            "Linux Enthusiast",
        ]);
    }

    // ==== DATE TO COPYRIGHT FOOTER
    const yearElement = document.getElementById("current-year");
    if (yearElement) yearElement.textContent = new Date().getFullYear();

        const toTopButton = document.querySelector('.top');

        window.addEventListener('scroll', function() {
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
});