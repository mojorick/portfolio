import React, { useState } from 'react';
import type { Language, ViewMode } from '../types';
import { experiences, projects } from '../data/content';
import { Briefcase, Calendar, MapPin, Check, Cpu } from 'lucide-react';
import { MathTex } from '../utils/katex';

interface ExperienceProps {
  lang: Language;
  mode: ViewMode;
}

export const ExperienceSection: React.FC<ExperienceProps> = ({ lang, mode }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0].id);

  return (
    <section id="experience" className="py-20 md:py-28 border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-zinc-800">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
              {lang === 'fr' ? 'Expérience Industrielle' : 'Professional Experience'}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {lang === 'fr' ? 'Ingénierie de Données & Systèmes Critiques' : 'Data Engineering & Production Systems'}
            </h2>
            <p className="mt-2 text-zinc-400 max-w-2xl text-sm">
              {lang === 'fr'
                ? 'Mon parcours chez SNCF Voyageurs en tant que Data Engineer : refonte du SI Planification, algorithmes d\'optimisation sous contraintes et développement d\'outils temps réel.'
                : 'My tenure at SNCF Voyageurs as a Data Engineer: railway planning IS overhaul, constrained optimization engines, and reactive real-time applications.'}
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span>SNCF Voyageurs Nantes (44)</span>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6 mb-16">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="rounded-xl p-6 md:p-8 border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/60 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-lg md:text-xl font-bold text-white">
                      {exp.role[lang]}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {exp.company}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{exp.location}</span>
                    </div>
                    <div className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                      {exp.type[lang]}
                    </div>
                  </div>

                  <p className="text-sm text-zinc-300 mb-5 leading-relaxed">
                    {exp.description[lang]}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-2.5 mb-6">
                    {exp.bulletPoints[lang].map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        <Check className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800">
                    {exp.technicalStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Projects Deep Dive */}
        <div>
          <div className="mb-6">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">
              {lang === 'fr' ? 'Études de Cas Approfondies' : 'Engineering Case Studies'}
            </span>
            <h3 className="text-xl font-bold text-white">
              {lang === 'fr' ? 'Défis Techniques & Architecture' : 'System Architectures & Deliverables'}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Project List Selector */}
            <div className="lg:col-span-4 space-y-2.5">
              {projects.map((proj) => {
                const isSelected = proj.id === selectedProjectId;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setSelectedProjectId(proj.id)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-colors cursor-pointer flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-zinc-800/90 border-zinc-600 text-white'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-zinc-400">
                        {proj.company}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                        {proj.period}
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-zinc-100 mt-1">
                      {proj.title[lang]}
                    </h4>

                    <p className="text-[11px] text-zinc-400 line-clamp-1">
                      {proj.subtitle[lang]}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Project Full Details */}
            <div className="lg:col-span-8">
              {(() => {
                const proj = projects.find((p) => p.id === selectedProjectId) || projects[0];
                return (
                  <div className="rounded-xl p-6 md:p-8 border border-zinc-800 bg-zinc-900/50 flex flex-col gap-5">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-zinc-400">
                          {proj.company} — {proj.period}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-1">
                        {proj.title[lang]}
                      </h4>
                      <p className="text-xs text-zinc-400">
                        {proj.subtitle[lang]}
                      </p>
                    </div>

                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {proj.description[lang]}
                    </p>

                    {/* Operational Impact */}
                    <div>
                      <h5 className="text-xs font-mono uppercase text-zinc-400 mb-2.5">
                        {lang === 'fr' ? 'Impacts & Résultats Opérationnels :' : 'Operational Impact:'}
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {proj.impact[lang].map((imp, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2"
                          >
                            <Check className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                            <span>{imp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    {proj.metrics && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {proj.metrics.map((m, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                            <div className="text-lg font-bold font-mono text-white">
                              {m.value}
                            </div>
                            <div className="text-[11px] text-zinc-400 mt-0.5 font-mono">
                              {m.label[lang]}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Academic Formulation */}
                    {proj.academicFormulation && (
                      <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300">
                          <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                          <span>
                            {lang === 'fr'
                              ? 'Modélisation & Recherche Opérationnelle :'
                              : 'Mathematical Formulation:'}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                          <MathTex math={proj.academicFormulation[lang]} />
                        </p>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800">
                      {proj.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-zinc-950 text-xs font-mono text-zinc-400 border border-zinc-800"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
