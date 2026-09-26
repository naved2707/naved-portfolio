import { GraduationCap, ArrowUpRight } from 'lucide-react';
import { portfolio } from '../data/portfolioData.js';
import { SectionHeading } from './UI.jsx';

export default function Journey() {
  return <section id="experience" className="section section-anchor journey-section"><div className="container">
    <SectionHeading number="04" eyebrow="THE JOURNEY" title={<>Built on curiosity.<br /><span className="muted-heading">Moving forward.</span></>}><p>My path into development is shaped by education, hands-on projects, and consistent practice.</p></SectionHeading>
    <div className="journey-layout"><div className="experience-column"><h3 className="column-heading">Learning & project experience <ArrowUpRight size={17} /></h3><div className="timeline">{portfolio.experience.map(item => <article className="timeline-item" key={item.title} data-reveal><span className="timeline-node" /><span className="timeline-period">{item.period}</span><h4>{item.title}</h4><span className="timeline-kind">{item.kind}</span><p>{item.description}</p><div className="tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div></div><div className="education-column" id="education"><h3 className="column-heading">Education <GraduationCap size={20} /></h3>{portfolio.education.map(item => <article className="education-card" key={item.year} data-reveal><span className="education-year">{item.year}</span><div><h4>{item.title}</h4><p>{item.institution}</p><span>{item.description} · Completed</span></div></article>)}</div></div>
    {portfolio.achievements.length > 0 && <div className="achievement-list"><h3>Milestones</h3>{portfolio.achievements.map(item => <article key={item.title}><h4>{item.title}</h4><p>{item.description}</p></article>)}</div>}
  </div></section>;
}
