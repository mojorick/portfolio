import React from 'react';
import type { Language, ViewMode } from '../types';
import { personalInfo } from '../data/content';
import { ArrowRight, MapPin, ExternalLink, Terminal } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './BrandIcons';

interface HeroProps {
  lang: Language;
  mode: ViewMode;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, mode, onOpenContact }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Core pitch */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Opportunity Badges (Clean, no emojis) */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono">
                {personalInfo.availability.international[lang]}
              </span>

              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono">
                {personalInfo.availability.cifre[lang]}
              </span>
            </div>

            {/* Main Title & Identity */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
              {personalInfo.name}
            </h1>

            {/* Role Subtitle */}
            <div className="text-lg sm:text-xl font-medium text-zinc-300 mb-4">
              {personalInfo.role[lang]}
            </div>

            {/* Headline */}
            <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed mb-6 max-w-2xl">
              {personalInfo.bio[lang]}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-10">
              <a
                href="#interactive-lab"
                className="px-5 py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{lang === 'fr' ? 'Consulter les démonstrateurs' : 'Explore Interactive Lab'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#research"
                className="px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{lang === 'fr' ? 'Projet de Thèse CIFRE' : 'CIFRE Research Proposal'}</span>
              </a>

              <button
                onClick={onOpenContact}
                className="px-4 py-2.5 rounded-lg bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{lang === 'fr' ? 'Coordonnées & Contact' : 'Contact & Details'}</span>
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full pt-6 border-t border-zinc-800/80">
              {personalInfo.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold font-mono text-zinc-100 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-zinc-400 mt-1">
                    {stat.label[lang]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Photo + Structured Technical Profile */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[360px] rounded-xl bg-zinc-900/90 border border-zinc-800 overflow-hidden shadow-lg">
              {/* Photo */}
              <div className="relative aspect-[4/5] bg-zinc-950 overflow-hidden">
                <img
                  src={personalInfo.photo}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />

                {/* Location and Company tags */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-300">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{personalInfo.location}</span>
                  </div>

                  <div className="px-2.5 py-1 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-300">
                    SNCF Voyageurs
                  </div>
                </div>
              </div>

              {/* Technical summary panel */}
              <div className="p-4 border-t border-zinc-800 bg-zinc-950">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                    <span>profile_summary.json</span>
                  </div>
                  <span className="text-[10px] text-zinc-500">TS 5.4</span>
                </div>

                <div className="bg-zinc-900/80 rounded-lg p-3 font-mono text-xs leading-relaxed text-zinc-300 border border-zinc-800/80">
                  <div>
                    <span className="text-zinc-500">const</span>{' '}
                    <span className="text-zinc-200">engineer</span> = &#123;
                  </div>
                  <div className="pl-4">
                    <span className="text-zinc-400">academic:</span>{' '}
                    <span className="text-zinc-200">"MPSI/MP* (INPHB) ➔ CESI"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-zinc-400">role:</span>{' '}
                    <span className="text-zinc-200">"Data Engineer @ SNCF"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-zinc-400">cifreTarget:</span>{' '}
                    <span className="text-zinc-200">"AI & Operations Research"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-zinc-400">interests:</span>{' '}
                    <span className="text-zinc-300">["Piano Jazz", "Basketball"]</span>
                  </div>
                  <div>&#125;;</div>
                </div>

                {/* Direct profiles */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3 text-zinc-500" />
                  </a>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 text-zinc-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
