import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermIndex({ terms }) {
  const groups = [...new Set(terms.map((t) => t.letter))].sort();

  return (
    <section
      id="dicionario"
      className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="mb-20 grid gap-6 lg:grid-cols-12">
        <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#8C7356] lg:col-span-3">
          Índice de termos
        </p>

        <h2 className="font-serif text-4xl leading-tight sm:text-6xl lg:col-span-8">
          Conhecimento organizado.
          <br />
          Clareza em cada verbete.
        </h2>
      </div>

      <div className="space-y-20">
        {terms.length === 0 && <p role="status">Nenhum termo encontrado nesta área.</p>}
        {groups.map((letter) => (
          <div
            id={`letra-${letter}`}
            key={letter}
            className="grid border-t border-[#1A1C1E] pt-6 lg:grid-cols-12"
          >
            <div className="font-serif text-7xl text-[#8C7356] lg:col-span-3">
              {letter}
            </div>

            <div className="lg:col-span-9">
              {terms
                .filter((t) => t.letter === letter)
                .map((t) => (
                  <Link
                    key={t.id}
                    to={`/termo/${t.slug}`}
                    className="group grid min-h-28 items-center gap-3 border-b border-[#D4D1CC] px-3 py-5 transition-colors hover:bg-[#EEEAE4] sm:grid-cols-[1fr_1.6fr_auto]"
                  >
                    <h3 className="font-serif text-2xl font-medium sm:text-3xl">
                      {t.term}
                    </h3>

                    <p className="text-sm leading-6 text-[#55585B]">
                      {t.short_definition}
                    </p>

                    <ArrowUpRight className="text-[#8C7356] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}