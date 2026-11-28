import { ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/content';
import type { Language } from '../types';

export function ResearchVision({ lang }: { lang: Language }) {
  const fr = lang === 'fr';
  const subject = fr ? 'Échange sur un projet de thèse CIFRE' : 'Discussion about a CIFRE PhD project';

  return (
    <section id="research" className="section-band research-band" aria-labelledby="research-title">
      <div className="site-shell research-grid">
        <div>
          <p className="section-kicker">{fr ? 'Après le diplôme' : 'After graduation'}</p>
          <h2 id="research-title">{fr ? 'Projet de thèse CIFRE en IA' : 'CIFRE PhD interests in AI'}</h2>
          <p className="section-intro">
            {fr
              ? 'Après le CESI, je souhaite préparer une thèse en intelligence artificielle et recherche opérationnelle, en partenariat avec une entreprise et un laboratoire de recherche.'
              : 'After graduating from CESI, I aim to pursue a PhD in AI and operations research through CIFRE, a French program that pairs an employer with an academic research lab.'}
          </p>
          <a href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}`} className="text-link">
            {fr ? 'Échanger sur un sujet de thèse' : 'Discuss a PhD topic'} <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <article className="portfolio-card research-card">
          <h3>{fr ? 'Replanifier un réseau sous perturbations' : 'Rescheduling a network under disruption'}</h3>
          <p>
            {fr
              ? 'L’apprentissage automatique peut-il anticiper les retards en cascade et aider un solveur à trouver plus vite un plan de transport réalisable ?'
              : 'Can machine learning predict cascading delays and help an optimization solver find a feasible transport plan faster?'}
          </p>
          <p>
            {fr
              ? 'Une piste serait de comparer, sur les mêmes scénarios simulés, un solveur d’optimisation seul et un solveur guidé par des prévisions de retards. Je mesurerais le temps de calcul, le retard cumulé et le respect des contraintes de capacité.'
              : 'I would test an optimization solver with and without delay predictions on the same simulated scenarios, measuring runtime, total delay, and whether the schedules satisfy capacity constraints.'}
          </p>
        </article>
      </div>
    </section>
  );
}
