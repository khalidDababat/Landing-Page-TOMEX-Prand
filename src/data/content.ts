import type {
  AboutContent,
  ContactContent,
  FooterContent,
  HeroContent,
  HomeContent,
  ServicesContent,
} from '@/types';

export const heroData: HeroContent = {
  title: 'We Turn Ideas Into Technology.',
  description:
    'Empowering modern enterprises by combining cutting-edge technology, precision design, and robust AI solutions to solve complex challenges.',
  primaryCta: { label: 'Hire Us', href: '#contact' },
  secondaryCta: { label: 'Explore Our Services', href: '#services' },
  image: {
    src: '/images/hero-ai-visual.jpg',
    alt: 'Abstract glowing low-poly network representing AI and emerging technology',
  },
};

export const aboutData: AboutContent = {
  title: 'About TOMEX',
  cards: [
    {
      id: 'web-software',
      icon: 'code',
      title: 'Web & Software',
      description:
        'Building scalable, secure, and high-performance digital platforms tailored for enterprise needs.',
    },
    {
      id: 'programming-education',
      icon: 'school',
      title: 'Programming Education',
      description:
        'Empowering the next generation of developers with industry-leading curriculum and mentorship.',
    },
    {
      id: 'ai-powered-video',
      icon: 'video',
      title: 'AI-Powered Video',
      description:
        'Leveraging artificial intelligence to automate and elevate digital content creation workflows.',
    },
  ],
  pillars: [
    {
      id: 'vision',
      icon: 'vision',
      title: 'Our Vision',
      description:
        'To be the leading global partner for enterprises seeking intelligent, design-driven technology solutions that redefine industry standards and drive sustainable innovation.',
    },
    {
      id: 'mission',
      icon: 'rocket',
      title: 'Our Mission',
      description:
        'We deliver precision-engineered software, transformative educational experiences, and advanced AI content solutions, ensuring our clients stay ahead in a rapidly evolving digital landscape.',
    },
  ],
};

export const servicesData: ServicesContent = {
  title: 'Our Services',
  description: 'Comprehensive technology solutions designed for scale and impact.',
  items: [
    {
      id: 'web-software-dev',
      icon: 'laptop',
      title: 'Web & Software Dev',
      description:
        'Custom enterprise applications, robust backend architectures, and intuitive frontend experiences built with modern frameworks.',
      image: {
        src: '/images/service-web-software.jpg',
        alt: 'Developer workstation with code on a wide monitor',
      },
    },
    {
      id: 'tech-education',
      icon: 'book',
      title: 'Tech Education',
      description:
        'Corporate training, specialized bootcamps, and upskilling programs designed to build high-performing engineering teams.',
      image: {
        src: '/images/service-tech-education.jpg',
        alt: 'Training room with developers learning at workstations',
      },
    },
    {
      id: 'ai-content-generation',
      icon: 'ai',
      title: 'AI Content Generation',
      description:
        'Automated video production, intelligent editing pipelines, and dynamic content generation powered by advanced machine learning models.',
      image: {
        src: '/images/service-ai-content.jpg',
        alt: 'Analytics wall showing an AI network graph and data panels',
      },
    },
  ],
};

export const contactData: ContactContent = {
  title: 'Got a Project in Mind?',
  description:
    "Let's discuss how our technology and design expertise can accelerate your business objectives.",
  details: [
    {
      id: 'email',
      icon: 'email',
      value: 'khaliddababat@gmail.com',
      href: 'mailto:khaliddababat@gmail.com',
    },
    {
      id: 'location',
      icon: 'location',
      value: 'Global Remote',
    },
  ],
};

export const footerData: FooterContent = {
  description: 'Technology, Design, and AI solutions for the modern enterprise.',
  navigationTitle: 'Navigation',
  connectTitle: 'Connect',
  socialLinks: [
    {
      id: 'facebook',
      icon: 'facebook',
      label: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61582613019990',
    },
    {
      id: 'instagram',
      icon: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/tomexcompany/?hl=en',
    },
    {
      id: 'youtube',
      icon: 'youtube',
      label: 'YouTube',
      href: 'https://www.youtube.com/@TOMEXAcademy-j9u',
    },
  ],
  copyright: `© ${new Date().getFullYear()} TOMEX. All rights reserved.`,
};

/** Full home-page content bundle (replaces the JSON-server fetch). */
export const homeContent: HomeContent = {
  hero: heroData,
  about: aboutData,
  services: servicesData,
  contact: contactData,
};
