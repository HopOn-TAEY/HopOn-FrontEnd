import { authenticatedFetch } from './config';

// Tipos para usuários
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  nasc: string;
  telefone: string;
  tipo: 'passageiro' | 'motorista';
  cnh?: string;
  corridasPrivadas?: boolean;
}

export interface Motorista extends Usuario {
  tipo: 'motorista';
  cnh: string;
  corridasPrivadas: boolean;
  perfilMotoristaId: string; // <-- Adiciona o campo
  veiculos?: Veiculo[];
}

export interface Veiculo {
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
  imagens?: Array<{
    id: string;
    url: string;
    tipo: string;
    ordem: number;
  }>;
}

export interface AdicionarVeiculoData {
  modelo: string;
  marca: string;
  ano: number;
  placa: string;
  cor: string;
  capacidade: number;
  suporteCriancas?: boolean;
  suporteDeficientes?: boolean;
  imagemPrincipal?: string;
  imagens?: Array<{
    url: string;
    tipo?: "PRINCIPAL" | "SECUNDARIA";
    ordem?: number;
  }>;
}

export interface EditarVeiculoData {
  id: string;
  modelo: string;
  marca: string;
  ano: number;
  placa: string;
  cor: string;
}

export interface PropostaCorrida {
  motoristaId: string;
  veiculoId: string;
  origem: string;
  destino: string;
  latitudeOrigem?: number;
  longitudeOrigem?: number;
  latitudeDestino?: number;
  longitudeDestino?: number;
  dataHoraSaida: string;
  numeroVagas: number;
  preco?: number;
  observacoes?: string;
}

// Função para obter perfil completo do usuário logado
export const getPerfilCompleto = async (): Promise<Usuario> => {
  const res = await authenticatedFetch('/me', {
    method: 'GET',
  });
  return res.perfil || res;
};

// Função para obter perfil de um usuário específico
export const getPerfil = async (id: string): Promise<Usuario> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3333'}/perfil/${id}`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro ao obter perfil');
  }

  return response.json();
};

// Função para listar motoristas
export const listarMotoristas = async (): Promise<Motorista[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3333'}/motoristas`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro ao listar motoristas');
  }

  const data = await response.json();
  
  console.log('Dados recebidos da API de motoristas:', data);
  
  // Se o backend retorna um objeto com propriedade motoristas, extrair o array
  if (data.motoristas && Array.isArray(data.motoristas)) {
    console.log('Retornando motoristas do objeto:', data.motoristas.length);
    return data.motoristas;
  }
  
  // Se retorna diretamente um array
  if (Array.isArray(data)) {
    console.log('Retornando array direto:', data.length);
    return data;
  }
  
  // Se retorna um objeto com outras propriedades, retornar o array principal
  console.log('Retornando dados como estão:', data);
  return data;
};

// Função para listar veículos do usuário logado
export const listarVeiculos = async (): Promise<Veiculo[]> => {
  const response = await authenticatedFetch('/veiculos', {
    method: 'GET',
  });
  
  // O backend retorna { message, total, veiculos }
  // Precisamos retornar apenas o array de veículos
  const veiculos = response.veiculos || [];
  
  return veiculos;
};

// Função para adicionar veículo
export const adicionarVeiculo = async (data: AdicionarVeiculoData): Promise<Veiculo> => {
  return authenticatedFetch('/adicionar-veiculo', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Função para editar veículo
export const editarVeiculo = async (data: EditarVeiculoData): Promise<Veiculo> => {
  return authenticatedFetch('/editar-veiculo', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

// Função para enviar proposta de corrida privada para um motorista
export const enviarPropostaParaMotorista = async (proposta: PropostaCorrida): Promise<any> => {
  return authenticatedFetch('/solicitar-corrida-privada', {
    method: 'POST',
    body: JSON.stringify(proposta),
  });
};

// Função para deletar usuário
export const deletarUsuario = async (id: string): Promise<void> => {
  return authenticatedFetch(`/deletar-usuario/${id}`, {
    method: 'DELETE',
  });
};

// Função para atualizar motorista
export const atualizarMotorista = async (id: string, data: Partial<Motorista>): Promise<Motorista> => {
  return authenticatedFetch(`/atualizar-motorista/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}; 

// Função para buscar veículos de um motorista específico (rota pública)
export const buscarVeiculosMotorista = async (motoristaId: string): Promise<Veiculo[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3333'}/veiculos-publicos?id=${motoristaId}`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro ao buscar veículos do motorista');
  }

  const data = await response.json();
  
  // Se o backend retorna um objeto com propriedade veiculos, extrair o array
  if (data.veiculos) {
    return data.veiculos;
  }
  
  // Se retorna diretamente um array
  if (Array.isArray(data)) {
    return data;
  }
  
  // Se retorna um objeto com outras propriedades, retornar o array principal
  return data;
}; 