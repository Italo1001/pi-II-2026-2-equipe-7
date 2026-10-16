import { searchTerms } from '../utils/search';
import { Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HERO_IMAGE =
  'https://media.base44.com/images/public/6a9dbf9701f9692e2db31f20/25debe244_generated_05d020d6.jpg';

export default function SearchHero({ terms, query, setQuery }) {
  const results = searchTerms(terms, query);

  return (
    <section
      id="buscar"
      className="relative flex min-h-screen items-center overflow-hidden border-b border-[#D4D1CC] pt-20"
    >
      <img
        src={HERO_IMAGE}
        alt="Textura de papel marfim sob luz natural"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />

      <div className="absolute inset-y-0 left-[8.33%] border-l border-[#D4D1CC]/60" />

      <div className="absolute inset-y-0 right-[8.33%] border-r border-[#D4D1CC]/60" />

      <div className="relative mx-auto w-full max-w-5xl px-6 text-center">
        <p className="mb-7 text-xs font-semibold uppercase tracking-[.28em] text-[#8C7356]">
          Conhecimento jurídico, sem complicação
        </p>

        <h1 className="font-serif text-5xl leading-[.98] tracking-tight sm:text-7xl lg:text-[5.5rem]">
          O Direito começa
          <br />
          pela compreensão.
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#55585B] sm:text-lg">
          Definições claras, contexto legal e exemplos práticos para aproximar
          você da linguagem jurídica.
        </p>

        <div className="relative mx-auto mt-12 max-w-3xl text-left">
          <label htmlFor="term-search" className="sr-only">
            Qual termo vamos esclarecer hoje?
          </label>

          <div className="flex items-center border-b-2 border-[#1A1C1E] bg-[#F9F8F6]/90 px-1 focus-within:border-[#8C7356] focus-within:ring-2 focus-within:ring-[#8C7356]/20">
            <Search className="mx-4 text-[#8C7356]" />

            <input
              id="term-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Qual termo vamos esclarecer hoje?"
              className="h-20 w-full bg-transparent text-lg outline-none placeholder:text-[#696969] sm:text-xl"
            />
          </div>

          {query.trim() && (
            <div className="absolute z-20 mt-2 max-h-80 overflow-y-auto w-full border border-[#D4D1CC] bg-[#F9F8F6] p-2 shadow-2xl">
              {results.length ? (
                results.map((t) => (
                  <Link
                    key={t.id}
                    to={`/termo/${t.slug}`}
                    className="group flex min-h-16 items-center justify-between border-b border-[#D4D1CC] px-5 last:border-0 hover:bg-[#EEEAE4]"
                  >
                    <span>
                      <b className="font-serif text-xl">{t.term}</b>
                      <small className="ml-3 text-[#696969]">
                        {t.category}
                      </small>
                    </span>

                    <ArrowRight size={18} className="text-[#8C7356]" />
                  </Link>
                ))
              ) : (
                <p className="p-5 text-[#696969]">
                  Nenhum termo encontrado.
                </p>
              )}
            </div>
          )}
        </div>

        <p className="mt-5 text-sm text-[#696969]">
          Experimente:{' '}

          <button
            onClick={() => setQuery('Habeas corpus')}
            className="underline decoration-[#8C7356] underline-offset-4"
          >
            Habeas corpus
          </button>
          ,{' '}

          <button
            onClick={() => setQuery('Liminar')}
            className="underline decoration-[#8C7356] underline-offset-4"
          >
            Liminar
          </button>{' '}
          ou{' '}

          <button
            onClick={() => setQuery('Jurisprudência')}
            className="underline decoration-[#8C7356] underline-offset-4"
          >
            Jurisprudência
          </button>
        </p>
      </div>
    </section>
  );
}