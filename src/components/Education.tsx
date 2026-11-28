import { education } from '../data/content';
import type { Language } from '../types';

export function EducationSection({ lang }: { lang: Language }) {
  return (
    <section id="education" className="section-band" aria-labelledby="education-title">
      <div className="site-shell">
        <h2 id="education-title">{lang === 'fr' ? 'Formation et mathématiques appliquées' : 'Education and applied mathematics'}</h2>
        <div className="card-grid education-grid">
          {education.map(program => (
            <article key={program.institution} className="portfolio-card">
              <p className="card-meta">{program.period[lang]} · {program.location}</p>
              <h3>{program.institution}</h3>
              <p className="degree">{program.degree[lang]}</p>
              <p>{program.description[lang]}</p>
              <ul className="education-topics">
                {program.topics[lang].map(topic => <li key={topic}>{topic}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <a href="#interactive-lab" className="text-link education-demo">
          {lang === 'fr' ? 'Voir les démonstrateurs d’algèbre linéaire et de calcul d’itinéraires' : 'Explore the linear algebra and route-finding demos'}
        </a>
      </div>
    </section>
  );
}
