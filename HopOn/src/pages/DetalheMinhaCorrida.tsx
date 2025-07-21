import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarCorridaDetalhada } from "../api/corridas";
import { autorizarReserva, cancelarReserva } from "../api/corridas";

function DetalheMinhaCorrida() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [corrida, setCorrida] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDetalhes() {
      setLoading(true);
      setError(null);
      try {
        const data = await buscarCorridaDetalhada(id!);
        setCorrida(data);
      } catch (e: any) {
        setError(e.message || "Erro ao buscar detalhes da corrida");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchDetalhes();
  }, [id]);

  const handleAceitarReserva = async (reservaId: string) => {
    try {
      await autorizarReserva(reservaId);
      alert("Reserva autorizada com sucesso!");
      if (id) {
        const data = await buscarCorridaDetalhada(id);
        setCorrida(data);
      }
    } catch (e: any) {
      alert(e.message || "Erro ao autorizar reserva");
    }
  };

  const handleRecusarReserva = async (reservaId: string) => {
    try {
      await cancelarReserva(reservaId);
      alert("Reserva recusada com sucesso!");
      if (id) {
        const data = await buscarCorridaDetalhada(id);
        setCorrida(data);
      }
    } catch (e: any) {
      alert(e.message || "Erro ao recusar reserva");
    }
  };

  return (
    <div className="min-h-screen bg-folha font-poppins p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow p-6 mt-8">
        <button className="mb-4 text-folha hover:underline" onClick={() => navigate(-1)}>&larr; Voltar</button>
        {loading && <div>Carregando detalhes...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {corrida && (
          <>
            <h2 className="text-2xl font-bold mb-4">Detalhes da Corrida</h2>
            <div className="mb-2"><strong>Origem:</strong> {corrida.origem}</div>
            <div className="mb-2"><strong>Destino:</strong> {corrida.destino}</div>
            <div className="mb-2"><strong>Data/Hora Saída:</strong> {corrida.dataHoraSaida ? new Date(corrida.dataHoraSaida).toLocaleString() : ""}</div>
            <div className="mb-2"><strong>Status:</strong> {corrida.status}</div>
            <div className="mb-2"><strong>Preço:</strong> R$ {corrida.preco?.toFixed(2).replace('.', ',')}</div>
            <div className="mb-2"><strong>Vagas:</strong> {corrida.numeroVagas} (ocupadas: {corrida.vagasOcupadas})</div>
            <div className="mb-2"><strong>Observações:</strong> {corrida.observacoes || '-'}</div>
            <hr className="my-4" />
            <h3 className="text-lg font-semibold mb-2">Solicitações de Reserva</h3>
            {corrida.reservas && corrida.reservas.length > 0 ? (
              <ul className="mb-4">
                {corrida.reservas.map((res: any) => (
                  <li key={res.id} className="mb-2">
                    <div><strong>Passageiro:</strong> {res.passageiro?.nome || res.passageiroId}</div>
                    <div><strong>Assentos:</strong> {res.numeroAssentos}</div>
                    <div><strong>Status:</strong> {res.status}</div>
                    <div><strong>Observações:</strong> {res.observacoes || '-'}</div>
                    {res.status === 'PENDENTE' && (
                      <div className="flex gap-2 mt-2">
                        <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors" onClick={() => handleAceitarReserva(res.id)}>
                          Aceitar
                        </button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors" onClick={() => handleRecusarReserva(res.id)}>
                          Recusar
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div>Nenhuma solicitação de reserva.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default DetalheMinhaCorrida; 