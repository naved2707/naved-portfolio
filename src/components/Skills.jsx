import { useState } from 'react';
import { Code2, Atom, Palette, Braces, Wrench, Database, ArrowUpRight } from 'lucide-react';
import { portfolio } from '../data/portfolioData.js';
import { SectionHeading } from './UI.jsx';

const icons = { Code2, Atom, Palette, Braces, Wrench, Database };
export default function Skills() {
  const [level, setLevel] = useState('All');
  const visible = portfolio.skills.filter(group => level === 'All' || group.level === level);
  return <section id="skills" className="section section-anchor skills-section"><div className="container">
    <SectionHeading number="03" eyebrow="MY TOOLKIT" title={<>The right tools.<br /><span className="muted-heading">A thoughtful approach.</span></>}><p>A strong foundation in the frontend, with a growing understanding of what connects it all.</p></SectionHeading>
    <div className="skill-toolbar" role="group" aria-label="Filter skills by familiarity">{['All', 'Core', 'Comfortable', 'Familiar'].map(item => <button key={item} className={`filter-button ${item === level ? 'selected' : ''}`} onClick={() => setLevel(item)} aria-pressed={level === item}>{item}</button>)}</div>
    <div className="skills-grid">{visible.map(group => { const Icon = icons[group.icon]; return <article className="skill-card" key={group.name}><div className="skill-card-top"><span className="skill-icon"><Icon size={22} /></span><span className={`level-tag level-${group.level.toLowerCase()}`}>{group.level}</span></div><h3>{group.name}</h3><div className="skill-tags">{group.items.map(item => <span key={item}>{item}</span>)}</div></article>; })}</div>
    <p className="skills-note"><ArrowUpRight size={17} />The tools change. The habit of learning stays.</p>
  </div></section>;
}
