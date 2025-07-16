import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getPerfilCompleto } from '../api/usuarios';

interface User {
  id: string;
  nome: string;
  email: string;
  tipo: 'passageiro' | 'motorista';
  telefone?: string;
  dataNascimento?: string;
  cpf?: string;
  cnh?: string;
  categoriaCnh?: string;
  dataVencimentoCnh?: string;
}

// Função utilitária para normalizar dados do usuário
const normalizeUserData = (userData: any): User => {
  return {
    id: userData.id,
    nome: userData.nome,
    email: userData.email,
    tipo: (userData.tipo || userData.tipoUsuario || 'passageiro').toLowerCase(), // Corrigido!
    telefone: userData.telefone,
    dataNascimento: userData.dataNascimento || userData.dataNasc, // Corrigido!
    cpf: userData.cpf,
    cnh: userData.cnh,
    categoriaCnh: userData.categoriaCnh,
    dataVencimentoCnh: userData.dataVencimentoCnh,
  };
};

interface AuthContextType {
  user: User | null;
  login: (userData: User, rememberMe?: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Verificar se há dados salvos para "lembrar de mim"
  useEffect(() => {
    const savedUser = localStorage.getItem('rememberedUser');
    const savedToken = localStorage.getItem('rememberedToken');
    
    console.log('Verificando dados salvos...');
    console.log('savedUser:', savedUser);
    console.log('savedToken:', savedToken);
    
    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser);
        const normalizedUser = normalizeUserData(userData);
        console.log('Dados do usuário restaurados:', normalizedUser);
        console.log('Tipo do usuário restaurado:', normalizedUser.tipo);
        setUser(normalizedUser);
        // Restaurar o token para as requisições da API
        localStorage.setItem('authToken', savedToken);
      } catch (error) {
        console.error('Erro ao restaurar dados do usuário:', error);
        // Limpar dados inválidos
        localStorage.removeItem('rememberedUser');
        localStorage.removeItem('rememberedToken');
        localStorage.removeItem('authToken');
      }
    } else {
      // Se não há dados para lembrar, limpar qualquer token existente
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    }
  }, []);

  const login = async (userData: any, rememberMe: boolean = false) => {
    // Salva o token antes de buscar o perfil completo
    const normalizedUser = normalizeUserData(userData);
    setUser(normalizedUser); // Preenche temporariamente para evitar delay

    try {
      // Buscar dados completos do usuário logado
      const perfilCompleto = await getPerfilCompleto();
      const perfil = (perfilCompleto as any).perfil ? (perfilCompleto as any).perfil : perfilCompleto;
      const normalizedPerfil = normalizeUserData(perfil);
      setUser(normalizedPerfil);
      if (rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify(normalizedPerfil));
        localStorage.setItem('rememberedToken', localStorage.getItem('authToken') || '');
      } else {
        sessionStorage.setItem('userData', JSON.stringify(normalizedPerfil));
      }
      console.log('Usuário atualizado com dados completos:', normalizedPerfil);
    } catch (error) {
      console.error('Erro ao buscar perfil completo após login:', error);
      // Mantém o usuário parcial se falhar
    }
  };

  const logout = () => {
    setUser(null);
    // Limpar todos os dados de autenticação
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('rememberedUser');
    localStorage.removeItem('rememberedToken');
    sessionStorage.removeItem('userData');
  };

  const isAuthenticated = !!user;

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 