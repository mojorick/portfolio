import React from 'react';
import { Language, ViewMode } from '../types';
import { personalInfo } from '../data/content';
import { Globe, Terminal, GraduationCap, Briefcase, FileText, Send, Sparkles, Code2, Menu, X } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { href: '#interactive-lab', label: { fr: 'Lab Interactif', en: 'Live Lab' }, icon: Sparkles },
    { href: '#experience', label: { fr: 'Expérience SNCF', en: 'SNCF Experience' }, icon: Briefcase },
    { href: '#research', label: { fr: 'Vision CIFRE / RO', en: 'CIFRE Research' }, icon: GraduationCap },
    { href: '#education', label: { fr: 'Formation MP* & CESI', en: 'Education' }, icon: Code2 },
    { href: '#skills', label: { fr: 'Arsenal Technique', en: 'Skills' }, icon: Terminal },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-500 p-0.5 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-mono font-bold text-sm text-cyan-400 group-hover:text-white transition-colors">
              JM
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white group-hover:text-blue-400 transition-colors">
              {personalInfo.shortName}
            </span>
            <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
              Data Engineer • MP* ➔ IA / RO
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all flex items-center gap-1.5"
            >
              <link.icon className="w-3.5 h-3.5 text-slate-400" />
              <span>{link.label[lang]}</span>
            </a>
          ))}
        </nav>

        {/* Controls & Quick Actions */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle (Recruiter vs Researcher) */}
          <div className="hidden sm:flex items-center p-0.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono">
            <button
              onClick={() => setMode('recruiter')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                mode === 'recruiter'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Affichage orienté impact entreprise & réalisations"
            >
              {lang === 'fr' ? '💼 Recruteur' : '💼 Industry'}
            </button>
            <button
              onClick={() => setMode('researcher')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                mode === 'researcher'
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Affichage orienté formalisme mathématique & Thèse CIFRE"
            >
              {lang === 'fr' ? '🔬 CIFRE / RO' : '🔬 PhD / OR'}
            </button>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            className="p-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="uppercase font-semibold">{lang}</span>
          </button>

          {/* Command Palette Button */}
          <button
            onClick={onOpenCommand}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
            title="Ouvrir la palette de commandes (Ctrl+K)"
          >
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">⌘K</span>
          </button>

          {/* Contact CTA */}
          <button
            onClick={onOpenContact}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === 'fr' ? 'Me Contacter' : 'Get in Touch'}</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900"
            >
              <link.icon className="w-4 h-4 text-cyan-400" />
              <span>{link.label[lang]}</span>
            </a>
          ))}

          {/* Mobile mode switch */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">Mode d'affichage :</span>
            <div className="flex gap-2 text-xs font-mono">
              <button
                onClick={() => setMode('recruiter')}
                className={`px-3 py-1 rounded-lg ${
                  mode === 'recruiter' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                Recruteur
              </button>
              <button
                onClick={() => setMode('researcher')}
                className={`px-3 py-1 rounded-lg ${
                  mode === 'researcher' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                CIFRE / RO
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
