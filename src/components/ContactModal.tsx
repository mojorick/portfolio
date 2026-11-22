import React, { useState } from 'react';
import type { Language } from '../types';
import { personalInfo } from '../data/content';
import { X, Mail, Phone, MapPin, Copy, Check, ExternalLink } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './BrandIcons';

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
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-xl bg-zinc-950 border border-zinc-800 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-5">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">
            {lang === 'fr' ? 'Coordonnées Directes' : 'Direct Contact'}
          </span>
          <h3 className="text-xl font-bold text-white">
            {personalInfo.name}
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            {lang === 'fr'
              ? 'Stage de mobilité internationale (6 mois) & Thèse CIFRE en IA / RO.'
              : '6-month international internship & CIFRE PhD in AI / OR.'}
          </p>
        </div>

        <div className="space-y-2.5 mb-5">
          {/* Email */}
          <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
              <div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Email</div>
                <div className="text-xs font-mono text-white select-all">{personalInfo.email}</div>
              </div>
            </div>
            <button
              onClick={() => handleCopy(personalInfo.email, 'email')}
              className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Copier"
            >
              {copiedKey === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone */}
          <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
              <div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Téléphone</div>
                <div className="text-xs font-mono text-white select-all">{personalInfo.phone}</div>
              </div>
            </div>
            <button
              onClick={() => handleCopy(personalInfo.phone, 'phone')}
              className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Copier"
            >
              {copiedKey === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Location */}
          <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-3">
            <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
            <div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase">Localisation</div>
              <div className="text-xs text-white">{personalInfo.location}</div>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </div>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </div>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </a>
        </div>

        {/* Mailto Button */}
        <a
          href={`mailto:${personalInfo.email}?subject=Prise de contact — Stage International / Thèse CIFRE`}
          className="w-full py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          <span>{lang === 'fr' ? 'Envoyer un Email' : 'Send Email'}</span>
        </a>
      </div>
    </div>
  );
};
