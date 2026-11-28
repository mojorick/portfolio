import { ArrowUpRight } from 'lucide-react';
import { projects, webInternship } from '../data/content';
import type { Language } from '../types';

export function ExperienceSection({ lang }: { lang: Language }) {
  const fr = lang === 'fr';

  return (
    <section id="experience" className="section-band" aria-labelledby="experience-title">
      <div className="site-shell">
        <p className="section-kicker">{fr ? 'Expérience professionnelle' : 'Professional experience'}</p>
        <h2 id="experience-title">SNCF Voyageurs</h2>
        <p className="section-intro">
          {fr ? 'Data Engineer en alternance · Nantes · Octobre 2025 – septembre 2028' : 'Data Engineering Apprentice · Nantes, France · October 2025 – September 2028'}
        </p>
        <div className="card-grid">
          {projects.map(project => (
            <article key={project.title.en} className="portfolio-card">
              <h3>{project.title[lang]}</h3>
              <p>{project.contribution[lang]}</p>
              <ul className="tags" aria-label="Technologies">
                {project.stack.map(technology => <li key={technology}>{technology}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <div className="experience-note">
          <article className="portfolio-card">
            <p className="card-meta">{webInternship.period[lang]} · {webInternship.location}</p>
            <h3>Jolipixel</h3>
            <p className="degree">{webInternship.title[lang]}</p>
            <p>{webInternship.contribution[lang]}</p>
            <ul className="tags" aria-label="Technologies">
              {webInternship.stack.map(technology => <li key={technology}>{technology}</li>)}
            </ul>
          </article>
          <a href="#interactive-lab" className="text-link">
            {fr ? 'Essayer les démonstrateurs' : 'Try the interactive demos'} <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
