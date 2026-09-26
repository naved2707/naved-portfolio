import { ArrowUpRight, Component, Layers3, Database, Code2, MousePointer2, RefreshCw } from 'lucide-react';
import { portfolio } from '../data/portfolioData.js';
import { SectionHeading } from './UI.jsx';

export default function About() {
  const icons = [MousePointer2, Code2, RefreshCw];
  return <section id="about" className="section about-section section-anchor"><div className="container">
    <SectionHeading number="02" eyebrow="BEHIND THE CODE" title={<>A curious mind.<br /><span className="muted-heading">A builder at heart.</span></>} />
    <div className="about-layout"><div className="about-story" data-reveal><p className="about-lead">{portfolio.about.introduction}</p><p>{portfolio.about.body}</p><p>{portfolio.about.goal}</p><a className="text-button" href="#contact">Let’s work together <ArrowUpRight size={17} /></a></div><div className="about-aside" data-reveal><div className="architecture-card"><p className="eyebrow">HOW I THINK ABOUT REACT</p><div className="architecture-node architecture-root"><Layers3 size={23} /><span>One clear experience</span></div><div className="architecture-branch" aria-hidden="true" /><div className="architecture-row"><div><Component size={23} /><span>Reusable UI</span></div><div><Database size={23} /><span>Connected data</span></div></div><p className="architecture-focus">Currently exploring: {portfolio.about.focus}</p></div></div></div>
    <div className="principles">{portfolio.about.principles.map((item, index) => { const Icon = icons[index]; return <div className="principle" key={item.number} data-reveal><span className="principle-number"><Icon size={22} aria-hidden="true" /></span><h3>{item.title}</h3><p>{item.text}</p></div>; })}</div>
  </div></section>;
}
