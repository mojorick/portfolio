import React, { useEffect, useState } from 'react';
import type { Language, ViewMode } from '../types';
import { Search, ArrowRight, Sigma, Train, Briefcase, GraduationCap, Globe, X } from 'lucide-react';

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
      label: { fr: 'Laboratoire Algèbre Spectrale (MP* ➔ IA)', en: 'Spectral Algebra ➔ AI Lab' },
      category: 'Lab',
      icon: Sigma,
      action: () => {
        window.location.hash = '#interactive-lab';
        onClose();
      }
    },
    {
      id: 'railway-lab',
      label: { fr: 'Simulateur Régulation Ferroviaire SNCF (RO)', en: 'SNCF Railway Rerouting Lab (OR)' },
      category: 'Lab',
      icon: Train,
      action: () => {
        window.location.hash = '#interactive-lab';
        onClose();
      }
    },
    {
      id: 'cifre',
      label: { fr: 'Axes de Recherche Thèse CIFRE (IA / RO)', en: 'CIFRE PhD Research Proposal' },
      category: 'Recherche',
      icon: GraduationCap,
      action: () => {
        window.location.hash = '#research';
        onClose();
      }
    },
    {
      id: 'experience',
      label: { fr: 'Expérience Data Engineer chez SNCF Voyageurs', en: 'SNCF Data Engineering Experience' },
      category: 'Carrière',
      icon: Briefcase,
      action: () => {
        window.location.hash = '#experience';
        onClose();
      }
    },
    {
      id: 'toggle-mode',
      label: {
        fr: `Passer en vue ${mode === 'recruiter' ? 'Recherche / CIFRE' : 'Entreprise'}`,
        en: `Switch to ${mode === 'recruiter' ? 'PhD / Research' : 'Industry'} view`
      },
      category: 'Vue',
      icon: ArrowRight,
      action: () => {
        setMode(mode === 'recruiter' ? 'researcher' : 'recruiter');
        onClose();
      }
    },
    {
      id: 'toggle-lang',
      label: {
        fr: `Basculer la langue vers l'anglais (EN)`,
        en: `Switch language to French (FR)`
      },
      category: 'Langue',
      icon: Globe,
      action: () => {
        setLang(lang === 'fr' ? 'en' : 'fr');
        onClose();
      }
    },
    {
      id: 'contact',
      label: { fr: 'Afficher les Coordonnées Directes', en: 'Open Contact Details' },
      category: 'Contact',
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden">
        <div className="flex items-center px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
          <Search className="w-4 h-4 text-zinc-500 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === 'fr' ? 'Rechercher une section, un démonstrateur...' : 'Search section, simulator...'}
            autoFocus
            className="w-full bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none font-mono"
          />
          <button onClick={onClose} className="p-1 text-zinc-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filteredActions.length === 0 ? (
            <div className="py-6 text-center text-xs text-zinc-500 font-mono">
              Aucun résultat pour "{query}"
            </div>
          ) : (
            filteredActions.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-900 text-xs flex items-center justify-between group transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
                  <span className="text-zinc-300 group-hover:text-white">
                    {item.label[lang]}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-500 border border-zinc-800">
                  {item.category}
                </span>
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 border-t border-zinc-800 bg-zinc-950 text-[10px] font-mono text-zinc-500 flex items-center justify-between">
          <span>Échap pour fermer</span>
          <span>hemerickmorie.com</span>
        </div>
      </div>
    </div>
  );
};
