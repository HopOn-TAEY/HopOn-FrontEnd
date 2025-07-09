import { API_BASE_URL, getAuthToken } from './config';

// Tipos para corridas
export interface Corrida {
  id: string;
  origem: string;
  destino: string;
  data: string;
  hora: string;
  vagas: number;
  preco: number;
  motoristaId: string;
  motorista: {
    nome: string;
    telefone: string;
  };
  passageiros?: Array<{
    id: string;
    nome: string;
  }>;
}

export interface CriarCorridaData {
  origem: string;
  destino: string;
  data: string;
  hora: string;
  vagas: number;
  preco: number;
}

// Função para listar todas as corridas
export const listarCorridas = async (): Promise<Corrida[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/corridas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao listar corridas');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao listar corridas:', error);
    throw error;
  }
};

// Função para buscar uma corrida específica
export const buscarCorrida = async (id: string): Promise<Corrida> => {
  try {
    const response = await fetch(`${API_BASE_URL}/corridas/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao buscar corrida');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar corrida:', error);
    throw error;
  }
};

// Função para criar uma nova corrida
export const criarCorrida = async (data: CriarCorridaData): Promise<Corrida> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await fetch(`${API_BASE_URL}/criar-corrida`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao criar corrida');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao criar corrida:', error);
    throw error;
  }
};

// Função para deletar uma corrida
export const deletarCorrida = async (id: string): Promise<void> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await fetch(`${API_BASE_URL}/deletar-corrida/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao deletar corrida');
    }
  } catch (error) {
    console.error('Erro ao deletar corrida:', error);
    throw error;
  }
}; 