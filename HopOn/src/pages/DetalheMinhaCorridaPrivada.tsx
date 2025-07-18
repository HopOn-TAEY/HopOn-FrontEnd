import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarCorridaPrivadaDetalhada } from "../api/corridas";

function DetalheMinhaCorridaPrivada() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [corrida, setCorrida] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagemAtiva, setImagemAtiva] = useState(0);

  useEffect(() => {
    async function fetchDetalhes() {
      setLoading(true);
      setError(null);
      try {
        const data = await buscarCorridaPrivadaDetalhada(id!);
        setCorrida(data);
      } catch (e: any) {
        setError(e.message || "Erro ao buscar detalhes da corrida privada");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchDetalhes();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#658761] font-poppins p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow p-6 mt-8">
        <button className="mb-4 text-folha hover:underline" onClick={() => navigate(-1)}>&larr; Voltar</button>
        {loading && <div>Carregando detalhes...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {corrida && (
          <>
            <h2 className="text-2xl font-bold mb-4">Detalhes da Corrida Privada</h2>
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
            <div className="mb-1"><strong>Avaliação média:</strong> {corrida.motorista?.avaliacaoMedia?.toFixed(2)}</div>
            <hr className="my-4" />
            <h3 className="text-lg font-semibold mb-2">Passageiro</h3>
            <div className="mb-1"><strong>Nome:</strong> {corrida.passageiro?.nome}</div>
            <div className="mb-1"><strong>Email:</strong> {corrida.passageiro?.email}</div>
            <div className="mb-1"><strong>Telefone:</strong> {corrida.passageiro?.telefone}</div>
            <hr className="my-4" />
            <h3 className="text-lg font-semibold mb-2">Veículo</h3>
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
          </>
        )}
      </div>
    </div>
  );
}

export default DetalheMinhaCorridaPrivada; 