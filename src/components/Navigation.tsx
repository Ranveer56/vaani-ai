import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Menu, X, Cpu, Activity, Radio, Volume2 } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  systemHealth?: any;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
  systemHealth,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'START' },
    { id: 'workspace', label: 'ASK' },
    { id: 'evidence', label: 'EVIDENCE' },
    { id: 'pipeline', label: 'PIPELINE' },
    { id: 'metrics', label: 'METRICS' },
    { id: 'dataset', label: 'DATASET' },
    { id: 'architecture', label: 'SYSTEM' },
    { id: 'compliance', label: 'AUDIT' },
  ];

  return (
    <>
      {/* Floating Top Navigation Bar */}
      <header
        id="vaani-nav-header"
        className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ${
          scrolled ? 'translate-y-0' : 'translate-y-1'
        }`}
      >
        <div
          id="vaani-nav-pill"
          className="flex items-center justify-between gap-4 px-5 py-2.5 rounded-full bg-slate-950/80 backdrop-blur-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-950/40 max-w-6xl w-full"
        >
          {/* Brand Logo */}
          <button
            id="vaani-nav-brand"
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px] shadow-[0_0_12px_rgba(6,182,212,0.5)]">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-extrabold tracking-[0.25em] text-white uppercase group-hover:text-cyan-300 transition-colors">
                  VAANI AI
                </span>
                <span className="px-1.5 py-0.2 rounded bg-cyan-500/15 border border-cyan-500/30 text-[8px] font-mono font-semibold text-cyan-300">
                  AURORA
                </span>
              </div>
              <span className="text-[9px] tracking-widest text-slate-400 uppercase -mt-0.5">
                SPARKMIND – VAA
              </span>
            </div>
          </button>

          {/* Desktop Navigation Items */}
          <nav id="vaani-desktop-menu" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-cyan-200 bg-cyan-500/20 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action / Status & CTA */}
          <div className="flex items-center gap-3">
            {systemHealth && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/20 text-[10px] text-slate-300 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                <span className="text-cyan-300 font-semibold">{systemHealth.totalChunks || 12} CHUNKS</span>
              </div>
            )}

            <button
              id="nav-cta-try"
              onClick={() => onNavigate('workspace')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 text-xs font-bold tracking-wide hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
            >
              <span>TRY VAANI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full bg-slate-900 border border-cyan-500/20 text-slate-300 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="vaani-mobile-menu"
          className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-3xl flex flex-col pt-24 px-6 lg:hidden"
        >
          <div className="flex flex-col gap-2.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-3.5 px-4 rounded-xl text-left text-xs uppercase tracking-widest font-bold border transition-all ${
                  activeSection === item.id
                    ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/50 shadow-lg shadow-cyan-950/50'
                    : 'bg-slate-900/60 text-slate-300 border-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Left Desktop Vertical Section Indicator */}
      <aside
        id="vaani-sidebar-indicator"
        className="hidden 2xl:flex fixed left-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-3.5 text-[10px] uppercase font-mono tracking-widest text-slate-500"
      >
        <span className="text-[9px] text-cyan-400/80 font-bold tracking-[0.25em] -mb-1">INDEX</span>
        {navItems.map((item, idx) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3 text-left group transition-colors ${
                isActive ? 'text-cyan-300 font-bold' : 'hover:text-slate-300'
              }`}
            >
              <div
                className={`h-[1px] transition-all duration-300 ${
                  isActive
                    ? 'w-7 bg-cyan-400 shadow-[0_0_8px_#22d3ee]'
                    : 'w-2.5 bg-slate-800 group-hover:w-4 group-hover:bg-slate-600'
                }`}
              />
              <span>{`0${idx} ${item.label}`}</span>
            </button>
          );
        })}
      </aside>
    </>
  );
};
