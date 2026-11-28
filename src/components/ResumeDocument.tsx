import { education, internship, personalInfo, projects, webInternship } from '../data/content';
import type { Language } from '../types';

export function ResumeDocument({ lang }: { lang: Language }) {
  const fr = lang === 'fr';

  return (
    <article lang={lang} className="resume-document">
      <header>
        <p className="resume-name">{personalInfo.name}</p>
        <p className="resume-role">
          {fr ? 'Stage international · Data engineering, IA appliquée et recherche opérationnelle' : 'International internship · Data engineering, applied AI and operations research'}
        </p>
        <p>{internship[lang].availability}</p>
        <p>
          {personalInfo.location} · <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
        </p>
        <p>
          <a href="https://hemerickmorie.com/">hemerickmorie.com</a> · <a href={personalInfo.linkedin}>LinkedIn</a> · <a href={personalInfo.github}>github.com/mojorick</a>
        </p>
      </header>
      <section>
        <h3>{fr ? 'Profil' : 'Profile'}</h3>
        <p>
          {fr
            ? 'Élève-ingénieur en informatique en quatrième année au CESI La Rochelle et Data Engineer en alternance chez SNCF Voyageurs. Expérience en automatisation de flux de données, modélisation SQL et développement d’outils d’aide à la décision.'
            : 'Fourth-year computer engineering student at CESI La Rochelle and data engineering apprentice at SNCF Voyageurs. Experience in data pipeline automation, SQL data modeling, and decision-support software.'}
        </p>
        <p>{internship[lang].preference}</p>
      </section>
      <section>
        <h3>{fr ? 'Expérience professionnelle' : 'Professional experience'}</h3>
        <h4>
          {fr ? 'Data Engineer en alternance — SNCF Voyageurs' : 'Data Engineering Apprentice — SNCF Voyageurs'}
        </h4>
        <p>{fr ? 'Nantes, France · Depuis octobre 2025' : 'Nantes, France · October 2025 – Present'}</p>
        <ul>
          {projects.map(project => (
            <li key={project.title.en}><strong>{project.title[lang]}.</strong> {project.contribution[lang]}</li>
          ))}
        </ul>
        <h4>{webInternship.title[lang]} — Jolipixel</h4>
        <p>Saint-Nazaire, France · {webInternship.period[lang]}</p>
        <p>{webInternship.contribution[lang]}</p>
      </section>
      <section>
        <h3>{fr ? 'Formation' : 'Education'}</h3>
        {education.map(program => (
          <div key={program.institution} className="resume-education">
            <h4>{program.institution} — {program.degree[lang]}</h4>
            <p>{program.location}. {program.description[lang]}</p>
          </div>
        ))}
      </section>
      <section>
        <h3>{fr ? 'Compétences techniques' : 'Technical skills'}</h3>
        <p>
          {fr
            ? 'Python, SQL, PostgreSQL, Power BI, pipelines ETL/ELT, modélisation de données, React, TypeScript, PHP, Symfony, WordPress, algorithmique et optimisation sous contraintes.'
            : 'Python, SQL, PostgreSQL, Power BI, ETL/ELT pipelines, data modeling, React, TypeScript, PHP, Symfony, WordPress, algorithms and constrained optimization.'}
        </p>
      </section>
    </article>
  );
}
