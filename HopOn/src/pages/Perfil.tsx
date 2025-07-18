import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { getPerfilCompleto, getPerfil, deletarUsuario } from "../api/usuarios";
import "./../App.css";

interface UsuarioCompleto {
  id: string;
  nome: string;
  email: string;
  nasc: string;
  telefone: string;
  tipo: 'passageiro' | 'motorista';
  cnh?: string;
  corridasPrivadas?: boolean;
  dataNascimento?: string;
  dataNasc?: string;
  perfilMotorista?: {
    cnh: string;
    avaliacaoMedia?: number;
    totalAvaliacoes?: number;
    veiculos: { id: string; marca: string; modelo: string; placa: string }[];
  };
  perfilPassageiro?: {
    ultimasReservas: { id: string; status: string; numeroAssentos: number; corrida: { origem: string; destino: string } }[];
  };
  criadoEm?: string;
  atualizadoEm?: string;
  idade?: number;
  tempoMembro?: number;
  estatisticas?: {
    totalReservas: number;
    totalAvaliacoesFeitas: number;
    totalAvaliacoesRecebidas: number;
  };
}

function Perfil() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [perfilCompleto, setPerfilCompleto] = useState<UsuarioCompleto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // LOGS DE DEPURAÇÃO
  console.log('perfilCompleto:', perfilCompleto);
  console.log('user do contexto:', user);

  useEffect(() => {
    const carregarPerfilCompleto = async () => {
      if (!isAuthenticated || !user) {
        setIsLoading(false);
        return;
      }
      try {
        let perfil;
        if (!id || id === user.id) {
          perfil = await getPerfilCompleto();
        } else {
          perfil = await getPerfil(id);
        }
        setPerfilCompleto(perfil);
      } catch (error) {
        console.error('Erro ao carregar perfil completo:', error);
        setError('Erro ao carregar informações completas do perfil.');
      } finally {
        setIsLoading(false);
      }
    };
    carregarPerfilCompleto();
  }, [isAuthenticated, user, id]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteProfile = async () => {
    if (!user) return;
    if (!window.confirm("Tem certeza que deseja deletar seu perfil? Esta ação não poderá ser desfeita!")) return;
    try {
      await deletarUsuario(user.id);
      alert("Perfil deletado com sucesso!");
      logout();
      navigate("/");
    } catch (error) {
      alert("Erro ao deletar perfil: " + (error instanceof Error ? error.message : String(error)));
    }
  };

  const formatarData = (dataString: string) => {
    if (!dataString) return '-';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  const formatarTelefone = (telefone: string) => {
    if (!telefone) return '-';
    // Remove caracteres não numéricos
    const numeros = telefone.replace(/\D/g, '');
    // Formata como (XX) XXXXX-XXXX
    if (numeros.length === 11) {
      return `(${numeros.slice(0,2)}) ${numeros.slice(2,7)}-${numeros.slice(7)}`;
    }
    return telefone;
  };

  if (!user && !perfilCompleto) {
    return (
      <div className="bg-folha flex justify-center p-6 font-poppins min-h-screen">
        <div className="m-auto bg-white rounded-md p-[1.5%] w-[50%] text-center">
          <h1 className="text-center text-4xl font-bold pt-[1%] mb-[2%] mt-5">
            Usuário não encontrado
          </h1>
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
      <div className="m-auto bg-white rounded-md p-[1.5%] w-[60%] max-w-4xl">
        <h1 className="text-center text-4xl font-bold pt-[1%] mb-[2%] mt-10">
          Perfil
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="w-[90%] m-auto space-y-6">
          {/* Informações Básicas */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Informações Pessoais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Nome Completo</label>
                <p className="p-3 border border-gray-300 rounded-md bg-white">
                  {perfilCompleto?.nome || user?.nome}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">E-mail</label>
                <p className="p-3 border border-gray-300 rounded-md bg-white">
                  {perfilCompleto?.email || user?.email}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Data de Nascimento</label>
                <p className="p-3 border border-gray-300 rounded-md bg-white">
                  {formatarData(perfilCompleto?.dataNascimento || perfilCompleto?.dataNasc || perfilCompleto?.nasc || '')}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Telefone</label>
                <p className="p-3 border border-gray-300 rounded-md bg-white">
                  {formatarTelefone(perfilCompleto?.telefone || user?.telefone || '')}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Criado em</label>
                <p className="p-3 border border-gray-300 rounded-md bg-white">
                  {formatarData(perfilCompleto?.criadoEm || '')}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Atualizado em</label>
                <p className="p-3 border border-gray-300 rounded-md bg-white">
                  {formatarData(perfilCompleto?.atualizadoEm || '')}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Idade</label>
                <p className="p-3 border border-gray-300 rounded-md bg-white">
                  {perfilCompleto?.idade || '-'}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Tempo como Membro (dias)</label>
                <p className="p-3 border border-gray-300 rounded-md bg-white">
                  {perfilCompleto?.tempoMembro || '-'}
                </p>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          {perfilCompleto?.estatisticas && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Estatísticas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Total de Reservas</label>
                  <p className="p-3 border border-gray-300 rounded-md bg-white">
                    {perfilCompleto.estatisticas.totalReservas}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Avaliações Feitas</label>
                  <p className="p-3 border border-gray-300 rounded-md bg-white">
                    {perfilCompleto.estatisticas.totalAvaliacoesFeitas}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Avaliações Recebidas</label>
                  <p className="p-3 border border-gray-300 rounded-md bg-white">
                    {perfilCompleto.estatisticas.totalAvaliacoesRecebidas}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tipo de Usuário */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Tipo de Conta</h2>
            <div className="flex items-center">
              <span className={`px-4 py-2 rounded-full text-white font-semibold ${
                perfilCompleto?.tipo?.toLowerCase() === 'motorista' ? 'bg-blue-500' : 'bg-green-500'
              }`}>
                {perfilCompleto?.tipo?.toLowerCase() === 'motorista' ? 'Motorista' : 'Passageiro'}
              </span>
            </div>
          </div>

          {/* Informações Específicas do Motorista */}
          {perfilCompleto?.tipo?.toLowerCase() === 'motorista' && perfilCompleto.perfilMotorista && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Informações de Motorista</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">CNH</label>
                  <p className="p-3 border border-gray-300 rounded-md bg-white">
                    {perfilCompleto.perfilMotorista.cnh || 'Não informada'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Total de Veículos</label>
                  <p className="p-3 border border-gray-300 rounded-md bg-white">
                    {perfilCompleto.perfilMotorista.veiculos ? perfilCompleto.perfilMotorista.veiculos.length : 0}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Avaliação Média</label>
                  <p className="p-3 border border-gray-300 rounded-md bg-white">
                    {perfilCompleto.perfilMotorista.avaliacaoMedia !== undefined && perfilCompleto.perfilMotorista.avaliacaoMedia !== null
                      ? `${perfilCompleto.perfilMotorista.avaliacaoMedia.toFixed(1)} ⭐ (${perfilCompleto.perfilMotorista.totalAvaliacoes || 0} avaliações)`
                      : 'Nenhuma avaliação ainda'
                    }
                  </p>
                </div>
              </div>
              {/* Exemplo de exibição de veículos */}
              {perfilCompleto.perfilMotorista.veiculos && perfilCompleto.perfilMotorista.veiculos.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Veículos</h3>
                  <ul>
                    {perfilCompleto.perfilMotorista.veiculos.map((v: any) => (
                      <li key={v.id} className="mb-1">{v.marca} {v.modelo} - Placa: {v.placa}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Informações Específicas do Passageiro */}
          {perfilCompleto?.tipo?.toLowerCase() === 'passageiro' && perfilCompleto.perfilPassageiro && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Reservas Recentes</h2>
              {perfilCompleto.perfilPassageiro.ultimasReservas && perfilCompleto.perfilPassageiro.ultimasReservas.length > 0 ? (
                <ul>
                  {perfilCompleto.perfilPassageiro.ultimasReservas.map((reserva: any) => (
                    <li key={reserva.id} className="mb-2">
                      <strong>Status:</strong> {reserva.status} | <strong>Assentos:</strong> {reserva.numeroAssentos} | <strong>Origem:</strong> {reserva.corrida.origem} | <strong>Destino:</strong> {reserva.corrida.destino}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhuma reserva recente.</p>
              )}
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex flex-wrap gap-4 justify-center">
            {perfilCompleto?.tipo?.toLowerCase() === 'motorista' && (!id || id === user?.id) && (
              <button
                onClick={() => navigate('/meus-veiculos')}
                className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors"
              >
                Ver Meus Veículos
              </button>
            )}
            <button
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition-colors"
            >
              Voltar ao Início
            </button>
            {(!id || id === user?.id) && (
              <>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition-colors"
                >
                  Sair
                </button>
                <button
                  onClick={handleDeleteProfile}
                  className="bg-red-700 text-white px-6 py-3 rounded hover:bg-red-800 transition-colors"
                >
                  Deletar Perfil
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
