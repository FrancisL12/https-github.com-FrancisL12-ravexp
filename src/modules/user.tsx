import React, { useState, FC } from 'react';
import { Page, Event, Ticket, COMMUNITY_POSTS, EVENTS, TICKETS, USER_PROFILE, GALLERY_IMAGES } from '../data.ts';

export const LoginScreen: FC<{ onLogin: () => void }> = ({ onLogin }) => (
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

export const CommunityFeedScreen: FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
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

export const CreatePostScreen: FC<{ onBack: () => void }> = ({ onBack }) => (
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

export const ProfileScreen: FC = () => (
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

export const EventFeedScreen: FC<{ onSelectEvent: (event: Event) => void }> = ({ onSelectEvent }) => (
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

export const EventDetailScreen: FC<{ event: Event; onBack: () => void }> = ({ event, onBack }) => {
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

export const MyTicketsScreen: FC<{ onSelectTicket: (ticket: Ticket) => void }> = ({ onSelectTicket }) => (
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

export const TicketDetailScreen: FC<{ ticket: Ticket; onBack: () => void }> = ({ ticket, onBack }) => (
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

export const UserNav: FC<{ activeNav: Page, onNavigate: (page: Page) => void }> = ({ activeNav, onNavigate }) => (
    <nav className="nav">
        <button onClick={() => onNavigate('community')} className={`nav-button ${activeNav === 'community' ? 'active' : ''}`} aria-label="Comunidade">💬</button>
        <button onClick={() => onNavigate('events')} className={`nav-button ${activeNav === 'events' ? 'active' : ''}`} aria-label="Eventos">🎉</button>
        <button onClick={() => onNavigate('myTickets')} className={`nav-button ${activeNav === 'myTickets' ? 'active' : ''}`} aria-label="Meus Ingressos">🎟️</button>
        <button onClick={() => onNavigate('profile')} className={`nav-button ${activeNav === 'profile' ? 'active' : ''}`} aria-label="Perfil">👤</button>
    </nav>
);
