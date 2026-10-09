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

      // Synchronize care prescriptions (soaps, shampoos, facial regimen)
      let profileKey = 'medium_warm';
      if (chosen.skin.includes('Light')) profileKey = 'cool_light';
      else if (chosen.skin.includes('Deep')) profileKey = 'deep_neutral';
      switchCareProfile(profileKey);

      showFashionToast('Analysis complete! Palette & care recommendations updated.');
    }, 1000);
  }

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
