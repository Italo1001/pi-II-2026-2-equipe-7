import { NavLink, Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FolderOpen, Layers, ArrowLeft, Plus } from 'lucide-react';

const navigation = [
  { to: '/admin/previa', label: 'Visão geral', icon: LayoutDashboard, end: true },
  { to: '/admin/previa/termos', label: 'Termos', icon: BookOpen },
  { to: '/admin/previa/categorias', label: 'Categorias', icon: FolderOpen },
  { to: '/admin/previa/areas', label: 'Áreas do Direito', icon: Layers },
];
export default function AdminLayout() {
  return <div className="min-h-screen bg-[#F9F8F6] text-[#1A1C1E] lg:grid lg:grid-cols-[250px_1fr]">
    <aside className="border-b border-[#D4D1CC] bg-[#EEEAE4] p-6 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
      <Link to="/" className="font-serif text-3xl">Juris<span className="text-[#8C7356]">Fácil</span></Link>
      <p className="mt-2 text-xs uppercase tracking-[.2em] text-[#696969]">Administração</p>
      <nav aria-label="Menu administrativo" className="mt-8 flex flex-wrap gap-2 lg:flex-col">
        {navigation.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end}
          className={({ isActive }) => `flex min-h-12 items-center gap-3 px-4 text-sm ${isActive ? 'bg-[#1A1C1E] text-white' : 'hover:bg-[#E2DCD3]'}`}>
          <Icon size={18} aria-hidden="true" />{label}
        </NavLink>)}
      </nav>
      <Link to="/admin/previa/termos/novo" className="mt-6 flex min-h-12 items-center justify-center gap-2 border border-[#8C7356] px-4 text-sm"><Plus size={17} />Novo termo</Link>
      <Link to="/admin/login" className="mt-8 flex min-h-12 items-center gap-2 text-sm text-[#55585B]"><ArrowLeft size={16} />Voltar ao login</Link>
    </aside>
    <div className="min-w-0">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D4D1CC] px-6 py-5 lg:px-10">
        <span className="text-sm font-semibold">Painel de conteúdo</span>
      </header>
      <main id="admin-content" className="mx-auto max-w-7xl px-6 py-10 lg:px-10"><Outlet /></main>
    </div>
  </div>;
}
