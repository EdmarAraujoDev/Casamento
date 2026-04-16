import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, Maximize2 } from 'lucide-react';
import galleryData from '../data/gallery.json';
import './Galeria.css';

const Galeria = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section id="galeria" className="section bg-sand">
      <div className="container">
        <motion.div
          className="galeria-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <ImageIcon className="text-gold" size={40} />
          <h2 className="section-title">Galeria de Fotos</h2>
          <p className="section-subtitle">Momentos que guardamos no coração</p>
        </motion.div>

        <div className="masonry-grid">
          {galleryData.map((img) => (
            <motion.div 
              key={img.id}
              className={`masonry-item ${img.type || 'standard'}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedImg(img)}
            >
              <img src={img.url} alt={img.caption} loading="lazy" />
              <div className="item-overlay">
                <Maximize2 size={24} />
                <span>{img.caption}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <button className="close-lightbox" onClick={() => setSelectedImg(null)}>
              <X size={32} />
            </button>
            
            <motion.div 
              className="lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImg.url} alt={selectedImg.caption} />
              <div className="lightbox-caption">
                <h3>{selectedImg.caption}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Galeria;
