import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Plane, Coffee, Wine, Heart, Copy, CheckCircle2 } from 'lucide-react';
import './Presentes.css';

const Presentes = () => {
  const [copied, setCopied] = useState(false);
  const pixKey = "doacao@isabelaeedmar.com.br";

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    // Deixa a mensagem por 8 segundos para dar tempo de ler tranquilamente
    setTimeout(() => setCopied(false), 8000);
  };

  return (
    <section id="presentes" className="section bg-sand">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="presentes-header"
        >
          <Gift className="text-gold gift-icon-main" size={48} />
          <h2 className="section-title">Contribuir com o Casal</h2>
          <p className="presentes-intro">
            A sua presença é, sem dúvida, o nosso maior e melhor presente! Mas caso deseje nos presentear 
            para nos ajudar a construir a nossa vida juntos (ou dar um gás na Lua de Mel), 
            sinta-se livre para contribuir com o valor que o seu coração desejar.
          </p>
        </motion.div>

        <motion.div 
          className="pix-direct-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="pix-icon-circle">
            <Heart size={32} strokeWidth={1.5} />
          </div>
          
          <h3 className="pix-direct-title">Nosso PIX</h3>
          <p className="pix-direct-subtitle">Copie a chave abaixo para fazer sua contribuição direto no app do seu banco. Agradecemos muito pelo carinho!</p>
          
          <div className="pix-key-box" onClick={handleCopy}>
            <p className="pix-key-label">Chave PIX (E-mail):</p>
            <p className="pix-key">{pixKey}</p>
            
            <div className="pix-copy-action">
              {copied ? (
                <span className="copied-success"><CheckCircle2 size={18} /> Chave copiada!</span>
              ) : (
                <span className="copy-hint"><Copy size={18} /> Clique no quadro para copiar</span>
              )}
            </div>
          </div>

          <AnimatePresence>
            {copied && (
              <motion.div 
                className="pix-gratitude-msg"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="gratitude-content">
                  <p>
                    <strong>Já estamos de olho aguardando a sua surpresa! 🎉</strong>
                  </p>
                  <p>
                    Cada contribuição será imensamente celebrada e registrada no nosso mural do coração. 
                    Saber que você está nos ajudando a realizar esse sonho não tem preço. Muito obrigado!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Presentes;
