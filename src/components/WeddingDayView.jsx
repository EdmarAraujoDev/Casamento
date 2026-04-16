import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, MessageCircle, Clock, Info, Gift, Copy, CheckCircle2, Heart } from 'lucide-react';
import './WeddingDayView.css';

const WeddingDayView = ({ onShowFullSite }) => {
  const groomWhatsApp = "5531993824991";
  const mapLink = "https://www.google.com/maps/dir/?api=1&destination=Rua+Exemplo+das+Flores,123";
  const pixKey = "doacao@isabelaeedmar.com.br";
  
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <div className="day-of-container">
      <div className="day-of-header">
        <motion.span 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="day-of-tag"
        >
          O Grande Dia Chegou!
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="day-of-title"
        >
          Isabela & Edmar
        </motion.h1>
      </div>

      <div className="day-of-grid">
        {/* Card de Rota */}
        <motion.div 
          className="day-of-card main-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="card-header">
            <Navigation className="text-gold" size={32} />
            <h2>Como Chegar</h2>
          </div>
          <p className="card-text">O local da cerimônia e recepção é o <strong>Espaço de Eventos Premium</strong>.</p>
          
          <div className="mini-map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.1070!2d-43.93!3d-19.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDU1JzA4LjQiUyA0M8KwNTYwMC4wIlc!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="200" 
              style={{ border: 0, borderRadius: '8px' }} 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>

          <a href={mapLink} target="_blank" rel="noreferrer" className="day-of-btn primary">
            Traçar Rota no Waze/Maps
          </a>
        </motion.div>

        {/* Card de PIX (NOVO) */}
        <motion.div 
          className="day-of-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="card-header">
            <Gift className="text-gold" size={32} />
            <h2>Mimo para o Casal</h2>
          </div>
          <p className="card-text">Aproveite para nos abençoar com seu carinho.</p>
          
          <div className="day-of-pix-box" onClick={handleCopy}>
            <span className="pix-label">Chave PIX:</span>
            <span className="pix-value">{pixKey}</span>
            <div className="pix-copy-indicator">
              {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              {copied ? " Copiado!" : " Copiar"}
            </div>
          </div>
        </motion.div>

        {/* Card de Contato */}
        <motion.div 
          className="day-of-card"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="card-header">
            <MessageCircle className="text-gold" size={32} />
            <h2>Ajuda Urgente</h2>
          </div>
          <p className="card-text">Dúvidas? Fale com o noivo agora.</p>
          <a href={`https://wa.me/${groomWhatsApp}`} target="_blank" rel="noreferrer" className="day-of-btn outline">
            WhatsApp Noivo
          </a>
        </motion.div>

        {/* Card de Horários */}
        <motion.div 
          className="day-of-card full-width-mobile"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="card-header">
            <Clock className="text-gold" size={32} />
            <h2>Horários</h2>
          </div>
          <ul className="timeline-mini">
            <li><span>16:00</span> Cerimônia</li>
            <li><span>18:00</span> Recepção</li>
          </ul>
        </motion.div>
      </div>

      <footer className="day-of-footer">
        <p>Aproveite cada momento da festa!</p>
        <button onClick={onShowFullSite} className="back-to-site-btn">
          Ver Site Completo & Nossa História
        </button>
      </footer>
    </div>
  );
};

export default WeddingDayView;

