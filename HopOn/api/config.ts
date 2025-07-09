// Configuração da API
export const API_BASE_URL = 'http://localhost:3333';

// Configurações padrão para requisições
export const API_CONFIG = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Função para obter o token de autenticação
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Função para definir o token de autenticação
export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// Função para remover o token de autenticação
export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
}; 