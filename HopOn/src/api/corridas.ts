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
  status?: string;
  dataHoraSaida?: string;
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
  const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3333'}/corridas?limit=50`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro ao listar corridas');
  }

  const data = await response.json();
  // Se vier um objeto com propriedade 'corridas', retorna ela, senão assume que já é array
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.corridas)) return data.corridas;
  return [];
};

// Função para buscar uma corrida específica
export const buscarCorrida = async (id: string): Promise<Corrida> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3333'}/corridas/${id}`);
  console.log("buscando corrida", response);
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
export const aceitarPropostaCorridaPrivada = async (propostaId: string) => {
  return authenticatedFetch('/aceitar-proposta-corrida-privada', {
    method: 'POST',
    body: JSON.stringify({ propostaId }),
  });
};

// Função para recusar solicitação de corrida privada
export const recusarSolicitacaoPrivada = async (propostaId: string) => {
  return authenticatedFetch('/recusar-solicitacao-privada', {
    method: 'POST',
    body: JSON.stringify({ propostaId }),
  });
};

// Função para atualizar vagas de corrida privada
export const atualizarVagasCorridaPrivada = async (corridaId: string, vagas: number): Promise<CorridaPrivada> => {
  return authenticatedFetch('/atualizar-vagas-corrida-privada', {
    method: 'PUT',
    body: JSON.stringify({ corridaId, vagas }),
  });
}; 

// Função para listar solicitações privadas recebidas pelo motorista
export const listarSolicitacoesPrivadasMotorista = async () => {
  return authenticatedFetch('/solicitacoes-privadas-motorista', {
    method: 'GET',
  });
}; 

// Função para buscar detalhes completos de uma corrida
export const buscarCorridaDetalhada = async (id: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3333'}/corridas/${id}/detalhes`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro ao buscar detalhes da corrida');
  }
  const data = await response.json();
  return data.corrida;
}; 

// Função para criar uma reserva em uma corrida
export const criarReserva = async (corridaId: string, numeroAssentos: number = 1, observacoes?: string) => {
  return authenticatedFetch('/criar-reserva', {
    method: 'POST',
    body: JSON.stringify({ corridaId, numeroAssentos, observacoes }),
  });
}; 

// Função para aceitar uma reserva
export const autorizarReserva = async (reservaId: string) => {
  return authenticatedFetch(`/reservas/${reservaId}/autorizar`, {
    method: 'PUT',
    body: JSON.stringify({})
  });
};

// Função para recusar uma reserva
export const cancelarReserva = async (reservaId: string) => {
  return authenticatedFetch(`/reservas/${reservaId}/cancelar`, {
    method: 'PUT',
    body: JSON.stringify({})
  });
}; 

// Função para buscar detalhes completos de uma corrida privada
export const buscarCorridaPrivadaDetalhada = async (id: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3333'}/corridas-privadas/${id}/detalhes`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro ao buscar detalhes da corrida privada');
  }
  const data = await response.json();
  return data.corrida;
}; 

// Função para finalizar uma corrida
export const finalizarCorrida = async (corridaId: string) => {
  return authenticatedFetch(`/corridas/${corridaId}/finalizar`, {
    method: 'PUT',
    body: JSON.stringify({})
  });
};

// Função para cancelar uma corrida
export const cancelarCorrida = async (corridaId: string) => {
  return authenticatedFetch(`/corridas/${corridaId}/cancelar`, {
    method: 'PUT',
    body: JSON.stringify({})
  });
}; 

// Função para avaliar motorista
export const avaliarMotorista = async (corridaId: string, nota: number, comentario?: string) => {
  return authenticatedFetch('/avaliar-motorista', {
    method: 'POST',
    body: JSON.stringify({ corridaId, nota, comentario }),
  });
}; 