import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Users, CheckCircle2, XCircle, Clock } from 'lucide-react';
import './AdminConvidados.css';

const AdminConvidados = () => {
  const [convidados, setConvidados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConvidados = async () => {
      if (!supabase) {
        setError('Supabase não configurado.');
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('convidados')
          .select('*')
          .order('nome', { ascending: true });

        if (fetchError) throw fetchError;
        setConvidados(data || []);
      } catch (err) {
        setError('Erro ao carregar a lista de convidados.');
      } finally {
        setLoading(false);
      }
    };

    fetchConvidados();
  }, []);

  const totalConvidados = convidados.length;
  
  // Calcula confirmados considerando que o convidado principal é 1 + acompanhantes
  const confirmadosCount = convidados
    .filter(c => c.confirmado === true)
    .reduce((acc, curr) => acc + 1 + (curr.acompanhantes || 0), 0);

  const recusadosCount = convidados.filter(c => c.confirmado === false).length;
  const pendentesCount = convidados.filter(c => c.confirmado === null).length;

  if (loading) {
    return <div className="admin-loading">Carregando lista de convidados...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Painel de Convidados</h1>
        <p>Acompanhe quem já confirmou presença no casamento.</p>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <Users size={32} className="stat-icon text-gold" />
          <div className="stat-info">
            <h3>{totalConvidados}</h3>
            <p>Total na Lista (Famílias/Indivíduos)</p>
          </div>
        </div>
        <div className="stat-card">
          <CheckCircle2 size={32} className="stat-icon text-green" />
          <div className="stat-info">
            <h3>{confirmadosCount}</h3>
            <p>Pessoas Confirmadas (Total com Acompanhantes)</p>
          </div>
        </div>
        <div className="stat-card">
          <XCircle size={32} className="stat-icon text-red" />
          <div className="stat-info">
            <h3>{recusadosCount}</h3>
            <p>Não poderão ir</p>
          </div>
        </div>
        <div className="stat-card">
          <Clock size={32} className="stat-icon text-gray" />
          <div className="stat-info">
            <h3>{pendentesCount}</h3>
            <p>Pendentes</p>
          </div>
        </div>
      </div>

      {error && <div className="admin-error">{error}</div>}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Status</th>
              <th>Acompanhantes Extra</th>
              <th>Mensagem do Convite</th>
            </tr>
          </thead>
          <tbody>
            {convidados.map((convidado) => (
              <tr key={convidado.id}>
                <td className="font-bold">{convidado.nome}</td>
                <td>
                  {convidado.confirmado === true && (
                    <span className="status-badge status-yes"><CheckCircle2 size={16} /> Confirmado</span>
                  )}
                  {convidado.confirmado === false && (
                    <span className="status-badge status-no"><XCircle size={16} /> Recusado</span>
                  )}
                  {convidado.confirmado === null && (
                    <span className="status-badge status-pending"><Clock size={16} /> Pendente</span>
                  )}
                </td>
                <td>{convidado.confirmado ? convidado.acompanhantes || 0 : '-'}</td>
                <td className="text-sm text-gray">{convidado.mensagem}</td>
              </tr>
            ))}
            {convidados.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">Nenhum convidado encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminConvidados;
