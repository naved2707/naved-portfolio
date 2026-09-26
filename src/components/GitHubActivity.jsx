import { useEffect, useState } from 'react';
import { Github, Star, ArrowUpRight } from 'lucide-react';
import { portfolio } from '../data/portfolioData.js';

export default function GitHubActivity() {
  const [state, setState] = useState({ loading: true, error: '', repos: [] });
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try { const response = await fetch(`https://api.github.com/users/${encodeURIComponent(portfolio.github.username)}/repos?sort=updated&per_page=6`, { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } }); if (!response.ok) throw new Error('Could not load repositories'); const repos = await response.json(); if (!Array.isArray(repos)) throw new Error('Unexpected GitHub response'); setState({ loading: false, error: '', repos }); }
      catch (error) { if (error.name !== 'AbortError') setState({ loading: false, error: 'Repositories are unavailable right now. You can still visit GitHub directly.', repos: [] }); }
    }
    load(); return () => controller.abort();
  }, []);
  return <section className="section github-section"><div className="container"><p className="eyebrow"><Github size={17} />ON GITHUB</p><h2>From the repository.</h2><p role="status">{state.loading ? 'Loading public repositories…' : state.error}</p><div className="github-grid">{state.repos.map(repo => <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer"><h3>{repo.name}<ArrowUpRight size={16} /></h3><p>{repo.description || 'Explore the source and development history.'}</p><span>{repo.language || 'Repository'} · <Star size={13} /> {repo.stargazers_count}</span></a>)}</div>{!state.loading && !state.error && !state.repos.length && <p>No public repositories to display yet.</p>}<a className="text-button" href={`https://github.com/${encodeURIComponent(portfolio.github.username)}`} target="_blank" rel="noreferrer">Visit GitHub <ArrowUpRight size={17} /></a></div></section>;
}
