/**
 * TRAIT INNOVATION — Ultra-Fast 3.2-Second Creative Thunder & Acronym Ignition Intro
 * Maximum Duration: 3.2s Total (Hard Safety Timeout at 3.5s)
 */

(function () {
  'use strict';

  function initBrandIntro() {
    const overlay = document.getElementById('brand-intro-overlay');
    if (!overlay) return;

    // Accessibility check: prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      overlay.style.transition = 'opacity 0.25s ease, visibility 0.25s ease';
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      setTimeout(() => { try { overlay.remove(); } catch(e){} }, 250);
      return;
    }

    const canvas = document.getElementById('brand-intro-canvas');
    const wordplayBox = document.getElementById('intro-wordplay-box');
    const finalBrandStage = document.getElementById('intro-brand-stage');
    const skipBtn = document.getElementById('skip-intro-btn');

    let animFrameId = null;
    let isDismissed = false;
    let thunderFlashIntensity = 0;

    // -------------------------------------------------------------------
    // 2D CANVAS ENGINE: DENSE VOLUMETRIC SMOKE + LIGHTNING THUNDER BOLTS
    // -------------------------------------------------------------------
    let ctx = null;
    let width = 0;
    let height = 0;
    let smokeParticles = [];
    let electricSparks = [];
    let lightningBolts = [];

    if (canvas) {
      ctx = canvas.getContext('2d');
      const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener('resize', resize);

      // 8 volumetric swirling smoke clouds
      for (let i = 0; i < 8; i++) {
        smokeParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.min(width, height) * (0.45 + Math.random() * 0.35),
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.5,
          angle: Math.random() * Math.PI * 2,
          vAngle: (Math.random() - 0.5) * 0.008,
          colorHue: Math.random() > 0.5 ? 190 : 260
        });
      }

      // 35 electric plasma sparks
      for (let i = 0; i < 35; i++) {
        electricSparks.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.2 + 0.8,
          vx: (Math.random() - 0.5) * 1.4,
          vy: -Math.random() * 1.0 - 0.3,
          alpha: Math.random() * 0.8 + 0.2,
          pulse: Math.random() * Math.PI * 2
        });
      }

      function generateLightning() {
        const bolt = [];
        let startX = Math.random() * width;
        let startY = 0;
        let endY = height;
        let currentX = startX;
        let currentY = startY;

        bolt.push({ x: currentX, y: currentY });
        while (currentY < endY) {
          currentX += (Math.random() - 0.5) * 70;
          currentY += Math.random() * 45 + 20;
          bolt.push({ x: currentX, y: currentY });
        }
        return bolt;
      }

      function triggerThunder() {
        thunderFlashIntensity = 0.5;
        if (Math.random() > 0.2) {
          lightningBolts.push({ path: generateLightning(), life: 10 });
        }
      }

      // Initial instant thunder bolt
      triggerThunder();

      function renderCanvas() {
        if (isDismissed || !ctx) return;
        ctx.clearRect(0, 0, width, height);

        // 1. Draw Volumetric Storm Smoke
        smokeParticles.forEach((smoke) => {
          smoke.x += smoke.vx;
          smoke.y += smoke.vy;
          smoke.angle += smoke.vAngle;

          if (smoke.x < -smoke.radius) smoke.x = width + smoke.radius;
          if (smoke.x > width + smoke.radius) smoke.x = -smoke.radius;
          if (smoke.y < -smoke.radius) smoke.y = height + smoke.radius;
          if (smoke.y > height + smoke.radius) smoke.y = -smoke.radius;

          const grad = ctx.createRadialGradient(
            smoke.x + Math.cos(smoke.angle) * 30,
            smoke.y + Math.sin(smoke.angle) * 30,
            10,
            smoke.x,
            smoke.y,
            smoke.radius
          );

          if (smoke.colorHue === 190) {
            grad.addColorStop(0, 'rgba(0, 240, 255, 0.18)');
            grad.addColorStop(0.5, 'rgba(14, 116, 144, 0.09)');
            grad.addColorStop(1, 'rgba(3, 6, 17, 0)');
          } else {
            grad.addColorStop(0, 'rgba(139, 92, 246, 0.18)');
            grad.addColorStop(0.5, 'rgba(99, 102, 241, 0.09)');
            grad.addColorStop(1, 'rgba(3, 6, 17, 0)');
          }

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(smoke.x, smoke.y, smoke.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        // 2. Draw Lightning Bolts
        for (let i = lightningBolts.length - 1; i >= 0; i--) {
          const bolt = lightningBolts[i];
          ctx.strokeStyle = 'rgba(0, 240, 255, ' + (bolt.life / 10) + ')';
          ctx.lineWidth = Math.random() * 2.5 + 1.2;
          ctx.shadowColor = '#00F0FF';
          ctx.shadowBlur = 22;

          ctx.beginPath();
          bolt.path.forEach((pt, index) => {
            if (index === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          });
          ctx.stroke();
          ctx.shadowBlur = 0;

          bolt.life--;
          if (bolt.life <= 0) lightningBolts.splice(i, 1);
        }

        // 3. Draw Ambient Flash
        if (thunderFlashIntensity > 0) {
          ctx.fillStyle = `rgba(0, 240, 255, ${thunderFlashIntensity})`;
          ctx.fillRect(0, 0, width, height);
          thunderFlashIntensity *= 0.85;
        }

        // 4. Draw Electric Sparks
        electricSparks.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.pulse += 0.06;

          if (p.y < -10) p.y = height + 10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          const currentAlpha = Math.max(0.1, p.alpha + Math.sin(p.pulse) * 0.35);
          ctx.fillStyle = `rgba(0, 240, 255, ${currentAlpha})`;
          ctx.shadowColor = '#00F0FF';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        animFrameId = requestAnimationFrame(renderCanvas);
      }
      renderCanvas();

      window._triggerIntroThunder = triggerThunder;
    }

    // -------------------------------------------------------------------
    // DISMISSAL CONTROLLER (Fades overlay in 0.6s & reveals site)
    // -------------------------------------------------------------------
    function dismissIntro() {
      if (isDismissed) return;
      isDismissed = true;

      if (animFrameId) cancelAnimationFrame(animFrameId);

      if (overlay) {
        overlay.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s ease';
        overlay.style.opacity = '0';
        overlay.style.transform = 'scale(0.96)';
        overlay.style.visibility = 'hidden';

        setTimeout(() => {
          try {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
          } catch (e) {}
        }, 600);
      }
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', dismissIntro);
    }

    // Hard safety timeout at 3.5 seconds max
    setTimeout(dismissIntro, 3500);

    // -------------------------------------------------------------------
    // PUNCHY 3.2-SECOND TIMELINE SEQUENCE
    // -------------------------------------------------------------------

    // 0.6s: Acronym + Brand Stage Ignition (Thunder shockwave flash!)
    setTimeout(() => {
      if (isDismissed) return;
      if (window._triggerIntroThunder) window._triggerIntroThunder();

      if (wordplayBox) {
        wordplayBox.style.transition = 'all 0.4s ease-out';
        wordplayBox.style.opacity = '0';
        wordplayBox.style.transform = 'scale(0.92)';
      }

      setTimeout(() => {
        if (finalBrandStage) {
          finalBrandStage.classList.remove('opacity-0', 'scale-90');
          finalBrandStage.classList.add('opacity-100', 'scale-100');
        }
      }, 200);
    }, 600);

    // 2.4s: Thunder Shockwave & Site Awakening Reveal (Dissolves overlay into Hero)
    setTimeout(() => {
      if (window._triggerIntroThunder) window._triggerIntroThunder();
      dismissIntro();
    }, 2400);

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBrandIntro);
  } else {
    initBrandIntro();
  }
})();
