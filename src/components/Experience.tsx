import React, { useState } from 'react';
import { Language, ViewMode } from '../types';
import { experiences, projects } from '../data/content';
import { Briefcase, Building2, Calendar, MapPin, CheckCircle2, ChevronRight, Layers, ArrowUpRight, Cpu, Database, Flame } from 'lucide-react';
import { MathTex } from '../utils/katex';

interface ExperienceProps {
  lang: Language;
  mode: ViewMode;
}

export const ExperienceSection: React.FC<ExperienceProps> = ({ lang, mode }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0].id);

  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-medium mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{lang === 'fr' ? 'Parcours Professionnel' : 'Professional Track'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {lang === 'fr' ? 'Ingénierie de Données & Systèmes Critiques' : 'Data Engineering & Critical Systems'}
            </h2>
            <p className="mt-2 text-slate-400 max-w-2xl text-sm md:text-base">
              {lang === 'fr'
                ? 'Mon expérience chez SNCF Voyageurs en tant que Data Engineer : industrialisation de pipelines de données ferroviaires, optimisation combinatoire sous contraintes réelles et architecture logicielle réactive.'
                : 'My work at SNCF Voyageurs as a Data Engineer: production railway data pipelines, combinatorial optimization under operational constraints, and resilient reactive architectures.'}
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{lang === 'fr' ? 'Actuellement en poste @ SNCF Voyageurs Nantes' : 'Currently @ SNCF Voyageurs Nantes'}</span>
          </div>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-8 mb-16">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="glass-card rounded-2xl p-6 md:p-8 border border-slate-800/80 bg-slate-950/70 hover:border-slate-700 transition-all relative overflow-hidden"
            >
              {/* Top Accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: exp.color }}
              />

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Left: Role & Company */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xl md:text-2xl font-bold text-white">
                      {exp.role[lang]}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold font-mono"
                      style={{
                        backgroundColor: `${exp.color}20`,
                        color: exp.color,
                        border: `1px solid ${exp.color}40`,
                      }}
                    >
                      {exp.company}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>{exp.location}</span>
                    </div>
                    <div className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      {exp.type[lang]}
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                    {exp.description[lang]}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-3 mb-6">
                    {exp.bulletPoints[lang].map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
                    {exp.technicalStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
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
        <div className="mt-16">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <span>{lang === 'fr' ? 'Études de Cas & Réalisations Majeures' : 'Engineering Case Studies & Deliverables'}</span>
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {lang === 'fr'
                ? 'Sélectionnez un projet pour examiner son architecture, son impact opérationnel et sa modélisation mathématique.'
                : 'Select a project to explore its architecture, operational impact, and formal mathematical formulation.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Project List Selector */}
            <div className="lg:col-span-4 space-y-3">
              {projects.map((proj) => {
                const isSelected = proj.id === selectedProjectId;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setSelectedProjectId(proj.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-blue-950/40 border-blue-500/50 shadow-lg shadow-blue-500/10'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                        proj.category === 'data-engineering'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-purple-500/20 text-purple-300'
                      }`}>
                        {proj.category === 'data-engineering' ? 'Data Engineering' : 'Optimisation / RO'}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">{proj.company}</span>
                    </div>

                    <h4 className={`text-sm font-bold mt-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {proj.title[lang]}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-2">
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
                  <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-800 bg-slate-950/90 flex flex-col gap-6">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                          {proj.company} • {proj.period}
                        </span>
                        {proj.featured && (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono">
                            Projet Phare
                          </span>
                        )}
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2">
                        {proj.title[lang]}
                      </h4>
                      <p className="text-sm font-medium text-slate-300">
                        {proj.subtitle[lang]}
                      </p>
                    </div>

                    <p className="text-sm text-slate-400 leading-relaxed">
                      {proj.description[lang]}
                    </p>

                    {/* Operational Impact */}
                    <div>
                      <h5 className="text-xs font-mono uppercase text-slate-400 mb-3 tracking-wider">
                        {lang === 'fr' ? 'Impacts & Bénéfices Opérationnels :' : 'Operational Impact & Benefits:'}
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {proj.impact[lang].map((imp, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{imp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics if any */}
                    {proj.metrics && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {proj.metrics.map((m, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                            <div className="text-xl font-bold font-mono text-white text-gradient-primary">
                              {m.value}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {m.label[lang]}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Academic / Mathematical Formulation (Especially for CIFRE / Researcher view) */}
                    {proj.academicFormulation && (
                      <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-purple-300">
                          <Cpu className="w-4 h-4 text-purple-400" />
                          <span>
                            {lang === 'fr'
                              ? 'Formulation Mathématique & Recherche Opérationnelle :'
                              : 'Mathematical & Operations Research Formulation:'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-mono">
                          <MathTex math={proj.academicFormulation[lang]} />
                        </p>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                      {proj.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 text-xs font-mono text-slate-400 border border-slate-800"
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
