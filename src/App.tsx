import React, { useState, FC } from 'react';
import { Page, ProducerPage, ValidatorPage, UserRole, Event, Ticket } from './data.ts';

import { 
    LoginScreen, CommunityFeedScreen, CreatePostScreen, EventFeedScreen, 
    EventDetailScreen, MyTicketsScreen, TicketDetailScreen, ProfileScreen, UserNav 
} from './modules/user.tsx';

import { 
    ProducerLoginScreen, ProducerDashboard, EventEditorScreen, 
    CommunityManagementScreen, AnalyticsScreen, ProducerNav 
} from './modules/producer.tsx';

import { ValidatorLoginScreen, ValidatorScannerScreen } from './modules/validator.tsx';

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
  
  const renderUserContent = () => {
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
  };

  const renderProducerContent = () => {
    if (!isLoggedIn) return <ProducerLoginScreen onLogin={handleLogin} />;
    
    switch (currentProducerPage) {
        case 'dashboard': return <ProducerDashboard onNavigate={setCurrentProducerPage} onEditEvent={handleEditEvent} />;
        case 'editEvent': return <EventEditorScreen event={editingEvent} onBack={handleBack} />;
        case 'community': return <CommunityManagementScreen />;
        case 'analytics': return <AnalyticsScreen />;
        default: return <ProducerDashboard onNavigate={setCurrentProducerPage} onEditEvent={handleEditEvent} />;
    }
  }

  const renderValidatorContent = () => {
      if (!isLoggedIn) return <ValidatorLoginScreen onLogin={handleLogin} />;
      
      switch(currentValidatorPage) {
          case 'scanner': return <ValidatorScannerScreen onLogout={handleLogout} />;
          default: return <ValidatorScannerScreen onLogout={handleLogout} />;
      }
  }

  const renderContent = () => {
      if (!userRole) return <LandingScreen onSelectRole={setUserRole} />;
      if (userRole === 'user') return renderUserContent();
      if (userRole === 'producer') return renderProducerContent();
      if (userRole === 'validator') return renderValidatorContent();
      return null;
  }
  
  return (
    <>
      {isLoggedIn && userRole === 'producer' && (
          <ProducerNav activePage={currentProducerPage} onNavigate={setCurrentProducerPage} onLogout={handleLogout}/>
      )}
      <main className="main-content" style={{ paddingBottom: isLoggedIn && userRole === 'user' ? '80px' : '0' }}>
        {renderContent()}
      </main>
      {isLoggedIn && userRole === 'user' && (
        <UserNav activeNav={activeNav} onNavigate={navigateUser} />
      )}
    </>
  );
};

export default App;