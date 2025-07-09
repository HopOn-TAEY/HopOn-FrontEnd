import { authenticatedFetch } from './config';

// Tipos para usuários
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  nasc: string;
  telefone: string;
  tipoUsuario: 'passageiro' | 'motorista';
  cnh?: string;
  corridasPrivadas?: boolean;
}

export interface Motorista extends Usuario {
  tipoUsuario: 'motorista';
  cnh: string;
  corridasPrivadas: boolean;
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

// Função para obter perfil de um usuário
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

  return response.json();
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