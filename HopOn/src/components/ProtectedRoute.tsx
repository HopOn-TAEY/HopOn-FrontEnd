import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'passageiro' | 'motorista';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredUserType 
}) => {
  const { isAuthenticated, user } = useAuth();

  // Se não está autenticado, não renderiza nada
  if (!isAuthenticated) {
    return null;
  }

  // Se requer um tipo específico de usuário e o usuário não é desse tipo
  if (requiredUserType && user?.tipo !== requiredUserType) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 