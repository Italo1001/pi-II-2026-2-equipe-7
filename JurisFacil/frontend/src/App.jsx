import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import TermDetail from './pages/TermDetail.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/termo/:slug" element={<TermDetail />} />
    </Routes>
  );
}