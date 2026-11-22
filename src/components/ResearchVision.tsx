import React from 'react';
import type { Language, ViewMode } from '../types';
import { researchAxioms } from '../data/content';
import { GraduationCap, Target } from 'lucide-react';
import { MathTex } from '../utils/katex';

interface ResearchVisionProps {
  lang: Language;
  mode: ViewMode;
  onOpenContact: () => void;
}

export const ResearchVision: React.FC<ResearchVisionProps> = ({ lang, mode, onOpenContact }) => {
  return (
    <section id="research" className="py-20 md:py-28 border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
            {lang === 'fr' ? 'Projet Doctoral • Thèse CIFRE' : 'Doctoral Track • CIFRE Industrial PhD'}
          </span>

          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {lang === 'fr' ? 'Intelligence Artificielle & Recherche Opérationnelle' : 'Artificial Intelligence & Operations Research'}
          </h2>

          <p className="mt-3 text-zinc-400 text-sm leading-relaxed">
            {lang === 'fr'
              ? 'Conjuguer la rigueur mathématique des classes préparatoires MPSI/MP* et la maîtrise des architectures data de production de la SNCF pour formuler et résoudre des problèmes d\'optimisation combinatoire sous incertitude.'
              : 'Combining the mathematical rigor of MPSI/MP* prep classes and industrial production data architectures from SNCF to formulate and solve combinatorial optimization problems under uncertainty.'}
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="rounded-xl p-5 border border-zinc-800 bg-zinc-900/40">
            <h3 className="text-sm font-bold text-white mb-1.5 font-mono">
              {lang === 'fr' ? '1. Fondations MPSI / MP*' : '1. Rigorous Math (MP*)'}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {lang === 'fr'
                ? 'Algèbre bilinéaire, théorie spectrale, diagonalisation, topologie des espaces vectoriels normés et optimisation continue.'
                : 'Bilinear algebra, spectral decomposition, topology of normed vector spaces, and continuous optimization.'}
            </p>
          </div>

          <div className="rounded-xl p-5 border border-zinc-800 bg-zinc-900/40">
            <h3 className="text-sm font-bold text-white mb-1.5 font-mono">
              {lang === 'fr' ? '2. Échelle Industrielle SNCF' : '2. Industrial Scale @ SNCF'}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {lang === 'fr'
                ? 'Gestion en production des aléas d\'exploitation, grands volumes de circulation ferroviaire et contraintes de sécurité sub-secondaires.'
                : 'Production management of operational hazards, massive transit schedules, and sub-second safety constraints.'}
            </p>
          </div>

          <div className="rounded-xl p-5 border border-zinc-800 bg-zinc-900/40">
            <h3 className="text-sm font-bold text-white mb-1.5 font-mono">
              {lang === 'fr' ? '3. Intersection RO & IA' : '3. Dual Mastery: OR & AI'}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {lang === 'fr'
                ? 'Hybridation des métaheuristiques/MILP et de l\'apprentissage profond (Graph Neural Networks, Reinforcement Learning).'
                : 'Hybridization of MILP/metaheuristics and deep learning (Graph Neural Networks, Reinforcement Learning).'}
            </p>
          </div>
        </div>

        {/* Research Axioms */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider font-mono">
              {lang === 'fr' ? 'Axes de Recherche Ciblés' : 'Targeted Research Axes'}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {researchAxioms.map((axiom, idx) => (
              <div
                key={axiom.id}
                className="rounded-xl p-6 border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs text-zinc-400 font-bold">
                        [0{idx + 1}]
                      </span>
                      <h4 className="text-base font-bold text-white">
                        {axiom.title[lang]}
                      </h4>
                    </div>

                    <div className="space-y-2 text-xs text-zinc-400 mb-4 leading-relaxed">
                      <div>
                        <span className="font-mono text-zinc-300 font-medium">
                          {lang === 'fr' ? 'Problématique : ' : 'Problem : '}
                        </span>
                        <span>{axiom.problem[lang]}</span>
                      </div>
                      <div>
                        <span className="font-mono text-zinc-300 font-medium">
                          {lang === 'fr' ? 'Méthodologie : ' : 'Methodology : '}
                        </span>
                        <span>{axiom.methodology[lang]}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 flex items-center gap-2 font-mono">
                      <span className="text-zinc-300 shrink-0">
                        {lang === 'fr' ? 'Application :' : 'Application :'}
                      </span>
                      <span>{axiom.potentialIndustrialApplication[lang]}</span>
                    </div>
                  </div>

                  <div className="lg:w-80 shrink-0 p-4 rounded-lg bg-zinc-950 border border-zinc-800 flex flex-col justify-center text-center">
                    <span className="text-[10px] font-mono text-zinc-500 mb-2">
                      {lang === 'fr' ? 'Formalisme Mathématique' : 'Mathematical Model'}
                    </span>
                    <div className="overflow-x-auto py-1 text-xs font-mono text-zinc-200">
                      <MathTex math={axiom.mathEquation} display={true} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="rounded-xl p-6 border border-zinc-800 bg-zinc-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white mb-1">
              {lang === 'fr'
                ? 'Échangeons autour d\'un sujet doctoral ou d\'une collaboration R&D'
                : 'Discuss Doctoral Proposals or Corporate R&D Collaboration'}
            </h4>
            <p className="text-xs text-zinc-400 max-w-xl">
              {lang === 'fr'
                ? 'Disponible pour échanger avec des directeurs de thèse et équipes de recherche en IA et Recherche Opérationnelle.'
                : 'Available to connect with research advisors and industrial labs on applied AI and Operations Research.'}
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold transition-colors shrink-0 cursor-pointer"
          >
            {lang === 'fr' ? 'Prendre Contact' : 'Get in Touch'}
          </button>
        </div>
      </div>
    </section>
  );
};
