import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import AdminLayout from './components/admin/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminTerms from './pages/admin/AdminTerms';
import AdminTaxonomy from './pages/admin/AdminTaxonomy';
import AdminTermForm from './pages/admin/AdminTermForm';
import NotFound from './pages/NotFound.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import Home from './pages/Home';
import TermDetail from './pages/TermDetail.jsx';
import TesteBackend from './pages/testebackend.jsx';

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return (
    <Routes>
      <Route path="/admin/previa" element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="termos" element={<AdminTerms />} />
        <Route path="termos/novo" element={<AdminTermForm />} />
        <Route path="categorias" element={<AdminTaxonomy type="categorias" />} />
        <Route path="areas" element={<AdminTaxonomy type="areas" />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/" element={<Home />} />
      <Route path="/termo/:id" element={<TermDetail />} />
      <Route path="/teste" element={<TesteBackend />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}