import { useState } from "react";

interface Corrida {
  id: number;
  motorista: string;
  avaliacao: number;
  saida: string;
  destino: string;
  horario: string;
  vagas: number;
  preco: number;
}

const corridasExemplo: Corrida[] = [
  {
    id: 1,
    motorista: "Eric",
    avaliacao: 4.8,
    saida: "Fortaleza",
    destino: "Itapajé",
    horario: "08:30",
    vagas: 2,
    preco: 25,
  },
  // Pode adicionar mais objetos de corrida aqui...
];

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

  // Exemplo simples de filtro aplicado nas corridas
  const corridasFiltradas = corridasExemplo.filter((corrida) => {
    // Filtro básico por saída e destino (string contém)
    const condSaida = saida
      ? corrida.saida.toLowerCase().includes(saida.toLowerCase())
      : true;
    const condDestino = destino
      ? corrida.destino.toLowerCase().includes(destino.toLowerCase())
      : true;

    // Aqui você pode adicionar filtros por preferências, horários etc.

    return condSaida && condDestino;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-poppins p-6">
      {/* Filtro principal no topo */}
      <form className="max-w-7xl mx-auto bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4 items-end">
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
          onClick={(e) => e.preventDefault()}
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
                { label: "Saída mais próxima", value: "saida" },
                { label: "Destino mais próximo", value: "destino" },
                { label: "Avaliação mais alta", value: "avaliacao" },
                { label: "Mais viagens realizadas", value: "viagens" },
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
          {corridasFiltradas.map((corrida) => (
            <div
              key={corrida.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* Foto e nome + avaliação */}
              <div className="flex items-center gap-3 flex-1 min-w-[180px]">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div>
                  <p className="font-semibold">{corrida.motorista} <span title="Avaliação" className="ml-1 text-yellow-500">★</span> {corrida.avaliacao}</p>
                </div>
              </div>

              {/* Rota e vagas */}
              <div className="flex flex-col flex-1 min-w-[220px] text-sm text-gray-600">
                <p>
                  <strong>{corrida.saida}</strong> {"→"} <strong>{corrida.destino}</strong>
                </p>
                <p>{corrida.horario} &nbsp; {corrida.vagas} vagas disponíveis</p>
              </div>

              {/* Preço */}
              <div className="text-xl font-bold flex-1 min-w-[100px] text-right">
                R$ {corrida.preco.toFixed(2).replace(".", ",")}
              </div>

              {/* Botões */}
              <div className="flex gap-2 flex-wrap justify-end flex-1 min-w-[220px]">
                <button className="bg-[#648D6E] hover:bg-green-700 text-white font-semibold px-4 py-1 rounded-full transition-colors duration-300 whitespace-nowrap">
                  Solicitar vaga
                </button>
                <button className="bg-[#648D6E] hover:bg-green-700 text-white font-semibold px-4 py-1 rounded-full transition-colors duration-300 whitespace-nowrap">
                  Ver perfil
                </button>
                <button className="bg-[#648D6E] hover:bg-green-700 text-white font-semibold px-4 py-1 rounded-full transition-colors duration-300 whitespace-nowrap">
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}

          {corridasFiltradas.length === 0 && (
            <p className="text-center text-gray-500 mt-8">Nenhuma corrida encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filtros;
