import React from 'react';
import HeroSection from './components/HeroSection';
import NossaHistoria from './components/NossaHistoria';
import DetalhesEvento from './components/DetalhesEvento';
import Presentes from './components/Presentes';
import RSVP from './components/RSVP';
import AdminConvidados from './components/AdminConvidados';
import './index.css';

function App() {
  const path = window.location.pathname;

  if (path === '/admin-convidados') {
    return <AdminConvidados />;
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
