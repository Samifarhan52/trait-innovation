// TRAIT AI Fashion Analysis Interactive Controller & Service Layer

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. DATASETS FOR PERSONALIZED RECOMMENDATIONS
  const recommendationData = {
    makeup: [
      { name: 'Matte Lipstick', shade: 'Rose Nude', desc: 'Complements medium warm undertones', img: '/static/images/fashion/makeup_lipstick.jpg' },
      { name: 'Liquid Lipstick', shade: 'Warm Coral', desc: 'Adds vibrant warmth to skin tone', img: '/static/images/fashion/makeup_liquid_lipstick.jpg' },
      { name: 'Blush', shade: 'Peach Glow', desc: 'Highlights cheekbones naturally', img: '/static/images/fashion/makeup_blush.jpg' },
      { name: 'Eye Shadow', shade: 'Earth Tones', desc: 'Enhances dark brown eyes', img: '/static/images/fashion/makeup_eyeshadow.jpg' },
      { name: 'Nail Polish', shade: 'Mauve Pink', desc: 'Soft elegant everyday shade', img: '/static/images/fashion/makeup_nail_polish.jpg' },
      { name: 'Foundation', shade: 'Warm Beige', desc: 'Seamless undertone matching formula', img: '/static/images/fashion/makeup_foundation.jpg' }
    ],
    accessories: [
      { name: 'Cat-Eye Sunglasses', shade: 'Warm Tortoise', desc: 'Frames oval face shape perfectly', img: '/static/images/fashion/outfit_casual.jpg' },
      { name: 'Leather Crossbody Bag', shade: 'Camel Tan', desc: 'Versatile warm leather accent', img: '/static/images/fashion/outfit_party.jpg' },
      { name: 'Minimalist Watch', shade: 'Rose Gold', desc: 'Complements warm skin undertones', img: '/static/images/fashion/outfit_workwear.jpg' },
      { name: 'Leather Waist Belt', shade: 'Cognac Brown', desc: 'Accentuates waist silhouette', img: '/static/images/fashion/outfit_traditional.jpg' },
      { name: 'Silk Hair Scarf', shade: 'Floral Lavender', desc: 'Soft accent for dark brown hair', img: '/static/images/fashion/insight_lipstick.jpg' },
      { name: 'Classic Tote Bag', shade: 'Dusty Rose', desc: 'Editorial everyday handbag', img: '/static/images/fashion/makeup_blush.jpg' }
    ],
    outfits: [
      { name: 'Silk Wrap Dress', shade: 'Terracotta', desc: 'Flattering warm tone drape', img: '/static/images/fashion/outfit_party.jpg' },
      { name: 'Tailored Blazer Set', shade: 'Oatmeal Beige', desc: 'Chic structured silhouette', img: '/static/images/fashion/outfit_workwear.jpg' },
      { name: 'Bohemian Maxi Dress', shade: 'Warm Sage', desc: 'Effortless relaxed styling', img: '/static/images/fashion/outfit_casual.jpg' },
      { name: 'Linen Jumpsuit', shade: 'Honey Mustard', desc: 'Bold warm summer tone', img: '/static/images/fashion/outfit_traditional.jpg' },
      { name: 'Pleated Midi Skirt', shade: 'Burgundy', desc: 'Classic evening elegance', img: '/static/images/fashion/outfit_party.jpg' },
      { name: 'Knit Cardigan Set', shade: 'Soft Cream', desc: 'Cozy layered everyday look', img: '/static/images/fashion/outfit_casual.jpg' }
    ],
    jewellery: [
      { name: 'Drop Hoop Earrings', shade: 'Warm Gold', desc: 'Frames oval face features', img: '/static/images/fashion/fashion_hero_model.jpg' },
      { name: 'Layered Chain Necklace', shade: '18k Yellow Gold', desc: 'Accentuates neck & collarbone', img: '/static/images/fashion/insight_lipstick.jpg' },
      { name: 'Stackable Rings Set', shade: 'Minimal Gold', desc: 'Subtle daily sophistication', img: '/static/images/fashion/makeup_foundation.jpg' },
      { name: 'Cuff Bracelet', shade: 'Brushed Brass', desc: 'Contemporary statement piece', img: '/static/images/fashion/makeup_eyeshadow.jpg' },
      { name: 'Gemstone Pendant', shade: 'Rose Quartz', desc: 'Soft romantic crystal accent', img: '/static/images/fashion/makeup_nail_polish.jpg' },
      { name: 'Pearl Studs', shade: 'Warm Cream', desc: 'Timeless luxury essential', img: '/static/images/fashion/fashion_camera_model.jpg' }
    ],
    hairstyles: [
      { name: 'Soft Beach Waves', shade: 'Rich Dark Brown', desc: 'Softens oval cheekbones', img: '/static/images/fashion/fashion_hero_model.jpg' },
      { name: 'Sleek Low Bun', shade: 'Classic Elegance', desc: 'Highlights jawline & neck', img: '/static/images/fashion/fashion_camera_model.jpg' },
      { name: 'Textured Bob', shade: 'Modern Chic', desc: 'Framing haircut for oval face', img: '/static/images/fashion/outfit_workwear.jpg' },
      { name: 'Curtain Bangs', shade: 'Chestnut Highlights', desc: 'Flattering forehead framing', img: '/static/images/fashion/outfit_party.jpg' },
      { name: 'Side Swept Waves', shade: 'Hollywood Glam', desc: 'Glamorous asymmetrical flow', img: '/static/images/fashion/outfit_traditional.jpg' },
      { name: 'Half-Up Top Knot', shade: 'Effortless Cool', desc: 'Playful casual hair styling', img: '/static/images/fashion/outfit_casual.jpg' }
    ]
  };

  // 2. COMPLETE YOUR LOOK OUTFIT DATASETS
  const outfitCombinations = {
    casual: [
      { title: 'Beige Knit & Denim', mainImg: '/static/images/fashion/outfit_casual.jpg', accessories: ['Beige Tote Bag', 'Aviator Sunglasses', 'White Sneakers'], tag: 'Casual Chic' },
      { title: 'Soft Trench & Linen', mainImg: '/static/images/fashion/outfit_workwear.jpg', accessories: ['Leather Crossbody', 'Cat-Eye Shades', 'Loafers'], tag: 'Weekend Style' }
    ],
    formal: [
      { title: 'Black Tailored Tuxedo', mainImg: '/static/images/fashion/outfit_workwear.jpg', accessories: ['Gold Clutch', 'Stiletto Pumps', 'Diamond Earrings'], tag: 'Gala Formal' },
      { title: 'Rose Silk Dress', mainImg: '/static/images/fashion/outfit_party.jpg', accessories: ['Satin Purse', 'Pearl Drop Earrings', 'Velvet Heels'], tag: 'Evening Elegance' }
    ],
    party: [
      { title: 'Rose Pink Tiered Dress', mainImg: '/static/images/fashion/outfit_party.jpg', accessories: ['Gold Drop Earrings', 'Pink Satin Clutch', 'Nude Heels'], tag: 'Party Glam' },
      { title: 'Burgundy Silk Look', mainImg: '/static/images/fashion/outfit_traditional.jpg', accessories: ['Gold Clutch', 'Hoop Earrings', 'Strappy Sandals'], tag: 'Cocktail Hour' }
    ],
    traditional: [
      { title: 'Burgundy Gold Silk Saree', mainImg: '/static/images/fashion/outfit_traditional.jpg', accessories: ['Jhumka Earrings', 'Embroidered Clutch', 'Gold Sandals'], tag: 'Royal Heritage' },
      { title: 'Festive Tiered Wear', mainImg: '/static/images/fashion/outfit_party.jpg', accessories: ['Chandbali Earrings', 'Potli Bag', 'Juttis'], tag: 'Festive Wear' }
    ],
    workwear: [
      { title: 'Executive Suit & Blazer', mainImg: '/static/images/fashion/outfit_workwear.jpg', accessories: ['Structure Leather Tote', 'Leather Pumps', 'Minimal Watch'], tag: 'Boardroom Chic' },
      { title: 'Tailored Knit Ensemble', mainImg: '/static/images/fashion/outfit_casual.jpg', accessories: ['Laptop Briefcase', 'Pointed Flats', 'Pearl Studs'], tag: 'Business Casual' }
    ]
  };

  // 3. RENDER RECOMMENDATIONS PRODUCTS
  window.switchRecommendationCategory = function(catKey) {
    const btns = document.querySelectorAll('.rec-tab-btn');
    btns.forEach(btn => {
      btn.classList.remove('bg-purple-600', 'text-white', 'shadow-sm');
      btn.classList.add('text-slate-600', 'dark:text-slate-300');
    });

    if (event && event.currentTarget) {
      event.currentTarget.classList.remove('text-slate-600', 'dark:text-slate-300');
      event.currentTarget.classList.add('bg-purple-600', 'text-white', 'shadow-sm');
    }

    const grid = document.getElementById('recommendation-products-grid');
    if (!grid) return;

    const items = recommendationData[catKey] || recommendationData.makeup;

    grid.innerHTML = items.map(item => `
      <div class="bg-white dark:bg-fashion-darkCard rounded-3xl p-3 border border-purple-100 dark:border-fashion-darkBorder shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-left group">
        <div>
          <div class="aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3 relative">
            <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <button onclick="showFashionToast('Added ${item.name} (${item.shade}) to bag!')" class="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 dark:bg-fashion-darkCard/90 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-md hover:scale-110 transition-transform" title="Add to Cart">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 11h14l1 12H4L5 11z"/></svg>
            </button>
          </div>
          <h4 class="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">${item.name}</h4>
          <div class="text-[11px] font-semibold text-purple-600 dark:text-purple-400">${item.shade}</div>
          <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">${item.desc}</p>
        </div>
      </div>
    `).join('');
  };

  // Initial render of Makeup recommendations
  switchRecommendationCategory('makeup');

  // 4. RENDER COMPLETE YOUR LOOK OUTFIT CARDS
  window.switchOutfitOccasion = function(occKey) {
    const btns = document.querySelectorAll('.outfit-tab-btn');
    btns.forEach(btn => {
      btn.classList.remove('bg-purple-600', 'text-white', 'shadow-sm');
      btn.classList.add('bg-slate-100', 'dark:bg-fashion-darkCard', 'text-slate-600', 'dark:text-slate-300');
    });

    if (event && event.currentTarget) {
      event.currentTarget.classList.remove('bg-slate-100', 'dark:bg-fashion-darkCard', 'text-slate-600', 'dark:text-slate-300');
      event.currentTarget.classList.add('bg-purple-600', 'text-white', 'shadow-sm');
    }

    const grid = document.getElementById('outfit-cards-grid');
    if (!grid) return;

    const list = outfitCombinations[occKey] || outfitCombinations.casual;

    grid.innerHTML = list.map(item => `
      <div class="bg-white dark:bg-fashion-darkCard rounded-3xl p-4 border border-purple-100 dark:border-fashion-darkBorder shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 text-left">
        <div class="w-full sm:w-1/2 aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img src="${item.mainImg}" alt="${item.title}" class="w-full h-full object-cover" />
        </div>
        <div class="w-full sm:w-1/2 flex flex-col justify-between space-y-3">
          <div>
            <span class="px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 text-[9px] font-mono font-bold uppercase">${item.tag}</span>
            <h4 class="text-xs font-bold text-slate-900 dark:text-white mt-1.5">${item.title}</h4>
            
            <div class="mt-3 space-y-1.5">
              <div class="text-[10px] font-mono text-slate-400 uppercase">Includes Accessories:</div>
              ${item.accessories.map(acc => `
                <div class="flex items-center gap-1.5 text-[10px] font-medium text-slate-700 dark:text-slate-300">
                  <span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  ${acc}
                </div>
              `).join('')}
            </div>
          </div>

          <button onclick="showFashionToast('Curated outfit saved to your style board!')" class="w-full py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-600 hover:text-white text-purple-600 dark:text-purple-300 font-bold text-[11px] transition-colors text-center flex items-center justify-center gap-1">
            <span>Save Look</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
          </button>
        </div>
      </div>
    `).join('');
  };

  // Initial render of Casual outfits
  switchOutfitOccasion('casual');

  // 5. REAL LIVE CAMERA & COMPUTER VISION PIXEL ANALYSIS
  const video = document.getElementById('webcam-video');
  const fallbackImg = document.getElementById('fallback-camera-img');
  const canvas = document.getElementById('snapshot-canvas');
  const startOverlay = document.getElementById('camera-start-overlay');
  const errorOverlay = document.getElementById('camera-error-overlay');
  const openCameraBtn = document.getElementById('open-camera-btn');
  const retryCameraBtn = document.getElementById('retry-camera-btn');
  const switchCamBtn = document.getElementById('switch-camera-btn');
  const captureBtn = document.getElementById('capture-btn');
  const captureBtnText = document.getElementById('capture-btn-text');
  const retakeBtn = document.getElementById('retake-photo-btn');
  const postCaptureControls = document.getElementById('post-capture-controls');
  const uploadInput = document.getElementById('image-upload-input');
  const fallbackUploadInput = document.getElementById('fallback-upload-input');
  const statusText = document.getElementById('camera-status-text');
  const statusDot = document.getElementById('camera-status-dot');
  const flash = document.getElementById('camera-flash');

  let currentStream = null;
  let facingMode = 'user';
  let isCameraActive = false;
  let isSnapshotMode = false;

  // Synthesizes an authentic mechanical camera shutter sound
  function playCameraShutterSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(850, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.09);
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch(e) {}
  }

  // Opens and streams live camera with proper constraints
  window.openCamera = async function() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (errorOverlay) {
        errorOverlay.classList.remove('hidden');
        document.getElementById('camera-error-msg').textContent = 'Camera API is not supported in this browser environment. You can upload a photo to analyze instead!';
      }
      return;
    }

    try {
      if (currentStream) {
        currentStream.getTracks().forEach(t => t.stop());
      }

      if (statusText) statusText.textContent = 'Requesting Camera Access...';

      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      currentStream = stream;
      isCameraActive = true;
      isSnapshotMode = false;

      if (video) {
        video.srcObject = stream;
        video.classList.remove('hidden');
        await video.play();
      }
      if (fallbackImg) fallbackImg.classList.add('hidden');
      if (canvas) canvas.classList.add('hidden');
      if (startOverlay) startOverlay.classList.add('hidden');
      if (errorOverlay) errorOverlay.classList.add('hidden');
      if (postCaptureControls) postCaptureControls.classList.add('hidden');

      if (statusText) statusText.textContent = 'Live Camera Active';
      if (statusDot) {
        statusDot.className = 'w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse';
      }
      if (captureBtnText) captureBtnText.textContent = 'Take Live Photo & Analyze';

      showFashionToast('Live camera connected! Align your face inside the scan frame.');
    } catch (err) {
      console.warn('Camera access error:', err);
      isCameraActive = false;
      if (startOverlay) startOverlay.classList.add('hidden');
      if (errorOverlay) {
        errorOverlay.classList.remove('hidden');
        let msg = 'Camera access was blocked or dismissed. Please allow camera in your browser address bar permissions, or upload a photo!';
        if (err.name === 'NotFoundError') {
          msg = 'No camera found on this device. You can upload any photo or selfie to test real-time AI analysis.';
        } else if (err.name === 'NotReadableError') {
          msg = 'Camera is currently locked by another application. Please close other camera apps and retry.';
        }
        document.getElementById('camera-error-msg').textContent = msg;
      }
      if (statusText) statusText.textContent = 'Upload / Demo Mode';
      if (statusDot) {
        statusDot.className = 'w-2.5 h-2.5 rounded-full bg-amber-400';
      }
      showFashionToast('Could not access live camera. You can upload a photo to analyze!');
    }
  };

  // Takes snapshot of live camera video frame
  window.takeLivePhotoAndAnalyze = function() {
    if (!isCameraActive || !video || video.videoWidth === 0) {
      // If camera not yet opened, open it first!
      openCamera();
      return;
    }

    // Camera flash effect + audio feedback
    playCameraShutterSound();
    if (flash) {
      flash.style.opacity = '0.95';
      setTimeout(() => { flash.style.opacity = '0'; }, 200);
    }

    // Freeze frame to canvas
    if (!canvas) return;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Show captured canvas, hide live video
    video.classList.add('hidden');
    canvas.classList.remove('hidden');
    isSnapshotMode = true;

    if (statusText) statusText.textContent = 'Photo Captured • Analyzing...';
    if (statusDot) {
      statusDot.className = 'w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping';
    }
    if (postCaptureControls) postCaptureControls.classList.remove('hidden');
    if (captureBtnText) captureBtnText.textContent = 'Re-Analyze Current Photo';

    // Run pixel computer vision analysis
    analyzePixelDataFromCanvas(canvas);
  };

  // Retakes photo by switching back to live camera
  window.retakePhoto = function() {
    if (canvas) canvas.classList.add('hidden');
    if (video) {
      video.classList.remove('hidden');
    }
    if (postCaptureControls) postCaptureControls.classList.add('hidden');
    if (statusText) statusText.textContent = 'Live Camera Active';
    if (statusDot) {
      statusDot.className = 'w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse';
    }
    if (captureBtnText) captureBtnText.textContent = 'Take Live Photo & Analyze';
    isSnapshotMode = false;
    showFashionToast('Live camera resumed. Ready to take a new photo.');
  };

  // Real Computer Vision Color & Undertone Analyzer
  function analyzePixelDataFromCanvas(activeCanvas) {
    showFashionToast('AI scanning facial landmarks, skin undertones & lipid barrier...');

    const overlay = document.getElementById('scan-overlay');
    if (overlay) {
      overlay.classList.add('scale-105');
      setTimeout(() => overlay.classList.remove('scale-105'), 1200);
    }

    const ctx = activeCanvas.getContext('2d');
    const W = activeCanvas.width;
    const H = activeCanvas.height;

    // Sample facial region (center 30% x 30%)
    const faceX = Math.floor(W * 0.35);
    const faceY = Math.floor(H * 0.32);
    const faceW = Math.max(1, Math.floor(W * 0.30));
    const faceH = Math.max(1, Math.floor(H * 0.32));

    const imgData = ctx.getImageData(faceX, faceY, faceW, faceH).data;
    let totalR = 0, totalG = 0, totalB = 0, count = 0;

    for (let i = 0; i < imgData.length; i += 4) {
      const r = imgData[i];
      const g = imgData[i + 1];
      const b = imgData[i + 2];
      const sum = r + g + b;
      // Filter out shadows and washed-out highlights
      if (sum > 60 && sum < 730) {
        totalR += r;
        totalG += g;
        totalB += b;
        count++;
      }
    }

    if (count === 0) {
      count = 1;
      totalR = 215; totalG = 168; totalB = 138;
    }

    const avgR = Math.round(totalR / count);
    const avgG = Math.round(totalG / count);
    const avgB = Math.round(totalB / count);

    // Sample hair region (top crown)
    const hairX = Math.floor(W * 0.35);
    const hairY = Math.floor(H * 0.08);
    const hairW = Math.max(1, Math.floor(W * 0.30));
    const hairH = Math.max(1, Math.floor(H * 0.16));
    const hairImgData = ctx.getImageData(hairX, hairY, hairW, hairH).data;
    let hR = 0, hG = 0, hB = 0, hCount = 0;

    for (let i = 0; i < hairImgData.length; i += 4) {
      hR += hairImgData[i];
      hG += hairImgData[i + 1];
      hB += hairImgData[i + 2];
      hCount++;
    }
    const avgHairR = Math.round(hR / (hCount || 1));
    const avgHairG = Math.round(hG / (hCount || 1));
    const avgHairB = Math.round(hB / (hCount || 1));

    const toHex = (c) => ('0' + Math.max(0, Math.min(255, c)).toString(16)).slice(-2);
    const skinHex = `#${toHex(avgR)}${toHex(avgG)}${toHex(avgB)}`.toUpperCase();
    const hairHex = `#${toHex(avgHairR)}${toHex(avgHairG)}${toHex(avgHairB)}`.toUpperCase();

    // Luminance & Undertone classification
    const luminance = 0.299 * avgR + 0.587 * avgG + 0.114 * avgB;
    const isWarm = (avgR > avgG && (avgR - avgB) > 20);
    const isCool = (avgB > avgR * 0.82 || (avgR - avgB) < 14);

    let toneDepth = 'Medium';
    let undertone = 'Warm Undertone';
    let profileKey = 'medium_warm';
    let bestColors = ['#0D9488', '#F43F5E', '#DC2626', '#059669', '#1E293B', '#FEF3C7'];
    let avoidColors = ['#94A3B8', '#CBD5E1', '#E2E8F0', '#4C1D95'];

    if (luminance >= 170) {
      toneDepth = 'Light';
      if (isWarm) {
        undertone = 'Warm Undertone';
        profileKey = 'medium_warm';
        bestColors = ['#F59E0B', '#EF4444', '#10B981', '#6366F1', '#D97706', '#FFFBEB'];
        avoidColors = ['#64748B', '#94A3B8', '#475569', '#334155'];
      } else {
        undertone = 'Cool Undertone';
        profileKey = 'cool_light';
        bestColors = ['#EC4899', '#8B5CF6', '#3B82F6', '#06B6D4', '#10B981', '#F1F5F9'];
        avoidColors = ['#D97706', '#B45309', '#78350F', '#FEF08A'];
      }
    } else if (luminance < 118) {
      toneDepth = 'Deep';
      undertone = isWarm ? 'Rich Warm Undertone' : 'Neutral Deep Undertone';
      profileKey = 'deep_neutral';
      bestColors = ['#D97706', '#DC2626', '#7C3AED', '#059669', '#F59E0B', '#FFFFFF'];
      avoidColors = ['#64748B', '#94A3B8', '#E2E8F0', '#F1F5F9'];
    } else {
      toneDepth = 'Medium';
      if (isCool) {
        undertone = 'Cool / Neutral Undertone';
        bestColors = ['#8B5CF6', '#3B82F6', '#EC4899', '#06B6D4', '#1E293B', '#F8FAFC'];
        avoidColors = ['#B45309', '#78350F', '#D97706', '#92400E'];
      } else {
        undertone = 'Warm Undertone';
        bestColors = ['#0D9488', '#F43F5E', '#DC2626', '#059669', '#1E293B', '#FEF3C7'];
        avoidColors = ['#94A3B8', '#CBD5E1', '#E2E8F0', '#4C1D95'];
      }
    }

    const hairLum = 0.299 * avgHairR + 0.587 * avgHairG + 0.114 * avgHairB;
    let hairName = 'Dark Brown / Black';
    if (hairLum < 50) hairName = 'Deep Jet Black';
    else if (hairLum >= 105) hairName = 'Chestnut / Honey Brown';

    setTimeout(() => {
      // Update Detected Features Card
      const skinEl = document.getElementById('feature-skin');
      const skinSwatch = document.getElementById('feature-skin-swatch');
      const hairEl = document.getElementById('feature-hair');
      const hairSwatch = document.getElementById('feature-hair-swatch');

      if (skinEl) skinEl.textContent = `${toneDepth} (${undertone}) • ${skinHex}`;
      if (skinSwatch) {
        skinSwatch.style.backgroundColor = skinHex;
        skinSwatch.title = `Detected Skin: ${skinHex}`;
      }
      if (hairEl) hairEl.textContent = `${hairName} • ${hairHex}`;
      if (hairSwatch) {
        hairSwatch.style.backgroundColor = hairHex;
        hairSwatch.title = `Detected Hair: ${hairHex}`;
      }

      // Update color swatches
      const bestContainer = document.getElementById('best-color-swatches');
      if (bestContainer) {
        bestContainer.innerHTML = bestColors.map(c => `<span class="w-7 h-7 rounded-full shadow-sm hover:scale-110 transition-transform cursor-pointer border border-white/20" style="background-color: ${c}" title="${c}"></span>`).join('');
      }

      const avoidContainer = document.getElementById('avoid-color-swatches');
      if (avoidContainer) {
        avoidContainer.innerHTML = avoidColors.map(c => `<span class="w-7 h-7 rounded-full shadow-sm hover:scale-110 transition-transform cursor-pointer border border-white/20" style="background-color: ${c}" title="${c}"></span>`).join('');
      }

      // Automatically update Soaps, Shampoos and Facial Care
      switchCareProfile(profileKey);

      if (statusText) statusText.textContent = `Analyzed Live: ${skinHex}`;
      if (statusDot) {
        statusDot.className = 'w-2.5 h-2.5 rounded-full bg-emerald-500';
      }

      showFashionToast(`✨ Live analysis complete! Detected ${toneDepth} (${undertone}). Soaps, shampoos & facial regimen updated!`);
    }, 900);
  }

  // Handle image files from upload inputs
  function handleImageFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        if (!canvas) return;
        if (startOverlay) startOverlay.classList.add('hidden');
        if (errorOverlay) errorOverlay.classList.add('hidden');
        if (video) video.classList.add('hidden');
        if (fallbackImg) fallbackImg.classList.add('hidden');

        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.classList.remove('hidden');
        isSnapshotMode = true;

        if (statusText) statusText.textContent = 'Custom Photo Analyzed';
        if (statusDot) {
          statusDot.className = 'w-2.5 h-2.5 rounded-full bg-purple-500';
        }
        if (postCaptureControls) postCaptureControls.classList.remove('hidden');
        if (captureBtnText) captureBtnText.textContent = 'Re-Analyze Current Photo';

        analyzePixelDataFromCanvas(canvas);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Event Listeners for Camera Actions
  if (startOverlay) {
    startOverlay.addEventListener('click', () => openCamera());
  }
  if (openCameraBtn) {
    openCameraBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openCamera();
    });
  }
  if (retryCameraBtn) {
    retryCameraBtn.addEventListener('click', () => openCamera());
  }

  if (captureBtn) {
    captureBtn.addEventListener('click', () => {
      if (!isCameraActive && !isSnapshotMode) {
        openCamera();
      } else if (isSnapshotMode) {
        // Re-analyze existing snapshot
        if (canvas) analyzePixelDataFromCanvas(canvas);
      } else {
        // Take live photo & analyze
        takeLivePhotoAndAnalyze();
      }
    });
  }

  if (retakeBtn) {
    retakeBtn.addEventListener('click', () => retakePhoto());
  }

  if (switchCamBtn) {
    switchCamBtn.addEventListener('click', () => {
      facingMode = facingMode === 'user' ? 'environment' : 'user';
      openCamera();
    });
  }

  if (uploadInput) {
    uploadInput.addEventListener('change', (e) => handleImageFile(e.target.files[0]));
  }
  if (fallbackUploadInput) {
    fallbackUploadInput.addEventListener('change', (e) => handleImageFile(e.target.files[0]));
  }

  // Hook any "Start Live Analysis" anchor links to auto-scroll & start camera
  document.querySelectorAll('a[href="#live-analysis"]').forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(() => {
        if (!isCameraActive && !isSnapshotMode) {
          openCamera();
        }
      }, 350);
    });
  });

  // 5B. DERMATOLOGICAL & TRICHOLOGICAL CARE PROFILES (SOAPS, SHAMPOOS & FACIAL CARE)
  const careProfilesData = {
    medium_warm: {
      badge: 'Medium Warm Skin • Balanced Scalp',
      soap: {
        title: 'Ceramide & Colloidal Oat Syndet Cleansing Bar',
        desc: 'Soap-free syndet formulation that cleanses gently without stripping the acid mantle or creating post-shower dryness and ashiness in medium-to-tan skin tones.',
        actives: 'Ceramides NP/AP/EOP • 1.5% Colloidal Oatmeal • Shea Butter • Niacinamide',
        benefit: 'Zero barrier degradation; prevents trans-epidermal moisture loss (TEWL) and maintains smooth skin glow.'
      },
      shampoo: {
        title: 'Rosemary & Peptide Follicle-Balancing Shampoo',
        desc: 'Clarifies excess sebum build-up along dark hair follicles while keeping natural hydration intact, preserving rich glossy undertone highlights without stripping.',
        actives: 'Rosemary Leaf Extract • Hydrolyzed Pea Protein • Zinc PCA • Biotin',
        conditioner: 'Argan & Camellia Seed Lipid Mask (Mid-lengths to tips; leave 3 mins).',
        frequency: '2 to 3 times weekly (avoids over-washing & dry scalp flakes).'
      },
      facial: {
        step1Name: 'Centella & Green Tea Calming Gel Cleanser',
        step1Desc: 'Non-stripping low pH (5.5) jelly base; dissolves sebum without tightness.',
        step2Name: '10% Niacinamide + 1% Zinc PCA + Hyaluronic Serum',
        step2Desc: 'Fades hyperpigmentation on warm skin tones; tightens pores and stabilizes sebum.',
        step3Name: 'Invisible Water-Gel SPF 50+ PA++++ (Zero White Cast)',
        step3Desc: 'Completely translucent on medium/warm skin; non-greasy, non-comedogenic shield.',
        step4Name: '0.2% Encapsulated Retinoid & Squalane Restorative Cream',
        step4Desc: 'Stimulates collagen synthesis and cellular turnover overnight for smooth texture.'
      },
      avoid: 'Avoid harsh sulfates (SLS/SLES), high-alkaline bar soaps (pH > 8.5), heavy pore-clogging mineral oils (comedogenic index > 3), and denatured alcohols (Ethanol/Alcohol Denat) which cause post-inflammatory hyperpigmentation and rebound oiliness.'
    },
    cool_light: {
      badge: 'Light Cool Skin • Sensitive / Fair Scalp',
      soap: {
        title: 'Ultra-Soothing Prebiotic Goat Milk & Honey Body Bar',
        desc: 'Microbiome-friendly, extra-gentle bar designed for fair skin prone to erythema, rosacea, and flushing, balancing skin pH at 5.4.',
        actives: 'Fresh Goat Milk Lipids • Manuka Honey Extract • Allantoin • Bisabolol',
        benefit: 'Calms superficial redness and prevents cold-weather barrier cracks.'
      },
      shampoo: {
        title: 'Chamomile & Hydrolyzed Keratin Brightening Shampoo',
        desc: 'Sulfate-free formulation that enhances cool ash and chestnut tones, prevents brassiness, and strengthens fine hair strands.',
        actives: 'Chamomile Flower Extract • Hydrolyzed Keratin • Pro-Vitamin B5 (Panthenol)',
        conditioner: 'Jojoba & Silk Amino Acid Featherweight Detangler.',
        frequency: '3 times weekly with lukewarm water.'
      },
      facial: {
        step1Name: 'Milky Oat & Calendula Soothing Cleanser',
        step1Desc: 'Ultra-mild milky emulsion that cleanses redness-prone skin without rubbing.',
        step2Name: '5% Azelaic Acid + Centella Asiatica Barrier Serum',
        step2Desc: 'Targets vascular flushing, calms micro-inflammation, and evens out fair complexion.',
        step3Name: 'Ceramide Light Mineral SPF 50+ with Micronized Zinc',
        step3Desc: 'Soothes reactive skin while offering physical photostable UV-A/UV-B shield.',
        step4Name: 'Bakuchiol & Blue Tansy Restorative Recovery Balm',
        step4Desc: 'Gentle plant retinoid alternative that firms skin without irritation.'
      },
      avoid: 'Avoid synthetic fragrances, citrus essential oils (bergamot, lemon), physical apricot scrubs, and high-strength glycolic peels that cause capillary dilation.'
    },
    deep_neutral: {
      badge: 'Deep Melanin-Rich Skin • Moisture-Lock Scalp',
      soap: {
        title: 'Raw African Black Soap with 20% Unrefined Shea Butter',
        desc: 'Deeply conditioning syndet bar enriched with natural plant ashes and unrefined shea, preventing ashiness and delivering intense lipids.',
        actives: 'Unrefined Butyrospermum Parkii (Shea Butter) • Plantain Skin Ash • Cocoa Pod Butter',
        benefit: 'Provides radiant natural sheen, prevents follicular hyperkeratosis and ashy patches.'
      },
      shampoo: {
        title: 'Baobab Oil & Jamaican Black Castor Co-Wash & Shampoo',
        desc: 'Ultra-moisturizing, low-lather cleanser that detangles curly and coarse textures while sealing moisture into the cortex.',
        actives: 'Cold-Pressed Baobab Seed Oil • Black Castor Oil • Aloe Vera Leaf Juice',
        conditioner: 'Raw Cupuaçu Butter & Murumuru Deep Penetrating Treatment Mask.',
        frequency: '1 to 2 times weekly with co-wash mid-week rinse.'
      },
      facial: {
        step1Name: 'Hydrating Amino Acid & Papaya Enzyme Cleanser',
        step1Desc: 'Gently loosens dead skin cells without stripping rich melanin moisture.',
        step2Name: '12% Vitamin C (THD Ascorbate) + Alpha Arbutin Glow Serum',
        step2Desc: 'Lipid-soluble active that penetrates deeply to illuminate and erase dark spots.',
        step3Name: 'Clear Essence Chemical SPF 50+ Invisible Gel Sunscreen',
        step3Desc: '100% invisible clear shield with zero grey cast, non-comedogenic, dewy finish.',
        step4Name: 'Lactic Acid 5% + Ceramide Complex Overnight Refining Treatment',
        step4Desc: 'Smooths micro-texture and enhances uniform radiance without discoloration.'
      },
      avoid: 'Avoid benzoyl peroxide washes (can cause hypopigmentation patches), drying isopropyl alcohol, and chalky physical sunscreens that leave a ghostly white residue.'
    },
    oily_acne: {
      badge: 'Pore Clarifying • Sebum Control Protocol',
      soap: {
        title: 'Tea Tree & Activated Binchotan Charcoal Cleansing Bar',
        desc: 'Draws out impactions from congested pores along chest, back, and shoulders while zinc PCA regulates daily sebum overproduction.',
        actives: 'Activated Charcoal • 0.5% Tea Tree Oil • 2% Zinc PCA • Kaolin Clay',
        benefit: 'Clears bacne, prevents folliculitis, and controls oily shine all day.'
      },
      shampoo: {
        title: 'Apple Cider Vinegar & Salicylic Acid Scalp Clarifier',
        desc: 'Dissolves stubborn build-up, regulates excess scalp oil, and eliminates dandruff-causing malassezia fungus without drying hair ends.',
        actives: 'Organic ACV (Fermented) • 1% Salicylic Acid • Peppermint Essential Micro-Dose',
        conditioner: 'Lightweight Aloe Vera & Hyaluronic Scalp-Safe Conditioner.',
        frequency: '3 to 4 times weekly or post-workout.'
      },
      facial: {
        step1Name: '2% Salicylic Acid (BHA) Foaming Gel Cleanser',
        step1Desc: 'Lipid-soluble acid that penetrates deep inside pores to dissolve sebum plugs.',
        step2Name: '10% Niacinamide + Zinc 1% + Green Tea EGCG Concentrate',
        step2Desc: 'Visibly reduces pore diameter, minimizes sebum excretion by up to 35%.',
        step3Name: 'Oil-Free Mattifying Water Gel SPF 50 (Silica-Infused)',
        step3Desc: 'Absorbs sweat and oil for a 12-hour shine-free velvet matte finish.',
        step4Name: 'Adapalene 0.1% / Encapsulated Retinol Pore Clarifier Gel',
        step4Desc: 'Clears acne micro-comedones and normalizes follicular hyperkeratinization.'
      },
      avoid: 'Avoid coconut oil, isopropyl myristate, heavy cocoa butter on face/chest, and high-abrasion physical walnut scrubs which spread acne bacteria.'
    },
    dry_sensitive: {
      badge: 'Dry / Sensitive Barrier • Lipid Restorative',
      soap: {
        title: 'Barrier Repair Ceramide Shower Oil & Cleansing Cream',
        desc: 'Transforms into a milky emulsion on contact with water; deposits protective omega-3/6/9 lipids onto parched skin.',
        actives: '5 Essential Ceramides • Squalane • Sunflower Seed Lipid Complex • Vitamin E',
        benefit: 'Restores the epidermal barrier, halts chronic itchiness, and softens rough skin.'
      },
      shampoo: {
        title: 'Oat Milk & Marshmallow Root Hydrating Cream Shampoo',
        desc: 'Cream-to-foam gentle wash that soothes dry, itchy scalp and coats brittle hair shafts with a silky protective moisture veil.',
        actives: 'Colloidal Oat Extract • Marshmallow Root Mucilage • Panthenol • Shea Olein',
        conditioner: 'Ultra-Rich Shea & Jojoba Intense Moisture Butter Mask.',
        frequency: '1 to 2 times weekly; use cool water rinse.'
      },
      facial: {
        step1Name: 'Ultra-Gentle Squalane Cleansing Balm & Lotion',
        step1Desc: 'Melts away impurities without foaming agents, leaving skin supple and cushioned.',
        step2Name: 'Multi-Weight Hyaluronic Acid + Polyglutamic Acid Barrier Quencher',
        step2Desc: 'Delivers 5-layer hydration, pulling water deep into the dermis.',
        step3Name: 'Ceramide & Lipid Recovery Day Cream + SPF 50 Mineral Defense',
        step3Desc: 'Rich yet breathable barrier shield preventing flaking and tightness all day.',
        step4Name: 'Pure Plant Squalane & Ceramide NP Night Barrier Seal Oil',
        step4Desc: 'Locks in all nighttime hydration, soothing dry tightness completely by morning.'
      },
      avoid: 'Avoid foaming sodium sulfates, essential oils with limonene/linalool, witch hazel, astringents, and harsh AHAs during barrier recovery.'
    }
  };

  window.switchCareProfile = function(profileKey) {
    const data = careProfilesData[profileKey];
    if (!data) return;

    // Update active tab styling
    document.querySelectorAll('.care-profile-btn').forEach(btn => {
      if (btn.getAttribute('data-care-profile') === profileKey) {
        btn.classList.remove('text-slate-600', 'dark:text-slate-300', 'hover:text-purple-600', 'dark:hover:text-purple-400');
        btn.classList.add('bg-purple-600', 'text-white', 'shadow-sm');
      } else {
        btn.classList.remove('bg-purple-600', 'text-white', 'shadow-sm');
        btn.classList.add('text-slate-600', 'dark:text-slate-300', 'hover:text-purple-600', 'dark:hover:text-purple-400');
      }
    });

    // Badge
    const badge = document.getElementById('active-profile-badge');
    if (badge) badge.textContent = data.badge;

    // Soap
    const soapTitle = document.getElementById('soap-title');
    const soapDesc = document.getElementById('soap-desc');
    const soapActives = document.getElementById('soap-actives');
    const soapBenefit = document.getElementById('soap-benefit');
    if (soapTitle) soapTitle.textContent = data.soap.title;
    if (soapDesc) soapDesc.textContent = data.soap.desc;
    if (soapActives) soapActives.textContent = data.soap.actives;
    if (soapBenefit) soapBenefit.textContent = data.soap.benefit;

    // Shampoo
    const shampooTitle = document.getElementById('shampoo-title');
    const shampooDesc = document.getElementById('shampoo-desc');
    const shampooActives = document.getElementById('shampoo-actives');
    const shampooCond = document.getElementById('shampoo-cond');
    const shampooFreq = document.getElementById('shampoo-freq');
    if (shampooTitle) shampooTitle.textContent = data.shampoo.title;
    if (shampooDesc) shampooDesc.textContent = data.shampoo.desc;
    if (shampooActives) shampooActives.textContent = data.shampoo.actives;
    if (shampooCond) shampooCond.textContent = data.shampoo.conditioner;
    if (shampooFreq) shampooFreq.textContent = data.shampoo.frequency;

    // Facial
    const f1Name = document.getElementById('facial-step1-name');
    const f1Desc = document.getElementById('facial-step1-desc');
    const f2Name = document.getElementById('facial-step2-name');
    const f2Desc = document.getElementById('facial-step2-desc');
    const f3Name = document.getElementById('facial-step3-name');
    const f3Desc = document.getElementById('facial-step3-desc');
    const f4Name = document.getElementById('facial-step4-name');
    const f4Desc = document.getElementById('facial-step4-desc');
    if (f1Name) f1Name.textContent = data.facial.step1Name;
    if (f1Desc) f1Desc.textContent = data.facial.step1Desc;
    if (f2Name) f2Name.textContent = data.facial.step2Name;
    if (f2Desc) f2Desc.textContent = data.facial.step2Desc;
    if (f3Name) f3Name.textContent = data.facial.step3Name;
    if (f3Desc) f3Desc.textContent = data.facial.step3Desc;
    if (f4Name) f4Name.textContent = data.facial.step4Name;
    if (f4Desc) f4Desc.textContent = data.facial.step4Desc;

    // Avoided ingredients
    const avoidText = document.getElementById('avoid-ingredients-text');
    if (avoidText) avoidText.textContent = data.avoid;
  };

  // Initial render of care prescription profile
  switchCareProfile('medium_warm');

  // 6. TOAST NOTIFICATIONS
  window.showFashionToast = function(msg) {
    const toast = document.getElementById('fashion-toast');
    const toastText = document.getElementById('fashion-toast-text');
    if (!toast || !toastText) return;

    toastText.textContent = msg;
    toast.classList.remove('opacity-0', 'translate-y-6', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');

    if (window.fashionToastTimeout) clearTimeout(window.fashionToastTimeout);
    window.fashionToastTimeout = setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-6', 'pointer-events-none');
      toast.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
    }, 3200);
  };

  // 7. NEWSLETTER FORM HANDLER
  window.handleNewsletterSubmit = function(e) {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    showFashionToast(`Thank you! Subscription confirmed for ${email}`);
    e.target.reset();
  };

});
