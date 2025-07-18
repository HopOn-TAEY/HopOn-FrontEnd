import { useEffect, useState } from "react";
import { listarSolicitacoesPrivadasMotorista, aceitarPropostaCorridaPrivada, recusarSolicitacaoPrivada } from "../api/corridas";

function SolicitacoesPrivadasMotorista() {
  const [solicitacoes, setSolicitacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSolicitacoes = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await listarSolicitacoesPrivadasMotorista();
      if (resp && Array.isArray(resp.solicitacoesPrivadas)) {
        setSolicitacoes(resp.solicitacoesPrivadas);
      } else {
        setSolicitacoes([]);
      }
    } catch (err: any) {
      setError(err.message || "Erro ao buscar solicitações");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolicitacoes();
  }, []);

  const handleAceitar = async (propostaId: string) => {
    try {
      await aceitarPropostaCorridaPrivada(propostaId);
      alert("Solicitação aceita com sucesso!");
      fetchSolicitacoes();
    } catch (err: any) {
      alert("Erro ao aceitar solicitação: " + (err.message || err));
    }
  };

  const handleRecusar = async (propostaId: string) => {
    try {
      await recusarSolicitacaoPrivada(propostaId);
      alert("Solicitação recusada com sucesso!");
      fetchSolicitacoes();
    } catch (err: any) {
      alert("Erro ao recusar solicitação: " + (err.message || err));
    }
  };

  return (
    <div className="min-h-screen bg-[#658761] font-poppins p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Solicitações de Corridas Privadas Recebidas</h1>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <ul className="space-y-4">
          {solicitacoes.length === 0 && <p className="text-white">Nenhuma solicitação privada.</p>}
          {solicitacoes.map((sol: any) => (
            <li key={sol.id} className="bg-blue-50 border border-blue-200 rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-[220px]">
                <div><strong>Origem:</strong> {sol.origem} | <strong>Destino:</strong> {sol.destino}</div>
                <div><strong>Passageiro:</strong> {sol.passageiro?.nome || sol.passageiro?.id}</div>
                <div><strong>Status:</strong> {sol.status}</div>
                <div><strong>Data:</strong> {sol.dataHoraSaida ? new Date(sol.dataHoraSaida).toLocaleString() : ""}</div>
                <div><strong>Nº Passageiros:</strong> {sol.numeroPassageiros}</div>
                <div><strong>Observações:</strong> {sol.observacoes || "-"}</div>
              </div>
              <div className="flex flex-col gap-2 min-w-[220px]">
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors" onClick={() => handleAceitar(sol.id)}>
                  Aceitar
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors" onClick={() => handleRecusar(sol.id)}>
                  Recusar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SolicitacoesPrivadasMotorista; 