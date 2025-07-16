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
  
  console.log('Token encontrado:', token ? 'Sim' : 'Não');
  console.log('URL da requisição:', `${API_BASE_URL}${url}`);

  // Não enviar Content-Type se for DELETE sem body
  const isDelete = options.method === 'DELETE';
  const hasBody = !!options.body;
  const headers: any = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  if (!(isDelete && !hasBody)) {
    headers['Content-Type'] = 'application/json';
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  console.log('Headers da requisição:', config.headers);

  const response = await fetch(`${API_BASE_URL}${url}`, config);
  
  console.log('Status da resposta:', response.status);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.log('Erro da resposta:', errorData);
    throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}; 