import React, { useState } from 'react';
import type { Language } from '../types';
import { personalInfo } from '../data/content';
import { X, Mail, Phone, MapPin, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './BrandIcons';
import confetti from 'canvas-confetti';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, lang }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#3b82f6', '#06b6d4', '#10b981']
    });
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-950 border border-slate-800 p-6 md:p-8 shadow-2xl overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Prise de Contact Directe' : 'Direct Contact'}</span>
          </div>
          <h3 className="text-2xl font-bold text-white">
            {lang === 'fr' ? 'Échangeons ensemble' : 'Let\'s Connect'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'fr'
              ? 'Pour un stage de mobilité internationale (6 mois) ou une proposition de thèse CIFRE en IA / RO.'
              : 'For a 6-month international internship or a CIFRE PhD collaboration in AI / OR.'}
          </p>
        </div>

        {/* Contact items */}
        <div className="space-y-3 mb-6">
          {/* Email */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-500">Email</div>
                <div className="text-sm font-semibold text-white font-mono">{personalInfo.email}</div>
              </div>
            </div>
            <button
              onClick={() => handleCopy(personalInfo.email, 'email')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Copier"
            >
              {copiedKey === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-500">Téléphone</div>
                <div className="text-sm font-semibold text-white font-mono">{personalInfo.phone}</div>
              </div>
            </div>
            <button
              onClick={() => handleCopy(personalInfo.phone, 'phone')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Copier"
            >
              {copiedKey === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Location */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-500">Localisation</div>
              <div className="text-sm font-semibold text-white">{personalInfo.location}</div>
            </div>
          </div>
        </div>

        {/* Profiles Links */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 text-xs font-semibold flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Action Button */}
        <a
          href={`mailto:${personalInfo.email}?subject=Prise de contact - Stage International / Thèse CIFRE`}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          <span>{lang === 'fr' ? 'Envoyer un Email Directement' : 'Send an Email Directly'}</span>
        </a>
      </div>
    </div>
  );
};
