import React from 'react';
import { Language } from '../types';
import { skillCategories } from '../data/content';
import { Sigma, Database, Code2, Sparkles, Music, Terminal, Check } from 'lucide-react';

interface SkillsProps {
  lang: Language;
}

export const SkillsSection: React.FC<SkillsProps> = ({ lang }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sigma':
        return <Sigma className="w-5 h-5 text-purple-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-blue-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      default:
        return <Terminal className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 md:py-28 relative bg-slate-950/40 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Compétences & Arsenal' : 'Technical Arsenal'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'fr' ? 'La Boîte à Outils Complète' : 'Comprehensive Tech Stack'}
          </h2>
          <p className="mt-3 text-slate-400 text-sm md:text-base">
            {lang === 'fr'
              ? 'Un profil équilibré : de l\'abstraction mathématique pure (MPSI/MP*) aux frameworks de production modernes.'
              : 'A balanced profile: from theoretical mathematical abstractions (MP*) to modern production software.'}
          </p>
        </div>

        {/* 4 Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-950/80 hover:border-slate-700 transition-all flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  {getIcon(cat.icon)}
                </div>
                <h3 className="text-sm font-bold text-white">
                  {cat.name[lang]}
                </h3>
              </div>

              <div className="space-y-2.5 flex-1">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 flex items-center gap-2 hover:bg-slate-900 hover:border-slate-700 transition-all"
                  >
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Personal Touch / Piano Jazz Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-950 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Music className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                {lang === 'fr' ? 'La Créativité au-delà du Code : Piano Jazz & Contemporain' : 'Creative Rhythm: Jazz & Contemporary Piano'}
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                {lang === 'fr'
                  ? 'La pratique du piano et l\'improvisation jazz partagent avec les mathématiques la rigueur des structures harmoniques et avec le génie logiciel la recherche d\'élégance et de fluidité.'
                  : 'Jazz piano improvisation shares with mathematics the rigor of harmonic structures, and with software engineering the relentless pursuit of elegance and flow.'}
              </p>
            </div>
          </div>

          <div className="shrink-0 text-xs font-mono text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">
            ♫ Harmonic Balance & Focus
          </div>
        </div>
      </div>
    </section>
  );
};
