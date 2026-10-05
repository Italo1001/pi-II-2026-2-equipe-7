import { Menu, Search, X, Pencil, LogIn, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [open, setOpen] = useState(false);

  // TRUE para ADMIN e FALSE para usuário
  const [isAdmin, setIsAdmin] = useState(true);

  const nav = [
    ['Início', '/'],
    ['Dicionário', '/#dicionario'],
    ['Áreas do Direito', '/#areas'],
    ['Sobre', '/#sobre'],
  ];

  const handleAuth = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      // Login será implementado depois
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#D4D1CC]/80 bg-[#F9F8F6]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

        <div className="flex items-center gap-25 -ml-25">

          {/* ESPAÇO RESERVADO PARA O BOTÃO EDITAR */}
          <div className="w-[100px]">
            {isAdmin && (
              <button
                className="flex min-h-12 items-center gap-2 border border-[#D4D1CC] px-3 text-sm hover:bg-white"
              >
                <Pencil size={17} />
                <span>Editar</span>
              </button>
            )}
          </div>

          {/* LOGO */}
          <Link
            to="/"
            className="flex min-h-12 items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C7356]"
          >
            <span className="grid h-10 w-10 place-items-center border border-[#1A1C1E] font-serif text-xl">
              JF
            </span>

            <span className="font-serif text-2xl font-semibold tracking-tight">
              Juris<span className="text-[#8C7356]">Fácil</span>
            </span>
          </Link>
        </div>

        {/* NAVEGAÇÃO */}
        <nav className="hidden items-center gap-8 text-sm lg:flex">
          {nav.map(([label, to]) => (
            <a
              key={label}
              href={to}
              className="flex min-h-12 items-center border-b border-transparent hover:border-[#8C7356]"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">

          {/* BUSCA */}
          <a
            href="/#buscar"
            aria-label="Buscar termo"
            className="hidden min-h-12 min-w-12 items-center justify-center border border-[#D4D1CC] hover:bg-white lg:flex"
          >
            <Search size={18} />
          </a>

          {/* ESPAÇO FIXO PARA ENTRAR / SAIR */}
          <div className="ml-6 w-[100px]">
            <button
              onClick={handleAuth}
              className="relative left-25 flex min-h-12 items-center gap-2 border border-[#D4D1CC] px-3 text-sm hover:bg-white"
            >
              {isAdmin ? <LogOut size={17} /> : <LogIn size={17} />}
              <span>{isAdmin ? 'Sair' : 'Entrar'}</span>
            </button>
          </div>

          {/* MENU MOBILE */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Abrir menu"
            className="grid min-h-12 min-w-12 place-items-center lg:hidden"
          >
            {open ? <X /> : <Menu />}
          </button>

        </div>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <nav className="border-t border-[#D4D1CC] bg-[#F9F8F6] px-6 py-4 lg:hidden">

          {nav.map(([label, to]) => (
            <a
              key={label}
              href={to}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center border-b border-[#D4D1CC]"
            >
              {label}
            </a>
          ))}

          {isAdmin && (
            <button
              className="flex min-h-12 w-full items-center gap-2 border-b border-[#D4D1CC]"
            >
              <Pencil size={17} />
              Editar termos
            </button>
          )}

          <button
            onClick={() => {
              handleAuth();
              setOpen(false);
            }}
            className="flex min-h-12 w-full items-center gap-2"
          >
            {isAdmin ? <LogOut size={17} /> : <LogIn size={17} />}
            {isAdmin ? 'Sair' : 'Entrar'}
          </button>

        </nav>
      )}
    </header>
  );
}