import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      id="sobre"
      className="border-t border-[#D4D1CC] bg-[#F9F8F6]"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-6">
          <Link
            to="/"
            className="font-serif text-3xl"
          >
            Juris<span className="text-[#8C7356]">Fácil</span>
          </Link>

          <p className="mt-5 max-w-md text-sm leading-6 text-[#55585B]">
            Democratizamos o entendimento jurídico com definições claras,
            contexto e exemplos práticos.
          </p>
        </div>

        <div className="lg:col-span-3">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest">
            Navegue
          </p>

          <a
            href="/#dicionario"
            className="block min-h-10 text-sm"
          >
            Dicionário
          </a>

          <a
            href="/#areas"
            className="block min-h-10 text-sm"
          >
            Áreas do Direito
          </a>
        </div>

        <div className="lg:col-span-3">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest">
            Importante
          </p>

          <p className="text-sm leading-6 text-[#55585B]">
            Conteúdo educativo. Não substitui orientação jurídica profissional.
          </p>
        </div>
      </div>

      <div className="border-t border-[#D4D1CC]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-6 text-xs text-[#696969] sm:flex-row lg:px-10">
          <span>© 2026 JurisFácil</span>
          <span>Direito claro para todos.</span>
        </div>
      </div>
    </footer>
  );
}