import React, { FC } from 'react';
import { ProducerPage, Event, EVENTS } from '../data.ts';

export const ProducerLoginScreen: FC<{ onLogin: () => void }> = ({ onLogin }) => (
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

export const ProducerDashboard: FC<{ onNavigate: (page: ProducerPage) => void; onEditEvent: (event: Event) => void }> = ({ onNavigate, onEditEvent }) => (
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

export const EventEditorScreen: FC<{ event: Event | null; onBack: () => void }> = ({ event, onBack }) => (
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

export const CommunityManagementScreen: FC<{}> = () => (
    <div className="screen placeholder-screen">
        <h2 className="screen-title">Gestão da Comunidade</h2>
        <p>Em breve, você poderá criar enquetes, moderar o feed do evento e interagir com seu público diretamente por aqui.</p>
    </div>
);

export const AnalyticsScreen: FC<{}> = () => (
    <div className="screen placeholder-screen">
        <h2 className="screen-title">Análise de Vendas</h2>
        <p>Relatórios detalhados sobre vendas de ingressos, engajamento e resultados das enquetes estarão disponíveis aqui em breve.</p>
    </div>
);

export const ProducerNav: FC<{ activePage: ProducerPage; onNavigate: (page: ProducerPage) => void; onLogout: () => void }> = ({ activePage, onNavigate, onLogout }) => (
    <nav className="producer-nav">
        <div>
            <button onClick={() => onNavigate('dashboard')} className={activePage === 'dashboard' ? 'active' : ''}>Dashboard</button>
            <button onClick={() => onNavigate('community')} className={activePage === 'community' ? 'active' : ''}>Comunidade</button>
            <button onClick={() => onNavigate('analytics')} className={activePage === 'analytics' ? 'active' : ''}>Análises</button>
        </div>
        <button onClick={onLogout} className="logout-button">Sair</button>
    </nav>
);
