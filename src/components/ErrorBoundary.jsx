import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error) { if (import.meta.env.DEV) console.error('Portfolio render error:', error); }
  render() {
    if (this.state.hasError) return <main className="error-page"><span className="wordmark">MN.</span><h1>Let’s try that again.</h1><p>Something interrupted the portfolio. Reload the page to continue.</p><button className="button button-primary" onClick={() => window.location.reload()}>Reload page</button><a href="/resume.pdf">Download résumé</a></main>;
    return this.props.children;
  }
}
