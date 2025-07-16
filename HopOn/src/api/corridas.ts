import { authenticatedFetch } from './config';

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
    id: string;
    nome: string;
    email: string;
  };
  passageiros?: Array<{
    id: string;
    nome: string;
    email: string;
  }>;
}

export interface CriarCorridaData {
  veiculoId: string;
  origem: string;
  destino: string;
  dataHoraSaida: string;
  numeroVagas: number;
  preco: number;
  observacoes?: string;
  tipo: "PRIVADA" | "RECORRENTE";
}

export interface CorridaPrivada {
  id: string;
  origem: string;
  destino: string;
  data: string;
  hora: string;
  vagas: number;
  preco: number;
  passageiroId: string;
  passageiro: {
    id: string;
    nome: string;
    email: string;
  };
  motoristas?: Array<{
    id: string;
    nome: string;
    email: string;
  }>;
  status: 'pendente' | 'aceita' | 'rejeitada';
}

export interface SolicitarCorridaPrivadaData {
  origem: string;
  destino: string;
  data: string;
  hora: string;
  vagas: number;
  preco: number;
}

// Função para listar todas as corridas
export const listarCorridas = async (): Promise<Corrida[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3333'}/corridas?status=AGENDADA&limit=50`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro ao listar corridas');
  }

  return response.json();
};

// Função para buscar uma corrida específica
export const buscarCorrida = async (id: string): Promise<Corrida> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3333'}/corridas/${id}`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro ao buscar corrida');
  }

  return response.json();
};

// Função para criar uma nova corrida
export const criarCorrida = async (data: CriarCorridaData): Promise<Corrida> => {
  return authenticatedFetch('/criar-corrida', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Função para deletar uma corrida
export const deletarCorrida = async (id: string): Promise<void> => {
  return authenticatedFetch(`/deletar-corrida/${id}`, {
    method: 'DELETE',
  });
};

// Função para listar corridas privadas
export const listarCorridasPrivadas = async (): Promise<CorridaPrivada[]> => {
  return authenticatedFetch('/corridas-privadas', {
    method: 'GET',
  });
};

// Função para solicitar uma corrida privada
export const solicitarCorridaPrivada = async (data: SolicitarCorridaPrivadaData): Promise<CorridaPrivada> => {
  return authenticatedFetch('/solicitar-corrida-privada', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Função para aceitar proposta de corrida privada
export const aceitarPropostaCorridaPrivada = async (corridaId: string): Promise<CorridaPrivada> => {
  return authenticatedFetch('/aceitar-proposta-corrida-privada', {
    method: 'POST',
    body: JSON.stringify({ corridaId }),
  });
};

// Função para atualizar vagas de corrida privada
export const atualizarVagasCorridaPrivada = async (corridaId: string, vagas: number): Promise<CorridaPrivada> => {
  return authenticatedFetch('/atualizar-vagas-corrida-privada', {
    method: 'PUT',
    body: JSON.stringify({ corridaId, vagas }),
  });
}; 