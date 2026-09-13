// Cinematic AI-Powered Cyber Decrypt Intro Reveal Script
document.addEventListener('DOMContentLoaded', () => {
  const introOverlay = document.getElementById('netflix-intro-overlay');
  const skipBtn = document.getElementById('skip-intro-btn');
  const introStage = document.getElementById('netflix-intro-stage');
  const introTextWrapper = document.getElementById('intro-text-wrapper');
  const introLetters = document.querySelectorAll('.intro-letter');

  if (!introOverlay) return;

  // Web Audio Synthesizer for Offline Cinematic Netflix Sound Boom ("Ta-dum" + Cyber Synth effect)
  function playCinematicAudio() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Sub Bass Osc
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(45, ctx.currentTime);
      subOsc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 1.0);

      subGain.gain.setValueAtTime(0.01, ctx.currentTime);
      subGain.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.5);
      subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start();
      subOsc.stop(ctx.currentTime + 2.3);

      // High Shimmer Chime Osc (Synced with T gliding left and Cyber Decrypt at 0.9s)
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = 'triangle';
      chimeOsc.frequency.setValueAtTime(440, ctx.currentTime + 0.9);
      chimeOsc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 2.0);

      chimeGain.gain.setValueAtTime(0.001, ctx.currentTime + 0.9);
      chimeGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 1.4);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.6);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeOsc.start(ctx.currentTime + 0.9);
      chimeOsc.stop(ctx.currentTime + 2.7);
    } catch (e) {
      // Audio autoplay blocked or unsupported
    }
  }

  // Trigger audio swell on user interaction or preloader start
  document.addEventListener('click', playCinematicAudio, { once: true });
  setTimeout(playCinematicAudio, 150);

  // Step 1: At 0.9s, expand text wrapper so 'T' glides smoothly from center to left
  setTimeout(() => {
    if (introTextWrapper) {
      introTextWrapper.classList.add('active');
    }
  }, 900);

  // Step 2: Cyber Decrypt Glyph Scrambler for remaining letters (R A I T  I N N O V A T I O N)
  const cyberGlyphs = ['Δ', 'Ξ', 'Ψ', 'Σ', 'Ω', '0', '1', '⚡', '⌘', 'X', 'Y', 'Z', '9', '8'];

  introLetters.forEach((el) => {
    const delay = parseFloat(el.getAttribute('data-delay') || '0.1');
    const targetChar = el.textContent.trim();
    const startTime = 900 + (delay * 1000); // Trigger relative to wrapper expansion

    setTimeout(() => {
      el.style.opacity = '1';
      let scrambles = 0;
      const maxScrambles = 5;
      const interval = setInterval(() => {
        if (scrambles >= maxScrambles) {
          el.textContent = targetChar;
          clearInterval(interval);
        } else {
          el.textContent = cyberGlyphs[Math.floor(Math.random() * cyberGlyphs.length)];
          scrambles++;
        }
      }, 30);
    }, startTime);
  });

  // Step 3: Trigger Camera Zoom-Out at 2.6s after full decrypt completes
  const zoomTimer = setTimeout(() => {
    if (introStage) {
      introStage.classList.add('animate-netflix-zoom');
    }
  }, 2600);

  // Step 4: Dismiss Intro & reveal main application at 3.2s
  const dismissTimer = setTimeout(() => {
    dismissIntro();
  }, 3200);

  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      clearTimeout(zoomTimer);
      clearTimeout(dismissTimer);
      dismissIntro();
    });
  }

  function dismissIntro() {
    introOverlay.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.5s ease';
    introOverlay.style.opacity = '0';
    introOverlay.style.transform = 'scale(1.05)';
    introOverlay.style.visibility = 'hidden';
    setTimeout(() => {
      introOverlay.remove();
    }, 500);
  }
});
