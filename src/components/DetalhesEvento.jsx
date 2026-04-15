import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import './DetalhesEvento.css';

const DetalhesEvento = () => {
  return (
    <section id="detalhes" className="section bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">O Grande Dia</h2>
          <p className="section-subtitle">Detalhes para compartilhar nossa alegria</p>
        </motion.div>

        <div className="details-grid">
          <motion.div 
            className="details-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Calendar className="details-icon text-gold" size={40} />
            <h3 className="details-card-title">Quando</h3>
            <p>Sábado, 14 de Setembro de 2026</p>
            <Clock className="details-icon-small text-gold" size={24} />
            <p>16:00 horas</p>
          </motion.div>

          <motion.div 
            className="details-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MapPin className="details-icon text-gold" size={40} />
            <h3 className="details-card-title">Onde</h3>
            <p>Espaço de Eventos Premium</p>
            <p>Rua Exemplo das Flores, 123</p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer"
              className="btn-outline mt-20"
            >
              <Navigation size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/>
              Ver Rota no Mapa
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DetalhesEvento;
