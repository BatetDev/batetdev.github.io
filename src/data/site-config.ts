export type Image = {
  src: string;
  alt?: string;
  caption?: string;
};

export type Link = {
  text: string;
  href: string;
};

export type Hero = {
  title?: string;
  text?: string;
  image?: Image;
  actions?: Link[];
};

export type Subscribe = {
  title?: string;
  text?: string;
  formUrl: string;
};

export type SiteConfig = {
  website: string;
  logo?: Image;
  title: string;
  subtitle?: string;
  description: string;
  image?: Image;
  headerNavLinks?: Link[];
  footerNavLinks?: Link[];
  socialLinks?: Link[];
  hero?: Hero;
  subscribe?: Subscribe;
  postsPerPage?: number;
  projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
  website: 'https://batetdev.github.io',
  title: 'echo_PATH',
  subtitle: 'Growing Through Code',
  description: 'Astro personal web dev journey Blog / Portfolio by Fran Batet',
  image: {
    src: '/dante-preview.jpg',
    alt: 'Dante - Astro.js and Tailwind CSS theme by justgoodui.com',
  },
  headerNavLinks: [
    {
      text: 'Home',
      href: '/',
    },
    {
      text: 'Projects',
      href: '/projects',
    },
    {
      text: 'Blog',
      href: '/blog',
    },
    {
      text: 'Tags',
      href: '/tags',
    },
  ],
  footerNavLinks: [
    {
      text: 'About',
      href: '/about',
    },
    {
      text: 'Contact',
      href: '/contact',
    },
    {
      text: 'Terms',
      href: '/terms',
    },
  ],
  socialLinks: [
    {
      text: 'GitHub',
      href: 'https://github.com/BatetDev',
    },
    {
      text: 'LinkedIn',
      href: 'https://www.linkedin.com/in/francisco-batet-ab7274298/',
    },
  ],
  hero: {
    title: '$ npm run dev',
    text: "I'm **Fran Batet**, an aspiring Full Stack web developer currently working throught **The Odin Project's** <a href='https://www.theodinproject.com/paths/full-stack-javascript' target='_blank' rel='noopener noreferrer'>Full Stack JavaScript Path</a>. Here, I document my progress by sharing my solutions to curriculum projects as well as my personal creations. Feel free to check out my repos on <a href='https://github.com/BatetDev' target='_blank' rel='noopener noreferrer'>GitHub</a> or connect with me on <a href='https://www.linkedin.com/in/francisco-batet-ab7274298/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>.",
    image: {
      src: '/hero.jpg',
      alt: 'A raven standing on top of a laptop',
    },
    actions: [
      {
        text: 'Get in Touch',
        href: '/contact',
      },
    ],
  },
  subscribe: {
    title: 'Subscribe to my Newsletter',
    text: 'One update per week. All the latest posts directly in your inbox.',
    formUrl: '#',
  },
  postsPerPage: 8,
  projectsPerPage: 8,
};

export default siteConfig;
