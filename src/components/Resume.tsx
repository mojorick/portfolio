import { useState } from 'react';
import { ArrowUpRight, Download, FileText } from 'lucide-react';
import type { Language } from '../types';
import { ResumeDocument } from './ResumeDocument';

const resumes = {
  fr: { label: 'Français', canvaUrl: 'https://canva.link/459ybh5db5r5f23' },
  en: { label: 'English', canvaUrl: 'https://canva.link/779uh5zoxmg5x0c' },
} satisfies Record<Language, { label: string; canvaUrl: string }>;

export function Resume({ lang }: { lang: Language }) {
  const [selected, setSelected] = useState(lang);
  const [showPreview, setShowPreview] = useState(false);
  const fr = lang === 'fr';

  return (
    <section id="cv" className="section-band resume-band" aria-labelledby="resume-title">
      <div className="site-shell">
        <div className="resume-header">
          <div>
            <h2 id="resume-title">{fr ? 'Curriculum vitæ' : 'Résumé'}</h2>
            <p className="section-intro">
              {fr ? 'Consultez le CV sur cette page, téléchargez le PDF à texte sélectionnable ou ouvrez la version Canva.' : 'Read the résumé here, download the selectable-text PDF, or open the Canva version.'}
            </p>
          </div>
          <div className="language-switch" role="group" aria-label={fr ? 'Langue du CV' : 'Résumé language'}>
            {(['fr', 'en'] as const).map(language => (
              <button key={language} type="button" lang={language} aria-pressed={selected === language} onClick={() => setSelected(language)}>
                {resumes[language].label}
              </button>
            ))}
          </div>
        </div>
        <div className="button-row">
          <a className="site-button primary" href={`/cv/hemerick-morie-${selected}.pdf`} download>
            <Download size={17} aria-hidden="true" /> {fr ? 'Télécharger le PDF' : 'Download PDF'}
          </a>
          <button type="button" className="site-button secondary" aria-expanded={showPreview} aria-controls="resume-preview" onClick={() => setShowPreview(!showPreview)}>
            <FileText size={17} aria-hidden="true" />
            {showPreview ? (fr ? 'Masquer l’aperçu' : 'Hide preview') : (fr ? 'Afficher le CV' : 'Show résumé')}
          </button>
          <a className="text-link" href={resumes[selected].canvaUrl} target="_blank" rel="noopener noreferrer">
            {fr ? 'Version Canva' : 'Canva version'} <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div id="resume-preview" hidden={!showPreview}>
          {showPreview && <ResumeDocument lang={selected} />}
        </div>
      </div>
    </section>
  );
}
