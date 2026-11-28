import { ArrowDown, Mail, MapPin } from 'lucide-react';
import { internship, personalInfo } from '../data/content';
import type { Language } from '../types';

export function Hero({ lang }: { lang: Language }) {
  const fr = lang === 'fr';

  return (
    <section id="top" className="hero">
      <div className="site-shell hero-grid">
        <div className="hero-copy">
          <p className="section-kicker">{fr ? 'Stage de mobilité internationale' : 'International internship'}</p>
          <h1>{personalInfo.givenNames} <span>{personalInfo.familyName}</span></h1>
          <p className="hero-role">{fr ? 'Data Engineer en alternance' : 'Data Engineering Apprentice'}</p>
          <p className="hero-summary">
            {fr
              ? 'En quatrième année d’ingénierie informatique au CESI La Rochelle, je développe des pipelines de données et des outils d’aide à la décision chez SNCF Voyageurs. Je recherche un stage à l’étranger en data engineering, optimisation ou IA appliquée.'
              : 'I’m a fourth-year computer engineering student at CESI La Rochelle and a data engineering apprentice at SNCF Voyageurs, where I work on data pipelines and decision-support tools. I’m looking for an internship abroad in data engineering, optimization, or applied AI.'}
          </p>
          <div className="hero-availability">
            <strong>{internship[lang].availability}</strong>
            <span>{internship[lang].preference}</span>
          </div>
          <div className="button-row">
            <a href="#cv" className="site-button primary">{fr ? 'Voir mon CV' : 'View my résumé'} <ArrowDown size={16} aria-hidden="true" /></a>
            <a href={`mailto:${personalInfo.email}`} className="site-button secondary"><Mail size={16} aria-hidden="true" />{fr ? 'Me contacter' : 'Email me'}</a>
          </div>
        </div>
        <figure className="hero-photo">
          <img src={personalInfo.photo} alt={personalInfo.shortName} width="768" height="1024" fetchPriority="high" />
          <figcaption><MapPin size={15} aria-hidden="true" />{personalInfo.location}</figcaption>
        </figure>
      </div>
    </section>
  );
}
