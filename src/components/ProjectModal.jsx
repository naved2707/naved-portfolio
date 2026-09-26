import { Check, Github, ArrowUpRight } from 'lucide-react';
import Dialog from './Dialog.jsx';
import ProjectPreview from './ProjectPreview.jsx';

export default function ProjectModal({ project, onClose }) {
  return <Dialog className="project-dialog" titleId="project-title" onClose={onClose}>
    <div className="project-modal-heading"><p className="eyebrow">{project.type} / {project.status}</p><h2 id="project-title">{project.name}</h2><p>{project.subtitle}</p></div>
    <ProjectPreview project={project} gallery />
    <div className="case-body"><div className="case-columns"><div><h3>The problem</h3><p>{project.problem}</p></div><div><h3>The approach</h3><p>{project.solution}</p></div></div><h3>Key features</h3><ul className="feature-list">{project.features.map(item => <li key={item}><Check size={17} />{item}</li>)}</ul><div className="case-columns"><div><h3>The challenge</h3><p>{project.challenges}</p></div><div><h3>{project.status === 'Planned exploration' ? 'Learning goals' : 'What I learned'}</h3><p>{project.learned}</p></div></div><h3>Built with</h3><div className="tags">{project.stack.map(item => <span key={item}>{item}</span>)}</div><div className="case-actions">{project.currentSite && <a className="button button-primary" href="#home" onClick={onClose}>Explore this portfolio <ArrowUpRight size={18} /></a>}{project.github && <a className="button button-outline" href={project.github} target="_blank" rel="noreferrer"><Github size={18} />View source</a>}{project.live && <a className="button button-primary" href={project.live} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={18} /></a>}<a className="text-button" href="#contact" onClick={onClose}>Let’s talk about this project <ArrowUpRight size={17} /></a></div></div>
  </Dialog>;
}
