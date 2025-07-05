function Pesquisar() {
  return (
    <div className="flex justify-center items-start p-5 font-poppins">
      <div className="bg-white rounded-lg w-full max-w-7xl mt-5 shadow-md p-4">
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
    </div>
  );
}

export default Pesquisar;
