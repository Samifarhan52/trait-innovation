import React, { useState } from 'react';
import NetflixIntro from './components/NetflixIntro';
import Background3DCanvas from './components/Background3DCanvas';
import ContinuousPageFlow from './components/ContinuousPageFlow';
import Navbar from './components/Navbar';
import HeroSection from './components/Hero/HeroSection';
import LeadershipStaggeredFlow from './components/Leadership/LeadershipStaggeredFlow';
import SolutionsGrid from './components/Solutions/SolutionsGrid';
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs';
import FAQSection from './components/FAQ/FAQSection';
import FinalCTA from './components/CTA/FinalCTA';
import Footer from './components/Footer/Footer';

export default function App() {
  const [introLoaded, setIntroLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false); // Default Light Theme matching reference mockup

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-500 selection:bg-brand-500 selection:text-white font-sans overflow-x-hidden ${
      isDark ? 'bg-[#040814] text-white' : 'bg-[#F8FAFC] text-[#0A0F1D]'
    }`}>
      {/* 1. INTRO REVEAL PRELOADER ('T' -> TRAIT INNOVATION) */}
      {!introLoaded && <NetflixIntro onComplete={() => setIntroLoaded(true)} />}

      {/* 2. CONTINUOUS 3D BACKGROUND WEBGL CANVAS */}
      <Background3DCanvas />

      {/* 3. CONTINUOUS BIG ANIMATED PAGE FLOW STREAM */}
      <ContinuousPageFlow />

      {/* 4. MAIN APPLICATION CONTENT */}
      <div className="relative z-10">
        {/* NAVBAR WITH THEME TOGGLE BUTTON */}
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
        
        <main>
          {/* HERO SECTION MATCHING 1:1 REFERENCE MOCKUP */}
          <HeroSection isDark={isDark} />

          {/* LEADERSHIP SECTION (RE-TRIGGERING SCROLL REVEAL MATCHING SKETCH) */}
          <LeadershipStaggeredFlow isDark={isDark} />

          {/* FLAGSHIP SOLUTIONS SHOWCASE */}
          <SolutionsGrid isDark={isDark} />

          {/* WHY CHOOSE US (4 CORE IDEAS) */}
          <WhyChooseUs isDark={isDark} />

          {/* FREQUENTLY ASKED QUESTIONS */}
          <FAQSection isDark={isDark} />

          {/* FINAL CTA */}
          <FinalCTA isDark={isDark} />
        </main>

        {/* FOOTER */}
        <Footer isDark={isDark} />
      </div>
    </div>
  );
}
