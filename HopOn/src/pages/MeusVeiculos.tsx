import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { listarVeiculos } from '../api/usuarios';
import { getAuthToken } from '../api/config';
import './../App.css';

interface ImagemVeiculo {
  id: string;
  url: string;
  tipo: string;
  ordem: number;
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
  motoristaId: string;
  imagens?: ImagemVeiculo[];
}

function MeusVeiculos() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagemAtiva, setImagemAtiva] = useState<{ [key: string]: number }>({});
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Verificação de segurança
  const hasToken = !!getAuthToken();

  useEffect(() => {
    // Verificação de segurança
    if (!isAuthenticated || !hasToken || user?.tipo !== 'motorista') {
      navigate('/');
      return;
    }

    const carregarVeiculos = async () => {
      setIsLoading(true);
      try {
        const veiculosData = await listarVeiculos();
        setVeiculos(Array.isArray(veiculosData) ? veiculosData : []);
        
        // Inicializar imagem ativa para cada veículo
        const imagensAtivas: { [key: string]: number } = {};
        veiculosData.forEach((veiculo: Veiculo) => {
          imagensAtivas[veiculo.id] = 0;
        });
        setImagemAtiva(imagensAtivas);
      } catch (error) {
        console.error('Erro ao carregar veículos:', error);
        setError('Erro ao carregar veículos.');
      } finally {
        setIsLoading(false);
      }
    };

    carregarVeiculos();
  }, [isAuthenticated, hasToken, user, navigate]);

  const formatarData = (dataString: string) => {
    if (!dataString) return '-';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  const proximaImagem = (veiculoId: string, totalImagens: number) => {
    setImagemAtiva(prev => ({
      ...prev,
      [veiculoId]: (prev[veiculoId] + 1) % totalImagens
    }));
  };

  const imagemAnterior = (veiculoId: string, totalImagens: number) => {
    setImagemAtiva(prev => ({
      ...prev,
      [veiculoId]: prev[veiculoId] === 0 ? totalImagens - 1 : prev[veiculoId] - 1
    }));
  };

  const obterImagensVeiculo = (veiculo: Veiculo): string[] => {
    const imagens: string[] = [];
    
    // Adicionar imagem principal se existir
    if (veiculo.imagemPrincipal) {
      imagens.push(veiculo.imagemPrincipal);
    }
    
    // Adicionar outras imagens se existirem
    if (veiculo.imagens && veiculo.imagens.length > 0) {
      veiculo.imagens.forEach(img => {
        if (!imagens.includes(img.url)) {
          imagens.push(img.url);
        }
      });
    }
    
    return imagens;
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

  return (
    <div className="bg-folha flex justify-center p-6 font-poppins min-h-screen">
      <div className="m-auto bg-white rounded-md p-[1.5%] w-[80%] max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-center text-4xl font-bold pt-[1%] mb-[2%] mt-5">
            Meus Veículos
          </h1>
          <button
            onClick={() => navigate('/perfil')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Voltar ao Perfil
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {veiculos.length === 0 ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-semibold mb-4">Nenhum veículo cadastrado</h3>
            <p className="text-gray-600 mb-4">
              Você ainda não cadastrou nenhum veículo. Cadastre seu primeiro veículo para começar a oferecer caronas.
            </p>
            <button
              onClick={() => navigate('/cadastrar-veiculo')}
              className="bg-folha text-white px-6 py-3 rounded hover:bg-green-700"
            >
              Cadastrar Veículo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {veiculos.map((veiculo) => {
              const imagens = obterImagensVeiculo(veiculo);
              const imagemAtual = imagemAtiva[veiculo.id] || 0;
              
              return (
                <div key={veiculo.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  {/* Carrossel de Imagens */}
                  {imagens.length > 0 ? (
                    <div className="relative mb-4">
                      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                        <img
                          src={imagens[imagemAtual]}
                          alt={`${veiculo.marca} ${veiculo.modelo}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      
                      {/* Controles do carrossel */}
                      {imagens.length > 1 && (
                        <>
                          <button
                            onClick={() => imagemAnterior(veiculo.id, imagens.length)}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                          >
                            ‹
                          </button>
                          <button
                            onClick={() => proximaImagem(veiculo.id, imagens.length)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                          >
                            ›
                          </button>
                          
                          {/* Indicadores */}
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                            {imagens.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setImagemAtiva(prev => ({ ...prev, [veiculo.id]: index }))}
                                className={`w-2 h-2 rounded-full ${
                                  index === imagemAtual ? 'bg-white' : 'bg-white bg-opacity-50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center text-gray-500">
                        <div className="text-4xl mb-2">🚗</div>
                        <p className="text-sm">Sem imagens</p>
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {veiculo.marca} {veiculo.modelo}
                    </h3>
                    <p className="text-gray-600">{veiculo.ano}</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Placa:</span>
                      <span className="text-gray-700">{veiculo.placa}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Cor:</span>
                      <span className="text-gray-700">{veiculo.cor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Capacidade:</span>
                      <span className="text-gray-700">{veiculo.capacidade} passageiros</span>
                    </div>
                  </div>

                  <div className="space-y-1 mb-4">
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-2 ${veiculo.suporteCriancas ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-sm">Suporte para crianças</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-2 ${veiculo.suporteDeficientes ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-sm">Suporte para PCD</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/editar-veiculo/${veiculo.id}`)}
                      className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => navigate('/cadastrarviagem')}
                      className="flex-1 bg-folha text-white px-3 py-2 rounded text-sm hover:bg-green-700"
                    >
                      Oferecer Carona
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {veiculos.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/cadastrar-veiculo')}
              className="bg-folha text-white px-6 py-3 rounded hover:bg-green-700"
            >
              Cadastrar Novo Veículo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MeusVeiculos; 