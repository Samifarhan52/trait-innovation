/**
 * TRAIT Innovation — Ultra-Fast 120FPS Offscreen-Sprite Glass Bubbles Canvas Engine
 * Built for Butter-Smooth Performance (SleekFlow, GlideWeb, VelvetCode, SilkDigital, PolishedOS)
 * Zero CPU Lag • Hardware-Accelerated Offscreen Sprite Caching • Viewport Auto-Pausing
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const container = document.getElementById('background-3d-canvas-container');
  if (!container) return;

  // On mobile (< 768px), disable canvas entirely for zero GPU overhead and crystal clear mobile typography
  if (window.innerWidth < 768) {
    container.style.display = 'none';
    return;
  }

  container.innerHTML = '';

  const canvas = document.createElement('canvas');
  canvas.className = 'w-full h-full block pointer-events-none z-0';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let mouseX = -1000;
  let mouseY = -1000;
  let animId = null;
  let isVisible = true;
  let elapsedTime = 0;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -------------------------------------------------------------------
  // 1. OFFSCREEN CANVASES FOR SPRITE PRE-RENDERING (0% Runtime Shader Lag)
  // -------------------------------------------------------------------
  const spriteDark = [];
  const spriteLight = [];

  function createBubbleSprite(radius, isDark, tier) {
    const sCanvas = document.createElement('canvas');
    const size = Math.ceil((radius + 12) * 2 * dpr);
    sCanvas.width = size;
    sCanvas.height = size;
    const sCtx = sCanvas.getContext('2d');
    sCtx.scale(dpr, dpr);

    const c = size / (2 * dpr);
    const r = radius;

    sCtx.save();
    sCtx.translate(c, c);

    if (isDark) {
      // Dark Mode Glass Sprite — Subtle Ambient Shimmer
      const grad = sCtx.createRadialGradient(-r * 0.3, -r * 0.3, r * 0.05, 0, 0, r);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      grad.addColorStop(0.4, 'rgba(15, 23, 42, 0.1)');
      grad.addColorStop(0.8, 'rgba(0, 240, 255, 0.08)');
      grad.addColorStop(1, 'rgba(0, 240, 255, 0.16)');

      sCtx.fillStyle = grad;
      sCtx.beginPath();
      sCtx.arc(0, 0, r, 0, Math.PI * 2);
      sCtx.fill();

      // Outer Cyan Edge
      sCtx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
      sCtx.lineWidth = tier === 2 ? 1.2 : 0.8;
      sCtx.stroke();

      // Specular Crescent Arc
      if (tier >= 1) {
        sCtx.beginPath();
        sCtx.arc(-r * 0.25, -r * 0.25, r * 0.45, Math.PI * 1.05, Math.PI * 1.75);
        sCtx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        sCtx.lineWidth = tier === 2 ? 1.5 : 1.0;
        sCtx.stroke();
      }
    } else {
      // Light Mode Glass Sprite — Soft Daylight Refraction
      const grad = sCtx.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.05, 0, 0, r);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
      grad.addColorStop(0.5, 'rgba(224, 242, 254, 0.15)');
      grad.addColorStop(0.85, 'rgba(0, 102, 255, 0.08)');
      grad.addColorStop(1, 'rgba(0, 82, 204, 0.16)');

      sCtx.fillStyle = grad;
      sCtx.beginPath();
      sCtx.arc(0, 0, r, 0, Math.PI * 2);
      sCtx.fill();

      // Outer Blue Edge
      sCtx.strokeStyle = 'rgba(0, 82, 204, 0.22)';
      sCtx.lineWidth = tier === 2 ? 1.2 : 0.8;
      sCtx.stroke();

      // Specular Refraction Arc
      if (tier >= 1) {
        sCtx.beginPath();
        sCtx.arc(-r * 0.3, -r * 0.3, r * 0.48, Math.PI * 1.1, Math.PI * 1.8);
        sCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        sCtx.lineWidth = tier === 2 ? 1.5 : 1.0;
        sCtx.stroke();
      }
    }

    sCtx.restore();
    return sCanvas;
  }

  const radii = [14, 26, 42]; // 3 Depth Tiers

  function initSprites() {
    spriteDark.length = 0;
    spriteLight.length = 0;
    for (let i = 0; i < 3; i++) {
      spriteDark.push(createBubbleSprite(radii[i], true, i));
      spriteLight.push(createBubbleSprite(radii[i], false, i));
    }
  }

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    initSprites();
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // -------------------------------------------------------------------
  // 2. LIGHTWEIGHT PARTICLE ENGINE
  // -------------------------------------------------------------------
  const bubbleCount = 18; // Clean subtle ambient particle count
  const bubbles = [];

  class LayeredBubble {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      const randVal = Math.random();
      if (randVal < 0.4) {
        this.tier = 0; // Background
        this.radius = radii[0];
        this.speedY = Math.random() * 0.22 + 0.1;
        this.opacity = Math.random() * 0.08 + 0.05;
      } else if (randVal < 0.8) {
        this.tier = 1; // Midground
        this.radius = radii[1];
        this.speedY = Math.random() * 0.38 + 0.18;
        this.opacity = Math.random() * 0.1 + 0.07;
      } else {
        this.tier = 2; // Foreground
        this.radius = radii[2];
        this.speedY = Math.random() * 0.5 + 0.25;
        this.opacity = Math.random() * 0.12 + 0.08;
      }

      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + this.radius * 2 + Math.random() * 60;
      this.vx = 0;
      this.vy = 0;
      this.swingSpeed = Math.random() * 0.0018 + 0.001;
      this.swingAmplitude = Math.random() * 0.45 + 0.2;
      this.seed = Math.random() * Math.PI * 2;
    }

    update() {
      if (prefersReducedMotion) return;

      this.y -= this.speedY + this.vy;
      this.x += Math.sin(elapsedTime * this.swingSpeed + this.seed) * this.swingAmplitude + this.vx;

      this.vx *= 0.94;
      this.vy *= 0.94;

      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distSq = dx * dx + dy * dy;
      const repelDist = (this.radius * 2.5 + 30) ** 2;

      if (distSq < repelDist && distSq > 0) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / Math.sqrt(repelDist)) * 0.35 * (this.tier + 1);
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
      }

      if (this.y < -this.radius * 2.5) {
        this.reset(false);
      }
    }

    draw(isDark) {
      const spriteArr = isDark ? spriteDark : spriteLight;
      const sprite = spriteArr[this.tier];
      if (!sprite) return;

      const spriteSize = sprite.width / dpr;
      ctx.globalAlpha = this.opacity;
      ctx.drawImage(sprite, this.x - spriteSize / 2, this.y - spriteSize / 2, spriteSize, spriteSize);
    }
  }

  for (let i = 0; i < bubbleCount; i++) {
    bubbles.push(new LayeredBubble());
  }

  // -------------------------------------------------------------------
  // 3. HARDWARE-ACCELERATED ANIMATION LOOP & VIEWPORT PAUSER
  // -------------------------------------------------------------------
  let lastTime = performance.now();

  function render(now) {
    if (!isVisible) return;

    elapsedTime = now;
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.classList.contains('dark');

    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].update();
      bubbles[i].draw(isDark);
    }

    animId = requestAnimationFrame(render);
  }

  // IntersectionObserver to stop loop completely when offscreen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        if (!animId) {
          animId = requestAnimationFrame(render);
        }
      } else {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      }
    });
  }, { threshold: 0.05 });

  observer.observe(container);
  animId = requestAnimationFrame(render);
});
