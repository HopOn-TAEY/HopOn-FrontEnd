import React, { useState } from "react";

function FiltroCorridas() {
  const [saida, setSaida] = useState("");
  const [destino, setDestino] = useState("");
  const [data, setData] = useState("");
  const [passageiros, setPassageiros] = useState(1);

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ saida, destino, data, passageiros });
  };

  return (
    <form
      onSubmit={handleBuscar}
      className="max-w-5xl mx-auto bg-white rounded-lg shadow p-4 font-poppins mt-8"
    >
      <div className="flex flex-wrap gap-4 items-end">
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

        <div>
          <button
            type="submit"
            className="bg-[#648D6E] hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full transition-colors duration-300"
          >
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
}

export default FiltroCorridas;
