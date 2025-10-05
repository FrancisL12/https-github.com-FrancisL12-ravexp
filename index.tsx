// Fix: Add React imports and use destructured hooks and types for consistency.
import React, { useState, FC, useRef, useEffect } from 'react';

// --- DATA --- //
// Inlined from src/data.ts

// --- TYPES --- //
type Page = 'login' | 'events' | 'eventDetail' | 'myTickets' | 'ticketDetail' | 'community' | 'profile' | 'createPost';
type ProducerPage = 'producerLogin' | 'dashboard' | 'editEvent' | 'community' | 'analytics';
type ValidatorPage = 'validatorLogin' | 'scanner';
type UserRole = 'user' | 'producer' | 'validator' | null;

// --- MOCK DATA --- //
const EVENTS = [
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
type Event = typeof EVENTS[0];

const TICKETS = [
  { id: 101, eventId: 1, eventName: 'Galaxy Beats', user: 'RaveLover99', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=RaveConnect-Ticket-101-GalaxyBeats' },
  { id: 102, eventId: 2, eventName: 'Neon Jungle', user: 'RaveLover99', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=RaveConnect-Ticket-102-NeonJungle' },
];
type Ticket = typeof TICKETS[0];

const USER_PROFILE = {
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

const COMMUNITY_POSTS = [
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

const GALLERY_IMAGES = [
    { id: 1, url: 'https://images.unsplash.com/photo-1543360431-3136282a52fe?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, url: 'https://images.unsplash.com/photo-1582711012103-63a237f0411a?q=80&w=1964&auto=format&fit=crop' },
    { id: 3, url: 'https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=2070&auto=format&fit=crop' },
    { id: 4, url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop' },
];

const VALID_TICKET_IDS = TICKETS.map(t => `RaveConnect-Ticket-${t.id}-${t.eventName.replace(/\s/g, '')}`);

// --- USER MODULE --- //
// Inlined from src/modules/user.tsx

const LoginScreen: FC<{ onLogin: () => void }> = ({ onLogin }) => (
  <div className="screen" style={{ justifyContent: 'center' }}>
    <div className="header">
      <h1 className="header-title">Rave Connect</h1>
      <p className="header-subtitle">Sua conexão com a festa.</p>
    </div>
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" defaultValue="user@rave.com" />
    </div>
    <div className="form-group">
      <label htmlFor="password">Senha</label>
      <input type="password" id="password" defaultValue="********" />
    </div>
    <button className="btn btn-primary" onClick={onLogin}>Entrar</button>
    <button className="btn btn-secondary">Cadastrar</button>
  </div>
);

const CommunityFeedScreen: FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
    <div className="screen">
        <h2 className="screen-title">Comunidade</h2>
        {COMMUNITY_POSTS.map(post => (
            <div className="community-post" key={post.id}>
                <div className="post-header">
                    <img src={post.avatar} alt={post.user} className="post-avatar" />
                    <span>{post.user}</span>
                </div>
                <div className="post-content">
                    <p>{post.content}</p>
                    {post.type === 'photo' && <img src={post.image} alt="Post" className="post-image" />}
                    {post.type === 'poll' && (
                        <div className="post-poll">
                            {post.options.map(option => (
                                <button key={option} className="poll-option">{option}</button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="post-actions">
                    <button>❤️ Curtir</button>
                    <button>💬 Comentar</button>
                </div>
            </div>
        ))}
        <button className="fab" onClick={() => onNavigate('createPost')} aria-label="Criar novo post">+</button>
    </div>
);

const CreatePostScreen: FC<{ onBack: () => void }> = ({ onBack }) => (
    <div className="screen">
        <button onClick={onBack} className="back-button" aria-label="Voltar">←</button>
        <h2 className="screen-title">Criar Publicação</h2>
        <div className="form-group">
            <label htmlFor="postContent">O que você está pensando?</label>
            <textarea id="postContent" rows={6} placeholder="Compartilhe uma foto, inicie uma discussão..."></textarea>
        </div>
        <button className="btn btn-secondary" style={{width: 'auto', padding: '10px 20px'}}>📷 Adicionar Foto</button>
        <button className="btn btn-primary" style={{ marginTop: 'auto' }}>Publicar</button>
    </div>
);

const ProfileScreen: FC = () => (
    <div className="screen">
        <div className="profile-header">
            <img src={USER_PROFILE.avatar} alt={USER_PROFILE.name} className="profile-avatar" />
            <div className="profile-info">
                <h3>{USER_PROFILE.name}</h3>
                <p>{USER_PROFILE.level}</p>
            </div>
        </div>
        <div className="profile-stats">
            <p>{USER_PROFILE.points} / {USER_PROFILE.pointsToNextLevel} XP</p>
            <div className="xp-bar-container">
                <div className="xp-bar-progress" style={{ width: `${(USER_PROFILE.points / USER_PROFILE.pointsToNextLevel) * 100}%` }}></div>
            </div>
        </div>
        <div className="profile-section">
            <h4>Conquistas</h4>
            <div className="achievements-grid">
                {USER_PROFILE.achievements.map(ach => (
                    <div className="achievement-item" key={ach.id}>
                        <span className="achievement-icon">{ach.icon}</span>
                        <span>{ach.name}</span>
                    </div>
                ))}
            </div>
        </div>
         <div className="profile-section">
            <h4>Amigos e Grupos</h4>
            <p className="placeholder-text">Em breve: convide amigos com seu código e ganhe recompensas!</p>
            <button className="btn btn-secondary" style={{marginTop: '16px'}}>Convidar Amigos</button>
        </div>
    </div>
);

const EventFeedScreen: FC<{ onSelectEvent: (event: Event) => void }> = ({ onSelectEvent }) => (
  <div className="screen">
    <h2 className="screen-title">Próximos Eventos</h2>
    {EVENTS.filter(e => e.status === 'upcoming').map(event => (
      <div className="card" key={event.id} onClick={() => onSelectEvent(event)} role="button" tabIndex={0} aria-label={`Ver detalhes de ${event.name}`}>
        <img src={event.image} alt={event.name} className="card-image" />
        <div className="card-content">
          <h3 className="card-title">{event.name}</h3>
          <p className="card-subtitle">{event.date} - {event.location}</p>
        </div>
      </div>
    ))}
  </div>
);

const EventDetailScreen: FC<{ event: Event; onBack: () => void }> = ({ event, onBack }) => {
    const [activeTab, setActiveTab] = useState('details');

    return (
        <div className="screen" style={{padding: 0}}>
             <img src={event.image} alt={event.name} className="event-detail-image-header" />
            <button onClick={onBack} className="back-button on-image" aria-label="Voltar">←</button>
            <div style={{padding: '0 24px 24px 24px'}}>
                <div className="event-detail-header">
                    <h2>{event.name}</h2>
                    <p><strong>🗓️ {event.date}</strong> | <strong>📍 {event.location}</strong></p>
                </div>

                <div className="event-detail-tabs">
                    <button onClick={() => setActiveTab('details')} className={activeTab === 'details' ? 'active' : ''}>Detalhes</button>
                    <button onClick={() => setActiveTab('map')} className={activeTab === 'map' ? 'active' : ''}>Mapa</button>
                    {event.status === 'past' && <button onClick={() => setActiveTab('gallery')} className={activeTab === 'gallery' ? 'active' : ''}>Galeria</button>}
                </div>
                
                <div className="event-detail-content">
                    {activeTab === 'details' && (
                        <>
                            <p>{event.description}</p>
                            <h3>Line-up:</h3>
                            <p>{event.lineup.join(', ')}</p>
                        </>
                    )}
                    {activeTab === 'map' && (
                       <div className="interactive-map">
                           <img src="https://via.placeholder.com/600x400.png?text=Mapa+do+Evento" alt="Mapa do Evento" />
                           <p className="placeholder-text">Em breve: explore os palcos e ouça prévias dos DJs.</p>
                       </div>
                    )}
                    {activeTab === 'gallery' && (
                        <div className="gallery-grid">
                            {GALLERY_IMAGES.map(img => <img key={img.id} src={img.url} alt="Foto do evento" className="gallery-image"/>)}
                        </div>
                    )}
                </div>
            </div>
            {event.status === 'upcoming' && <button className="btn btn-primary btn-sticky">Comprar Ingresso</button>}
        </div>
    );
};

const MyTicketsScreen: FC<{ onSelectTicket: (ticket: Ticket) => void }> = ({ onSelectTicket }) => (
    <div className="screen">
        <h2 className="screen-title">Meus Ingressos</h2>
        {TICKETS.map(ticket => (
            <div className="ticket-card" key={ticket.id} onClick={() => onSelectTicket(ticket)} role="button" tabIndex={0} aria-label={`Ver ingresso para ${ticket.eventName}`}>
                <div className="ticket-info">
                    <h3>{ticket.eventName}</h3>
                    <p>Válido para: {ticket.user}</p>
                </div>
            </div>
        ))}
    </div>
);

const TicketDetailScreen: FC<{ ticket: Ticket; onBack: () => void }> = ({ ticket, onBack }) => (
    <div className="screen">
        <button onClick={onBack} className="back-button" aria-label="Voltar">←</button>
        <div className="qr-code-container">
            <h2>{ticket.eventName}</h2>
            <p>Apresente este QR Code na entrada</p>
            <img src={ticket.qrCode} alt={`QR Code para ${ticket.eventName}`} />
            <p><strong>Ingresso de:</strong> {ticket.user}</p>
        </div>
    </div>
);

const UserNav: FC<{ activeNav: Page, onNavigate: (page: Page) => void }> = ({ activeNav, onNavigate }) => (
    <nav className="nav">
        <button onClick={() => onNavigate('community')} className={`nav-button ${activeNav === 'community' ? 'active' : ''}`} aria-label="Comunidade">💬</button>
        <button onClick={() => onNavigate('events')} className={`nav-button ${activeNav === 'events' ? 'active' : ''}`} aria-label="Eventos">🎉</button>
        <button onClick={() => onNavigate('myTickets')} className={`nav-button ${activeNav === 'myTickets' ? 'active' : ''}`} aria-label="Meus Ingressos">🎟️</button>
        <button onClick={() => onNavigate('profile')} className={`nav-button ${activeNav === 'profile' ? 'active' : ''}`} aria-label="Perfil">👤</button>
    </nav>
);

// --- PRODUCER MODULE --- //
// Inlined from src/modules/producer.tsx

const ProducerLoginScreen: FC<{ onLogin: () => void }> = ({ onLogin }) => (
  <div className="screen" style={{ justifyContent: 'center' }}>
    <div className="header">
      <h1 className="header-title">Painel do Produtor</h1>
      <p className="header-subtitle">Gerencie seus eventos.</p>
    </div>
    <div className="form-group">
      <label htmlFor="producer-email">Email</label>
      <input type="email" id="producer-email" defaultValue="producer@rave.com" />
    </div>
    <div className="form-group">
      <label htmlFor="producer-password">Senha</label>
      <input type="password" id="producer-password" defaultValue="********" />
    </div>
    <button className="btn btn-primary" onClick={onLogin}>Acessar Painel</button>
  </div>
);

const ProducerDashboard: FC<{ onNavigate: (page: ProducerPage) => void; onEditEvent: (event: Event) => void }> = ({ onNavigate, onEditEvent }) => (
    <div className="screen">
        <h2 className="screen-title">Seus Eventos</h2>
        <button className="btn btn-primary" onClick={() => onNavigate('editEvent')} style={{marginBottom: '24px'}}>+ Criar Novo Evento</button>
        {EVENTS.map(event => (
            <div className="producer-card" key={event.id}>
                <div className="producer-card-info">
                    <h3>{event.name}</h3>
                    <p>{event.date} - {event.location}</p>
                    <div className="sales-progress">
                        <div className="progress-bar" style={{width: `${(event.ticketsSold / event.totalTickets) * 100}%`}}></div>
                    </div>
                    <p>{event.ticketsSold} / {event.totalTickets} ingressos vendidos</p>
                </div>
                <div className="producer-card-actions">
                    <button onClick={() => onEditEvent(event)}>Editar</button>
                    <button onClick={() => onNavigate('analytics')}>Análises</button>
                </div>
            </div>
        ))}
    </div>
);

const EventEditorScreen: FC<{ event: Event | null; onBack: () => void }> = ({ event, onBack }) => (
    <div className="screen">
        <button onClick={onBack} className="back-button" aria-label="Voltar">←</button>
        <h2 className="screen-title">{event ? 'Editar Evento' : 'Criar Novo Evento'}</h2>
        <div className="form-group">
            <label htmlFor="eventName">Nome do Evento</label>
            <input type="text" id="eventName" defaultValue={event?.name || ''} />
        </div>
        <div className="form-group">
            <label htmlFor="eventDate">Data</label>
            <input type="text" id="eventDate" defaultValue={event?.date || ''} />
        </div>
        <div className="form-group">
            <label htmlFor="eventLocation">Local</label>
            <input type="text" id="eventLocation" defaultValue={event?.location || ''} />
        </div>
        <div className="form-group">
            <label htmlFor="eventImage">URL da Imagem</label>
            <input type="text" id="eventImage" defaultValue={event?.image || ''} />
        </div>
        <div className="form-group">
            <label htmlFor="eventDescription">Descrição</label>
            <textarea id="eventDescription" rows={4} defaultValue={event?.description || ''}></textarea>
        </div>
         <div className="form-group">
            <label htmlFor="eventLineup">Line-up (separado por vírgulas)</label>
            <input type="text" id="eventLineup" defaultValue={event?.lineup?.join(', ') || ''} />
        </div>
        <button className="btn btn-primary" style={{ marginTop: 'auto' }}>Salvar Evento</button>
    </div>
);

const CommunityManagementScreen: FC<{}> = () => (
    <div className="screen placeholder-screen">
        <h2 className="screen-title">Gestão da Comunidade</h2>
        <p>Em breve, você poderá criar enquetes, moderar o feed do evento e interagir com seu público diretamente por aqui.</p>
    </div>
);

const AnalyticsScreen: FC<{}> = () => (
    <div className="screen placeholder-screen">
        <h2 className="screen-title">Análise de Vendas</h2>
        <p>Relatórios detalhados sobre vendas de ingressos, engajamento e resultados das enquetes estarão disponíveis aqui em breve.</p>
    </div>
);

const ProducerNav: FC<{ activePage: ProducerPage; onNavigate: (page: ProducerPage) => void; onLogout: () => void }> = ({ activePage, onNavigate, onLogout }) => (
    <nav className="producer-nav">
        <div>
            <button onClick={() => onNavigate('dashboard')} className={activePage === 'dashboard' ? 'active' : ''}>Dashboard</button>
            <button onClick={() => onNavigate('community')} className={activePage === 'community' ? 'active' : ''}>Comunidade</button>
            <button onClick={() => onNavigate('analytics')} className={activePage === 'analytics' ? 'active' : ''}>Análises</button>
        </div>
        <button onClick={onLogout} className="logout-button">Sair</button>
    </nav>
);

// --- VALIDATOR MODULE --- //
// Inlined from src/modules/validator.tsx

const ValidatorLoginScreen: FC<{ onLogin: () => void }> = ({ onLogin }) => (
  <div className="screen" style={{ justifyContent: 'center' }}>
    <div className="header">
      <h1 className="header-title">Acesso da Equipe</h1>
      <p className="header-subtitle">Validador de Ingressos</p>
    </div>
    <div className="form-group">
      <label htmlFor="validator-email">Email da Equipe</label>
      <input type="email" id="validator-email" defaultValue="staff@rave.com" />
    </div>
    <div className="form-group">
      <label htmlFor="validator-password">Senha</label>
      <input type="password" id="validator-password" defaultValue="********" />
    </div>
    <button className="btn btn-primary" onClick={onLogin}>Entrar</button>
  </div>
);

const ValidatorScannerScreen: FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [scanResult, setScanResult] = useState<'valid' | 'invalid' | null>(null);
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(true);
    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const [cameraError, setCameraError] = useState<string | null>(null);

    useEffect(() => {
        // Cleanup function to stop camera stream when component unmounts
        return () => {
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [cameraStream]);

    const startCamera = async () => {
        setCameraError(null);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setCameraStream(stream);
            } catch (error) {
                console.error("Erro ao acessar a câmera: ", error);
                setCameraError("Não foi possível acessar a câmera. Verifique as permissões do seu navegador.");
            }
        } else {
            setCameraError("Seu navegador não suporta acesso à câmera.");
        }
    };

    const handleMockScan = () => {
        if (!isScanning) return;

        const isSuccess = Math.random() > 0.3;
        const data = isSuccess 
            ? VALID_TICKET_IDS[Math.floor(Math.random() * VALID_TICKET_IDS.length)]
            : 'INVALID-QR-CODE-DATA';

        setScannedData(data);
        setIsScanning(false);

        if (VALID_TICKET_IDS.includes(data)) {
            setScanResult('valid');
        } else {
            setScanResult('invalid');
        }

        setTimeout(() => {
            resetScanner();
        }, 3000);
    };
    
    const resetScanner = () => {
        setScanResult(null);
        setScannedData(null);
        setIsScanning(true);
    };

    return (
        <div className="screen scanner-screen">
            <div className="scanner-header">
                <h2>Validador de Ingresso</h2>
                <button onClick={onLogout} className="logout-button">Sair</button>
            </div>
            <div className="camera-container">
                <video ref={videoRef} autoPlay playsInline className="camera-feed" aria-label="Visualização da câmera"></video>
                
                {!cameraStream && (
                    <div className="camera-placeholder">
                        {cameraError ? (
                            <p className="error-text">{cameraError}</p>
                        ) : (
                            <p>Aponte a câmera para o QR Code para validar o ingresso.</p>
                        )}
                        <button className="btn btn-primary" onClick={startCamera}>Ativar Câmera</button>
                    </div>
                )}
                
                {cameraStream && (
                    <div className="scanner-overlay" aria-hidden="true">
                        <div className="scanner-box"></div>
                        <p>Aponte a câmera para o QR Code</p>
                    </div>
                )}

                {scanResult && (
                    <div className={`scan-result-overlay ${scanResult}`} role="alert">
                        <div className="result-icon">{scanResult === 'valid' ? '✓' : '✗'}</div>
                        <h2>{scanResult === 'valid' ? 'Ingresso Válido' : 'Ingresso Inválido'}</h2>
                        {scannedData && <p className="scanned-data-info">{scanResult === 'valid' ? `ID: ${scannedData.split('-')[2]}` : 'Código não reconhecido'}</p>}
                    </div>
                )}
            </div>
            <div className="scanner-controls">
                {cameraStream && (
                    isScanning ? (
                        <button className="btn btn-primary" onClick={handleMockScan}>Simular Leitura</button>
                    ) : (
                        <button className="btn btn-secondary" onClick={resetScanner}>Ler Próximo Ingresso</button>
                    )
                )}
            </div>
        </div>
    );
};


// --- APP --- //
// Inlined from src/App.tsx

const LandingScreen: FC<{ onSelectRole: (role: UserRole) => void }> = ({ onSelectRole }) => (
    <div className="screen" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <div className="header">
            <h1 className="header-title">Rave Connect</h1>
            <p className="header-subtitle">Sua conexão com a festa.</p>
        </div>
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button className="btn btn-primary" onClick={() => onSelectRole('user')}>Acessar Eventos</button>
            <button className="btn btn-secondary" onClick={() => onSelectRole('producer')}>Sou Produtor</button>
            <button className="btn btn-tertiary" onClick={() => onSelectRole('validator')}>Equipe da Portaria</button>
        </div>
    </div>
);


const App: FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // User state
  const [currentPage, setCurrentPage] = useState<Page>('community');
  const [activeNav, setActiveNav] = useState<Page>('community');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  // Producer state
  const [currentProducerPage, setCurrentProducerPage] = useState<ProducerPage>('dashboard');
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // Validator state
  const [currentValidatorPage, setCurrentValidatorPage] = useState<ValidatorPage>('scanner');

  const handleLogin = () => {
    setIsLoggedIn(true);
    if(userRole === 'user') {
        setCurrentPage('community');
        setActiveNav('community');
    } else if (userRole === 'producer') {
        setCurrentProducerPage('dashboard');
    } else if (userRole === 'validator') {
        setCurrentValidatorPage('scanner');
    }
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
      setUserRole(null);
  }

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setCurrentPage('eventDetail');
  };
  
  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setCurrentPage('ticketDetail');
  };

  const handleEditEvent = (event: Event) => {
      setEditingEvent(event);
      setCurrentProducerPage('editEvent');
  }

  const navigateUser = (page: Page) => {
      setCurrentPage(page);
      setActiveNav(page);
  }

  const handleBack = () => {
    if (userRole === 'user') {
        if (currentPage === 'eventDetail') {
            setCurrentPage('events');
            setActiveNav('events');
        } else if (currentPage === 'ticketDetail') {
            setCurrentPage('myTickets');
            setActiveNav('myTickets');
        } else if (currentPage === 'createPost') {
            setCurrentPage('community');
            setActiveNav('community');
        }
    } else if (userRole === 'producer') {
        if (currentProducerPage === 'editEvent') {
            setCurrentProducerPage('dashboard');
            setEditingEvent(null);
        }
    }
  };
  
  return (
    <>
      {isLoggedIn && userRole === 'producer' && (
          <ProducerNav activePage={currentProducerPage} onNavigate={setCurrentProducerPage} onLogout={handleLogout}/>
      )}
      <main className="main-content" style={{ paddingBottom: isLoggedIn && userRole === 'user' ? '80px' : '0' }}>
        {(() => {
            if (!userRole) {
                return <LandingScreen onSelectRole={setUserRole} />;
            }
            if (userRole === 'user') {
                if (!isLoggedIn) return <LoginScreen onLogin={handleLogin} />;
                switch (currentPage) {
                    case 'community': return <CommunityFeedScreen onNavigate={navigateUser} />;
                    case 'createPost': return <CreatePostScreen onBack={handleBack} />;
                    case 'events': return <EventFeedScreen onSelectEvent={handleSelectEvent} />;
                    case 'eventDetail': return selectedEvent && <EventDetailScreen event={selectedEvent} onBack={handleBack} />;
                    case 'myTickets': return <MyTicketsScreen onSelectTicket={handleSelectTicket} />;
                    case 'ticketDetail': return selectedTicket && <TicketDetailScreen ticket={selectedTicket} onBack={handleBack} />;
                    case 'profile': return <ProfileScreen />;
                    default: return <CommunityFeedScreen onNavigate={navigateUser} />;
                }
            }
            if (userRole === 'producer') {
                if (!isLoggedIn) return <ProducerLoginScreen onLogin={handleLogin} />;
                switch (currentProducerPage) {
                    case 'dashboard': return <ProducerDashboard onNavigate={setCurrentProducerPage} onEditEvent={handleEditEvent} />;
                    case 'editEvent': return <EventEditorScreen event={editingEvent} onBack={handleBack} />;
                    case 'community': return <CommunityManagementScreen />;
                    case 'analytics': return <AnalyticsScreen />;
                    default: return <ProducerDashboard onNavigate={setCurrentProducerPage} onEditEvent={handleEditEvent} />;
                }
            }
            if (userRole === 'validator') {
                 if (!isLoggedIn) return <ValidatorLoginScreen onLogin={handleLogin} />;
                switch(currentValidatorPage) {
                    case 'scanner': return <ValidatorScannerScreen onLogout={handleLogout} />;
                    default: return <ValidatorScannerScreen onLogout={handleLogout} />;
                }
            }
            return null;
        })()}
      </main>
      {isLoggedIn && userRole === 'user' && (
        <UserNav activeNav={activeNav} onNavigate={navigateUser} />
      )}
    </>
  );
};


// --- RENDER --- //
// Use global ReactDOM loaded from script tag in index.html
declare const ReactDOM: any;

const container = document.getElementById('root');
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<App />);
} else {
    console.error('Failed to find the root element');
}
