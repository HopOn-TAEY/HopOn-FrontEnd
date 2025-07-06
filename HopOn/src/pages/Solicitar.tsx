import { useForm, SubmitHandler } from "react-hook-form";
import "./../App.css";

interface SolicitarFormInputs {
  pontoPartida: string;
  destino: string;
  data: string;
  hora: string;
  tipoveiculo: string;
  vagas: number;
  observacoes?: string;
}

function Solicitar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SolicitarFormInputs>();

  const onSubmit: SubmitHandler<SolicitarFormInputs> = (data) => {
    console.log("Viagem solicitada:", data);
    // Aqui você pode enviar os dados para o backend
  };

  return (
    <div className="min-h-screen bg-folha flex justify-center p-6 font-poppins">
      <div className="m-auto bg-white rounded-md p-[1.5%] w-[45%]">
        <h1 className="text-center text-4xl font-bold pt-[1%] mb-[2%] mt-5">
          Solicite sua viagem
        </h1>
        <h5 className="mb-[2%] text-center">
          Viage com mais privacidade e segurança
        </h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[80%] m-auto mb-[2%] mt-5">
            <label htmlFor="pontoPartida" className="text-sm font-semibold">
              Ponto de partida
            </label>
            <input
              id="pontoPartida"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Digite o ponto de partida..."
              {...register("pontoPartida", { required: "Campo obrigatório" })}
            />
            {errors.pontoPartida && (
              <p className="text-red-600 text-sm mt-1">{errors.pontoPartida.message}</p>
            )}
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
              {...register("destino", { required: "Campo obrigatório" })}
            />
            {errors.destino && (
              <p className="text-red-600 text-sm mt-1">{errors.destino.message}</p>
            )}
          </div>

          <div className="w-[80%] m-auto mb-[2%] flex justify-between items-center gap-x-6">
            <div className="w-full">
              <label htmlFor="data" className="text-sm font-semibold">
                Data da Viagem
              </label>
              <input
                id="data"
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("data", { required: "Campo obrigatório" })}
              />
              {errors.data && (
                <p className="text-red-600 text-sm mt-1">{errors.data.message}</p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="hora" className="text-sm font-semibold">
                Horário de partida
              </label>
              <input
                id="hora"
                type="time"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("hora", { required: "Campo obrigatório" })}
              />
              {errors.hora && (
                <p className="text-red-600 text-sm mt-1">{errors.hora.message}</p>
              )}
            </div>
          </div>

          <div className="w-[80%] m-auto mb-[2%] flex justify-between items-center gap-x-6">
            <div className="w-[80%] m-auto">
              <label htmlFor="tipoveiculo" className="text-sm font-semibold">
                Tipo de veículo
              </label>
              <select
                id="tipoveiculo"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                {...register("tipoveiculo", { required: "Selecione um tipo de veículo" })}
              >
                <option value="">...</option>
                <option value="carro">Carro</option>
                <option value="moto">Moto</option>
                <option value="onibus">Ônibus</option>
                <option value="bicicleta">Bicicleta</option>
              </select>
              {errors.tipoveiculo && (
                <p className="text-red-600 text-sm mt-1">{errors.tipoveiculo.message}</p>
              )}
            </div>

            <div className="w-[20%]">
              <label htmlFor="vagas" className="text-sm font-semibold">
                Vagas
              </label>
              <select
                id="vagas"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("vagas", { required: "Informe o número de vagas" })}
              >
                <option value="">...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {errors.vagas && (
                <p className="text-red-600 text-sm mt-1">{errors.vagas.message}</p>
              )}
            </div>
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
              {...register("observacoes")}
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

        <div className="text-center">
          <a href="#" className="text-sm text-red-800 hover:underline">
            Cancelar
          </a>
        </div>
      </div>
    </div>
  );
}

export default Solicitar;
