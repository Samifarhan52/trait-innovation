/**
 * TRAIT Innovation — Ultra-Fast 120FPS Glass Bubbles Canvas Engine
 * High-Visibility Luminous Holographic Glass Bubbles (Desktop & Mobile Optimized)
 * Offscreen Sprite Caching • Interactive Repulsion • Zero Lag • Smooth 60/120FPS
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const container = document.getElementById('background-3d-canvas-container');
  if (!container) return;

  container.style.display = 'block';
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
  let isRunning = true;
  let elapsedTime = 0;

  // -------------------------------------------------------------------
  // 1. OFFSCREEN CANVASES FOR SPRITE PRE-RENDERING (0% Runtime Shader Lag)
  // -------------------------------------------------------------------
  const spriteDark = [];
  const spriteLight = [];
  const radii = [16, 30, 48]; // 3 Depth Tiers: Small, Medium, Large

  function createBubbleSprite(radius, isDark, tier) {
    const sCanvas = document.createElement('canvas');
    const pad = 16;
    const size = Math.ceil((radius + pad) * 2 * dpr);
    sCanvas.width = size;
    sCanvas.height = size;
    const sCtx = sCanvas.getContext('2d');
    sCtx.scale(dpr, dpr);

    const c = size / (2 * dpr);
    const r = radius;

    sCtx.save();
    sCtx.translate(c, c);

    if (isDark) {
      // Dark Mode: Luminous Neon Cyber Glass Bubble
      const grad = sCtx.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.05, 0, 0, r);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      grad.addColorStop(0.35, 'rgba(0, 240, 255, 0.18)');
      grad.addColorStop(0.7, 'rgba(0, 102, 255, 0.22)');
      grad.addColorStop(1, 'rgba(0, 240, 255, 0.55)');

      sCtx.fillStyle = grad;
      sCtx.beginPath();
      sCtx.arc(0, 0, r, 0, Math.PI * 2);
      sCtx.fill();

      // Outer Vibrant Cyan Neon Edge
      sCtx.strokeStyle = 'rgba(0, 240, 255, 0.75)';
      sCtx.lineWidth = tier === 2 ? 2.0 : (tier === 1 ? 1.5 : 1.1);
      sCtx.stroke();

      // Inner Ambient Glow Rim
      sCtx.beginPath();
      sCtx.arc(0, 0, r * 0.94, 0, Math.PI * 2);
      sCtx.strokeStyle = 'rgba(0, 102, 255, 0.4)';
      sCtx.lineWidth = 1;
      sCtx.stroke();

      // Bright Specular Reflection Crescent (Top-Left)
      sCtx.beginPath();
      sCtx.arc(-r * 0.25, -r * 0.25, r * 0.5, Math.PI * 1.05, Math.PI * 1.8);
      sCtx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      sCtx.lineWidth = tier === 2 ? 2.5 : (tier === 1 ? 1.8 : 1.2);
      sCtx.stroke();

      // Secondary Subtle Bottom Specular Flare
      if (tier >= 1) {
        sCtx.beginPath();
        sCtx.arc(r * 0.25, r * 0.25, r * 0.4, Math.PI * 0.1, Math.PI * 0.6);
        sCtx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
        sCtx.lineWidth = 1.2;
        sCtx.stroke();
      }
    } else {
      // Light Mode: Crystal Daylight Sapphire Glass
      const grad = sCtx.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.05, 0, 0, r);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      grad.addColorStop(0.4, 'rgba(224, 242, 254, 0.35)');
      grad.addColorStop(0.8, 'rgba(0, 102, 255, 0.2)');
      grad.addColorStop(1, 'rgba(0, 82, 204, 0.45)');

      sCtx.fillStyle = grad;
      sCtx.beginPath();
      sCtx.arc(0, 0, r, 0, Math.PI * 2);
      sCtx.fill();

      // Outer Blue Edge
      sCtx.strokeStyle = 'rgba(0, 102, 255, 0.65)';
      sCtx.lineWidth = tier === 2 ? 2.0 : (tier === 1 ? 1.5 : 1.1);
      sCtx.stroke();

      // Specular Highlight
      sCtx.beginPath();
      sCtx.arc(-r * 0.28, -r * 0.28, r * 0.5, Math.PI * 1.05, Math.PI * 1.8);
      sCtx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      sCtx.lineWidth = tier === 2 ? 2.6 : (tier === 1 ? 1.8 : 1.2);
      sCtx.stroke();
    }

    sCtx.restore();
    return sCanvas;
  }

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
    ctx.setTransform(1, 0, 0, 1, 0, 0);
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
  const isMobile = window.innerWidth < 768;
  const bubbleCount = isMobile ? 18 : 32; // Fully active on both mobile & desktop
  const bubbles = [];

  class LayeredBubble {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      const randVal = Math.random();
      if (randVal < 0.35) {
        this.tier = 0; // Small Background
        this.radius = radii[0];
        this.speedY = Math.random() * 0.35 + 0.18;
        this.opacity = Math.random() * 0.25 + 0.38; // Clearly visible
      } else if (randVal < 0.75) {
        this.tier = 1; // Medium Midground
        this.radius = radii[1];
        this.speedY = Math.random() * 0.55 + 0.28;
        this.opacity = Math.random() * 0.28 + 0.48; // Rich glow
      } else {
        this.tier = 2; // Large Foreground
        this.radius = radii[2];
        this.speedY = Math.random() * 0.75 + 0.4;
        this.opacity = Math.random() * 0.25 + 0.65; // Crystal clear specular
      }

      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + this.radius * 2 + Math.random() * 80;
      this.vx = 0;
      this.vy = 0;
      this.swingSpeed = Math.random() * 0.0018 + 0.001;
      this.swingAmplitude = Math.random() * 0.6 + 0.25;
      this.seed = Math.random() * Math.PI * 2;
    }

    update() {
      this.y -= this.speedY + this.vy;
      this.x += Math.sin(elapsedTime * this.swingSpeed + this.seed) * this.swingAmplitude + this.vx;

      this.vx *= 0.94;
      this.vy *= 0.94;

      // Mouse repulsion
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distSq = dx * dx + dy * dy;
      const repelDist = (this.radius * 2.8 + 40) ** 2;

      if (distSq < repelDist && distSq > 0) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / Math.sqrt(repelDist)) * 0.45 * (this.tier + 1);
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
      }

      // Wrap around top boundary
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
  // 3. HARDWARE-ACCELERATED ANIMATION LOOP
  // -------------------------------------------------------------------
  function render(now) {
    if (!isRunning) return;

    elapsedTime = now;
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.classList.contains('dark');

    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].update();
      bubbles[i].draw(isDark);
    }

    animId = requestAnimationFrame(render);
  }

  // Handle Tab Visibility Changes cleanly
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    } else {
      isRunning = true;
      if (!animId) {
        animId = requestAnimationFrame(render);
      }
    }
  });

  // Start animation loop immediately
  animId = requestAnimationFrame(render);
});
