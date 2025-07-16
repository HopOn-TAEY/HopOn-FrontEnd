import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPerfil } from "../api/usuarios";
import { listarVeiculos, buscarVeiculosMotorista } from "../api/usuarios";
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
  perfilMotorista?: {
    cnh?: string;
    corridasPrivadas?: boolean;
  };
  dataNasc?: string; // Adicionado para suportar a nova lógica
}

interface Veiculo {
  id: string;
  modelo: string;
  marca: string;
  ano: number;
  placa: string;
  cor: string;
  capacidade: number;
  suporteCriancas: boolean;
  suporteDeficientes: boolean;
  imagemPrincipal?: string;
  imagens?: Array<{
    id: string;
    url: string;
    tipo: string;
    ordem: number;
  }>;
}

function PerfilMotorista() {
  const { id } = useParams<{ id: string }>();
  const [motorista, setMotorista] = useState<Motorista | null>(null);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const carregarDados = async () => {
      if (!id) {
        setError('ID do motorista não fornecido');
        setIsLoading(false);
        return;
      }

      try {
        // Carregar dados do motorista
        const res = await getPerfil(id);
        console.log('Dados do motorista carregados:', res);
        const perfil = (res as any).perfil || res;
        setMotorista(perfil);

        // Tentar carregar veículos (pode falhar se não for o próprio motorista)
        try {
          let veiculosData = [];
          if (user && user.id === id) {
            veiculosData = await listarVeiculos();
          } else {
            veiculosData = await buscarVeiculosMotorista(id);
          }
          setVeiculos(veiculosData);
        } catch (veiculosError) {
          console.log('Não foi possível carregar veículos:', veiculosError);
          // Não é um erro crítico, apenas não mostra os veículos
        }
      } catch (error) {
        console.error('Erro ao carregar dados do motorista:', error);
        setError('Erro ao carregar dados do motorista.');
      } finally {
        setIsLoading(false);
      }
    };

    carregarDados();
  }, [id]);

  const formatarData = (dataString: string) => {
    if (!dataString) return '-';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  const formatarTelefone = (telefone: string) => {
    if (!telefone) return '-';
    const numeros = telefone.replace(/\D/g, '');
    if (numeros.length === 11) {
      return `(${numeros.slice(0,2)}) ${numeros.slice(2,7)}-${numeros.slice(7)}`;
    }
    return telefone;
  };

  const handleSolicitarCorrida = () => {
    if (!id) return;
    navigate(`/solicitar-corrida/${id}`);
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
            Motorista não encontrado
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
      <div className="m-auto bg-white rounded-md p-[1.5%] w-[70%] max-w-5xl">
        <h1 className="text-center text-4xl font-bold pt-[1%] mb-[2%] mt-10">
          Perfil do Motorista
        </h1>

        <div className="w-[90%] m-auto space-y-6">
          {/* Cabeçalho do Motorista */}
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-3xl font-bold">
                {motorista?.nome?.charAt(0)?.toUpperCase() || "?"}
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{motorista?.nome || "Nome não informado"}</h2>
            <p className="text-gray-600">{motorista?.email || "E-mail não informado"}</p>
            <div className="mt-4">
              <span className="px-4 py-2 rounded-full text-white font-semibold bg-green-500">
                Aceita Corridas Privadas
              </span>
            </div>
          </div>

          {/* Informações Pessoais */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Informações Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Nome Completo</label>
                <p className="p-3 border border-gray-300 rounded-md bg-white">
                  {motorista?.nome || "Nome não informado"}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">E-mail</label>
                <p className="p-3 border border-gray-300 rounded-md bg-white">
                  {motorista?.email || "E-mail não informado"}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Data de Nascimento</label>
                <p className="p-3 border border-gray-300 rounded-md bg-white">
                  {motorista?.nasc
                    ? formatarData(motorista.nasc)
                    : motorista?.dataNasc
                      ? formatarData(motorista.dataNasc)
                      : "Data não informada"}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Telefone</label>
                <p className="p-3 border border-gray-300 rounded-md bg-white">
                  {motorista?.telefone ? formatarTelefone(motorista.telefone) : "Telefone não informado"}
                </p>
              </div>
            </div>
          </div>

          {/* Informações de Motorista */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Informações de Motorista</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">CNH</label>
                <p className="p-3 border border-gray-300 rounded-md bg-white">
                  {motorista?.perfilMotorista?.cnh || 'Não informada'}
                </p>
              </div>
            </div>
          </div>

          {/* Veículos */}
          {veiculos.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Veículos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {veiculos.map((veiculo) => (
                  <div key={veiculo.id} className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {veiculo.marca} {veiculo.modelo}
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Ano:</span> {veiculo.ano}</p>
                      <p><span className="font-medium">Placa:</span> {veiculo.placa}</p>
                      <p><span className="font-medium">Cor:</span> {veiculo.cor}</p>
                      <p><span className="font-medium">Capacidade:</span> {veiculo.capacidade} pessoas</p>
                      <p><span className="font-medium">Suporte Crianças:</span> {veiculo.suporteCriancas ? 'Sim' : 'Não'}</p>
                      <p><span className="font-medium">Suporte Deficientes:</span> {veiculo.suporteDeficientes ? 'Sim' : 'Não'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleSolicitarCorrida}
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-colors"
            >
              Solicitar Corrida Privada
            </button>
            <button
              onClick={() => navigate('/motoristas')}
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors"
            >
              Voltar aos Motoristas
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition-colors"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilMotorista; 