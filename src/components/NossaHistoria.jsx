import React from 'react';
import { motion } from 'framer-motion';
import timelineData from '../data/timeline.json';
import './NossaHistoria.css';

const NossaHistoria = () => {
  return (
    <section id="historia" className="section bg-sand">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Nossa História</h2>
          <p className="section-subtitle">O começo de um para sempre</p>
        </motion.div>

        <div className="timeline">
          {timelineData.map((item, index) => (
            <motion.div 
              key={item.id} 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="timeline-content">
                <span className="timeline-date text-gold">{item.date}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-desc">{item.description}</p>
              </div>
              <div className="timeline-image-wrapper">
                <img src={item.image} alt={item.title} className="timeline-img" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NossaHistoria;
