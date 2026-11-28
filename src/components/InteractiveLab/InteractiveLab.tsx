import React, { useState } from 'react';
import type { Language } from '../../types';
import { EigenLab } from './EigenLab';
import { RailwayLab } from './RailwayLab';
import { Sigma, Train } from 'lucide-react';

interface InteractiveLabProps {
  lang: Language;
}

export const InteractiveLab: React.FC<InteractiveLabProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'eigen' | 'railway'>('eigen');

  return (
    <section id="interactive-lab" className="py-16 md:py-24 border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section title */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
            {lang === 'fr' ? 'Projets personnels' : 'Personal projects'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {lang === 'fr' ? 'Démonstrateurs interactifs' : 'Interactive demos'}
          </h2>
          <p className="mt-2 text-zinc-400 max-w-2xl mx-auto text-sm">
            {lang === 'fr'
              ? 'Explorez une transformation linéaire en 2D ou recalculez un itinéraire sur un réseau ferroviaire simulé.'
              : 'Explore a 2D linear transformation or recalculate a route on a simulated railway network.'}
          </p>

          {/* Tab Selector Switch (Clean, professional) */}
          <div className="inline-flex p-1 rounded-lg bg-zinc-900 border border-zinc-800 mt-6 max-w-md w-full">
            <button
              aria-pressed={activeTab === 'eigen'}
              onClick={() => setActiveTab('eigen')}
              className={`flex-1 py-2 px-3 rounded-md text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                activeTab === 'eigen'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sigma className="w-3.5 h-3.5" />
              <span>{lang === 'fr' ? 'Algèbre linéaire' : 'Linear algebra'}</span>
            </button>

            <button
              aria-pressed={activeTab === 'railway'}
              onClick={() => setActiveTab('railway')}
              className={`flex-1 py-2 px-3 rounded-md text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                activeTab === 'railway'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Train className="w-3.5 h-3.5" />
              <span>{lang === 'fr' ? 'Réseau ferroviaire' : 'Railway routing'}</span>
            </button>
          </div>
        </div>

        {/* Active demonstrator */}
        <div>
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
