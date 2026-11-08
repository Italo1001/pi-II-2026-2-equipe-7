import { Link, useNavigate } from 'react-router-dom';
import { ShieldX } from 'lucide-react';
import { clearSession } from '../auth/session';

export default function AccessDenied() {
  const navigate = useNavigate();
  return <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-16">
    <ShieldX size={40} className="text-[#8C7356]" aria-hidden="true" />
    <h1 className="mt-6 font-serif text-5xl">Acesso negado</h1>
    <p className="mt-5 leading-7">Seu perfil não tem permissão para acessar a administração. Você pode continuar consultando o dicionário.</p>
    <div className="mt-8 flex flex-wrap gap-4">
      <Link className="inline-flex min-h-12 items-center bg-[#1A1C1E] px-5 text-white" to="/">Voltar ao dicionário</Link>
      <button className="min-h-12 border border-[#D4D1CC] px-5" onClick={() => { clearSession(); navigate('/admin/login'); }}>Entrar com outra conta</button>
    </div>
  </main>;
}
