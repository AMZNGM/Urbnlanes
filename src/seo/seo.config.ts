export const SEO = {
  '/': {
    title: 'Urbnlanes - Your gateway to urban living',
    description:
      'Discover your dream home and urban living experience with Urbnlanes, a real estate development company building masterpieces across the Middle East.',
    keywords: [
      'urbnlanes',
      'home',
      'real estate',
      'urban living',
      'middle east',
      'real estate development',
      'projects',
      'latest launches',
      'story branded residences',
      'noi',
      'midlane',
      'yellow lane',
      'yellow residence',
      'eastlane',
      'levels business tower',
      'our projects',
      'media center news',
      'partners associates',
      'construction updates',
      'careers',
      'contact us',
    ],
  },

  '/about': {
    title: 'About Urbnlanes - Your trusted real estate developer',
    description: 'Learn more about Urbnlanes, a diversified real estate development company with numerous years of experience in the Middle East.',
    keywords: ['about', 'company', 'urbnlanes', 'real estate development', 'diversity', 'middle east'],
  },

  '/projects': {
    title: 'Urbnlanes Projects - Discover our masterpieces',
    description: 'Discover our masterpieces at Urbnlanes, a real estate development company building masterpieces across the Middle East.',
    keywords: ['urbnlanes', 'projects', 'real estate', 'urban living', 'middle east', 'real estate development'],
  },

  '/media-center-news': {
    title: 'Urbnlanes Media Center & News - Stay updated with our news',
    description: 'Stay updated with our news and latest updates at Urbnlanes, a real estate development company building masterpieces across the Middle East.',
    keywords: ['urbnlanes', 'media center', 'news', 'real estate', 'urban living', 'middle east', 'real estate development'],
  },

  '/partners-associates': {
    title: 'Urbnlanes Partners & Associates - Collaborate with us',
    description: 'Collaborate with us at Urbnlanes, a real estate development company building masterpieces across the Middle East.',
    keywords: ['urbnlanes', 'partners and associates', 'real estate', 'urban living', 'middle east', 'real estate development'],
  },

  '/construction-updates': {
    title: 'Urbnlanes Construction Updates - Stay updated with our projects',
    description:
      'Stay updated with our projects and construction updates at Urbnlanes, a real estate development company building masterpieces across the Middle East.',
    keywords: ['urbnlanes', 'construction updates', 'real estate', 'urban living', 'middle east', 'real estate development'],
  },

  '/careers': {
    title: 'Urbnlanes Careers - Join a diverse and experienced team',
    description: 'Join a diverse and experienced team at Urbnlanes, a real estate development company building masterpieces across the Middle East.',
    keywords: ['urbnlanes', 'careers', 'real estate', 'urban living', 'middle east', 'real estate development'],
  },

  '/team': {
    title: 'Urbnlanes Team - Know more about our expert team',
    description: 'Discover our expert team at Urbnlanes, a real estate development company building masterpieces across the Middle East.',
    keywords: ['urbnlanes', 'team', 'experts', 'real estate', 'urban living', 'middle east', 'real estate development'],
  },

  '/cookie-policy': {
    title: 'Urbnlanes Cookie Policy - Our policy on cookies',
    description: 'Our policy on cookies at Urbnlanes, a real estate development company building masterpieces across the Middle East.',
    keywords: ['urbnlanes', 'cookie policy', 'real estate', 'urban living', 'middle east', 'real estate development'],
  },

  '/privacy-policy': {
    title: 'Urbnlanes Privacy Policy - Our policy on privacy',
    description: 'Our policy on privacy at Urbnlanes, a real estate development company building masterpieces across the Middle East.',
    keywords: ['privacy', 'policy', 'real estate', 'middle east'],
  },

  '/terms-of-use': {
    title: 'Urbnlanes Terms of Use - Website terms and conditions',
    description: 'The terms and conditions for using the Urbnlanes website, a real estate development company building masterpieces across the Middle East.',
    keywords: ['terms', 'conditions', 'real estate', 'middle east'],
  },

  '*': {
    title: 'Urbnlanes - Not found page',
    description: 'Sorry, the page you are looking for does not exist. Please check the URL and try again.',
    keywords: ['urbnlanes', 'not found', 'page not found', 'error'],
  },
}

export const generateProjectSEO = (project: any) => {
  const keywords = [
    project.name,
    project.tagline,
    'urbnlanes',
    'project',
    'real estate',
    'urban living',
    'middle east',
    'real estate development',
    ...(project.location?.city ? [project.location.city] : []),
    ...(project.location?.country ? [project.location.country] : []),
  ]

  return {
    title: `${project.name} - ${project.tagline}`,
    description:
      project.description || `Experience ${project.name} by Urbnlanes, a real estate development company building masterpieces across the Middle East.`,
    keywords: keywords.filter(Boolean).join(', '),
  }
}
