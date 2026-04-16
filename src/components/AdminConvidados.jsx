import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Users, CheckCircle2, XCircle, Clock, Plus, Trash2, MessageSquare, Check, Edit2 } from 'lucide-react';
import './AdminConvidados.css';

const AdminConvidados = () => {
  const [convidados, setConvidados] = useState([]);
  const [recados, setRecados] = useState([]);
  const [activeTab, setActiveTab] = useState('convidados');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    tipo: 'convidado',
    mensagem: 'Estamos muito felizes em ter você conosco!',
    codigo: ''
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    if (activeTab === 'convidados') {
      await fetchConvidados();
    } else {
      await fetchRecados();
    }
    setLoading(false);
  };

  const fetchConvidados = async () => {
    const { data, error: fetchError } = await supabase
      .from('convidados')
      .select('*')
      .order('nome', { ascending: true });
    if (fetchError) setError('Erro ao carregar convidados.');
    else setConvidados(data || []);
  };

  const fetchRecados = async () => {
    const { data, error: fetchError } = await supabase
      .from('recados')
      .select('*')
      .order('criado_em', { ascending: false });
    if (fetchError) setError('Erro ao carregar recados.');
    else setRecados(data || []);
  };

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleSaveConvidado = async (e) => {
    e.preventDefault();
    const finalCode = formData.codigo.trim() || generateCode();
    
    const payload = { ...formData, codigo: finalCode.toUpperCase() };

    if (editingId) {
      await supabase.from('convidados').update(payload).eq('id', editingId);
    } else {
      await supabase.from('convidados').insert([payload]);
    }

    setShowModal(false);
    setEditingId(null);
    setFormData({ nome: '', tipo: 'convidado', mensagem: '', codigo: '' });
    fetchConvidados();
  };

  const deleteConvidado = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este convidado?')) {
      await supabase.from('convidados').delete().eq('id', id);
      fetchConvidados();
    }
  };

  const approveRecado = async (id) => {
    await supabase.from('recados').update({ aprovado: true }).eq('id', id);
    fetchRecados();
  };

  const deleteRecado = async (id) => {
    if (window.confirm('Excluir este recado permanentemente?')) {
      await supabase.from('recados').delete().eq('id', id);
      fetchRecados();
    }
  };

  if (loading && convidados.length === 0) {
    return <div className="admin-loading">Carregando painel de controle...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-nav">
        <button 
          className={activeTab === 'convidados' ? 'active' : ''} 
          onClick={() => setActiveTab('convidados')}
        >
          <Users size={18} /> Gestão de Convidados
        </button>
        <button 
          className={activeTab === 'recados' ? 'active' : ''} 
          onClick={() => setActiveTab('recados')}
        >
          <MessageSquare size={18} /> Moderação de Recados
        </button>
      </div>

      {activeTab === 'convidados' ? (
        <>
          <div className="admin-actions">
            <h1>Lista de Convidados</h1>
            <button className="btn-primary" onClick={() => setShowModal(true)}>
              <Plus size={18} /> Novo Convidado
            </button>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Código</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {convidados.map(c => (
                  <tr key={c.id}>
                    <td>{c.nome}</td>
                    <td className="text-code">{c.codigo}</td>
                    <td>
                      {c.confirmado === true ? <span className="status-yes">Sim</span> : 
                       c.confirmado === false ? <span className="status-no">Não</span> : 'Pendente'}
                    </td>
                    <td className="actions-cell">
                      <button onClick={() => {
                        setEditingId(c.id);
                        setFormData({ nome: c.nome, tipo: c.tipo, mensagem: c.mensagem, codigo: c.codigo });
                        setShowModal(true);
                      }}><Edit2 size={16} /></button>
                      <button className="btn-del" onClick={() => deleteConvidado(c.id)}><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="admin-actions">
            <h1>Moderação de Recados</h1>
          </div>
          <div className="recados-moderation-list">
            {recados.map(r => (
              <div key={r.id} className={`mod-card ${r.aprovado ? 'approved' : 'pending'}`}>
                <div className="mod-info">
                  <strong>{r.nome}</strong>
                  <p>"{r.mensagem}"</p>
                </div>
                <div className="mod-actions">
                  {!r.aprovado && (
                    <button className="btn-approve" onClick={() => approveRecado(r.id)}>
                      <Check size={18} /> Aprovar
                    </button>
                  )}
                  <button className="btn-del" onClick={() => deleteRecado(r.id)}>
                    <Trash2 size={18} /> Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal Convidado */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h2>{editingId ? 'Editar Convidado' : 'Novo Convidado'}</h2>
            <form onSubmit={handleSaveConvidado}>
              <input 
                type="text" 
                placeholder="Nome Completo" 
                value={formData.nome}
                onChange={e => setFormData({...formData, nome: e.target.value})}
                required 
              />
              <select 
                value={formData.tipo}
                onChange={e => setFormData({...formData, tipo: e.target.value})}
              >
                <option value="convidado">Convidado Comum</option>
                <option value="madrinha">Madrinha</option>
                <option value="padrinho">Padrinho</option>
              </select>
              <input 
                type="text" 
                placeholder="Código de 4 letras (ou deixe em branco)" 
                value={formData.codigo}
                onChange={e => setFormData({...formData, codigo: e.target.value})}
                maxLength={4}
              />
              <textarea 
                placeholder="Mensagem Personalizada" 
                value={formData.mensagem}
                onChange={e => setFormData({...formData, mensagem: e.target.value})}
              />
              <div className="modal-btns">
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline">Cancelar</button>
                <button type="submit" className="btn-primary">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminConvidados;

