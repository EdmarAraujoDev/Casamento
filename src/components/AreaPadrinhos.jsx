import React from 'react';
import { motion } from 'framer-motion';
import { Shirt, Music, Heart, Camera, MapPin, X } from 'lucide-react';
import './AreaPadrinhos.css';

const AreaPadrinhos = ({ onClose, guestInfo }) => {
  return (
    <motion.div 
      className="padrinhos-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="padrinhos-modal"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>

        <header className="padrinhos-header">
          <span className="padrinhos-tag">Área Exclusiva</span>
          <h2 className="padrinhos-title">Olá, {guestInfo?.nome.split(' ')[0]}!</h2>
          <p className="padrinhos-subtitle">
            Você não é apenas um convidado, você é parte da nossa história. 
            Preparamos este guia para que você aproveite cada segundo ao nosso lado.
          </p>
        </header>

        <div className="padrinhos-grid">
          {/* Seção Trajes */}
          <section className="padrinhos-section">
            <div className="section-icon"><Shirt size={28} /></div>
            <h3>O Traje Perfeito</h3>
            <p className="section-text">
              Queremos que vocês estejam deslumbrantes! A paleta de cores e os modelos sugeridos 
              estão sendo finalizados com muito carinho.
            </p>
            <div className="placeholder-box">
              <span className="placeholder-text">Paleta de Cores em Breve...</span>
            </div>
          </section>

          {/* Seção Dança */}
          <section className="padrinhos-section">
            <div className="section-icon"><Music size={28} /></div>
            <h3>A Grande Dança</h3>
            <p className="section-text">
              Preparem os sapatos! Teremos um momento especial na pista. 
              A coreografia e as instruções serão postadas aqui muito em breve.
            </p>
            <div className="placeholder-box">
              <span className="placeholder-text">Vídeo Explicativo em Breve...</span>
            </div>
          </section>

          {/* Mensagem Especial */}
          <section className="padrinhos-section full-width">
            <div className="section-icon"><Heart size={28} /></div>
            <h3>Nosso Agradecimento</h3>
            <div className="special-message-box">
              <p>
                "Escolher você como nosso padrinho não foi uma decisão difícil, foi uma decisão de amor. 
                Obrigado por caminhar com a gente até o altar."
              </p>
              <span className="signature">- Isabela & Edmar</span>
            </div>
          </section>
        </div>

        <footer className="padrinhos-footer">
          <p>Dúvidas? Fale direto com a gente no WhatsApp!</p>
          <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer" className="whatsapp-link">
            Chamar os Noivos
          </a>
        </footer>
      </motion.div>
    </motion.div>
  );
};

export default AreaPadrinhos;
