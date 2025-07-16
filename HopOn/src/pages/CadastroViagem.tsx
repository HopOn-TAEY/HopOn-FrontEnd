import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { criarCorrida } from "../api/corridas";
import { listarVeiculos } from "../api/usuarios";
import { useAuth } from "../contexts/AuthContext";
import { getAuthToken } from "../api/config";
import "./../App.css";

interface ViagemFormInputs {
  veiculoId: string;
  origem: string;
  destino: string;
  preco: string;
  vagas: string;
  data: string;
  hora: string;
  observacoes?: string;
  tipo: "PRIVADA";
}

function CadastrarViagem() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [isLoadingVeiculos, setIsLoadingVeiculos] = useState(true);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Verificação adicional de segurança
  const hasToken = !!getAuthToken();

  // Verificação de segurança adicional
  useEffect(() => {
    if (!isAuthenticated && !hasToken) {
      navigate('/login');
      return;
    }

    if (user?.tipo !== 'motorista') {
      navigate('/');
      return;
    }
  }, [isAuthenticated, hasToken, user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ViagemFormInputs>();

  useEffect(() => {
    const carregarVeiculos = async () => {
      setIsLoadingVeiculos(true);
      try {
        const veiculosData = await listarVeiculos();
        setVeiculos(Array.isArray(veiculosData) ? veiculosData : []);
      } catch (error) {
        console.error('Erro ao carregar veículos:', error);
        setError('Erro ao carregar veículos. Verifique se você tem veículos cadastrados.');
        setVeiculos([]);
      } finally {
        setIsLoadingVeiculos(false);
      }
    };

    if (user?.tipo === 'motorista') {
      carregarVeiculos();
    } else {
      setIsLoadingVeiculos(false);
    }
  }, [user]);

  // Se não está autenticado ou não é motorista, não renderiza o formulário
      if (!isAuthenticated || !hasToken || user?.tipo !== 'motorista') {
    return (
      <div className="bg-folha flex justify-center p-6 font-poppins">
        <div className="m-auto bg-white rounded-md p-[1.5%] w-[45%] text-center">
          <h1 className="text-center text-4xl font-bold pt-[1%] mb-[2%] mt-5">
            Acesso Negado
          </h1>
          <p className="mb-4">Apenas motoristas logados podem criar corridas.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-folha text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  const onSubmit: SubmitHandler<ViagemFormInputs> = async (data) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Combinar data e hora
      const dataHora = new Date(`${data.data}T${data.hora}`);
      
      // Verificar se o veiculoId é válido
      if (!data.veiculoId || data.veiculoId.trim() === '') {
        setError('Selecione um veículo válido');
        setIsLoading(false);
        return;
      }

      const corridaData = {
        veiculoId: data.veiculoId,
        origem: data.origem,
        destino: data.destino,
        dataHoraSaida: dataHora.toISOString(),
        numeroVagas: parseInt(data.vagas),
        preco: parseFloat(data.preco),
        observacoes: data.observacoes,
        tipo: "PRIVADA" as "PRIVADA", // Corrige o tipo literal
      };
      console.log('Dados enviados para o backend:', corridaData);

      console.log('Veículo selecionado:', data.veiculoId);
      console.log('Dados da corrida a serem enviados:', corridaData);

      const result = await criarCorrida(corridaData);
      console.log('Corrida criada:', result);
      
      // Redirecionar para a página inicial
      navigate('/');
    } catch (error) {
      console.error('Erro detalhado:', error);
      setError(error instanceof Error ? error.message : 'Erro ao criar corrida');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="bg-folha flex justify-center p-6 font-poppins">
      <div className="m-auto bg-white rounded-md p-[1.5%] w-[45%]">
        <h1 className="text-center text-4xl font-bold pt-[1%] mb-[2%] mt-5">
          Cadastre sua viagem
        </h1>
        <h5 className="mb-[2%] text-center">
          Compartilhe sua rota com outros viajantes
        </h5>
        {error && (
          <div className="w-[80%] m-auto mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[80%] m-auto mb-[2%] mt-5">
            <label htmlFor="veiculoId" className="text-sm font-semibold">
              Veículo
            </label>
            <select
              id="veiculoId"
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={isLoadingVeiculos}
              {...register("veiculoId", { 
                required: "Selecione um veículo"
              })}
            >
              <option value="">
                {isLoadingVeiculos ? "Carregando veículos..." : "Selecione um veículo..."}
              </option>
              {Array.isArray(veiculos) && veiculos.length > 0 ? (
                veiculos.map((veiculo) => (
                  <option key={veiculo.id} value={veiculo.id}>
                    {veiculo.marca} {veiculo.modelo} - {veiculo.placa}
                  </option>
                ))
              ) : !isLoadingVeiculos ? (
                <option value="" disabled>
                  Nenhum veículo cadastrado
                </option>
              ) : null}
            </select>
            {errors.veiculoId && (
              <p className="text-red-600 text-sm mt-1">{errors.veiculoId.message}</p>
            )}
            {!isLoadingVeiculos && Array.isArray(veiculos) && veiculos.length === 0 && (
              <p className="text-blue-600 text-sm mt-1">
                Você precisa cadastrar um veículo primeiro.{' '}
                <button
                  type="button"
                  onClick={() => navigate('/cadastrar-veiculo')}
                  className="underline hover:no-underline text-blue-600"
                >
                  Cadastrar veículo
                </button>
              </p>
            )}
          </div>

          <div className="w-[80%] m-auto mb-[2%]">
            <label htmlFor="origem" className="text-sm font-semibold">
              Ponto de partida
            </label>
            <input
              id="origem"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Digite o ponto de partida..."
              {...register("origem", { required: "Campo obrigatório" })}
            />
            {errors.origem && (
              <p className="text-red-600 text-sm mt-1">{errors.origem.message}</p>
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

            <div className="w-[40%] m-auto">
              <label htmlFor="preco" className="text-sm font-semibold">
                Preço
              </label>
              <input
                id="preco"
                type="number"
                step="0.01"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Digite o preço..."
                {...register("preco", { required: "Campo obrigatório" })}
              />
              {errors.preco && (
                <p className="text-red-600 text-sm mt-1">{errors.preco.message}</p>
              )}
            </div>

            <div className="w-[20%]">
              <label htmlFor="vagas" className="text-sm font-semibold">
                Vagas
              </label>
              <select
                id="vagas"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("vagas", { required: "Campo obrigatório" })}
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
              value={isLoading ? "Cadastrando..." : "Cadastrar"}
              disabled={isLoading}
              className="w-[30%] bg-folha place-content-center text-white p-2 rounded-md cursor-pointer hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </form>

        <div className="text-center mb-1">
          <a href="#" className="text-sm text-red-800 hover:underline">
            Cancelar
          </a>
        </div>
      </div>
    </div>
  );
}

export default CadastrarViagem;
