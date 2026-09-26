import { lazy, Suspense, useState } from 'react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { portfolio } from '../data/portfolioData.js';
import { projectFilters } from '../data/projects.js';
import { SectionHeading } from './UI.jsx';
import ProjectPreview from './ProjectPreview.jsx';
import Dialog from './Dialog.jsx';

const ProjectModal = lazy(() => import('./ProjectModal.jsx'));

export default function Projects() {
  const [filter, setFilter] = useState('All work');
  const [selected, setSelected] = useState(null);
  const filtered = portfolio.projects.filter(project => filter === 'All work' || project.category.includes(filter));
  return <section id="projects" className="section section-anchor projects-section">
    <div className="container">
      <SectionHeading number="01" eyebrow="SELECTED WORK" title={<>Ideas, brought<br /><span className="muted-heading">to the browser.</span></>}><p>A selection of what I’ve built, what I’m exploring, and what each project has taught me.</p></SectionHeading>
      <div className="filter-row"><div className="project-filters" role="group" aria-label="Filter projects">{projectFilters.map(item => <button key={item} className={`filter-button ${filter === item ? 'selected' : ''}`} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div><span className="result-count" role="status">{String(filtered.length).padStart(2, '0')} projects</span></div>
      <div className="project-grid" key={filter}>{filtered.map(project => <article key={project.id} className={`project-card ${project.featured && filter === 'All work' ? 'featured' : ''}`}>
        <button className="project-image-button" onClick={() => setSelected(project)} aria-label={`View ${project.name} case study`}><ProjectPreview project={project} /><span className="preview-open"><ArrowUpRight size={24} /></span></button>
        <div className="project-info"><div className="project-meta"><span>{project.number} / {project.type}</span><span className="project-status">{project.status}</span></div><h3>{project.name}</h3><p>{project.description}</p><div className="tags">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div><div className="project-links"><button className="text-button" onClick={() => setSelected(project)}>Explore project <ArrowUpRight size={17} /></button><div>{project.github && <a className="icon-button" href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.name} on GitHub`}><Github size={18} /></a>}{project.live && <a className="icon-button" href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.name} live demo`}><ExternalLink size={18} /></a>}</div></div></div>
      </article>)}</div>
      {!filtered.length && <div className="empty-state"><p>No projects in this category yet.</p><button className="text-button" onClick={() => setFilter('All work')}>Explore all work <ArrowUpRight size={17} /></button></div>}
      <p className="work-note">Always a work in progress. Always learning something new.</p>
    </div>
    {selected && <Suspense fallback={<Dialog titleId="project-loading" onClose={() => setSelected(null)}><h2 id="project-loading">Opening project…</h2></Dialog>}><ProjectModal project={selected} onClose={() => setSelected(null)} /></Suspense>}
  </section>;
}
