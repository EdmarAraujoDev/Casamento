import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Heart, User } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './MuralRecados.css';

const MuralRecados = () => {
  const [messages, setMessages] = useState([]);
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('recados')
      .select('*')
      .eq('aprovado', true)
      .order('criado_em', { ascending: false });
    
    if (!error) setMessages(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome.trim() || !mensagem.trim() || !supabase) return;

    setLoading(true);
    const { error } = await supabase
      .from('recados')
      .insert([
        { nome: nome.trim(), mensagem: mensagem.trim(), aprovado: false }
      ]);

    if (!error) {
      setSuccess(true);
      setNome('');
      setMensagem('');
      setTimeout(() => setSuccess(false), 5000);
    }
    setLoading(false);
  };

  return (
    <section id="mural" className="section bg-white">
      <div className="container">
        <motion.div
          className="mural-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <MessageSquare className="text-gold" size={40} />
          <h2 className="section-title">Mural de Recados</h2>
          <p className="section-subtitle">Deixe uma mensagem carinhosa para os noivos</p>
        </motion.div>

        <div className="mural-grid">
          {/* Form Side */}
          <motion.div 
            className="mural-form-container"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="mural-form">
              <div className="form-group">
                <label><User size={16} /> Seu Nome</label>
                <input 
                  type="text" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Como quer ser identificado?"
                  required
                />
              </div>
              <div className="form-group">
                <label><MessageSquare size={16} /> Sua Mensagem</label>
                <textarea 
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Escreva algo especial..."
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading}
              >
                {loading ? 'Enviando...' : (
                  <>
                    Enviar Recado <Send size={18} />
                  </>
                )}
              </button>

              <AnimatePresence>
                {success && (
                  <motion.p 
                    className="success-msg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    Recado enviado! Ele aparecerá aqui assim que os noivos aprovarem. ❤️
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Messages Side */}
          <div className="mural-messages">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <motion.div 
                  key={msg.id}
                  className="recado-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="recado-icon">
                    <Heart size={16} fill="var(--color-gold)" />
                  </div>
                  <p className="recado-text">"{msg.mensagem}"</p>
                  <span className="recado-author">- {msg.nome}</span>
                </motion.div>
              ))
            ) : (
              <p className="empty-mural">Seja o primeiro a deixar um recado carinhoso!</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MuralRecados;
