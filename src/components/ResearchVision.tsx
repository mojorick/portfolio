import React from 'react';
import { Language, ViewMode } from '../types';
import { researchAxioms } from '../data/content';
import { GraduationCap, BookOpen, Target, Sparkles, Brain, Cpu, Network, ArrowRight } from 'lucide-react';
import { MathTex } from '../utils/katex';

interface ResearchVisionProps {
  lang: Language;
  mode: ViewMode;
  onOpenContact: () => void;
}

export const ResearchVision: React.FC<ResearchVisionProps> = ({ lang, mode, onOpenContact }) => {
  return (
    <section id="research" className="py-20 md:py-28 relative bg-slate-950/50 border-t border-slate-800/80">
      {/* Glow accent */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
            <span>{lang === 'fr' ? 'Perspective Doctorale • Thèse CIFRE' : 'Doctoral Track • CIFRE Industrial PhD'}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            {lang === 'fr' ? 'Intelligence Artificielle & Recherche Opérationnelle' : 'Artificial Intelligence & Operations Research'}
          </h2>

          <p className="mt-4 text-slate-300 text-sm md:text-base leading-relaxed">
            {lang === 'fr'
              ? 'Le pont parfait entre deux mondes : la rigueur mathématique acquise en classe préparatoire MPSI/MP* et la maîtrise des architectures data de production chez SNCF Voyageurs.'
              : 'The ideal bridge between two worlds: the mathematical rigor of MPSI/MP* intensive prep classes and real-world mission-critical data pipelines at SNCF Voyageurs.'}
          </p>
        </div>

        {/* Why this profile is ideal for CIFRE (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/60">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {lang === 'fr' ? 'Socle Mathématique MP*' : 'Rigorous Math (MP*)'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'fr'
                ? 'Algèbre bilinéaire, théorie spectrale, diagonalisation, topologie et optimisation continue. Capacité à lire et formaliser des articles de recherche (NeurIPS, ICML, INFORMS).'
                : 'Bilinear algebra, spectral decomposition, topology, and continuous optimization. Proven ability to digest and formalize top-tier research papers (NeurIPS, ICML, INFORMS).'}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/60">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {lang === 'fr' ? 'Réalité Industrielle SNCF' : 'Industrial Scale @ SNCF'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'fr'
                ? 'Expérience quotidienne des systèmes ferroviaires critiques : gestion des aléas, volumes massifs de circulation, contraintes réglementaires et intégration temps réel.'
                : 'Daily hands-on experience with mission-critical railway operations: dispatching hazards, high-volume schedules, safety constraints, and real-time execution.'}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/60">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {lang === 'fr' ? 'Double Compétence RO & IA' : 'Dual Mastery: OR & AI'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'fr'
                ? 'Maîtrise de la frontière moderne entre métaheuristiques/MILP et apprentissage profond (Graph Neural Networks, Reinforcement Learning) pour résoudre des problèmes NP-difficiles.'
                : 'Mastery of the modern intersection between MILP / metaheuristics and deep learning (Graph Neural Networks, Reinforcement Learning) for NP-hard combinatorial optimization.'}
            </p>
          </div>
        </div>

        {/* Research Axioms (Deep Dive) */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              <span>{lang === 'fr' ? 'Axes de Recherche Ciblés pour la Thèse CIFRE' : 'Targeted Research Axes for the CIFRE PhD'}</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {lang === 'fr' ? 'Laboratoires / R&D d\'Entreprise' : 'Research Labs & Corporate R&D'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {researchAxioms.map((axiom, idx) => (
              <div
                key={axiom.id}
                className="glass-card rounded-2xl p-6 md:p-8 border border-purple-500/20 bg-slate-950/80 hover:border-purple-500/40 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold flex items-center justify-center">
                        0{idx + 1}
                      </span>
                      <h4 className="text-lg md:text-xl font-bold text-white">
                        {axiom.title[lang]}
                      </h4>
                    </div>

                    <div className="space-y-3 text-xs md:text-sm text-slate-300 mb-4">
                      <div>
                        <span className="font-semibold text-purple-300 font-mono">
                          {lang === 'fr' ? 'Problématique : ' : 'Problem Formulation: '}
                        </span>
                        <span className="text-slate-400">{axiom.problem[lang]}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-cyan-300 font-mono">
                          {lang === 'fr' ? 'Méthodologie & Approche : ' : 'Methodology & Modeling: '}
                        </span>
                        <span className="text-slate-400">{axiom.methodology[lang]}</span>
                      </div>
                    </div>

                    {/* Industrial Impact */}
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                      <span className="font-mono text-emerald-400 font-semibold shrink-0">
                        {lang === 'fr' ? 'Application Industrielle :' : 'Industrial Application:'}
                      </span>
                      <span>{axiom.potentialIndustrialApplication[lang]}</span>
                    </div>
                  </div>

                  {/* Mathematical KaTeX Banner */}
                  <div className="lg:w-80 shrink-0 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-center text-center">
                    <span className="text-[11px] font-mono text-slate-500 mb-2">
                      {lang === 'fr' ? 'Formalisme Mathématique' : 'Mathematical Formulation'}
                    </span>
                    <div className="overflow-x-auto py-2 text-xs font-mono text-purple-300">
                      <MathTex math={axiom.mathEquation} display={true} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PhD Call to Action Banner */}
        <div className="rounded-2xl p-8 bg-gradient-to-r from-purple-950/40 via-blue-950/30 to-slate-950 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              {lang === 'fr'
                ? 'Vous êtes directeur de recherche ou responsable R&D ?'
                : 'Are you a Research Lab Director or Corporate R&D Lead?'}
            </h3>
            <p className="text-sm text-slate-400 max-w-2xl">
              {lang === 'fr'
                ? 'Je serais ravi d\'échanger autour d\'un sujet de thèse CIFRE combinant IA, théorie des graphes et optimisation combinatoire sous contraintes réelles.'
                : 'I would be delighted to discuss potential CIFRE doctoral proposals combining machine learning, graph theory, and real-world combinatorial optimization.'}
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-xl shadow-purple-500/25 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <GraduationCap className="w-4 h-4" />
            <span>{lang === 'fr' ? 'Discuter d\'une Thèse CIFRE' : 'Discuss CIFRE Opportunities'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
