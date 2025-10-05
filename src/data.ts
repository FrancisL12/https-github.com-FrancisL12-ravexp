// --- TYPES --- //
export type Page = 'login' | 'events' | 'eventDetail' | 'myTickets' | 'ticketDetail' | 'community' | 'profile' | 'createPost';
export type ProducerPage = 'producerLogin' | 'dashboard' | 'editEvent' | 'community' | 'analytics';
export type ValidatorPage = 'validatorLogin' | 'scanner';
export type UserRole = 'user' | 'producer' | 'validator' | null;
export type Event = typeof EVENTS[0];
export type Ticket = typeof TICKETS[0];

// --- MOCK DATA --- //
export const EVENTS = [
  {
    id: 1,
    name: 'Galaxy Beats',
    date: '25 DEZ 2024',
    location: 'Area 51, Nevada',
    image: 'https://images.unsplash.com/photo-1582711012103-63a237f0411a?q=80&w=1964&auto=format&fit=crop',
    description: 'Uma experiência sonora intergaláctica com os melhores DJs do universo. Prepare-se para decolar em uma noite de batidas cósmicas e luzes estelares. Traje espacial recomendado.',
    lineup: ['DJ StarLord', 'Galactic Groover', 'Cosmic Charlie'],
    ticketsSold: 457,
    totalTickets: 500,
    status: 'upcoming',
  },
  {
    id: 2,
    name: 'Neon Jungle',
    date: '15 JAN 2025',
    location: 'Amazon Warehouse, Brazil',
    image: 'https://images.unsplash.com/photo-1543360431-3136282a52fe?q=80&w=2070&auto=format&fit=crop',
    description: 'Perca-se na selva de neon. Uma fusão de natureza e tecnologia, onde ritmos tribais encontram batidas eletrônicas. Deixe seus instintos guiarem você pela pista de dança.',
    lineup: ['DJ Anaconda', 'Jaguar Jones', 'Tukan Techno'],
    ticketsSold: 289,
    totalTickets: 400,
    status: 'past',
  },
];

export const TICKETS = [
  { id: 101, eventId: 1, eventName: 'Galaxy Beats', user: 'RaveLover99', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=RaveConnect-Ticket-101-GalaxyBeats' },
  { id: 102, eventId: 2, eventName: 'Neon Jungle', user: 'RaveLover99', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=RaveConnect-Ticket-102-NeonJungle' },
];

export const USER_PROFILE = {
    name: 'RaveLover99',
    level: 'Lenda da Pista',
    points: 1250,
    pointsToNextLevel: 2000,
    avatar: 'https://i.pravatar.cc/150?u=RaveLover99',
    achievements: [
        { id: 1, name: 'Primeira Rave', icon: '🎉' },
        { id: 2, name: 'Explorador Noturno', icon: '🦉' },
        { id: 3, name: 'Fã de Carteirinha', icon: '🎟️' },
        { id: 4, name: 'Rei da Pista', icon: '🕺' },
    ]
};

export const COMMUNITY_POSTS = [
    {
        id: 1, type: 'poll', user: 'DJ StarLord', avatar: 'https://i.pravatar.cc/150?u=DJStarLord',
        content: 'Qual música vocês MAIS querem ouvir no meu set no Galaxy Beats?',
        options: ['Cosmic Echoes', 'Starlight Serenade', 'Zero Gravity'],
    },
    {
        id: 2, type: 'photo', user: 'PhotoVibe', avatar: 'https://i.pravatar.cc/150?u=PhotoVibe',
        content: 'Aquela energia incrível da última Neon Jungle! Mal posso esperar pela próxima! 🔥',
        image: 'https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 3, type: 'discussion', user: 'RaveNewbie', avatar: 'https://i.pravatar.cc/150?u=RaveNewbie',
        content: 'Galera, primeira vez indo numa rave! Alguma dica do que levar para o Galaxy Beats?',
    },
];

export const GALLERY_IMAGES = [
    { id: 1, url: 'https://images.unsplash.com/photo-1543360431-3136282a52fe?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, url: 'https://images.unsplash.com/photo-1582711012103-63a237f0411a?q=80&w=1964&auto=format&fit=crop' },
    { id: 3, url: 'https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=2070&auto=format&fit=crop' },
    { id: 4, url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop' },
];

export const VALID_TICKET_IDS = TICKETS.map(t => `RaveConnect-Ticket-${t.id}-${t.eventName.replace(/\s/g, '')}`);
