import React from 'react';
import type { Language } from '../types';
import { personalInfo } from '../data/content';
import { Globe, ArrowUp, Mail } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './BrandIcons';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 pt-16 pb-12 relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Identity & Domain */}
          <div className="md:col-span-6 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-extrabold text-white tracking-tight">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed mb-4">
              {personalInfo.role[lang]} • CESI La Rochelle • INPHB Yamoussoukro (MPSI/MP*) • Data Engineer en alternance chez SNCF Voyageurs Nantes.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 px-3 py-1.5 rounded-xl">
              <Globe className="w-3.5 h-3.5" />
              <span>Domaine Officiel : </span>
              <a href={`https://${personalInfo.domain}`} className="underline font-bold hover:text-white">
                {personalInfo.domain}
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#interactive-lab" className="hover:text-white transition-colors">Lab Interactif (MP* ➔ IA & RO)</a></li>
              <li><a href="#experience" className="hover:text-white transition-colors">Expérience SNCF Voyageurs</a></li>
              <li><a href="#research" className="hover:text-white transition-colors">Vision & Thèse CIFRE</a></li>
              <li><a href="#education" className="hover:text-white transition-colors">Classes Préparatoires & CESI</a></li>
              <li><a href="#skills" className="hover:text-white transition-colors">Arsenal Technique</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3">
              Réseaux & Contact
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub @mojorick</span>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{personalInfo.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} {personalInfo.name}. {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>{lang === 'fr' ? 'Haut de page' : 'Back to top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
