import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [open, setOpen] = useState(false);

  const nav = [
    ['Início', '/'],
    ['Dicionário', '/#dicionario'],
    ['Áreas do Direito', '/#areas'],
    ['Sobre', '/#sobre'],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#D4D1CC]/80 bg-[#F9F8F6]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
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

        <a
          href="/#buscar"
          aria-label="Buscar termo"
          className="hidden min-h-12 min-w-12 items-center justify-center border border-[#D4D1CC] hover:bg-white lg:flex"
        >
          <Search size={18} />
        </a>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
          className="grid min-h-12 min-w-12 place-items-center lg:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

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
        </nav>
      )}
    </header>
  );
}