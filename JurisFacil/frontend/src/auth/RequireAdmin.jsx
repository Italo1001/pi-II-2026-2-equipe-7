import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSession } from './useSession';

export default function RequireAdmin() {
  const status = useSession();
  const location = useLocation();
  if (status === 'anonymous') {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }
  if (status !== 'admin') return <Navigate to="/acesso-negado" replace />;
  return <Outlet />;
}
