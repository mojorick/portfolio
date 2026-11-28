import type { Language } from '../types';

export function Navbar({ lang, setLang }: { lang: Language; setLang: (language: Language) => void }) {
  const fr = lang === 'fr';

  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <a href="#top" className="site-wordmark">Hémérick Morié</a>
        <nav aria-label={fr ? 'Navigation principale' : 'Main navigation'} className="site-nav">
          <a href="#experience">{fr ? 'Parcours' : 'Experience'}</a>
          <a href="#cv">{fr ? 'CV' : 'Résumé'}</a>
          <a href="#research">{fr ? 'Recherche' : 'Research'}</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="language-switch" role="group" aria-label={fr ? 'Langue du site' : 'Site language'}>
          <button type="button" lang="fr" aria-label="Français" aria-pressed={fr} onClick={() => setLang('fr')}>FR</button>
          <button type="button" lang="en" aria-label="English" aria-pressed={!fr} onClick={() => setLang('en')}>EN</button>
        </div>
      </div>
    </header>
  );
}
