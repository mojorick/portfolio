import React from 'react';
import type { Language } from '../types';
import { personalInfo } from '../data/content';
import { ArrowUp, Mail } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './BrandIcons';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 pt-14 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Identity */}
          <div className="md:col-span-6 flex flex-col items-start">
            <span className="text-lg font-bold text-white tracking-tight mb-2">
              {personalInfo.name}
            </span>
            <p className="text-xs text-zinc-400 max-w-md leading-relaxed mb-4">
              {personalInfo.role[lang]} • CESI La Rochelle • INPHB Yamoussoukro (MPSI/MP*) • Data Engineer chez SNCF Voyageurs Nantes.
            </p>
            <div className="text-xs font-mono text-zinc-400">
              {personalInfo.domain}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-3">
              Index
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400 font-mono">
              <li><a href="#interactive-lab" className="hover:text-white transition-colors">Laboratoire Interactif</a></li>
              <li><a href="#experience" className="hover:text-white transition-colors">SNCF Voyageurs</a></li>
              <li><a href="#research" className="hover:text-white transition-colors">Thèse CIFRE (IA & RO)</a></li>
              <li><a href="#education" className="hover:text-white transition-colors">Classes Prépas & CESI</a></li>
              <li><a href="#skills" className="hover:text-white transition-colors">Arsenal Technique</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-3">
              Réseaux
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{personalInfo.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
          <div>
            © {new Date().getFullYear()} {personalInfo.name}. {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <span>{lang === 'fr' ? 'Haut de page' : 'Back to top'}</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
