import { projects } from './projects.js';
import { skills } from './skills.js';
import { experience, education } from './experience.js';

// This is the single entry point for portfolio content. Empty links are hidden.
export const portfolio = {
  name: 'Mohammad Naved',
  shortName: 'Naved',
  initials: 'MN',
  title: 'Front-End Developer',
  roles: ['React Developer', 'JavaScript Developer', 'Frontend Engineer', 'UI-Focused Web Developer'],
  description: 'I turn ideas into intuitive, responsive web experiences. Built with React. Refined with care.',
  location: 'Akola, Maharashtra, India',
  email: 'naved270798@gmail.com',
  social: {
    github: 'https://github.com/naved2707',
    linkedin: 'https://www.linkedin.com/in/mohammad-naved-6b2a82252/',
    instagram: 'https://www.instagram.com/mr._naved__/',
  },
  whatsapp: { number: '+917972757620', label: '+91 79727 57620', message: 'Hi Naved, I found your portfolio and would like to connect.' },
  resume: { url: '/resume.pdf', filename: 'Mohammad-Naved-Resume.pdf', enabled: true },
  profile: { image: '/images/avatar-placeholder.webp', alt: 'Illustrated avatar used as a temporary profile image', placeholder: true },
  availability: { enabled: true, text: 'Open to front-end opportunities' },
  contact: {
    provider: 'web3forms',
    // Web3Forms form keys are public submission identifiers, not Gmail credentials.
    accessKey: import.meta.env?.VITE_WEB3FORMS_ACCESS_KEY || 'a707324c-ba1c-438a-bb94-2d2c8d95ba13',
    endpoint: import.meta.env?.VITE_CONTACT_ENDPOINT || '',
    minimumMessageLength: 20,
  },
  seo: {
    title: 'Mohammad Naved | Front-End Developer',
    description: 'Explore Mohammad Naved’s React and JavaScript projects, front-end skills, and development journey. Open to Front-End Developer and React Developer opportunities.',
    siteUrl: import.meta.env?.VITE_SITE_URL || '',
  },
  navigation: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Journey' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ],
  about: {
    heading: 'A curious mind.\nA builder at heart.',
    introduction: 'I’m Naved, a front-end developer who enjoys the space where clear design meets thoughtful engineering.',
    body: 'Responsive layouts. Reusable React components. APIs that turn data into useful interfaces. I enjoy bringing these pieces together.',
    goal: 'Seeking a Front-End / React Developer role to contribute and grow with a team.',
    focus: 'JavaScript fundamentals, accessible interfaces, and thoughtful React architecture.',
    principles: [
      { number: '01', title: 'Understand before building', text: 'Start with the user, the problem, and the smallest useful solution.' },
      { number: '02', title: 'Make the details count', text: 'Responsive layouts, clear feedback, and thoughtful keyboard interactions.' },
      { number: '03', title: 'Build to keep improving', text: 'Readable code, reusable components, and a willingness to learn.' },
    ],
  },
  capabilities: [
    { icon: 'Layout', title: 'Responsive websites', text: 'Landing pages and portfolios that feel at home on every screen.', tags: 'HTML · CSS · Responsive design' },
    { icon: 'Layers', title: 'React applications', text: 'Reusable components, useful interactions, and predictable state.', tags: 'React · Hooks · Context API' },
    { icon: 'Plug', title: 'Connected interfaces', text: 'API-driven experiences with clear loading, empty, and error states.', tags: 'REST APIs · Axios · JSON' },
    { icon: 'PanelTop', title: 'Dashboard interfaces', text: 'Organized information, practical filters, and accessible controls.', tags: 'UI development · Data display' },
  ],
  achievements: [],
  github: { enabled: false, username: '' },
  projects,
  skills,
  experience,
  education,
};
