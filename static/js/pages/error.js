/**
 * Error Page Animation (404/500)
 * Canvas-based particle effect
 */

const canvas = document.getElementById("canvas1");
const ctx = canvas ? canvas.getContext("2d") : null;
const rootStyles = getComputedStyle(document.documentElement);

// Fallback colors if variables aren't loaded yet
const themeColor = rootStyles.getPropertyValue("--cyan").trim() || '#00f0ff';
// Use --purple as accent, fallback to --cyan or other
const accentColor = rootStyles.getPropertyValue("--purple").trim() || '#7000ff';

let particleArray = [];
const mouse = { x: undefined, y: undefined, radius: 50 };

const updateMouse = (e) => {
    mouse.x = e.x || (e.changedTouches?.[0]?.clientX);
    mouse.y = e.y || (e.changedTouches?.[0]?.clientY);
};

window.addEventListener("mousemove", updateMouse);
window.addEventListener("touchmove", updateMouse, { passive: true });

window.addEventListener("mouseleave", () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

window.addEventListener("touchend", () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = x;
        this.baseY = y;
        this.density = Math.random() * 30 + 5;
        this.color = themeColor;
    }

    draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        const s = this.size;
        ctx.fillRect(this.x - s / 2, this.y - s / 2, s, s);
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius && mouse.x !== undefined) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = forceDirectionX * force * this.density;
            const directionY = forceDirectionY * force * this.density;
            this.x -= directionX;
            this.y -= directionY;
            this.color = accentColor;
        } else {
            if (this.x !== this.baseX) {
                let dxMove = this.x - this.baseX;
                this.x -= dxMove / 10;
            }
            if (this.y !== this.baseY) {
                let dyMove = this.y - this.baseY;
                this.y -= dyMove / 10;
            }
            this.color = themeColor;
        }
    }
}

function init() {
    if (!canvas || !ctx) return;

    particleArray = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Responsive font size
    const fontSize = Math.min(canvas.width / 4, 250);
    ctx.font = `900 ${fontSize}px "JetBrains Mono", monospace`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw text to get coordinates
    // Use data-text attribute if available, fallback to 404
    const text = canvas.dataset.text || "404";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const step = 6;

    for (let y = 0; y < textCoordinates.height; y += step) {
        for (let x = 0; x < textCoordinates.width; x += step) {
            const opacityIndex = y * 4 * textCoordinates.width + x * 4 + 3;
            if (textCoordinates.data[opacityIndex] > 128) {
                particleArray.push(new Particle(x, y));
            }
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}

let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        init();
    }, 100);
});

// Handle return button
const btn = document.getElementById("reassembleBtn");
if (btn) {
    btn.addEventListener("click", () => {
        // Simple redirect home
        window.location.href = "/";
    });
}

// Init
if (canvas) {
    init();
    animate();
}
