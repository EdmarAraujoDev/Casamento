import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CheckCircle2, XCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './RSVP.css';

const RSVP = () => {
  const [name, setName] = useState('');
  const [guestInfo, setGuestInfo] = useState(null);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: busca, 2: achado e opção, 3: confirmado/recusado
  const [acompanhantes, setAcompanhantes] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (!supabase) {
      setError('Ainda falta configurar a URL do Supabase no arquivo .env!');
      return;
    }

    try {
      // Fazendo a busca no banco de dados na tabela 'convidados'
      const { data, error: fetchError } = await supabase
        .from('convidados')
        .select('*')
        .ilike('nome', `%${name.trim()}%`);

      if (data && data.length > 0) {
        setGuestInfo(data[0]); // Seleciona o primeiro que bater com o nome
        setStep(2);
        setError('');
      } else {
        setError('Desculpe, não conseguimos encontrar este nome na lista de convidados.');
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
    }
    setStep(3);
  };

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
                <p className="rsvp-text">Por favor, digite seu nome exatamente como está no convite para acessar sua área exclusiva.</p>
                
                <form onSubmit={handleSearch} className="rsvp-form">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
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
                  {guestInfo.confirmado ? "Obrigado por confirmar!" : "Sentiremos sua falta!"}
                </h3>
                
                {/* MENSAGEM PERSONALIZADA */}
                <div className="personalized-message" style={{ margin: '1.5rem 0', padding: '1.5rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', fontStyle: 'italic' }}>
                  {guestInfo.confirmado ? (
                    <p>
                      "{guestInfo.nome.split(' ')[0]}, estamos imensamente felizes de saber que você estará com a gente! 
                      Sua presença tornará o nosso dia muito mais especial e inesquecível. 
                      Prepare-se para celebrar muito o nosso amor. Nos vemos lá!"
                    </p>
                  ) : (
                    <p>
                      "Poxa, {guestInfo.nome.split(' ')[0]}... Estamos tristes que não poderá comparecer, 
                      mas entendemos perfeitamente. Agradecemos o carinho de nos avisar e a sua energia boa, 
                      mesmo de longe, fará a diferença no nosso dia. Um grande abraço!"
                    </p>
                  )}
                </div>

                <p className="success-subtext" style={{ fontSize: '0.85rem' }}>
                  Sua resposta foi registrada com sucesso na nossa lista oficial.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default RSVP;
