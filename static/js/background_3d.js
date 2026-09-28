/**
 * TRAIT Innovation — Premium Layered Glass Bubbles Canvas Engine
 * Intentionally designed visual system with 3-tier depth (Foreground, Midground, Background)
 * Crisp contrast & specular glass rendering for both Light and Dark mode.
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('background-3d-canvas-container');
  if (!container) return;

  container.innerHTML = '';

  const canvas = document.createElement('canvas');
  canvas.className = 'w-full h-full block pointer-events-none z-0';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let mouseX = -1000;
  let mouseY = -1000;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const isMobile = width < 768;
  const bubbleCount = isMobile ? 26 : 50;
  const bubbles = [];

  class LayeredBubble {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      // 3 Depth Tiers: 0 = Background (small, slow), 1 = Midground, 2 = Foreground (large, glass specular)
      const randVal = Math.random();
      if (randVal < 0.35) {
        this.tier = 0; // Background
        this.radius = Math.random() * 18 + 10;
        this.speedY = Math.random() * 0.25 + 0.1;
        this.baseOpacity = Math.random() * 0.25 + 0.15;
      } else if (randVal < 0.8) {
        this.tier = 1; // Midground
        this.radius = Math.random() * 32 + 22;
        this.speedY = Math.random() * 0.45 + 0.2;
        this.baseOpacity = Math.random() * 0.35 + 0.25;
      } else {
        this.tier = 2; // Foreground (Large, crisp glass)
        this.radius = Math.random() * 45 + 40;
        this.speedY = Math.random() * 0.65 + 0.3;
        this.baseOpacity = Math.random() * 0.45 + 0.35;
      }

      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + this.radius + Math.random() * 80;
      this.vx = 0;
      this.vy = 0;
      this.swingSpeed = Math.random() * 0.0015 + 0.0008;
      this.swingAmplitude = Math.random() * 0.4 + 0.2;
      this.seed = Math.random() * Math.PI * 2;
    }

    update(elapsedTime) {
      if (prefersReducedMotion) return;

      // Base upward float + horizontal sway
      this.y -= this.speedY + this.vy;
      this.x += Math.sin(elapsedTime * this.swingSpeed + this.seed) * this.swingAmplitude + this.vx;

      // Damping physical velocity
      this.vx *= 0.95;
      this.vy *= 0.95;

      // Gentle mouse deflection
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repelDist = this.radius * 2.5 + 40;

      if (dist < repelDist && dist > 0) {
        const force = (1 - dist / repelDist) * 0.4 * (this.tier + 1);
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
      }

      // Wrap around top
      if (this.y < -this.radius * 2.5) {
        this.reset(false);
      }
    }

    draw(ctx, isDark) {
      ctx.save();
      ctx.translate(this.x, this.y);

      const op = this.baseOpacity;

      if (isDark) {
        // --- DARK MODE GLASS RENDERING ---
        // Subtle drop shadow under glass
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = this.radius * 0.3;
        ctx.shadowOffsetY = this.radius * 0.15;

        // Base Glass Body Gradient
        const bodyGrad = ctx.createRadialGradient(
          -this.radius * 0.3,
          -this.radius * 0.3,
          this.radius * 0.05,
          0,
          0,
          this.radius
        );
        bodyGrad.addColorStop(0, `rgba(255, 255, 255, ${op * 0.2})`);
        bodyGrad.addColorStop(0.45, `rgba(15, 23, 42, ${op * 0.15})`);
        bodyGrad.addColorStop(0.85, `rgba(0, 240, 255, ${op * 0.1})`);
        bodyGrad.addColorStop(1, `rgba(0, 240, 255, ${op * 0.25})`);

        ctx.fillStyle = bodyGrad;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Edge Lighting Ring
        ctx.strokeStyle = `rgba(0, 240, 255, ${op * 0.45})`;
        ctx.lineWidth = this.tier === 2 ? 1.5 : 1;
        ctx.stroke();

        // Specular Crescent Highlight (Top Left)
        if (this.tier >= 1) {
          ctx.beginPath();
          ctx.arc(-this.radius * 0.25, -this.radius * 0.25, this.radius * 0.5, Math.PI * 1.05, Math.PI * 1.75);
          ctx.strokeStyle = `rgba(255, 255, 255, ${op * 0.8})`;
          ctx.lineWidth = this.tier === 2 ? 2.2 : 1.4;
          ctx.stroke();
        }

      } else {
        // --- LIGHT MODE GLASS RENDERING ---
        // Soft drop shadow so bubble pops against light/white bg
        ctx.shadowColor = 'rgba(15, 23, 42, 0.12)';
        ctx.shadowBlur = this.radius * 0.35;
        ctx.shadowOffsetY = this.radius * 0.2;

        // Base Translucent Surface Gradient
        const bodyGrad = ctx.createRadialGradient(
          -this.radius * 0.35,
          -this.radius * 0.35,
          this.radius * 0.05,
          0,
          0,
          this.radius
        );
        bodyGrad.addColorStop(0, `rgba(255, 255, 255, ${op * 0.65})`);
        bodyGrad.addColorStop(0.5, `rgba(224, 242, 254, ${op * 0.25})`);
        bodyGrad.addColorStop(0.85, `rgba(0, 102, 255, ${op * 0.15})`);
        bodyGrad.addColorStop(1, `rgba(0, 82, 204, ${op * 0.3})`);

        ctx.fillStyle = bodyGrad;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Outer Glass Border Stroke
        ctx.strokeStyle = `rgba(0, 82, 204, ${op * 0.4})`;
        ctx.lineWidth = this.tier === 2 ? 1.5 : 1;
        ctx.stroke();

        // Top-left Crisp Specular Refraction Highlight
        if (this.tier >= 1) {
          ctx.beginPath();
          ctx.arc(-this.radius * 0.3, -this.radius * 0.3, this.radius * 0.48, Math.PI * 1.1, Math.PI * 1.8);
          ctx.strokeStyle = `rgba(255, 255, 255, ${op * 0.95})`;
          ctx.lineWidth = this.tier === 2 ? 2.5 : 1.6;
          ctx.stroke();
        }
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < bubbleCount; i++) {
    bubbles.push(new LayeredBubble());
  }

  let startTime = performance.now();

  function render(now) {
    const elapsedTime = (now - startTime) / 1000;
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');

    // Sort bubbles by tier so background renders first, foreground on top
    bubbles.sort((a, b) => a.tier - b.tier);

    bubbles.forEach(bubble => {
      bubble.update(elapsedTime);
      bubble.draw(ctx, isDark);
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
});
