import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, Layers, FileText } from 'lucide-react';
import { listarTermos, listarCategorias } from '../../api/api';

export default function AdminOverview() {
  const [termos, setTermos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([listarTermos(), listarCategorias()])
      .then(([termosData, categoriasData]) => {
        setTermos(termosData);
        setCategorias(categoriasData);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const exemplos = termos.reduce((total, termo) => {
    const lista = termo.exemplos ?? termo.exemplo ?? [];
    if (Array.isArray(lista)) return total + lista.length;
    return total + (lista ? 1 : 0);
  }, 0);

  const stats = [
    ['Termos', termos.length, BookOpen],
    ['Áreas', categorias.length, Layers],
    ['Exemplos', termos.length, FileText],
  ];

  return (
    <>
      <p className="text-xs uppercase tracking-[.2em] text-[#8C7356]">
        Organização do conteúdo
      </p>
      <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
        Visão geral
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-[#55585B]">
        Um ponto de partida para cuidar dos termos, das explicações e dos exemplos do JurisFácil.
      </p>

      {loading ? (
        <p className="mt-8">Carregando dados...</p>
      ) : error ? (
        <p role="alert" className="mt-8">
          Não foi possível carregar os dados do painel.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {stats.map(([label, count, Icon]) => (
            <section key={label} className="border border-[#D4D1CC] bg-white/50 p-6">
              <Icon className="text-[#8C7356]" size={21} aria-hidden="true" />
              <p className="mt-5 font-serif text-5xl">{count}</p>
              <h2 className="mt-2 text-sm text-[#55585B]">{label}</h2>
            </section>
          ))}
        </div>
      )}

      <section className="mt-10 border border-[#D4D1CC] p-6 sm:p-8">
        <h2 className="font-serif text-3xl">Por onde começar?</h2>
        <p className="mt-3 leading-7 text-[#55585B]">
          Organize as categorias e áreas, cadastre um termo e acrescente uma explicação simples e exemplos de uso.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/admin/previa/termos/novo"
            className="inline-flex min-h-12 items-center gap-3 bg-[#1A1C1E] px-5 text-white"
          >
            Cadastrar termo <ArrowUpRight size={18} />
          </Link>
          <Link
            to="/admin/previa/termos"
            className="inline-flex min-h-12 items-center border border-[#D4D1CC] px-5"
          >
            Consultar termos
          </Link>
        </div>
      </section>
    </>
  );
}