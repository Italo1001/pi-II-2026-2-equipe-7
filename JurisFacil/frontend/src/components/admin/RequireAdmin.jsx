import { Navigate, useLocation } from 'react-router-dom';
import useSession from '../../auth/useSession';

export default function RequireAdmin({ children }) {
  const { session } = useSession();
  const location = useLocation();
  if (!session) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  return children;
}
