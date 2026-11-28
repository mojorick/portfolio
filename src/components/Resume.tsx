import { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import type { Language } from '../types';

const languageLabels = { fr: 'Français', en: 'English' };

export function Resume({ lang }: { lang: Language }) {
  const [selected, setSelected] = useState(lang);
  const [showPreview, setShowPreview] = useState(false);
  const fr = lang === 'fr';
  const pdfUrl = `/cv/hemerick-morie-${selected}.pdf`;
  const pdfTitle = selected === 'fr' ? 'CV de Hémérick Morié en français' : 'Hémérick Morié’s English résumé';

  return (
    <section id="cv" className="section-band resume-band" aria-labelledby="resume-title">
      <div className="site-shell">
        <div className="resume-header">
          <div>
            <h2 id="resume-title">{fr ? 'Curriculum vitæ' : 'Résumé'}</h2>
            <p className="section-intro">
              {fr ? 'Consultez ou téléchargez mon CV en français ou en anglais.' : 'View or download my résumé in French or English.'}
            </p>
          </div>
          <div className="language-switch" role="group" aria-label={fr ? 'Langue du CV' : 'Résumé language'}>
            {(['fr', 'en'] as const).map(language => (
              <button key={language} type="button" lang={language} aria-pressed={selected === language} onClick={() => setSelected(language)}>
                {languageLabels[language]}
              </button>
            ))}
          </div>
        </div>
        <div className="button-row">
          <a className="site-button primary" href={pdfUrl} download>
            <Download size={17} aria-hidden="true" /> {fr ? 'Télécharger le PDF' : 'Download PDF'}
          </a>
          <button type="button" className="site-button secondary" aria-expanded={showPreview} aria-controls="resume-preview" onClick={() => setShowPreview(!showPreview)}>
            <FileText size={17} aria-hidden="true" />
            {showPreview ? (fr ? 'Masquer l’aperçu' : 'Hide preview') : (fr ? 'Afficher le CV' : 'Show résumé')}
          </button>
        </div>
        <div id="resume-preview" hidden={!showPreview}>
          {showPreview && (
            <>
              <a className="text-link resume-open" href={pdfUrl} target="_blank" rel="noopener noreferrer">
                {fr ? 'Ouvrir le PDF dans un nouvel onglet' : 'Open the PDF in a new tab'}
              </a>
              <iframe key={selected} src={pdfUrl} title={pdfTitle} className="resume-pdf" />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
