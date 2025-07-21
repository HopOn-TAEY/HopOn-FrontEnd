import { useEffect, useState } from "react";
import { listarCorridas, listarCorridasPrivadas, listarSolicitacoesPrivadasMotorista, aceitarPropostaCorridaPrivada, recusarSolicitacaoPrivada, buscarCorridaDetalhada, finalizarCorrida, cancelarCorrida } from "../api/corridas";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function MinhasCorridas() {
  const { user, isAuthenticated } = useAuth();
  const [corridas, setCorridas] = useState<any[]>([]);
  const [corridasPrivadas, setCorridasPrivadas] = useState<any[]>([]);
  const [solicitacoesPrivadas, setSolicitacoesPrivadas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchAll = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const todas = await listarCorridas();
      const minhas = todas.filter((c: any) => c.motorista?.id === user?.id && c.status === 'AGENDADA');
      
      // Buscar detalhes completos de cada corrida (incluindo reservas)
      const corridasComDetalhes = await Promise.all(
        minhas.map(async (corrida: any) => {
          try {
            const detalhes = await buscarCorridaDetalhada(corrida.id);
            return detalhes;
          } catch (e) {
            console.error(`Erro ao buscar detalhes da corrida ${corrida.id}:`, e);
            return corrida; // Retorna a corrida sem detalhes se houver erro
          }
        })
      );
      
      setCorridas(corridasComDetalhes);
      try {
        const privadas = await listarCorridasPrivadas();
        if (Array.isArray(privadas)) {
          setCorridasPrivadas(privadas);
        } else if (privadas && Array.isArray((privadas as any).corridasPrivadas)) {
          setCorridasPrivadas((privadas as any).corridasPrivadas);
        } else {
          setCorridasPrivadas([]);
        }
      } catch {}
      // Removido: busca de solicitações privadas
    } catch (err: any) {
      setError(err.message || "Erro ao buscar corridas");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.tipo === "motorista") {
      fetchAll();
    }
    // eslint-disable-next-line
  }, [isAuthenticated, user]);

  // Handlers para aceitar/recusar
  const handleAceitar = async (propostaId: string) => {
    try {
      await aceitarPropostaCorridaPrivada(propostaId);
      alert("Solicitação aceita com sucesso!");
      fetchAll();
    } catch (err: any) {
      alert("Erro ao aceitar solicitação: " + (err.message || err));
    }
  };

  const handleRecusar = async (propostaId: string) => {
    try {
      await recusarSolicitacaoPrivada(propostaId);
      alert("Solicitação recusada com sucesso!");
      fetchAll();
    } catch (err: any) {
      alert("Erro ao recusar solicitação: " + (err.message || err));
    }
  };

  const handleFinalizarCorrida = async (id: string) => {
    try {
      await finalizarCorrida(id);
      alert("Corrida finalizada com sucesso!");
      fetchAll();
    } catch (err: any) {
      alert("Erro ao finalizar corrida: " + (err.message || err));
    }
  };

  const handleCancelarCorrida = async (id: string) => {
    try {
      await cancelarCorrida(id);
      alert("Corrida cancelada com sucesso!");
      fetchAll();
    } catch (err: any) {
      alert("Erro ao cancelar corrida: " + (err.message || err));
    }
  };

  return (
    <div className="min-h-screen bg-[#658761] font-poppins p-6">
      <h1 className="text-2xl font-bold mb-4">Minhas Corridas</h1>
      {isLoading && <p>Carregando...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!isLoading && !error && (
        <>
          {/* Corridas Publicadas */}
          <h2 className="text-xl font-semibold mt-6 mb-2">Corridas Publicadas</h2>
          {corridas.length === 0 && <p>Nenhuma corrida publicada.</p>}
          <ul className="space-y-4">
            {corridas.map((corrida) => (
              <li key={corrida.id} className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-[220px]">
                  <div><strong>Origem:</strong> {corrida.origem} | <strong>Destino:</strong> {corrida.destino}</div>
                  <div><strong>Data:</strong> {corrida.data || (corrida.dataHoraSaida ? new Date(corrida.dataHoraSaida).toLocaleString() : "")} | <strong>Vagas:</strong> {corrida.vagas || corrida.numeroVagas}</div>
                  <div className="mt-2">
                    <strong>Solicitações de Reserva:</strong>
                    {corrida.reservas && corrida.reservas.length > 0 ? (
                      <ul className="list-disc ml-6">
                        {corrida.reservas.map((res: any) => (
                          <li key={res.id}>
                            Passageiro: {res.passageiro?.nome || res.passageiroId} | Assentos: {res.numeroAssentos} | Status: {res.status}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span> Nenhuma solicitação.</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-w-[220px]">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors" onClick={() => navigate(`/minhas-corridas/${corrida.id}`)}>
                    Ver detalhes
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors" onClick={() => handleFinalizarCorrida(corrida.id)}>
                    Finalizar
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors" onClick={() => handleCancelarCorrida(corrida.id)}>
                    Cancelar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Solicitações de Corridas Privadas Recebidas */}
          {/* Removido: seção de solicitações privadas recebidas */}

          {/* Corridas Privadas já aceitas */}
          <h2 className="text-xl font-semibold mt-8 mb-2">Corridas Privadas Aceitas</h2>
          {corridasPrivadas.length === 0 && <p>Nenhuma corrida privada aceita.</p>}
          <ul className="space-y-4">
            {corridasPrivadas.map((priv: any) => (
              <li key={priv.id} className="bg-white rounded shadow p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-[220px]">
                  <div><strong>Origem:</strong> {priv.origem} | <strong>Destino:</strong> {priv.destino}</div>
                  <div><strong>Passageiro:</strong> {priv.passageiro?.nome || priv.passageiroId}</div>
                  <div><strong>Status:</strong> {priv.status}</div>
                  <div><strong>Data:</strong> {priv.dataHoraSaida ? new Date(priv.dataHoraSaida).toLocaleString() : ""}</div>
                </div>
                <div className="flex flex-col gap-2 min-w-[220px]">
                  <button className="bg-folha text-white px-4 py-2 rounded hover:bg-green-700 transition-colors" onClick={() => navigate(`/minhas-corridas-privadas/${priv.id}`)}>
                    Ver detalhes
                  </button>
                  <button className="bg-folha text-white px-4 py-2 rounded hover:bg-green-700 transition-colors" onClick={() => handleFinalizarCorrida(priv.id)}>
                    Finalizar
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors" onClick={() => handleCancelarCorrida(priv.id)}>
                    Cancelar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default MinhasCorridas; 