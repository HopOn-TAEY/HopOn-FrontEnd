import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarCorridaDetalhada } from "../api/corridas";
import { criarReserva } from "../api/corridas";

function CorridaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [corrida, setCorrida] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reservaStatus, setReservaStatus] = useState<{ loading: boolean, success?: string, error?: string }>({ loading: false });
  const [imagemAtiva, setImagemAtiva] = useState(0);

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

  const handleSolicitarReserva = async () => {
    if (!corrida?.id) return;
    setReservaStatus({ loading: true });
    try {
      await criarReserva(corrida.id, 1);
      setReservaStatus({ loading: false, success: "Reserva solicitada com sucesso!" });
    } catch (e: any) {
      setReservaStatus({ loading: false, error: e.message || "Erro ao solicitar reserva" });
    }
  };

  return (
    <div className="min-h-screen bg-[#658761] font-poppins p-6 flex flex-col items-center">
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
            <h3 className="text-lg font-semibold mb-2">Motorista</h3>
            <div className="mb-1"><strong>Nome:</strong> {corrida.motorista?.usuario?.nome}</div>
            <div className="mb-1"><strong>Email:</strong> {corrida.motorista?.usuario?.email}</div>
            <div className="mb-1"><strong>Telefone:</strong> {corrida.motorista?.usuario?.telefone}</div>
            <div className="mb-1"><strong>CNH:</strong> {corrida.motorista?.cnh}</div>
            <div className="mb-1 flex items-center">
              <strong>Avaliação média:</strong>
              <span className="ml-2 flex items-center">
                {corrida.motorista?.avaliacaoMedia !== undefined && (
                  <>
                    <span>{Number(corrida.motorista.avaliacaoMedia).toFixed(2)}</span>
                    <svg className="w-5 h-5 text-yellow-500 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                  </>
                )}
              </span>
            </div>
            <hr className="my-4" />
            <h3 className="text-lg font-semibold mb-2">Veículo</h3>
            {/* Carrossel de imagens do veículo */}
            {corrida.veiculo?.imagens && corrida.veiculo.imagens.length > 0 ? (
              <div className="relative mb-4">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                  <img
                    src={corrida.veiculo.imagens[imagemAtiva]?.url}
                    alt={corrida.veiculo.modelo}
                    className="max-h-[400px] h-96 w-auto object-contain rounded-lg mx-auto"
                  />
                </div>
                {corrida.veiculo.imagens.length > 1 && (
                  <>
                    <button
                      onClick={() => setImagemAtiva(imagemAtiva === 0 ? corrida.veiculo.imagens.length - 1 : imagemAtiva - 1)}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => setImagemAtiva((imagemAtiva + 1) % corrida.veiculo.imagens.length)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                    >
                      ›
                    </button>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {corrida.veiculo.imagens.map((_: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setImagemAtiva(idx)}
                          className={`w-2 h-2 rounded-full ${idx === imagemAtiva ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">🚗</div>
                  <p className="text-sm">Sem imagens</p>
                </div>
              </div>
            )}
            <div className="mb-1"><strong>Marca:</strong> {corrida.veiculo?.marca}</div>
            <div className="mb-1"><strong>Modelo:</strong> {corrida.veiculo?.modelo}</div>
            <div className="mb-1"><strong>Placa:</strong> {corrida.veiculo?.placa}</div>
            <div className="mb-1"><strong>Cor:</strong> {corrida.veiculo?.cor}</div>
            <div className="mb-1"><strong>Capacidade:</strong> {corrida.veiculo?.capacidade}</div>
            <div className="mb-1"><strong>Suporte crianças:</strong> {corrida.veiculo?.suporteCriancas ? 'Sim' : 'Não'}</div>
            <div className="mb-1"><strong>Suporte deficientes:</strong> {corrida.veiculo?.suporteDeficientes ? 'Sim' : 'Não'}</div>
            <hr className="my-4" />
            <button
              className="bg-[#648D6E] hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full transition-colors duration-300 mt-2"
              onClick={handleSolicitarReserva}
              disabled={reservaStatus.loading}
            >
              {reservaStatus.loading ? "Solicitando..." : "Solicitar reserva"}
            </button>
            {reservaStatus.success && <div className="text-green-700 mt-2">{reservaStatus.success}</div>}
            {reservaStatus.error && <div className="text-red-600 mt-2">{reservaStatus.error}</div>}
          </>
        )}
      </div>
    </div>
  );
}

export default CorridaDetalhe; 