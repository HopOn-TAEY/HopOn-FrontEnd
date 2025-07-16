// Este componente espera receber o perfilMotoristaId na URL (não mais o id do usuário)
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { getPerfil, buscarVeiculosMotorista } from "../api/usuarios";
import { enviarPropostaParaMotorista } from "../api/usuarios";
import { useAuth } from "../contexts/AuthContext";
import "./../App.css";

interface Motorista {
  id: string;
  nome: string;
  email: string;
  nasc: string;
  telefone: string;
  tipo: 'motorista';
  cnh?: string;
  corridasPrivadas?: boolean;
  veiculos?: Array<{
    id: string;
    modelo: string;
    marca: string;
    ano: number;
    placa: string;
    cor: string;
    capacidade: number;
  }>;
  perfilMotorista?: {
    id: string;
    veiculos: Array<{
      id: string;
      modelo: string;
      marca: string;
      ano: number;
      placa: string;
      cor: string;
      capacidade: number;
    }>;
  };
}

interface FormData {
  veiculoId: string;
  origem: string;
  destino: string;
  data: string;
  hora: string;
  passageiros: number;
  observacoes: string;
}

function SolicitarCorrida() {
  const { id } = useParams<{ id: string }>();
  const [motorista, setMotorista] = useState<Motorista | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    console.log('ID recebido do useParams:', id);
    if (!id) {
      alert('ID do motorista não encontrado na URL!');
      setError('ID do motorista não fornecido');
      setIsLoading(false);
      return;
    }

    const carregarMotorista = async () => {
      try {
        console.log('Buscando perfil do motorista com ID:', id);
        // Buscar perfil do motorista
        const res = await getPerfil(id);
        console.log('Resposta da API getPerfil:', res);
        
        const perfil = (res as any).perfil || res;
        console.log('Perfil extraído:', perfil);
        
        const nome = perfil.nome;
        const veiculos = perfil.perfilMotorista?.veiculos || [];
        console.log('Veículos encontrados:', veiculos);
        
        setMotorista({ ...perfil, nome, veiculos });
      } catch (error) {
        console.error('Erro ao carregar dados do motorista:', error);
        setError('Erro ao carregar dados do motorista.');
      } finally {
        setIsLoading(false);
      }
    };

    carregarMotorista();
  }, [id]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!isAuthenticated) {
      alert("Você precisa estar logado para solicitar uma corrida.");
      navigate('/login');
      return;
    }

    // Verificar se o token está presente
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("Token de autenticação não encontrado. Por favor, faça login novamente.");
      navigate('/login');
      return;
    }

    // Verificar se o perfilMotorista existe
    if (!motorista?.perfilMotorista?.id) {
      alert("Não foi possível identificar o perfil do motorista. Tente novamente.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Combinar data e hora para dataHoraSaida
      const dataHoraSaida = new Date(`${data.data}T${data.hora}`).toISOString();

      // Enviar proposta para o perfil do motorista
      await enviarPropostaParaMotorista({
        motoristaId: motorista.perfilMotorista.id, // <-- usa o id do perfil do motorista
        veiculoId: data.veiculoId,
        origem: data.origem,
        destino: data.destino,
        dataHoraSaida: dataHoraSaida,
        numeroVagas: Number(data.passageiros),
        observacoes: data.observacoes,
      });

      alert('Solicitação de corrida enviada com sucesso! O motorista será notificado.');
      navigate('/motoristas');
    } catch (error) {
      console.error('Erro ao enviar solicitação de corrida:', error);
      setError(error instanceof Error ? error.message : String(error));
      alert('Erro ao enviar solicitação de corrida: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-folha flex justify-center p-6 font-poppins min-h-screen">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (error || !motorista) {
    return (
      <div className="bg-folha flex justify-center p-6 font-poppins min-h-screen">
        <div className="m-auto bg-white rounded-md p-[1.5%] w-[50%] text-center">
          <h1 className="text-center text-4xl font-bold pt-[1%] mb-[2%] mt-5">
            Erro
          </h1>
          <p className="mb-4 text-gray-600">{error || 'Motorista não encontrado'}</p>
          <button
            onClick={() => navigate('/motoristas')}
            className="bg-folha text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Voltar aos Motoristas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-folha flex justify-center p-6 font-poppins min-h-screen">
      <div className="m-auto bg-white rounded-md p-[1.5%] w-[60%] max-w-4xl">
        <h1 className="text-center text-4xl font-bold pt-[1%] mb-[2%] mt-10">
          Solicitar Corrida Privada
        </h1>
        <h5 className="mb-[3%] text-center text-gray-600">
          Motorista: {motorista.nome ? motorista.nome : <span className="text-red-500">Não encontrado</span>}
        </h5>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] m-auto">
          {/* Seleção de Veículo */}
          <div className="mb-6">
            <label htmlFor="veiculoId" className="text-sm font-semibold">
              Veículo *
            </label>
            {motorista.veiculos && motorista.veiculos.length > 0 ? (
              <select
                id="veiculoId"
                {...register("veiculoId", { required: "Seleção de veículo é obrigatória" })}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Selecione um veículo...</option>
                {motorista.veiculos.map((veiculo) => (
                  <option key={veiculo.id} value={veiculo.id}>
                    {veiculo.marca} {veiculo.modelo} ({veiculo.placa}) - Capacidade: {veiculo.capacidade} pessoas
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-red-500 mt-2">Nenhum veículo cadastrado para este motorista.</div>
            )}
            {errors.veiculoId && (
              <p className="text-red-600 text-sm mt-1">{errors.veiculoId.message}</p>
            )}
          </div>

          {/* Origem e Destino */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="origem" className="text-sm font-semibold">
                  Origem *
                </label>
                <input
                  id="origem"
                  {...register("origem", { required: "Origem é obrigatória" })}
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Digite o endereço de origem..."
                />
                {errors.origem && (
                  <p className="text-red-600 text-sm mt-1">{errors.origem.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="destino" className="text-sm font-semibold">
                  Destino *
                </label>
                <input
                  id="destino"
                  {...register("destino", { required: "Destino é obrigatório" })}
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Digite o endereço de destino..."
                />
                {errors.destino && (
                  <p className="text-red-600 text-sm mt-1">{errors.destino.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Data e Hora */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="data" className="text-sm font-semibold">
                  Data *
                </label>
                <input
                  id="data"
                  {...register("data", { required: "Data é obrigatória" })}
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                {errors.data && (
                  <p className="text-red-600 text-sm mt-1">{errors.data.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="hora" className="text-sm font-semibold">
                  Hora *
                </label>
                <input
                  id="hora"
                  {...register("hora", { required: "Hora é obrigatória" })}
                  type="time"
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                {errors.hora && (
                  <p className="text-red-600 text-sm mt-1">{errors.hora.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Número de Passageiros */}
          <div className="mb-6">
            <label htmlFor="passageiros" className="text-sm font-semibold">
              Número de Passageiros *
            </label>
            <select
              id="passageiros"
              {...register("passageiros", { required: "Número de passageiros é obrigatório" })}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="">Selecione...</option>
              <option value="1">1 passageiro</option>
              <option value="2">2 passageiros</option>
              <option value="3">3 passageiros</option>
              <option value="4">4 passageiros</option>
              <option value="5">5 passageiros</option>
              <option value="6">6 passageiros</option>
            </select>
            {errors.passageiros && (
              <p className="text-red-600 text-sm mt-1">{errors.passageiros.message}</p>
            )}
          </div>

          {/* Observações */}
          <div className="mb-6">
            <label htmlFor="observacoes" className="text-sm font-semibold">
              Observações
            </label>
            <textarea
              id="observacoes"
              {...register("observacoes")}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Informações adicionais sobre a viagem..."
            />
          </div>

          {/* Botões */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/perfil-motorista/${id}`)}
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors"
            >
              Voltar ao Perfil
            </button>
            <button
              type="button"
              onClick={() => navigate('/motoristas')}
              className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition-colors"
            >
              Voltar aos Motoristas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SolicitarCorrida; 