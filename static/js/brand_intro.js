/**
 * TRAIT INNOVATION — Premium Cinematic Brand Identity Sequence Engine
 * Story Arc: THE VOID -> INTELLIGENCE ACTIVATES -> FULL FORM DISCOVERY -> COLLAPSE & IGNITION -> TRAIT FORMS -> INNOVATION SWEEP -> HERO TRANSITION
 * Total Duration: 5.2 Seconds
 */

(function () {
  'use strict';

  function initBrandIntro() {
    const overlay = document.getElementById('brand-intro-overlay');
    if (!overlay) return;

    // Reset overlay visibility
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';
    overlay.style.display = 'flex';

    // 1. Accessibility Check: prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      overlay.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      setTimeout(() => { try { overlay.remove(); } catch(e){} }, 300);
      return;
    }

    // Elements
    const canvas = document.getElementById('brand-intro-canvas');
    const systemTag = document.getElementById('intro-system-tag');
    const fullformStage = document.getElementById('intro-fullform-stage');
    const finalBrandStage = document.getElementById('intro-brand-stage');
    const innovationText = document.getElementById('intro-innovation-text');
    const tagBadges = document.getElementById('intro-tag-badges');
    const skipBtn = document.getElementById('skip-intro-btn');

    let animFrameId = null;
    let isDismissed = false;
    let startTime = performance.now();
    let flashIntensity = 0;
    let collapseProgress = 0; // 0 = normal, 1 = fully collapsed to center

    // -------------------------------------------------------------------
    // 2D CANVAS ENGINE: NEURAL SYSTEM, DATA NODES, ENERGY CONVERGENCE
    // -------------------------------------------------------------------
    let ctx = null;
    let width = 0;
    let height = 0;
    let nodes = [];
    let sparks = [];
    let sweepX = -200;
    let isSweeping = false;

    if (canvas) {
      ctx = canvas.getContext('2d');
      const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener('resize', resize);

      // Initialize 36 AI Neural Nodes
      const isMobile = width < 640;
      const nodeCount = isMobile ? 20 : 38;

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          originX: Math.random() * width,
          originY: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 2.5 + 1.2,
          color: i % 3 === 0 ? '#FF4500' : (i % 3 === 1 ? '#00F0FF' : '#F59E0B'),
          pulse: Math.random() * Math.PI * 2,
          depth: Math.random() * 0.8 + 0.4
        });
      }

      // Initialize 40 Microscopic Convergence Sparks
      for (let i = 0; i < 45; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 350 + 100;
        sparks.push({
          angle,
          dist,
          speed: Math.random() * 4 + 2,
          size: Math.random() * 1.8 + 0.8,
          color: Math.random() > 0.5 ? '#FF4500' : '#F59E0B',
          opacity: Math.random() * 0.8 + 0.2
        });
      }

      function renderCanvas(now) {
        if (isDismissed || !ctx) return;
        const elapsed = (now - startTime) / 1000; // seconds

        ctx.clearRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;

        // -------------------------------------------------------------
        // SCENE 01 (0.0s - 0.6s): VOID & CENTRAL IGNITION POINT
        // -------------------------------------------------------------
        if (elapsed < 0.6) {
          const pointRadius = (elapsed / 0.6) * 4;
          const orbGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40);
          orbGrad.addColorStop(0, 'rgba(255, 69, 0, 0.9)');
          orbGrad.addColorStop(0.4, 'rgba(245, 158, 11, 0.4)');
          orbGrad.addColorStop(1, 'rgba(2, 4, 8, 0)');

          ctx.fillStyle = orbGrad;
          ctx.beginPath();
          ctx.arc(centerX, centerY, 45, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(centerX, centerY, pointRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // -------------------------------------------------------------
        // SCENE 02 & 03 (0.6s - 2.4s): NEURAL MESH & DATA STREAM PIPELINES
        // -------------------------------------------------------------
        if (elapsed >= 0.5 && elapsed < 2.5) {
          const meshAlpha = Math.min(1, (elapsed - 0.5) / 0.8);
          ctx.globalAlpha = meshAlpha;

          // Render Neural Connection Lines
          for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
              const dx = nodes[i].x - nodes[j].x;
              const dy = nodes[i].y - nodes[j].y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 140) {
                const lineAlpha = (1 - dist / 140) * 0.25 * meshAlpha;
                ctx.strokeStyle = nodes[i].color;
                ctx.lineWidth = 0.8 * nodes[i].depth;
                ctx.globalAlpha = lineAlpha;
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
              }
            }
          }

          // Update & Draw Nodes
          nodes.forEach((n) => {
            if (collapseProgress === 0) {
              n.x += n.vx;
              n.y += n.vy;

              if (n.x < 0 || n.x > width) n.vx *= -1;
              if (n.y < 0 || n.y > height) n.vy *= -1;
            } else {
              // Rapid convergence during Scene 04
              n.x += (centerX - n.x) * 0.15;
              n.y += (centerY - n.y) * 0.15;
            }

            n.pulse += 0.05;
            const sizePulse = n.size + Math.sin(n.pulse) * 0.5;

            ctx.fillStyle = n.color;
            ctx.globalAlpha = (0.6 + Math.sin(n.pulse) * 0.3) * meshAlpha;
            ctx.beginPath();
            ctx.arc(n.x, n.y, Math.max(0.5, sizePulse), 0, Math.PI * 2);
            ctx.fill();
          });
        }

        // -------------------------------------------------------------
        // SCENE 04 (2.4s - 3.2s): CONVERGENCE & CONTROLLED LIGHT FLASH
        // -------------------------------------------------------------
        if (elapsed >= 2.4 && elapsed < 3.2) {
          collapseProgress = Math.min(1, (elapsed - 2.4) / 0.6);

          // Draw inward accelerating sparks
          sparks.forEach((sp) => {
            sp.dist -= sp.speed * (1 + collapseProgress * 2);
            if (sp.dist < 5) sp.dist = Math.random() * 300 + 150;

            const sx = centerX + Math.cos(sp.angle) * sp.dist;
            const sy = centerY + Math.sin(sp.angle) * sp.dist;

            ctx.fillStyle = sp.color;
            ctx.globalAlpha = sp.opacity * collapseProgress;
            ctx.beginPath();
            ctx.arc(sx, sy, sp.size, 0, Math.PI * 2);
            ctx.fill();
          });
        }

        // Ambient Flash Shockwave
        if (flashIntensity > 0) {
          ctx.fillStyle = `rgba(0, 240, 255, ${flashIntensity})`;
          ctx.globalAlpha = flashIntensity;
          ctx.fillRect(0, 0, width, height);

          // Central Champagne Gold Core Beam
          const coreGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 220);
          coreGlow.addColorStop(0, `rgba(245, 158, 11, ${flashIntensity * 1.5})`);
          coreGlow.addColorStop(0.5, `rgba(255, 69, 0, ${flashIntensity * 0.8})`);
          coreGlow.addColorStop(1, 'rgba(2, 4, 8, 0)');
          ctx.fillStyle = coreGlow;
          ctx.beginPath();
          ctx.arc(centerX, centerY, 220, 0, Math.PI * 2);
          ctx.fill();

          flashIntensity *= 0.82;
        }

        // -------------------------------------------------------------
        // SCENE 06 (4.0s - 4.7s): HORIZONTAL ENERGY SWEEP BEAM
        // -------------------------------------------------------------
        if (isSweeping) {
          sweepX += (width + 300 - sweepX) * 0.12;
          const sweepGrad = ctx.createLinearGradient(sweepX - 80, 0, sweepX + 80, 0);
          sweepGrad.addColorStop(0, 'rgba(0, 240, 255, 0)');
          sweepGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.45)');
          sweepGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');

          ctx.fillStyle = sweepGrad;
          ctx.globalAlpha = 0.8;
          ctx.fillRect(sweepX - 80, 0, 160, height);
        }

        ctx.globalAlpha = 1.0;
        animFrameId = requestAnimationFrame(renderCanvas);
      }

      animFrameId = requestAnimationFrame(renderCanvas);
    }

    function triggerFlash() {
      flashIntensity = 0.45;
    }

    // -------------------------------------------------------------------
    // DISMISSAL CONTROLLER (Natural Expansion Into Website)
    // -------------------------------------------------------------------
    function dismissIntro() {
      if (isDismissed) return;
      isDismissed = true;

      if (animFrameId) cancelAnimationFrame(animFrameId);

      if (overlay) {
        overlay.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.7s ease';
        overlay.style.opacity = '0';
        overlay.style.transform = 'scale(1.05)';
        overlay.style.visibility = 'hidden';

        setTimeout(() => {
          try {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
          } catch (e) {}
        }, 700);
      }
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', dismissIntro);
    }

    // Hard safety timeout at 5.6s
    setTimeout(dismissIntro, 5600);

    // -------------------------------------------------------------------
    // EXACT TIMELINE SEQUENCE (5.2 SECONDS TOTAL)
    // -------------------------------------------------------------------

    // 0.5s: System decoding tag reveals
    setTimeout(() => {
      if (isDismissed || !systemTag) return;
      systemTag.classList.remove('opacity-0', 'translate-y-3');
      systemTag.classList.add('opacity-100', 'translate-y-0');
    }, 500);

    // 1.2s - 2.2s: Full Form Concept Words Extracted & Locked Into Focus
    const wordIds = ['intro-word-1', 'intro-word-2', 'intro-word-3', 'intro-word-4', 'intro-word-5'];
    wordIds.forEach((id, idx) => {
      setTimeout(() => {
        if (isDismissed) return;
        const el = document.getElementById(id);
        if (el) {
          el.classList.remove('opacity-0', 'scale-90', 'translate-y-4');
          el.classList.add('opacity-100', 'scale-100', 'translate-y-0');
        }
      }, 1200 + idx * 220);
    });

    // 2.4s: SCENE 04 — EVERYTHING COLLAPSES & BOOM FLASH
    setTimeout(() => {
      if (isDismissed) return;

      // Collapse text cards into center
      if (fullformStage) {
        fullformStage.style.transition = 'all 0.5s cubic-bezier(0.7, 0, 0.84, 0)';
        fullformStage.style.opacity = '0';
        fullformStage.style.transform = 'scale(0.2)';
      }

      // 2.9s: Controlled Energy Boom Flash
      setTimeout(() => {
        if (isDismissed) return;
        triggerFlash();

        // Reveal SCENE 05 — TRAIT FORMS
        if (finalBrandStage) {
          finalBrandStage.classList.remove('opacity-0', 'scale-90', 'pointer-events-none');
          finalBrandStage.classList.add('opacity-100', 'scale-100');
        }
      }, 500);

    }, 2400);

    // 4.0s: SCENE 06 — HORIZONTAL ENERGY SWEEP & "INNOVATION" REVEAL
    setTimeout(() => {
      if (isDismissed) return;

      isSweeping = true;
      sweepX = -100;

      if (innovationText) {
        innovationText.classList.remove('opacity-0', 'translate-x-4');
        innovationText.classList.add('opacity-100', 'translate-x-0');
      }

      if (tagBadges) {
        tagBadges.classList.remove('opacity-0', 'translate-y-2');
        tagBadges.classList.add('opacity-100', 'translate-y-0');
      }

    }, 4000);

    // 5.2s: SCENE 07 — LOGO MOMENT & HOMEPAGE TRANSITION
    setTimeout(() => {
      if (!isDismissed) {
        triggerFlash();
        dismissIntro();
      }
    }, 5200);

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBrandIntro);
  } else {
    initBrandIntro();
  }
})();
