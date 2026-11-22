import React, { useState } from 'react';
import { Language, ViewMode } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveLab } from './components/InteractiveLab/InteractiveLab';
import { ExperienceSection } from './components/Experience';
import { ResearchVision } from './components/ResearchVision';
import { EducationSection } from './components/Education';
import { SkillsSection } from './components/SkillsSection';
import { ContactModal } from './components/ContactModal';
import { CommandPalette } from './components/CommandPalette';
import { Footer } from './components/Footer';

export function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [mode, setMode] = useState<ViewMode>('recruiter');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-blue-200">
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        mode={mode}
        setMode={setMode}
        onOpenCommand={() => setIsCommandOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          lang={lang}
          mode={mode}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Interactive Lab (Eigenvalues/Eigenvectors & SNCF Rerouting) */}
        <InteractiveLab lang={lang} />

        {/* Experience Section (SNCF Voyageurs & Jolipixel) */}
        <ExperienceSection lang={lang} mode={mode} />

        {/* Research Vision (CIFRE PhD & Operations Research / AI) */}
        <ResearchVision
          lang={lang}
          mode={mode}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Education Section (CESI & INPHB MP*) */}
        <EducationSection lang={lang} />

        {/* Skills Arsenal */}
        <SkillsSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        lang={lang}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        lang={lang}
        setLang={setLang}
        mode={mode}
        setMode={setMode}
        onOpenContact={() => setIsContactOpen(true)}
      />
    </div>
  );
}

export default App;
