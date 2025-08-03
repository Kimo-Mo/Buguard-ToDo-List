import { useAuth0 } from '@auth0/auth0-react';
import type { ReactNode } from 'react';
import { LoadingComponent } from '../ui';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  if (isLoading) {
    return <LoadingComponent />;
  }
  if (error) {
    return <Navigate to={'/auth'} replace />;
  }
  return isAuthenticated ? children : <Navigate to={'/auth'} replace />;
};

export default ProtectedRoute;
