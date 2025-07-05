import "./../App.css";

function Solicitar() {
  return (
    <div className="w-screen h-screen bg-folha flex justify-center p-6 font-poppins">
      <div className="m-auto bg-white rounded-md mt-[3%] p-[1.5%] w-[45%]">
        <h1 className="text-center text-4xl font-bold pt-[1%] mb-[2%] mt-5">
          Solicite sua viagem
        </h1>
        <h5 className="mb-[2%] text-center">
          Viage com mais privacidade e segurança
        </h5>
        <form action="X" method="post">
          <div className="w-[80%] m-auto mb-[2%] mt-5">
            <label htmlFor="pontoPartida" className="text-sm font-semibold">
              Ponto de partida
            </label>
            <input
              id="pontoPartida"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Digite o ponto de partida..."
              required
            />
          </div>

          <div className="w-[80%] m-auto mb-[2%]">
            <label htmlFor="destino" className="text-sm font-semibold">
              Destino final
            </label>
            <input
              id="destino"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Digite o seu destino final..."
              required
            />
          </div>

          <div className="w-[80%] m-auto mb-[2%]">
            <label htmlFor="data" className="text-sm font-semibold">
              Data da Viagem
            </label>
            <input
              id="data"
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="w-[80%] m-auto mb-[2%]">
            <label htmlFor="hora" className="text-sm font-semibold">
              Horário de partida
            </label>
            <input
              id="hora"
              type="time"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="w-[80%] m-auto mb-[2%]">
            <label htmlFor="observacoes" className="text-sm font-semibold">
              Observações
            </label>
            <textarea
              id="observacoes"
              className="w-full h-10 p-2 border border-gray-300 rounded-md"
              placeholder="Digite suas observações..."
              rows={4}
            ></textarea>
          </div>

          <div className="justify-center flex items-center mb-5">
            <input
              type="submit"
              value={"Solicitar"}
              className="w-[30%] bg-folha place-content-center text-white p-2 rounded-md cursor-pointer hover:bg-green-700 transition-colors duration-300"
            />
          </div>
        </form>
        <div className="text-center mb-5">
          <a href="#" className="text-sm text-red-800 hover:underline">
            Cancelar
          </a>
        </div>
      </div>
    </div>
  );
}

export default Solicitar;
