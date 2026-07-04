import { Course, Module, Lesson } from './types';

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    slug: 'formation-youtube-integrale',
    title: 'Formation YouTube Intégrale',
    subtitle: 'Réussir sur YouTube partout et dans le contexte africain',
    description: 'Une méthode complète pour construire une identité forte, produire du contenu de qualité avec peu de moyens et monétiser durablement votre audience.',
    category: 'YouTube',
    price: 53.99,
    currency: 'EUR',
    thumbnailUrl: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1000&auto=format&fit=crop',
    durationSeconds: 23460, // 6h31m
    lessonsCount: 31,
    published: true,
    instructorName: 'Olacraft'
  },
  {
    id: '2',
    slug: 'wordpress-pro-masterclass',
    title: 'WordPress Pro Masterclass',
    subtitle: 'Créez des sites web professionnels sans coder',
    description: 'Apprenez à maîtriser WordPress, Elementor et les meilleures extensions pour lancer votre activité de créateur de sites.',
    category: 'WordPress',
    price: 45.00,
    currency: 'EUR',
    thumbnailUrl: 'https://images.unsplash.com/photo-1593062096033-9a26b09daec4?q=80&w=1000&auto=format&fit=crop',
    durationSeconds: 14400,
    lessonsCount: 18,
    published: true,
    instructorName: 'Liberty Creativity School'
  },
  {
    id: '3',
    slug: 'animation-2d-debutant',
    title: 'Animation 2D pour Débutants',
    subtitle: 'Donnez vie à vos personnages',
    description: 'Découvrez les bases de l\'animation 2D, du storyboard à l\'exportation finale pour vos réseaux sociaux.',
    category: 'Animation',
    price: 0,
    currency: 'EUR',
    isFree: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    durationSeconds: 7200,
    lessonsCount: 10,
    published: true,
    instructorName: 'Creative Lab'
  }
];

export const MOCK_MODULES: Record<string, Module[]> = {
  '1': [
    {
      id: 'm1',
      courseId: '1',
      title: 'Introduction et Bases',
      order: 1,
      lessons: [
        { id: 'l1', slug: 'bienvenue', courseId: '1', moduleId: 'm1', title: 'Bienvenue dans la formation', durationSeconds: 300, isFree: true, order: 1 },
        { id: 'l2', slug: 'pourquoi-youtube', courseId: '1', moduleId: 'm1', title: 'Pourquoi YouTube en 2024 ?', durationSeconds: 600, isFree: false, order: 2 }
      ]
    },
    {
      id: 'm2',
      courseId: '1',
      title: 'Identité de Chaîne',
      order: 2,
      lessons: [
        { id: 'l3', slug: 'trouver-sa-niche', courseId: '1', moduleId: 'm2', title: 'Trouver sa niche rentable', durationSeconds: 900, isFree: false, order: 1 },
        { id: 'l4', slug: 'branding-visuel', courseId: '1', moduleId: 'm2', title: 'Le branding visuel efficace', durationSeconds: 1200, isFree: false, order: 2 }
      ]
    }
  ],
  '2': [
    {
      id: 'm3',
      courseId: '2',
      title: 'Démarrer avec WordPress',
      order: 1,
      lessons: [
        { id: 'l5', slug: 'installation', courseId: '2', moduleId: 'm3', title: 'Installation locale de WP', durationSeconds: 600, isFree: true, order: 1 },
        { id: 'l6', slug: 'panneau-administration', courseId: '2', moduleId: 'm3', title: 'Tour du propriétaire', durationSeconds: 800, isFree: false, order: 2 }
      ]
    }
  ],
  '3': [
    {
      id: 'm4',
      courseId: '3',
      title: 'Principes de base',
      order: 1,
      lessons: [
        { id: 'l7', slug: 'lignes-et-mouvement', courseId: '3', moduleId: 'm4', title: 'Lignes et mouvement de base', durationSeconds: 450, isFree: true, order: 1 }
      ]
    }
  ]
};
