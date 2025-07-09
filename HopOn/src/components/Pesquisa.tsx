import React, { useEffect, useState } from "react";
import { listarCorridas } from "../api/corridas";
import { useNavigate } from "react-router-dom";

function Pesquisar() {
  const [corridas, setCorridas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCorridas = async () => {
      setIsLoading(true);
      try {
        const data = await listarCorridas();
        if (Array.isArray(data)) {
          setCorridas(data);
        } else if (data && Array.isArray((data as any).corridas)) {
          setCorridas((data as any).corridas);
        } else {
          setCorridas([]);
        }
      } catch (err) {
        setError("Erro ao buscar corridas");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCorridas();
  }, []);

  return (
    <div className="flex flex-col justify-center items-start p-5 font-poppins">
      <div className="bg-white rounded-lg w-full max-w-7xl mt-5 shadow-md p-4 mb-8">
        <form
          action="X"
          method="post"
          className="flex items-start gap-4 w-full"
        >
          {/* Saída */}
          <div className="flex flex-col flex-1 border-r-1 border-gray-300 ">
            <label htmlFor="saida" className="text-xs font-semibold mb-1">
              Saída
            </label>
            <input
              id="saida"
              type="text"
              placeholder="Digite aqui..."
              className="px-3 py-2 w-full text-sm border border-gray-300 rounded"
            />
          </div>

          {/* Destino */}
          <div className="flex flex-col flex-1">
            <label htmlFor="destino" className="text-xs font-semibold mb-1">
              Destino
            </label>
            <input
              id="destino"
              type="text"
              placeholder="Digite aqui..."
              className="px-3 py-2 w-full text-sm border border-gray-300 rounded"
            />
          </div>

          {/* Data */}
          <div className="flex flex-col flex-1">
            <label htmlFor="data" className="text-xs font-semibold mb-1">
              Data
            </label>
            <input
              id="data"
              type="date"
              className="px-3 py-2 w-full text-sm border border-gray-300 rounded"
            />
          </div>

          {/* Passageiros */}
          <div className="flex flex-col flex-1 max-w-[100px]">
            <label htmlFor="passageiros" className="text-xs font-semibold mb-1">
              Passageiros
            </label>
            <input
              id="passageiros"
              type="number"
              defaultValue={1}
              min={1}
              className="px-3 py-2 w-full text-sm border border-gray-300 rounded"
            />
          </div>

          {/* Botão centralizado na altura dos inputs */}
          <div className="self-center">
            <button
              type="submit"
              className="bg-[#648D6E] hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full transition-colors duration-300 text-sm"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>

      {/* Listagem de corridas */}
      <div className="w-full max-w-7xl">
        <h2 className="text-2xl font-bold mb-4">Corridas disponíveis</h2>
        {isLoading && <p>Carregando corridas...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!isLoading && !error && corridas.length === 0 && (
          <p>Nenhuma corrida encontrada.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {corridas.map((corrida) => (
            <div key={corrida.id} className="bg-white rounded shadow p-4 border">
              <div className="font-semibold text-lg mb-2">
                {corrida.origem} → {corrida.destino}
              </div>
              <div className="text-sm mb-1">
                <span className="font-semibold">Data/Hora:</span> {corrida.dataHoraSaida ? new Date(corrida.dataHoraSaida).toLocaleString() : "-"}
              </div>
              <div className="text-sm mb-1">
                <span className="font-semibold">Motorista:</span> {corrida.motorista?.nome || "-"}
              </div>
              <div className="text-sm mb-1">
                <span className="font-semibold">Vagas:</span> {corrida.vagasDisponiveis ?? (corrida.numeroVagas - (corrida.vagasOcupadas || 0))}
              </div>
              <div className="text-sm mb-1">
                <span className="font-semibold">Preço:</span> R$ {corrida.preco?.toFixed(2) ?? "-"}
              </div>
              <button
                className="mt-3 bg-folha text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300"
                onClick={() => navigate(`/reserva/${corrida.id}`)}
              >
                Reservar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pesquisar;
