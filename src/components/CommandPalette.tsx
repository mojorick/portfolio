import React, { useEffect, useState } from 'react';
import { Language, ViewMode } from '../types';
import { Terminal, Search, ArrowRight, Sparkles, Sigma, Train, Briefcase, GraduationCap, Globe, X } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  setLang: (l: Language) => void;
  mode: ViewMode;
  setMode: (m: ViewMode) => void;
  onOpenContact: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  lang,
  setLang,
  mode,
  setMode,
  onOpenContact
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'eigen-lab',
      label: { fr: 'Ouvrir Démonstrateur Algèbre Spectrale ➔ IA', en: 'Open Spectral Algebra ➔ AI Lab' },
      category: 'Lab',
      icon: Sigma,
      action: () => {
        window.location.hash = '#interactive-lab';
        onClose();
      }
    },
    {
      id: 'railway-lab',
      label: { fr: 'Ouvrir Démonstrateur SNCF & Re-routage (RO)', en: 'Open SNCF & Rerouting Lab (OR)' },
      category: 'Lab',
      icon: Train,
      action: () => {
        window.location.hash = '#interactive-lab';
        onClose();
      }
    },
    {
      id: 'cifre',
      label: { fr: 'Consulter les Axes de Thèse CIFRE (IA / RO)', en: 'Explore CIFRE PhD Research Axes' },
      category: 'Research',
      icon: GraduationCap,
      action: () => {
        window.location.hash = '#research';
        onClose();
      }
    },
    {
      id: 'experience',
      label: { fr: 'Voir l\'Expérience Data Engineer chez SNCF', en: 'View SNCF Data Engineer Experience' },
      category: 'Experience',
      icon: Briefcase,
      action: () => {
        window.location.hash = '#experience';
        onClose();
      }
    },
    {
      id: 'toggle-mode',
      label: {
        fr: `Basculer en mode ${mode === 'recruiter' ? 'Chercheur / CIFRE' : 'Recruteur Entreprise'}`,
        en: `Switch to ${mode === 'recruiter' ? 'PhD / Researcher' : 'Industry Recruiter'} mode`
      },
      category: 'View',
      icon: Sparkles,
      action: () => {
        setMode(mode === 'recruiter' ? 'researcher' : 'recruiter');
        onClose();
      }
    },
    {
      id: 'toggle-lang',
      label: {
        fr: `Changer la langue vers l'anglais (EN)`,
        en: `Switch language to French (FR)`
      },
      category: 'Language',
      icon: Globe,
      action: () => {
        setLang(lang === 'fr' ? 'en' : 'fr');
        onClose();
      }
    },
    {
      id: 'contact',
      label: { fr: 'Ouvrir les Coordonnées & Contact Direct', en: 'Open Contact Details' },
      category: 'Action',
      icon: ArrowRight,
      action: () => {
        onClose();
        onOpenContact();
      }
    }
  ];

  const filteredActions = actions.filter(a =>
    a.label[lang].toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/70 backdrop-blur-md">
      <div className="w-full max-w-xl rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden animate-fade-in">
        {/* Search Input bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-900/60">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === 'fr' ? 'Rechercher une action, section, simulateur...' : 'Search action, section, simulator...'}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
          />
          <button onClick={onClose} className="p-1 rounded text-slate-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action list */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredActions.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-500 font-mono">
              Aucun résultat pour "{query}"
            </div>
          ) : (
            filteredActions.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-900/90 text-xs flex items-center justify-between group transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-cyan-400 group-hover:text-blue-400 transition-colors" />
                  <span className="text-slate-200 group-hover:text-white font-medium">
                    {item.label[lang]}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-500 group-hover:text-slate-400 border border-slate-800">
                  {item.category}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer tip */}
        <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950 text-[11px] font-mono text-slate-500 flex items-center justify-between">
          <span>Navigation Clavier : Échap pour fermer</span>
          <span>hemerickmorie.com</span>
        </div>
      </div>
    </div>
  );
};
