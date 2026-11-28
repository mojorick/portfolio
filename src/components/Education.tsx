import { education } from '../data/content';
import type { Language } from '../types';

export function EducationSection({ lang }: { lang: Language }) {
  return (
    <section id="education" className="section-band" aria-labelledby="education-title">
      <div className="site-shell">
        <h2 id="education-title">{lang === 'fr' ? 'Formation' : 'Education'}</h2>
        <div className="card-grid education-grid">
          {education.map(program => (
            <article key={program.institution} className="portfolio-card">
              <p className="card-meta">{program.location}</p>
              <h3>{program.institution}</h3>
              <p className="degree">{program.degree[lang]}</p>
              <p>{program.description[lang]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
