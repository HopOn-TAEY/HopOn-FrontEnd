import { API_BASE_URL, setAuthToken, removeAuthToken } from './config';

// Tipos para autenticação
export interface LoginData {
  email: string;
  senha: string;
}

export interface RegisterPassageiroData {
  nome: string;
  email: string;
  nasc: string;
  telefone: string;
  senha: string;
  tipo: 'passageiro';
}

export interface RegisterMotoristaData {
  nome: string;
  email: string;
  nasc: string;
  telefone: string;
  senha: string;
  tipo: 'motorista';
  cnh: string;
  corridasPrivadas: boolean;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    nome: string;
    email: string;
    tipo?: 'passageiro' | 'motorista';
    tipoUsuario?: 'passageiro' | 'motorista';
  };
}

// Função de login
export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro ao fazer login');
  }

  const result = await response.json();
  setAuthToken(result.token);
  return result;
};

// Função para registrar passageiro
export const registerPassageiro = async (data: RegisterPassageiroData): Promise<AuthResponse> => {
  // Converter nasc para dataNasc para compatibilidade com o backend
  const { nasc, ...restData } = data;
  const requestData = {
    ...restData,
    dataNasc: nasc,
  };

  const response = await fetch(`${API_BASE_URL}/criar-passageiro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro ao criar conta de passageiro');
  }

  const result = await response.json();
  setAuthToken(result.token);
  return result;
};

// Função para registrar motorista
export const registerMotorista = async (data: RegisterMotoristaData): Promise<AuthResponse> => {
  // Converter nasc para dataNasc para compatibilidade com o backend
  const { nasc, ...restData } = data;
  const requestData = {
    ...restData,
    dataNasc: nasc,
  };

  const response = await fetch(`${API_BASE_URL}/criar-motorista`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro ao criar conta de motorista');
  }

  const result = await response.json();
  setAuthToken(result.token);
  return result;
};

// Função para obter dados do usuário logado
export const getMe = async () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_BASE_URL}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro ao obter dados do usuário');
  }

  return response.json();
};

// Função para fazer logout
export const logout = (): void => {
  removeAuthToken();
}; 