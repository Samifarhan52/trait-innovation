import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Cpu, Sun, Moon } from 'lucide-react';

export default function Navbar({ isDark, onToggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Why Choose Us', href: '#why-choose-us' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? isDark
            ? 'bg-slate-950/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-md'
            : 'bg-white/85 backdrop-blur-xl border-b border-slate-200/80 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* LEFT LOGO & BRAND TEXT MATCHING MOCKUP */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-brand-accent text-white overflow-hidden shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300">
            <span className="font-mono font-extrabold text-xl">T</span>
          </div>
          <div className="flex flex-col">
            <span className={`font-extrabold text-lg tracking-tight leading-none font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
              TRAIT<span className="text-brand-500 font-light">INNOVATION</span>
            </span>
            <span className="text-[8px] font-mono tracking-widest text-slate-400 uppercase mt-0.5">
              IDEAS | TECHNOLOGY | REAL IMPACT
            </span>
          </div>
        </a>

        {/* DESKTOP FLOATING PILL NAVIGATION CENTER */}
        <nav className={`hidden md:flex items-center gap-1 p-1.5 rounded-full border backdrop-blur-md ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100/80 border-slate-200/80'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative px-5 py-2 text-sm font-medium transition-colors duration-300 group rounded-full ${
                isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{link.name}</span>
              <span className="absolute bottom-1 left-5 right-5 h-[2px] bg-brand-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            </a>
          ))}
        </nav>

        {/* RIGHT CTAS & THEME TOGGLE */}
        <div className="hidden md:flex items-center gap-3">
          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={onToggleTheme}
            className={`p-2.5 rounded-full border transition-all duration-300 ${
              isDark ? 'bg-white/10 border-white/15 text-amber-300 hover:bg-white/20' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            aria-label="Toggle Theme Mode"
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href="#contact"
            className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-slate-900 rounded-full overflow-hidden shadow-md hover:shadow-xl hover:shadow-brand-500/20 transition-all duration-300 group"
          >
            <span className="relative flex items-center gap-2">
              Let's Talk
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE FULLSCREEN MENU */}
      {mobileMenuOpen && (
        <div className={`md:hidden fixed inset-x-0 top-[70px] border-b p-6 shadow-2xl flex flex-col gap-6 animate-in slide-in-from-top duration-300 ${
          isDark ? 'bg-slate-950/95 border-white/10 text-white' : 'bg-white/95 border-slate-200 text-slate-800'
        }`}>
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium py-2 border-b border-slate-100 dark:border-white/5"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 text-center text-white font-bold bg-slate-900 rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              Let's Talk
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
