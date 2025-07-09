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
  tipoUsuario: 'passageiro';
}

export interface RegisterMotoristaData {
  nome: string;
  email: string;
  nasc: string;
  telefone: string;
  senha: string;
  tipoUsuario: 'motorista';
  cnh: string;
  corridasPrivadas: boolean;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    nome: string;
    email: string;
    tipoUsuario: string;
  };
}

// Função para fazer login
export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao fazer login');
    }

    const result = await response.json();
    setAuthToken(result.token);
    return result;
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};

// Função para registrar passageiro
export const registerPassageiro = async (data: RegisterPassageiroData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/criar-passageiro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: data.nome,
        email: data.email,
        dataNasc: data.nasc, // Corrigindo o nome do campo
        telefone: data.telefone,
        senha: data.senha,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao registrar passageiro');
    }

    const result = await response.json();
    setAuthToken(result.token);
    return result;
  } catch (error) {
    console.error('Erro no registro de passageiro:', error);
    throw error;
  }
};

// Função para registrar motorista
export const registerMotorista = async (data: RegisterMotoristaData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/criar-motorista`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: data.nome,
        email: data.email,
        dataNasc: data.nasc, // Corrigindo o nome do campo
        telefone: data.telefone,
        senha: data.senha,
        cnh: data.cnh,
        corridasPrivadas: data.corridasPrivadas,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao registrar motorista');
    }

    const result = await response.json();
    setAuthToken(result.token);
    return result;
  } catch (error) {
    console.error('Erro no registro de motorista:', error);
    throw error;
  }
};

// Função para fazer logout
export const logout = (): void => {
  removeAuthToken();
};

// Função para obter dados do usuário logado
export const getMe = async (): Promise<any> => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token não encontrado');
    }

    const response = await fetch(`${API_BASE_URL}/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao obter dados do usuário');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error);
    throw error;
  }
}; 