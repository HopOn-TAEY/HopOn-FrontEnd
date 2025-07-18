import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CorridasFinalizadasUsuario() {
  const [corridas, setCorridas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCorridas() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        const resp = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3333'}/corridas-finalizadas-usuario`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!resp.ok) throw new Error('Erro ao buscar corridas finalizadas');
        const data = await resp.json();
        setCorridas(data.corridas || []);
      } catch (e: any) {
        setError(e.message || 'Erro ao buscar corridas finalizadas');
      } finally {
        setLoading(false);
      }
    }
    fetchCorridas();
  }, []);

  return (
    <div className="min-h-screen bg-[#658761] font-poppins p-6 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow p-6 mt-8">
        <button className="mb-4 text-folha hover:underline" onClick={() => navigate(-1)}>&larr; Voltar</button>
        <h2 className="text-2xl font-bold mb-4">Corridas Finalizadas</h2>
        {loading && <div>Carregando...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && !error && corridas.length === 0 && <div>Nenhuma corrida finalizada encontrada.</div>}
        {!loading && !error && corridas.length > 0 && (
          <ul className="space-y-4">
            {corridas.map((corrida: any) => (
              <li key={corrida.id} className="bg-gray-100 rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div><strong>Origem:</strong> {corrida.origem} | <strong>Destino:</strong> {corrida.destino}</div>
                  <div><strong>Data:</strong> {corrida.dataHoraSaida ? new Date(corrida.dataHoraSaida).toLocaleString() : '-'}</div>
                  <div><strong>Status:</strong> {corrida.status}</div>
                  <div><strong>Tipo:</strong> {corrida.tipo || '-'}</div>
                  <div><strong>Participação:</strong> {corrida.motorista?.usuario?.id === localStorage.getItem('userId') ? 'Motorista' : (corrida.reservas?.some((r: any) => r.passageiro?.id === localStorage.getItem('userId')) ? 'Passageiro' : '-')}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CorridasFinalizadasUsuario; 