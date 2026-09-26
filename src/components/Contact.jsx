import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ArrowUpRight, Copy, Mail, Download, LoaderCircle, CheckCircle2, AlertCircle, MapPin, Send } from 'lucide-react';
import { portfolio } from '../data/portfolioData.js';
import { SocialLinks, WhatsAppLink } from './UI.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { downloadMessage, validateContact } from '../utils/contact.js';
import { contactMode, sendContact } from '../utils/sendContact.js';

const emptyValues = { name: '', email: '', subject: '', message: '', website: '' };

export default function Contact() {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const [manualCopy, setManualCopy] = useState(false);
  const controller = useRef(null);
  const submitting = useRef(false);
  const formRef = useRef(null);
  const notify = useToast();
  const mode = contactMode(portfolio.contact, portfolio.email);
  useEffect(() => () => controller.current?.abort(), []);

  const update = event => {
    const { name, value } = event.target;
    setValues(current => ({ ...current, [name]: value }));
    setErrors(current => ({ ...current, [name]: undefined }));
    if (status !== 'sending') { setStatus('idle'); setFeedback(''); }
  };
  const copyEmail = async () => {
    try { if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable'); await navigator.clipboard.writeText(portfolio.email); notify('Email address copied.'); }
    catch { setManualCopy(true); notify('Copy the email address from the field below.', 'error'); }
  };
  const submit = async event => {
    event.preventDefault();
    if (submitting.current) return;
    const nextErrors = validateContact(values, portfolio.contact.minimumMessageLength);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { formRef.current?.elements.namedItem(Object.keys(nextErrors)[0])?.focus(); return; }
    if (mode === 'draft') {
      downloadMessage(values); setStatus('saved'); setFeedback('Your message draft was downloaded. It has not been sent.'); notify('Message draft downloaded.'); return;
    }
    if (mode === 'email') {
      const body = `Hi Naved,\n\n${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`;
      window.location.href = `mailto:${portfolio.email}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`;
      setStatus('opened'); setFeedback('Your email app was requested. Review and send the message there.'); return;
    }
    if (values.website) { setStatus('error'); setFeedback('Please leave the hidden field empty and try again.'); return; }
    submitting.current = true;
    controller.current?.abort(); controller.current = new AbortController();
    setStatus('sending'); setFeedback('');
    try {
      await sendContact(values, portfolio.contact, { signal: controller.current.signal });
      setStatus('success'); setFeedback('Thank you! Your message was submitted for email delivery. I’ll get back to you at the email you provided.'); setValues(emptyValues); notify('Message sent. Thank you for reaching out!');
    } catch (error) {
      if (axios.isCancel(error)) return;
      const message = error.message || 'Your message could not be sent. Your text is still here—please try again.';
      setStatus('error'); setFeedback(message); notify(message, 'error');
    } finally { submitting.current = false; }
  };
  const field = (name, label, placeholder, options = {}) => <div className={`form-field ${options.full ? 'full-field' : ''}`}><label htmlFor={`contact-${name}`}>{label}<span aria-hidden="true"> *</span></label>{options.multiline ? <textarea id={`contact-${name}`} name={name} rows="5" value={values[name]} onChange={update} placeholder={placeholder} maxLength={5000} required aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} /> : <input id={`contact-${name}`} name={name} type={options.type || 'text'} autoComplete={options.autoComplete || 'off'} value={values[name]} onChange={update} placeholder={placeholder} maxLength={options.maxLength || 120} required aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} />}{errors[name] && <span className="field-error" id={`${name}-error`}>{errors[name]}</span>}</div>;

  return <section id="contact" className="section section-anchor contact-section"><div className="container contact-layout">
    <div className="contact-copy" data-reveal><p className="eyebrow"><span>06</span>LET’S CONNECT</p><div className="contact-symbol" aria-hidden="true"><Send size={34} /></div><h2>Let’s build<br /><span className="accent-word">what’s next.</span></h2><p>A front-end opportunity, a React project, or a good conversation. My inbox is open.</p>
      {portfolio.availability.enabled && <span className="availability"><span className="status-dot" />{portfolio.availability.text}</span>}
      {portfolio.email && <div className="contact-email"><a href={`mailto:${portfolio.email}`}><Mail size={19} />{portfolio.email}</a><button className="icon-button" onClick={copyEmail} aria-label="Copy email address"><Copy size={17} /></button></div>}
      {manualCopy && <input className="copy-field" aria-label="Email address to copy" readOnly value={portfolio.email} onFocus={event => event.target.select()} />}
      <WhatsAppLink />
      <SocialLinks labels />
      <div className="contact-location"><MapPin size={16} />{portfolio.location}</div>
    </div>
    <div className="contact-form-card" data-reveal><div className="form-heading"><h3>{mode === 'draft' ? 'Start a conversation' : 'Say hello'}</h3><span>* Required</span></div>{mode === 'draft' && <p className="form-notice">Direct messaging isn’t available yet. You can prepare and save your message below.</p>}
      <form ref={formRef} onSubmit={submit} noValidate aria-busy={status === 'sending'}><fieldset className="contact-fields" disabled={status === 'sending'}><legend className="sr-only">Your contact message</legend><div className="form-grid">{field('name', 'Your name', 'Your full name', { autoComplete: 'name', maxLength: 80 })}{field('email', 'Email address', 'you@company.com', { type: 'email', autoComplete: 'email', maxLength: 254 })}{field('subject', 'Subject', 'A role or a project', { full: true })}{field('message', 'Your message', 'Tell me about the opportunity or project…', { full: true, multiline: true })}</div></fieldset>
        <div className="honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="website" value={values.website} onChange={update} tabIndex={-1} autoComplete="off" /></div>
        <div className={`form-feedback ${status === 'error' ? 'feedback-error' : ''}`} role={status === 'error' ? 'alert' : 'status'} aria-live="polite">{feedback && <>{status === 'error' ? <AlertCircle size={17} /> : <CheckCircle2 size={17} />}<span>{feedback}</span></>}</div>
        <button className="button button-primary submit-button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <>Sending… <LoaderCircle size={18} className="spinner" /></> : mode === 'draft' ? <>Save message draft <Download size={18} /></> : mode === 'email' ? <>Open email app <ArrowUpRight size={18} /></> : <>Send Message <Send size={18} /></>}</button>
        <p className="form-footnote">{mode === 'draft' ? 'Saved to your device. Nothing is sent or stored online.' : mode === 'email' ? 'Your email app will open so you can review and send.' : mode === 'web3forms' ? <>Your name, email and message are processed by <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer">Web3Forms</a> and emailed to me so I can reply.</> : 'Your details are used only to respond to your message.'}</p>
      </form>
    </div>
  </div></section>;
}
