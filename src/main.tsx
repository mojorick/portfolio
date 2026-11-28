import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'katex/dist/katex.min.css'
import './index.css'
import App from './App'
import { ResumeDocument } from './components/ResumeDocument'

const resumeLanguage = new URLSearchParams(window.location.search).get('resume')
const isResume = resumeLanguage === 'fr' || resumeLanguage === 'en'
if (isResume) {
  document.body.classList.add('resume-page')
  document.documentElement.lang = resumeLanguage
  document.title = resumeLanguage === 'fr' ? 'CV — Hémérick Morié' : 'Résumé — Hémérick Morié'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isResume ? <ResumeDocument lang={resumeLanguage} /> : <App />}
  </StrictMode>,
)
