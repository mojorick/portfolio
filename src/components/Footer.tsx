import { ArrowUpRight, Mail } from 'lucide-react';
import { personalInfo } from '../data/content';
import type { Language } from '../types';

export function Footer({ lang }: { lang: Language }) {
  const fr = lang === 'fr';

  return (
    <footer id="contact" className="section-band site-footer">
      <div className="site-shell footer-inner">
        <div>
          <h2>Contact</h2>
          <a className="text-link email-link" href={`mailto:${personalInfo.email}`}>
            <Mail size={17} aria-hidden="true" />{personalInfo.email}
          </a>
        </div>
        <div className="footer-links">
          <a className="text-link" href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16} aria-hidden="true" /></a>
          <a className="text-link" href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
          <a className="text-link" href="#top">{fr ? 'Haut de page' : 'Back to top'}</a>
        </div>
      </div>
    </footer>
  );
}
