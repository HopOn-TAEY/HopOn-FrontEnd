// Configuração da API
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

// Configuração do axios ou fetch
export const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Função para obter o token do localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Função para definir o token no localStorage
export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// Função para remover o token do localStorage
export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

// Função para fazer requisições autenticadas
export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${url}`, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}; 