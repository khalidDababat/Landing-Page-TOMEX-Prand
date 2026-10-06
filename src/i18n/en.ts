/** English dictionary — the source of truth for the shape every language must follow. */
export const en = {
  meta: {
    siteTitle: 'TOMEX Technology',
    siteDescription:
      'TOMEX turns ideas into technology: software development, programming education, and AI-powered video solutions.',
    portfolioTitle: 'Portfolio | TOMEX Technology',
    portfolioDescription: 'Showcasing our precision in technology and creative design.',
    careersTitle: 'Careers | TOMEX Technology',
    careersDescription: 'Opportunity details and application at TOMEX Technology.',
  },

  language: {
    label: 'Language',
    en: 'EN',
    ar: 'AR',
    englishName: 'English',
    arabicName: 'العربية',
  },

  header: {
    homeLabel: 'TOMEX home',
    logoAlt: 'logo TOMEX',
    logoText: 'TOMEX Technologies',
    mainNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },

  nav: {
    about: 'About',
    services: 'Services',
    portfolio: 'Portfolio',
    careers: 'Careers',
    contact: 'Contact',
  },

  comingSoon: {
    portfolioTitle: 'Something Great Is Coming!',
    portfolioMessage: "We're preparing our portfolio to showcase our latest work. Stay tuned!",
    caseStudyTitle: 'Case Study Coming Soon',
    caseStudyMessage: "We're putting the finishing touches on this case study. Stay tuned!",
  },

  hero: {
    title: 'TOMEX Technology.',
    tagline: 'Modern Software Engineering · Programming Education · AI-Powered Creativity',
    cta: 'Explore Our Services',
  },

  about: {
    title: 'About TOMEX',
    intro:
      'TOMEX was founded in 2026 to deliver modern technology solutions across software development, technical education, and AI-powered content. We turn ideas into practical solutions and help individuals and businesses grow in the digital world.',
    pillars: {
      vision: {
        title: 'Our Vision',
        description:
          'To become a trusted technology and creative partner, empowering individuals and businesses through innovative digital solutions, education, and artificial intelligence.',
      },
      mission: {
        title: 'Our Mission',
        description:
          'To turn ideas into meaningful digital experiences by combining modern software development, practical technology education, and AI-powered creativity.',
      },
    },
  },

  services: {
    title: 'Our Services',
    description: 'Smart digital solutions built around your ideas and ambitions.',
    loading: 'Loading services',
  },

  team: {
    title: 'Meet Our Team',
    description: 'Meet our outstanding team members.',
    empty: 'Our team will be introduced soon.',
    memberAlt: '{name}, {position} at TOMEX',
    linkedin: 'LinkedIn',
    linkedinLabel: '{name} on LinkedIn',
  },

  contact: {
    title: 'Got a Project in Mind?',
    description:
      "Let's discuss how our technology and design expertise can accelerate your business objectives.",
    location: 'Global Remote',
    nameLabel: 'Name',
    namePlaceholder: 'John Doe',
    emailLabel: 'Email',
    emailPlaceholder: 'john@company.com',
    messageLabel: 'Message',
    messagePlaceholder: 'Tell us about your project...',
    send: 'Send Message',
    sending: 'Sending...',
    fixFields: 'Please fix the highlighted fields.',
    success: 'Your message has been sent successfully!',
    sendFailed: 'Failed to send message. Please try again.',
    genericError: 'Something went wrong. Please try again.',
  },

  footer: {
    homeLabel: 'TOMEX home',
    description: 'Technology, Design, and AI solutions for the individuals and businesses.',
    navigationTitle: 'Navigation',
    navigationLabel: 'Footer navigation',
    connectTitle: 'Connect',
    facebook: 'Facebook',
    instagram: 'Instagram',
    youtube: 'YouTube',
    email: 'Email',
    copyright: '© {year} TOMEX Tech. All rights reserved.',
  },

  careers: {
    title: 'Open Opportunities',
    description: 'Find your role Or Internship in TOMEX.',
    loading: 'Loading opportunities',
    empty: 'There are no open roles right now.',
    applyNow: 'Apply Now',
    applyUnavailable: 'Apply Unavailable',
  },

  jobTypes: {
    Education: 'Education',
    Internship: 'Internship',
    Role: 'Role',
  },

  careerDetails: {
    regionLabel: 'Opportunity details',
    loading: 'Loading opportunity',
    jobDescription: 'Job Description',
    aboutRole: 'About the Role',
    responsibilities: 'Job Responsibilities',
    notAvailable: 'This opportunity is not available.',
  },

  application: {
    heading: 'Apply for this opportunity',
    fullName: 'Full Name',
    fullNamePlaceholderEducation: 'First and last name',
    fullNamePlaceholder: 'John Doe',
    email: 'Email Address',
    emailPlaceholder: 'john@company.com',
    phone: 'Phone Number',
    whatsapp: 'WhatsApp Phone Number',
    phonePlaceholder: '59 123 4567',
    countryCode: 'Country code',
    level: 'Current Level',
    levelPlaceholder: 'Select your level',
    levels: {
      Beginner: 'Beginner',
      Intermediate: 'Intermediate',
      Advanced: 'Advanced',
    },
    about: 'Tell Us About Yourself',
    coverLetter: 'Cover Letter',
    cvResume: 'CV / Resume',
    cvSupporting: 'CV / Supporting Attachments',
    fileHint: 'PDF, DOC or DOCX, up to {size} MB.',
    notice: 'Online applications are not open yet. This form will be enabled soon.',
    submitEducation: 'Submit',
    submit: 'Submit Your Application',
    back: 'Back',
  },

  countries: {
    '+970': 'Palestine',
    '+972': 'Israel',
    '+962': 'Jordan',
    '+961': 'Lebanon',
    '+963': 'Syria',
    '+964': 'Iraq',
    '+966': 'Saudi Arabia',
    '+971': 'United Arab Emirates',
    '+974': 'Qatar',
    '+965': 'Kuwait',
    '+973': 'Bahrain',
    '+968': 'Oman',
    '+967': 'Yemen',
    '+20': 'Egypt',
    '+218': 'Libya',
    '+216': 'Tunisia',
    '+213': 'Algeria',
    '+212': 'Morocco',
    '+249': 'Sudan',
    '+90': 'Turkey',
    '+44': 'United Kingdom',
    '+49': 'Germany',
    '+33': 'France',
    '+1': 'United States / Canada',
  } as Record<string, string>,

  validation: {
    nameRequired: 'Please enter your name.',
    nameMin: 'Name must be at least {min} characters.',
    emailRequired: 'Please enter your email address.',
    emailInvalid: 'Please enter a valid email address.',
    messageRequired: 'Please tell us about your project.',
    messageMin: 'Message must be at least {min} characters.',
    fullNameRequired: 'Please enter your full name.',
    fullNameParts: 'Please enter your first and last name.',
    whatsappRequired: 'Please enter your WhatsApp number.',
    phoneRequired: 'Please enter your phone number.',
    phoneInvalid: 'Please enter a valid phone number.',
    cvType: 'Please upload a PDF, DOC or DOCX file.',
    cvSize: 'File must be {size} MB or smaller.',
    cvRequired: 'Please upload your CV / resume.',
    levelRequired: 'Please choose your current level.',
    aboutRequired: 'Please tell us about yourself.',
  },

  portfolio: {
    title: 'Our Portfolio',
    description: 'Showcasing our precision in technology and creative design.',
    loading: 'Loading projects',
    empty: 'No projects have been published yet.',
  },

  states: {
    loading: 'Loading',
    nothing: 'Nothing to show yet.',
    loadError: 'We could not load this content.',
    apiHint: 'Make sure the API is running: npm run server',
    retry: 'Try again',
    retrying: 'Retrying…',
    pageError: 'Something went wrong while loading this page.',
  },

  notFound: {
    heading: 'Oops! Page Not Found',
    home: 'Go Back Home',
  },

  whatsapp: {
    label: 'Chat with TOMEX on WhatsApp',
    message: "Hello TOMEXtech, I'd like to enquire about your services.",
  },
};

export type Dictionary = typeof en;
