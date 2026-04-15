import React from 'react';
import HeroSection from './components/HeroSection';
import NossaHistoria from './components/NossaHistoria';
import DetalhesEvento from './components/DetalhesEvento';
import Presentes from './components/Presentes';
import RSVP from './components/RSVP';
import AdminConvidados from './components/AdminConvidados';
import WeddingDayView from './components/WeddingDayView';
import './index.css';

function App() {
  const path = window.location.pathname;
  const queryParams = new URLSearchParams(window.location.search);
  const isTestToday = queryParams.get('hoje') === 'true';
  const isAdmin = queryParams.get('admin') === 'true';
  const [showFullSite, setShowFullSite] = React.useState(false);

  const WEDDING_DATE = "2026-09-14";
  const today = new Date().toISOString().split('T')[0];
  const isWeddingDay = today === WEDDING_DATE || isTestToday;

  if (isAdmin) {
    return <AdminConvidados />;
  }

  if (isWeddingDay && !showFullSite) {
    return <WeddingDayView onShowFullSite={() => setShowFullSite(true)} />;
  }

  return (
    <div className="app">
      <HeroSection />
      <NossaHistoria />
      <DetalhesEvento />
      <Presentes />
      <RSVP />
      
      <footer style={{
        textAlign: 'center',
        padding: '3rem',
        backgroundColor: 'var(--color-bg)',
        fontFamily: 'var(--font-serif)',
        color: 'var(--color-gold)'
      }}>
        <p>&copy; 2026 Isabela & Edmar. Desenvolvido com amor.</p>
      </footer>
    </div>
  );
}

export default App;
