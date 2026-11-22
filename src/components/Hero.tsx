import React from 'react';
import type { Language, ViewMode } from '../types';
import { personalInfo } from '../data/content';
import { Sparkles, ArrowRight, GraduationCap, MapPin, CheckCircle, ExternalLink, Terminal } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './BrandIcons';

interface HeroProps {
  lang: Language;
  mode: ViewMode;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, mode, onOpenContact }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-600/15 via-cyan-500/10 to-indigo-600/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core pitch */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Dual Opportunity Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{personalInfo.availability.international[lang]}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium shadow-sm">
                <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                <span>{personalInfo.availability.cifre[lang]}</span>
              </div>
            </div>

            {/* Main Title & Identity */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-4">
              <span>{personalInfo.name}</span>
            </h1>

            {/* Role Subtitle */}
            <div className="text-xl sm:text-2xl font-bold text-gradient-primary mb-4">
              {personalInfo.role[lang]}
            </div>

            {/* Narrative Headline */}
            <p className="text-base sm:text-lg text-slate-300 font-medium mb-3">
              "{personalInfo.headline[lang]}"
            </p>

            {/* Bio */}
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mb-8">
              {personalInfo.bio[lang]}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-10">
              <a
                href="#interactive-lab"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
                <span>{lang === 'fr' ? 'Tester le Lab Interactif' : 'Explore Interactive Lab'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#research"
                className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span>{lang === 'fr' ? 'Projet de Thèse CIFRE' : 'CIFRE Research Proposal'}</span>
              </a>

              <button
                onClick={onOpenContact}
                className="px-5 py-3 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 text-slate-300 hover:text-white text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{lang === 'fr' ? 'Coordonnées & CV' : 'Contact & Resume'}</span>
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-6 border-t border-slate-800/80">
              {personalInfo.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5">
                    {stat.label[lang]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Photo + Interactive Card Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[380px]">
              {/* Outer decorative glowing ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-blue-600 via-cyan-400 to-purple-600 opacity-40 blur-xl animate-pulse" />

              {/* Main Photo Card */}
              <div className="relative rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
                {/* Photo Header with Real Photo */}
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-900">
                  <img
                    src={personalInfo.photo}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Overlaid Badges */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-mono text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      <span>{personalInfo.location}</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-xs font-mono text-emerald-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>SNCF Voyageurs</span>
                    </div>
                  </div>
                </div>

                {/* Card mini terminal / quick info */}
                <div className="p-4 bg-slate-950 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <div className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      <span>profile_spec.json</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Node v24 • TS 5</span>
                  </div>

                  <div className="bg-slate-900/80 rounded-xl p-3 font-mono text-[11px] leading-relaxed text-slate-300 border border-slate-800/60">
                    <div>
                      <span className="text-purple-400">const</span>{' '}
                      <span className="text-blue-300">candidate</span> = &#123;
                    </div>
                    <div className="pl-4">
                      <span className="text-slate-400">formation:</span>{' '}
                      <span className="text-emerald-300">"MPSI/MP* ➔ CESI"</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-slate-400">role:</span>{' '}
                      <span className="text-emerald-300">"Data Engineer @ SNCF"</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-slate-400">researchTarget:</span>{' '}
                      <span className="text-emerald-300">"CIFRE PhD (AI / OR)"</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-slate-400">hobbies:</span>{' '}
                      <span className="text-amber-300">["Piano Jazz", "Basketball"]</span>
                    </div>
                    <div>&#125;;</div>
                  </div>

                  {/* Social Buttons */}
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
