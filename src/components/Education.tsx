import React from 'react';
import type { Language } from '../types';
import { educations } from '../data/content';
import { Calendar, MapPin, Check } from 'lucide-react';

interface EducationProps {
  lang: Language;
}

export const EducationSection: React.FC<EducationProps> = ({ lang }) => {
  return (
    <section id="education" className="py-20 md:py-28 border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
            {lang === 'fr' ? 'Parcours Académique' : 'Academic Credentials'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {lang === 'fr' ? 'Excellence Préparatoire & Cycle Ingénieur' : 'Preparatory Classes Rigor & Engineering Degree'}
          </h2>
          <p className="mt-2 text-zinc-400 text-sm">
            {lang === 'fr'
              ? 'L\'alliance de la sélection scientifique exigeante des classes prépas (MP*) et de la formation d\'ingénieur par projets concrets (PBL).'
              : 'Combining the rigorous mathematical selection of MP* Preparatory Classes and Problem-Based Learning engineering.'}
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="rounded-xl p-6 md:p-8 border border-zinc-800 bg-zinc-900/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {edu.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                  {edu.institution}
                </h3>

                <h4 className="text-xs font-semibold text-zinc-300 font-mono mb-3">
                  {edu.degree[lang]}
                </h4>

                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{edu.location}</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
                  {edu.description[lang]}
                </p>

                <div className="space-y-2">
                  {edu.highlights[lang].map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-400 leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>{edu.id === 'inphb' ? 'INPHB Yamoussoukro' : 'CESI La Rochelle'}</span>
                <span>{edu.id === 'inphb' ? 'Filière MP*' : 'Génie Informatique'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
