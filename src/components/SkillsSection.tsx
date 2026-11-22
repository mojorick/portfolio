import React from 'react';
import type { Language } from '../types';
import { skillCategories } from '../data/content';
import { Check } from 'lucide-react';

interface SkillsProps {
  lang: Language;
}

export const SkillsSection: React.FC<SkillsProps> = ({ lang }) => {
  return (
    <section id="skills" className="py-20 md:py-28 border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
            {lang === 'fr' ? 'Arsenal Technique' : 'Technical Skills'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {lang === 'fr' ? 'Compétences & Technologies' : 'Core Capabilities & Stack'}
          </h2>
          <p className="mt-2 text-zinc-400 text-sm">
            {lang === 'fr'
              ? 'Un profil équilibré : modélisation mathématique (MPSI/MP*), génie logiciel et exploitation de pipelines de données industriels.'
              : 'A balanced engineering profile: mathematical modeling (MP*), robust software engineering, and production data pipelines.'}
          </p>
        </div>

        {/* 4 Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="rounded-xl p-5 border border-zinc-800 bg-zinc-900/30 flex flex-col"
            >
              <h3 className="text-xs font-bold text-zinc-200 uppercase font-mono tracking-wider mb-4 pb-2 border-b border-zinc-800">
                {cat.name[lang]}
              </h3>

              <div className="space-y-2 flex-1">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2 rounded bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-300 flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Personal Detail / Piano */}
        <div className="mt-8 p-5 rounded-xl border border-zinc-800 bg-zinc-900/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-zinc-200 uppercase font-mono mb-1">
              {lang === 'fr' ? 'Pratique Musicale : Piano Jazz & Contemporain' : 'Musical Discipline: Jazz & Contemporary Piano'}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
              {lang === 'fr'
                ? 'La pratique du piano et l\'improvisation jazz partagent avec les mathématiques la rigueur des structures harmoniques, et avec l\'ingénierie logicielle la recherche de clarté et de précision.'
                : 'Jazz piano improvisation shares with mathematics the rigor of harmonic structure, and with software engineering the search for clarity and precision.'}
            </p>
          </div>

          <div className="text-xs font-mono text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded border border-zinc-800 shrink-0">
            Harmonic structure & discipline
          </div>
        </div>
      </div>
    </section>
  );
};
