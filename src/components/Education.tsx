import React from 'react';
import { Language } from '../types';
import { educations } from '../data/content';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface EducationProps {
  lang: Language;
}

export const EducationSection: React.FC<EducationProps> = ({ lang }) => {
  return (
    <section id="education" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Formation Académique' : 'Academic Background'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'fr' ? 'L\'Excellence Prépa & L\'Ingénierie Active' : 'Elite Prep Rigor & Active Engineering'}
          </h2>
          <p className="mt-3 text-slate-400 text-sm md:text-base">
            {lang === 'fr'
              ? 'Deux piliers complémentaires : la sélection rigoureuse des classes préparatoires MP* et la formation d\'ingénieur par projets (PBL).'
              : 'Two foundational pillars: the rigorous selection of MP* Preparatory Classes and Problem-Based Learning engineering.'}
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="glass-card rounded-2xl p-6 md:p-8 border border-slate-800 bg-slate-950/80 hover:border-blue-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
                    {edu.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                  {edu.institution}
                </h3>

                <h4 className="text-sm font-semibold text-gradient-primary mb-3">
                  {edu.degree[lang]}
                </h4>

                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-5">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>{edu.location}</span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {edu.description[lang]}
                </p>

                {/* Highlights */}
                <div className="space-y-2.5">
                  {edu.highlights[lang].map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom footer badge */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>{edu.id === 'inphb' ? 'INPHB Yamoussoukro' : 'CESI La Rochelle'}</span>
                <span>{edu.id === 'inphb' ? 'Mathématiques Pures' : 'Génie Informatique'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
