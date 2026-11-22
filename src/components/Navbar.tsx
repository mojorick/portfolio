import React, { useState } from 'react';
import type { Language, ViewMode } from '../types';
import { personalInfo } from '../data/content';
import { Globe, Terminal, Briefcase, GraduationCap, Code2, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  onOpenCommand: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  mode,
  setMode,
  onOpenCommand,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#interactive-lab', label: { fr: 'Laboratoire', en: 'Live Lab' } },
    { href: '#experience', label: { fr: 'SNCF Voyageurs', en: 'SNCF Experience' } },
    { href: '#research', label: { fr: 'Vision CIFRE / RO', en: 'CIFRE Research' } },
    { href: '#education', label: { fr: 'Formation', en: 'Education' } },
    { href: '#skills', label: { fr: 'Compétences', en: 'Skills' } },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono font-bold text-xs text-zinc-100 group-hover:border-zinc-500 transition-colors">
            JM
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-zinc-100 group-hover:text-white transition-colors">
              {personalInfo.shortName}
            </span>
            <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
              Data Engineer — SNCF Voyageurs
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {link.label[lang]}
            </a>
          ))}
        </nav>

        {/* Controls & Quick Actions */}
        <div className="flex items-center gap-2.5">
          {/* View Mode Toggle (No emojis, clean monochrome) */}
          <div className="hidden sm:flex items-center p-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono">
            <button
              onClick={() => setMode('recruiter')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                mode === 'recruiter'
                  ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {lang === 'fr' ? 'Entreprise' : 'Industry'}
            </button>
            <button
              onClick={() => setMode('researcher')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                mode === 'researcher'
                  ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {lang === 'fr' ? 'Recherche / CIFRE' : 'Research / PhD'}
            </button>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            className="px-2 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
            title="Switch Language"
          >
            <span className="font-semibold">{lang.toUpperCase()}</span>
          </button>

          {/* Command Palette Button */}
          <button
            onClick={onOpenCommand}
            className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-mono transition-colors cursor-pointer"
            title="Recherche rapide (Ctrl+K)"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[10px] text-zinc-500">⌘K</span>
          </button>

          {/* Contact Button */}
          <button
            onClick={onOpenContact}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            {lang === 'fr' ? 'Contact' : 'Contact'}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-[#09090b] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900"
            >
              {link.label[lang]}
            </a>
          ))}

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-mono">Vue :</span>
            <div className="flex gap-2 text-xs font-mono">
              <button
                onClick={() => setMode('recruiter')}
                className={`px-3 py-1 rounded ${
                  mode === 'recruiter' ? 'bg-zinc-800 text-white' : 'bg-zinc-900 text-zinc-400'
                }`}
              >
                Entreprise
              </button>
              <button
                onClick={() => setMode('researcher')}
                className={`px-3 py-1 rounded ${
                  mode === 'researcher' ? 'bg-zinc-800 text-white' : 'bg-zinc-900 text-zinc-400'
                }`}
              >
                Recherche
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
