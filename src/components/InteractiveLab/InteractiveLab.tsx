import React, { useState } from 'react';
import { Language } from '../../types';
import { EigenLab } from './EigenLab';
import { RailwayLab } from './RailwayLab';
import { Sigma, Train, Sparkles } from 'lucide-react';

interface InteractiveLabProps {
  lang: Language;
}

export const InteractiveLab: React.FC<InteractiveLabProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'eigen' | 'railway'>('eigen');

  return (
    <section id="interactive-lab" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Le Laboratoire d\'Expérimentation' : 'Interactive Research Lab'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'fr' ? 'La Preuve par le Code & les Mathématiques' : 'Proof through Code & Rigorous Math'}
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            {lang === 'fr'
              ? 'Deux démonstrateurs exécutés en direct dans votre navigateur : de la théorie spectrale des classes préparatoires (MP*) aux systèmes critiques de régulation ferroviaire (SNCF Voyageurs).'
              : 'Two interactive live simulators running in your browser: from pure spectral theory (MP* Prep Classes) to mission-critical railway dispatch systems (SNCF Voyageurs).'}
          </p>

          {/* Tab Selector Switch */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 mt-8 max-w-md w-full shadow-xl">
            <button
              onClick={() => setActiveTab('eigen')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'eigen'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Sigma className="w-4 h-4" />
              <span>{lang === 'fr' ? '1. Algèbre Spectrale ➔ IA' : '1. Spectral Algebra ➔ AI'}</span>
            </button>

            <button
              onClick={() => setActiveTab('railway')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'railway'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Train className="w-4 h-4" />
              <span>{lang === 'fr' ? '2. SNCF & Optimisation (RO)' : '2. SNCF & Optimization (OR)'}</span>
            </button>
          </div>
        </div>

        {/* Active demonstrator */}
        <div className="transition-all duration-300">
          {activeTab === 'eigen' ? (
            <EigenLab lang={lang} />
          ) : (
            <RailwayLab lang={lang} />
          )}
        </div>
      </div>
    </section>
  );
};
