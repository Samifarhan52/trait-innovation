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

  // 5. CAMERA FUNCTIONALITY & ML SCAN SIMULATOR
  const video = document.getElementById('webcam-video');
  const fallbackImg = document.getElementById('fallback-camera-img');
  const statusText = document.getElementById('camera-status-text');
  const switchCamBtn = document.getElementById('switch-camera-btn');
  const captureBtn = document.getElementById('capture-btn');
  const uploadInput = document.getElementById('image-upload-input');
  let currentStream = null;
  let facingMode = 'user';

  async function startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (statusText) statusText.textContent = 'Preview Mode';
      return;
    }

    try {
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode }
      });
      currentStream = stream;
      if (video) {
        video.srcObject = stream;
        video.classList.remove('hidden');
        if (fallbackImg) fallbackImg.classList.add('hidden');
      }
      if (statusText) statusText.textContent = 'Live Camera Active';
    } catch (err) {
      console.warn('Camera access not granted or unavailable:', err);
      if (statusText) statusText.textContent = 'Upload / Demo Mode';
      if (video) video.classList.add('hidden');
      if (fallbackImg) fallbackImg.classList.remove('hidden');
    }
  }

  // Attempt initial camera start silently
  startCamera();

  if (switchCamBtn) {
    switchCamBtn.addEventListener('click', () => {
      facingMode = facingMode === 'user' ? 'environment' : 'user';
      startCamera();
    });
  }

  if (uploadInput) {
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          if (fallbackImg) {
            fallbackImg.src = evt.target.result;
            fallbackImg.classList.remove('hidden');
          }
          if (video) video.classList.add('hidden');
          if (statusText) statusText.textContent = 'Custom Image Analyzed';
          triggerMLAnalysisSimulation();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // ML Analysis trigger on capture click
  if (captureBtn) {
    captureBtn.addEventListener('click', () => {
      triggerMLAnalysisSimulation();
    });
  }

  function triggerMLAnalysisSimulation() {
    showFashionToast('AI scanning facial landmarks & undertone...');
    
    // Animate scan overlay glow
    const overlay = document.getElementById('scan-overlay');
    if (overlay) {
      overlay.classList.add('scale-105');
      setTimeout(() => overlay.classList.remove('scale-105'), 1200);
    }

    // Dynamic AI profile updates
    const profiles = [
      {
        skin: 'Medium (Warm Undertone)',
        skinColor: '#E0A98B',
        hair: 'Dark Brown / Black',
        hairColor: '#3B2317',
        face: 'Oval',
        style: 'Classic & Trendy',
        best: ['#0D9488', '#F43F5E', '#DC2626', '#059669', '#1E293B', '#FEF3C7'],
        avoid: ['#94A3B8', '#CBD5E1', '#E2E8F0', '#4C1D95']
      },
      {
        skin: 'Light (Cool Undertone)',
        skinColor: '#F5D0C5',
        hair: 'Chestnut Brown',
        hairColor: '#5C3A21',
        face: 'Heart',
        style: 'Minimalist & Chic',
        best: ['#EC4899', '#8B5CF6', '#3B82F6', '#06B6D4', '#10B981', '#F1F5F9'],
        avoid: ['#D97706', '#B45309', '#78350F', '#FEF08A']
      },
      {
        skin: 'Deep (Neutral Undertone)',
        skinColor: '#8D5B4C',
        hair: 'Jet Black',
        hairColor: '#1A1A1A',
        face: 'Square',
        style: 'Bold & Regal',
        best: ['#D97706', '#DC2626', '#7C3AED', '#059669', '#F59E0B', '#FFFFFF'],
        avoid: ['#64748B', '#94A3B8', '#E2E8F0', '#F1F5F9']
      }
    ];

    const chosen = profiles[Math.floor(Math.random() * profiles.length)];

    setTimeout(() => {
      document.getElementById('feature-skin').textContent = chosen.skin;
      document.getElementById('feature-skin-swatch').style.backgroundColor = chosen.skinColor;
      document.getElementById('feature-hair').textContent = chosen.hair;
      document.getElementById('feature-hair-swatch').style.backgroundColor = chosen.hairColor;
      document.getElementById('feature-face').textContent = chosen.face;
      document.getElementById('feature-style').textContent = chosen.style;

      // Update color swatches
      const bestContainer = document.getElementById('best-color-swatches');
      if (bestContainer) {
        bestContainer.innerHTML = chosen.best.map(c => `<span class="w-7 h-7 rounded-full shadow-sm hover:scale-110 transition-transform cursor-pointer" style="background-color: ${c}"></span>`).join('');
      }

      const avoidContainer = document.getElementById('avoid-color-swatches');
      if (avoidContainer) {
        avoidContainer.innerHTML = chosen.avoid.map(c => `<span class="w-7 h-7 rounded-full shadow-sm hover:scale-110 transition-transform cursor-pointer" style="background-color: ${c}"></span>`).join('');
      }

      showFashionToast('Analysis complete! Palette & recommendations updated.');
    }, 1000);
  }

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
