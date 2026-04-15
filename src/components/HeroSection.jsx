import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, ChevronDown } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [audio] = useState(new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')); // Simulando música romântica

  useEffect(() => {
    audio.loop = true;
    if (!isMuted) {
      audio.play().catch(() => setIsMuted(true));
    } else {
      audio.pause();
    }
    return () => audio.pause();
  }, [isMuted, audio]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('historia');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) * 0.03,
        y: (e.clientY - window.innerHeight / 2) * 0.03,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg">
        <video 
          className="hero-video" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-close-up-of-sparklers-in-the-hands-of-a-couple-4613-large.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos em HTML5.
        </video>
        <div className="hero-overlay" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%)' }}></div>
      </div>

      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: mousePosition.x,
          y: mousePosition.y
        }}
        transition={{ 
          opacity: { duration: 1.5, delay: 0.5, ease: "easeOut" },
          scale: { duration: 1.5, delay: 0.5, ease: "easeOut" },
          x: { type: "spring", stiffness: 50, damping: 20 },
          y: { type: "spring", stiffness: 50, damping: 20 }
        }}
      >
        <span className="hero-date">14 de Setembro de 2026</span>
        <h1 className="hero-title">Isabela & Edmar</h1>
        <p className="hero-subtitle">Celebre esse momento conosco</p>
        
        <motion.button 
          className="btn-primary"
          onClick={scrollToNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Entrar na nossa história
        </motion.button>
      </motion.div>

      <div className="sound-control" onClick={toggleMute}>
        {isMuted ? <VolumeX className="icon" /> : <Volume2 className="icon" />}
      </div>

      <motion.div 
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={scrollToNext}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
