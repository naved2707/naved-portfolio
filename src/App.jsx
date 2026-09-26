import { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Journey from './components/Journey.jsx';
import Capabilities from './components/Capabilities.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Dialog from './components/Dialog.jsx';
import { ScrollProgress } from './components/UI.jsx';
import { useTheme } from './context/ThemeContext.jsx';
import { useToast } from './context/ToastContext.jsx';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts.js';
import { useReveal } from './hooks/useReveal.js';
import { portfolio } from './data/portfolioData.js';

const CommandPalette = lazy(() => import('./components/CommandPalette.jsx'));
const GitHubActivity = lazy(() => import('./components/GitHubActivity.jsx'));

export default function App() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [shortcuts, setShortcuts] = useState(() => { try { return localStorage.getItem('naved-shortcuts') === 'true'; } catch { return false; } });
  const { toggleTheme } = useTheme();
  const notify = useToast();
  useReveal();
  useKeyboardShortcuts({ onCommand: () => setCommandOpen(true), onTheme: toggleTheme, onSecret: () => notify('You found me! Stay curious. Keep building. — Naved'), enabled: shortcuts });
  useEffect(() => { document.title = portfolio.seo.title; document.querySelector('meta[name="description"]')?.setAttribute('content', portfolio.seo.description); }, []);
  const updateShortcuts = enabled => { setShortcuts(enabled); try { localStorage.setItem('naved-shortcuts', String(enabled)); } catch { /* Preference remains active for this visit. */ } };
  return <><a className="skip-link" href="#main">Skip to content</a><ScrollProgress /><Navbar onCommand={() => setCommandOpen(true)} /><main id="main"><Hero /><div className="tech-strip" aria-label="Primary technologies"><div className="container"><span>THE FOUNDATION</span><div>{['React', 'JavaScript', 'HTML & CSS', 'Redux', 'Git', 'Vite'].map(item => <span key={item}>{item}</span>)}</div><span className="tech-end" aria-hidden="true">&lt;/&gt;</span></div></div><Projects /><About /><Skills /><Journey /><Capabilities />{portfolio.github.enabled && portfolio.github.username && <Suspense fallback={<p className="container" role="status">Loading repositories…</p>}><GitHubActivity /></Suspense>}<Contact /></main><Footer onCommand={() => setCommandOpen(true)} />{commandOpen && <Suspense fallback={<Dialog titleId="commands-loading" onClose={() => setCommandOpen(false)}><h2 id="commands-loading">Opening navigation…</h2></Dialog>}><CommandPalette onClose={() => setCommandOpen(false)} shortcuts={shortcuts} onShortcutsChange={updateShortcuts} /></Suspense>}</>;
}
