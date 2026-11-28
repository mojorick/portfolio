import { useEffect, useState } from 'react';
import type { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperienceSection } from './components/Experience';
import { InteractiveLab } from './components/InteractiveLab/InteractiveLab';
import { ResearchVision } from './components/ResearchVision';
import { EducationSection } from './components/Education';
import { Resume } from './components/Resume';
import { Footer } from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const requested = new URLSearchParams(window.location.search).get('lang');
    if (requested === 'en' || requested === 'fr') return requested;
    return navigator.language.startsWith('fr') ? 'fr' : 'en';
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState(window.history.state, '', url);
    document.documentElement.lang = lang;
    document.title = lang === 'fr'
      ? 'Hémérick Morié — Stage international en data engineering'
      : 'Hémérick Morié — International Data Engineering Internship';
  }, [lang]);

  return (
    <>
      <a className="skip-link" href="#main">{lang === 'fr' ? 'Aller au contenu' : 'Skip to content'}</a>
      <Navbar lang={lang} setLang={setLang} />
      <main id="main">
        <Hero lang={lang} />
        <ExperienceSection lang={lang} />
        <Resume key={lang} lang={lang} />
        <InteractiveLab lang={lang} />
        <ResearchVision lang={lang} />
        <EducationSection lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
