import { Outlet } from 'react-router-dom';
import RequireAdmin from './admin/RequireAdmin';

// A rota da equipe e os estados de sessão usam a mesma fonte de autenticação.
export default function ProtectedRoute() {
  return <RequireAdmin><Outlet /></RequireAdmin>;
}
