import { useState, useEffect } from "react";
import { listarCorridas, listarSolicitacoesPrivadasMotorista, buscarCorridaDetalhada } from "../api/corridas";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Filtros() {
  // Estados do filtro principal
  const [saida, setSaida] = useState("");
  const [destino, setDestino] = useState("");
  const [data, setData] = useState("");
  const [passageiros, setPassageiros] = useState(1);

  // Estados de filtro lateral
  const [ordenarPor, setOrdenarPor] = useState("preco");
  const [preferencias, setPreferencias] = useState<string[]>(["Permite fumar"]);
  const [horarios, setHorarios] = useState<string[]>(["06:00 - 12:00"]);

  // Estados para integração
  const [corridas, setCorridas] = useState<any[]>([]);
  const [corridasFiltradas, setCorridasFiltradas] = useState<any[]>([]);
  const [solicitacoesPrivadas, setSolicitacoesPrivadas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalDetalhes, setModalDetalhes] = useState<{ open: boolean, corrida?: any, loading?: boolean, error?: string }>({ open: false });

  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Função para manipular checkboxes de preferências
  const togglePreferencia = (pref: string) => {
    setPreferencias((prev) =>
      prev.includes(pref)
        ? prev.filter((p) => p !== pref)
        : [...prev, pref]
    );
  };

  // Função para manipular checkboxes de horários
  const toggleHorario = (hora: string) => {
    setHorarios((prev) =>
      prev.includes(hora)
        ? prev.filter((h) => h !== hora)
        : [...prev, hora]
    );
  };

  // Função de limpar filtros
  const limparFiltro = (tipo: "ordenar" | "preferencias" | "horarios") => {
    if (tipo === "ordenar") setOrdenarPor("");
    if (tipo === "preferencias") setPreferencias([]);
    if (tipo === "horarios") setHorarios([]);
  };

  const handleVerDetalhes = (id: string) => {
    navigate(`/corrida/${id}`);
  };

  useEffect(() => {
    async function fetchCorridas() {
      setIsLoading(true);
      setError(null);
      try {
        const corridas = await listarCorridas();
        // Filtrar apenas corridas com data futura e status diferente de FINALIZADA ou CANCELADA
        const agora = new Date();
        const corridasFuturas = corridas.filter((corrida) => {
          const dataSaida = new Date(corrida.dataHoraSaida || corrida.data);
          return !isNaN(dataSaida.getTime()) && dataSaida > agora && corrida.status !== 'FINALIZADA' && corrida.status !== 'CANCELADA';
        });
        setCorridas(corridasFuturas);
        setCorridasFiltradas(corridasFuturas);
        // Se for motorista autenticado, buscar solicitações privadas
        if (isAuthenticated && user?.tipo === "motorista") {
          try {
            const resp = await listarSolicitacoesPrivadasMotorista();
            if (resp && Array.isArray(resp.solicitacoesPrivadas)) {
              setSolicitacoesPrivadas(resp.solicitacoesPrivadas);
            } else {
              setSolicitacoesPrivadas([]);
            }
          } catch {
            setSolicitacoesPrivadas([]);
          }
        }
      } catch (err: any) {
        setError(err.message || "Erro ao buscar corridas");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCorridas();
    // eslint-disable-next-line
  }, [isAuthenticated, user]);

  // Função para filtrar corridas ao buscar
  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    let filtradas = corridas.filter((corrida) => {
      // Só mostrar corridas com data futura e status diferente de FINALIZADA ou CANCELADA
      const dataSaida = new Date(corrida.dataHoraSaida || corrida.data);
      if (isNaN(dataSaida.getTime()) || dataSaida < new Date()) return false;
      if (corrida.status === 'FINALIZADA' || corrida.status === 'CANCELADA') return false;
      const condSaida = saida ? (corrida.origem || "").toLowerCase().includes(saida.toLowerCase()) : true;
      const condDestino = destino ? (corrida.destino || "").toLowerCase().includes(destino.toLowerCase()) : true;
      const condPassageiros = passageiros ? (corrida.vagas || corrida.numeroVagas || 0) >= passageiros : true;
      // Filtro de horários
      let condHorario = true;
      if (horarios.length > 0 && corrida.dataHoraSaida) {
        const hora = new Date(corrida.dataHoraSaida).getHours();
        condHorario = horarios.some((h) => {
          const [ini, fim] = h.split(" - ").map(str => str.trim());
          const [hIni, mIni] = ini.split(":").map(Number);
          const [hFim, mFim] = fim.split(":").map(Number);
          const minIni = hIni * 60 + (mIni || 0);
          const minFim = hFim * 60 + (mFim || 0);
          const minCorrida = hora * 60 + new Date(corrida.dataHoraSaida).getMinutes();
          return minCorrida >= minIni && minCorrida <= minFim;
        });
      }
      return condSaida && condDestino && condPassageiros && condHorario;
  });
    // Ordenação
    if (ordenarPor === "preco") {
      filtradas = filtradas.sort((a, b) => (a.preco || 0) - (b.preco || 0));
    } else if (ordenarPor === "avaliacao") {
      filtradas = filtradas.sort((a, b) => (b.motorista?.avaliacaoMedia || 0) - (a.motorista?.avaliacaoMedia || 0));
    } else if (ordenarPor === "viagens") {
      filtradas = filtradas.sort((a, b) => (b.motorista?.totalAvaliacoes || 0) - (a.motorista?.totalAvaliacoes || 0));
    } else if (ordenarPor === "data") {
      filtradas = filtradas.sort((a, b) => {
        const dataA = new Date(a.dataHoraSaida || a.data).getTime();
        const dataB = new Date(b.dataHoraSaida || b.data).getTime();
        return dataA - dataB;
      });
    }
    setCorridasFiltradas(filtradas);
  };

  return (
    <div className="min-h-screen bg-folha font-poppins p-6">
      <button
        className="mb-4 bg-green-400 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        onClick={() => navigate("/")}
      >
        Voltar para o início
      </button>
      {/* Seção de solicitações privadas para motoristas */}
      {isAuthenticated && user?.tipo === "motorista" && solicitacoesPrivadas.length > 0 && (
        <div className="max-w-7xl mx-auto mb-8">
          <h2 className="text-xl font-bold mb-2 text-blue-900">Solicitações de Corridas Privadas Recebidas</h2>
          <ul className="space-y-2">
            {solicitacoesPrivadas.map((sol: any) => (
              <li key={sol.id} className="bg-blue-50 border border-blue-200 rounded p-4">
                <div><strong>Origem:</strong> {sol.origem} | <strong>Destino:</strong> {sol.destino}</div>
                <div><strong>Passageiro:</strong> {sol.passageiro?.nome || sol.passageiro?.id}</div>
                <div><strong>Status:</strong> {sol.status}</div>
                <div><strong>Data:</strong> {sol.dataHoraSaida ? new Date(sol.dataHoraSaida).toLocaleString() : ""}</div>
                <div><strong>Nº Passageiros:</strong> {sol.numeroPassageiros}</div>
                <div><strong>Observações:</strong> {sol.observacoes || "-"}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Filtro principal no topo */}
      <form className="max-w-7xl mx-auto bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4 items-end" onSubmit={handleBuscar}>
        <div className="flex flex-col flex-1 min-w-[150px]">
          <label className="text-xs font-semibold mb-1" htmlFor="saida">
            Saída
          </label>
          <input
            id="saida"
            type="text"
            placeholder="Digite aqui..."
            value={saida}
            onChange={(e) => setSaida(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>

        <div className="flex flex-col flex-1 min-w-[150px]">
          <label className="text-xs font-semibold mb-1" htmlFor="destino">
            Destino final
          </label>
          <input
            id="destino"
            type="text"
            placeholder="Digite aqui..."
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>

        <div className="flex flex-col min-w-[140px]">
          <label className="text-xs font-semibold mb-1" htmlFor="data">
            Data
          </label>
          <input
            id="data"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>

        <div className="flex flex-col min-w-[100px]">
          <label className="text-xs font-semibold mb-1" htmlFor="passageiros">
            Passageiros
          </label>
          <input
            id="passageiros"
            type="number"
            min={1}
            value={passageiros}
            onChange={(e) => setPassageiros(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded text-sm text-center"
          />
        </div>

        <button
          type="submit"
          className="bg-[#648D6E] hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full transition-colors duration-300"
        >
          Buscar
        </button>
      </form>

      {/* Container principal dividido: filtro lateral e lista */}
      <div className="max-w-7xl mx-auto flex gap-6">
        {/* Filtros laterais */}
        <div className="flex flex-col gap-6 min-w-[280px]">
          {/* Ordenar por */}
          <div className="bg-white p-4 rounded shadow-sm text-sm">
            <div className="flex justify-between items-center mb-2">
              <strong>Ordenar por:</strong>
              <button
                className="text-red-500 text-xs"
                onClick={() => limparFiltro("ordenar")}
                type="button"
              >
                Limpar tudo
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {[
                { label: "Preço mais baixo", value: "preco" },
                { label: "Avaliação mais alta", value: "avaliacao" },
                { label: "Mais viagens realizadas", value: "viagens" },
                { label: "Data mais próxima", value: "data" },
              ].map(({ label, value }) => (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="ordenar"
                    checked={ordenarPor === value}
                    onChange={() => setOrdenarPor(value)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Preferências */}
          <div className="bg-white p-4 rounded shadow-sm text-sm">
            <div className="flex justify-between items-center mb-2">
              <strong>Preferências:</strong>
              <button
                className="text-red-500 text-xs"
                onClick={() => limparFiltro("preferencias")}
                type="button"
              >
                Limpar tudo
              </button>
            </div>

            <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
              {[
                "Permite pets",
                "Permite fumar",
                "Ambiente silencioso",
                "Ar-condicionado",
                "Conservativo",
                "Aceita crianças",
                "Aceita idosos",
                "Permite comer",
                "Acessível a PCD",
              ].map((pref) => (
                <label key={pref} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={preferencias.includes(pref)}
                    onChange={() => togglePreferencia(pref)}
                  />
                  {pref}
                </label>
              ))}
            </div>
          </div>

          {/* Horários */}
          <div className="bg-white p-4 rounded shadow-sm text-sm">
            <div className="flex justify-between items-center mb-2">
              <strong>Horários:</strong>
              <button
                className="text-red-500 text-xs"
                onClick={() => limparFiltro("horarios")}
                type="button"
              >
                Limpar tudo
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {[
                { label: "Até as 06:00", value: "00:00 - 06:00" },
                { label: "06:00 - 12:00", value: "06:00 - 12:00" },
                { label: "12:00 - 18:00", value: "12:00 - 18:00" },
                { label: "Após as 18:00", value: "18:00 - 23:59" },
              ].map(({ label, value }) => (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={horarios.includes(value)}
                    onChange={() => toggleHorario(value)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de corridas */}
        <div className="flex-1 flex flex-col gap-4">
          {isLoading && <p>Carregando...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {!isLoading && !error && corridasFiltradas.map((corrida) => (
            <div
              key={corrida.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* Foto e nome + avaliação */}
              <div className="flex items-center gap-3 flex-1 min-w-[180px]">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div>
                  <p className="font-semibold">{corrida.motorista?.nome || "Motorista"} <span title="Avaliação" className="ml-1 text-yellow-500">★</span></p>
                </div>
              </div>

              {/* Rota e vagas */}
              <div className="flex flex-col flex-1 min-w-[220px] text-sm text-gray-600">
                <p>
                  <strong>{corrida.origem}</strong> → <strong>{corrida.destino}</strong>
                </p>
                <p>{corrida.data || (corrida.dataHoraSaida ? new Date(corrida.dataHoraSaida).toLocaleDateString() : "")} {corrida.hora || (corrida.dataHoraSaida ? new Date(corrida.dataHoraSaida).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "")} &nbsp; {corrida.vagas || corrida.numeroVagas} vagas disponíveis</p>
              </div>

              {/* Preço */}
              <div className="text-xl font-bold flex-1 min-w-[100px] text-right">
                R$ {corrida.preco?.toFixed(2).replace(".", ",")}
              </div>

              {/* Botões */}
              <div className="flex gap-2 flex-wrap justify-end flex-1 min-w-[220px]">
                <button
                  className="bg-[#648D6E] hover:bg-green-700 text-white font-semibold px-4 py-1 rounded-full transition-colors duration-300 whitespace-nowrap"
                  onClick={() => handleVerDetalhes(corrida.id)}
                >
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}

          {!isLoading && !error && corridasFiltradas.length === 0 && (
            <p className="text-center text-white-500 mt-8">Nenhuma corrida encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filtros;
