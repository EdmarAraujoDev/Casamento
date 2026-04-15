import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CheckCircle2, XCircle, Star } from 'lucide-react';
import { supabase } from '../supabaseClient';
import AreaPadrinhos from './AreaPadrinhos';
import './RSVP.css';

const RSVP = () => {
  const [name, setName] = useState('');
  const [guestInfo, setGuestInfo] = useState(null);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: busca, 2: achado e opção, 3: confirmado/recusado
  const [acompanhantes, setAcompanhantes] = useState(0);
  const [showPadrinhos, setShowPadrinhos] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (!supabase) {
      setError('Ainda falta configurar a URL do Supabase no arquivo .env!');
      return;
    }

    try {
      // Busca exata pelo nome (sem %) ou busca pelo código do convite
      const { data, error: fetchError } = await supabase
        .from('convidados')
        .select('*')
        .or(`nome.eq.${name.trim()},codigo.eq.${name.trim().toUpperCase()}`);

      if (data && data.length > 0) {
        setGuestInfo(data[0]);
        setStep(2);
        setError('');
      } else {
        setError('Convite não encontrado. Certifique-se de digitar o nome exatamente como no convite ou use seu código de 4 letras.');
      }
    } catch (err) {
      setError('Erro ao conectar ao banco.');
    }
  };

  const handleConfirm = async (status) => {
    if (supabase && guestInfo) {
      await supabase
        .from('convidados')
        .update({ 
          confirmado: status === 'yes',
          acompanhantes: status === 'yes' ? acompanhantes : 0
        })
        .eq('id', guestInfo.id);
      
      setGuestInfo(prev => ({ ...prev, confirmado: status === 'yes' }));
    }
    setStep(3);
  };

  const isPadrinho = guestInfo?.tipo?.toLowerCase().includes('padrinho') || 
                    guestInfo?.tipo?.toLowerCase().includes('madrinha');

  return (
    <section id="rsvp" className="section bg-sand rsvp-section">
      <div className="container">
        <motion.div
          className="rsvp-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Confirme sua Presença</h2>
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="rsvp-step"
              >
                <p className="rsvp-text">Para sua segurança, digite seu <strong>Nome Completo</strong> exatamente como no convite ou o seu <strong>Código de 4 letras</strong>.</p>
                
                <form onSubmit={handleSearch} className="rsvp-form">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome Completo ou Código"
                    className="rsvp-input"
                  />
                  <button type="submit" className="btn-primary" style={{marginTop: '1rem', width: '100%'}}>
                    Procurar Convite
                  </button>
                </form>
                {error && <p className="error-msg">{error}</p>}
              </motion.div>
            )}

            {step === 2 && guestInfo && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="rsvp-step"
              >
                <Heart className="text-gold heart-icon" size={48} />
                <h3 className="guest-name">Olá, {guestInfo.nome}</h3>
                <p className="guest-message">{guestInfo.mensagem}</p>
                
                <div style={{marginBottom: '2rem'}}>
                  <label style={{display: 'block', marginBottom: '0.5rem', opacity: 0.8}}>Quantos acompanhantes irão com você?</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={acompanhantes}
                    onChange={(e) => setAcompanhantes(parseInt(e.target.value) || 0)}
                    className="rsvp-input"
                    style={{width: '80px', textAlign: 'center'}}
                  />
                </div>
                
                <div className="rsvp-choices">
                  <button onClick={() => handleConfirm('yes')} className="btn-primary rsvp-btn">
                    Com certeza estarei lá!
                  </button>
                  <button onClick={() => handleConfirm('no')} className="btn-outline rsvp-btn">
                    Infelizmente não poderei ir
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rsvp-step success-step"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  {guestInfo.confirmado ? (
                    <CheckCircle2 className="success-icon" size={64} style={{ color: '#22c55e' }} />
                  ) : (
                    <Heart className="success-icon text-gold" size={64} />
                  )}
                </motion.div>
                <h3 className="success-title">
                  {guestInfo.confirmado ? "Resposta Recebida!" : "Sentiremos sua falta!"}
                </h3>
                
                <div className="personalized-message">
                  <p>"{guestInfo.mensagem}"</p>
                </div>

                {guestInfo.confirmado && isPadrinho && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{ marginTop: '1rem', width: '100%' }}
                  >
                    <button 
                      onClick={() => setShowPadrinhos(true)} 
                      className="btn-primary" 
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    >
                      <Star size={20} fill="currentColor" />
                      Área Exclusiva dos Padrinhos
                    </button>
                  </motion.div>
                )}

                <p className="success-subtext">
                  Suas preferências foram registradas com sucesso.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {showPadrinhos && (
          <AreaPadrinhos 
            guestInfo={guestInfo} 
            onClose={() => setShowPadrinhos(false)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default RSVP;

