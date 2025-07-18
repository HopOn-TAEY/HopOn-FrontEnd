import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listarMotoristas } from "../api/usuarios";
import { useAuth } from "../contexts/AuthContext";
import "./../App.css";

interface Motorista {
  id: string;
  perfilMotoristaId: string; // <-- Adiciona o campo
  nome: string;
  email: string;
  nasc?: string;
  dataNasc?: string;
  telefone: string;
  tipo?: 'motorista';
  tipoUsuario?: 'motorista';
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
}

function Motoristas() {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [termoBusca, setTermoBusca] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const carregarMotoristas = async () => {
      try {
        const motoristasData = await listarMotoristas();
        console.log('Dados dos motoristas recebidos:', motoristasData);
        console.log('Tipo dos dados:', typeof motoristasData);
        console.log('É array?', Array.isArray(motoristasData));
        
        // Garantir que temos um array válido
        if (Array.isArray(motoristasData)) {
          setMotoristas(motoristasData);
        } else if (motoristasData && typeof motoristasData === 'object') {
          // Se não é array, tentar extrair de propriedades comuns
          const motoristasArray = (motoristasData as any).motoristas || (motoristasData as any).data || (motoristasData as any).users || [];
          console.log('Motoristas extraídos:', motoristasArray);
          setMotoristas(motoristasArray);
        } else {
          console.error('Formato de dados inesperado:', motoristasData);
          setMotoristas([]);
        }
      } catch (error) {
        console.error('Erro ao carregar motoristas:', error);
        setError('Erro ao carregar lista de motoristas.');
      } finally {
        setIsLoading(false);
      }
    };

    carregarMotoristas();
  }, []);

  const formatarData = (dataString: string | undefined) => {
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

  const handleVerPerfil = (motoristaId: string) => {
    navigate(`/perfil-motorista/${motoristaId}`);
  };

  const handleSolicitarCorrida = (usuarioId: string) => {
    if (!isAuthenticated) {
      alert("Você precisa estar logado para solicitar uma corrida privada.");
      navigate('/login');
      return;
    }
    navigate(`/solicitar-corrida/${usuarioId}`);
  };

  const motoristasFiltrados = motoristas.filter(m => m.nome.toLowerCase().includes(termoBusca.toLowerCase()));

  if (isLoading) {
    return (
      <div className="bg-folha flex justify-center p-6 font-poppins min-h-screen">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-folha flex justify-center p-6 font-poppins min-h-screen">
      <div className="m-auto bg-white rounded-md p-[1.5%] w-[80%] max-w-6xl">
        <h1 className="text-center text-4xl font-bold pt-[1%] mb-[2%] mt-10">
          Motoristas Disponíveis
        </h1>
        <h5 className="mb-[3%] text-center text-gray-600">
          Encontre motoristas para suas viagens
        </h5>

        <div className="flex justify-center mb-6">
          <form className="flex w-full max-w-md gap-2" onSubmit={e => { e.preventDefault(); setTermoBusca(busca); }}>
            <input
              type="text"
              placeholder="Pesquisar por nome do motorista..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#648D6E] text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Buscar
            </button>
          </form>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {motoristasFiltrados.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">Nenhum motorista encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {motoristasFiltrados.map((motorista) => (
              <div key={motorista.id} className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-xl font-bold">
                      {motorista.nome.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{motorista.nome}</h3>
                  <p className="text-gray-600 text-sm">{motorista.email}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Telefone:</span>
                    <span className="text-sm text-gray-800">{formatarTelefone(motorista.telefone)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Data Nasc.:</span>
                    <span className="text-sm text-gray-800">{formatarData(motorista.nasc || motorista.dataNasc)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">CNH:</span>
                    <span className="text-sm text-gray-800">{motorista.cnh || 'Não informada'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Corridas Privadas:</span>
                    <span className="text-sm text-green-600">
                      Sim
                    </span>
                  </div>
                  {motorista.veiculos && motorista.veiculos.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Veículos:</span>
                      <span className="text-sm text-gray-800">{motorista.veiculos.length}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleVerPerfil(motorista.id)}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Ver Perfil Completo
                  </button>
                  <button
                    onClick={() => handleSolicitarCorrida(motorista.id)}
                    className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  >
                    Solicitar Corrida Privada
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition-colors"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
}

export default Motoristas; 