import { CheckCircle2, Scale } from 'lucide-react';

export default function TermContent({ term, simple, setSimple }) {
  if (!term) {
    return (
      <section className="lg:col-span-8">
        <p className="text-[#55585B]">
          Não foi possível carregar as informações deste termo.
        </p>
      </section>
    );
  }

  return (
    <section className="lg:col-span-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D4D1CC] pb-5">
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#8C7356]">
          Explicação
        </p>

        <button
          type="button"
          onClick={() => setSimple(!simple)}
          className="inline-flex min-h-12 items-center gap-2 border border-[#D4D1CC] px-4 text-sm hover:bg-[#EEEAE4]"
        >
          <Scale size={17} />

          {simple
            ? 'Ver explicação jurídica'
            : 'Explicar de forma simples'}
        </button>
      </div>

      <div className="mt-10">
        <h2 className="font-serif text-3xl sm:text-4xl">
          {simple ? 'Em palavras simples' : 'O que significa?'}
        </h2>

        <p className="mt-6 text-lg leading-8 text-[#55585B]">
          {simple
            ? term.simple_definition
            : term.full_definition}
        </p>
      </div>

      <div className="mt-14 border-l-2 border-[#8C7356] bg-[#EEEAE4] p-7">
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#8C7356]">
          Contexto legal
        </p>

        <p className="mt-4 leading-7 text-[#333537]">
          {term.legal_context}
        </p>
      </div>

      <div className="mt-14">
        <div className="flex items-center gap-3">
          <CheckCircle2
            size={20}
            className="text-[#8C7356]"
          />

          <h2 className="font-serif text-3xl">
            Exemplo prático
          </h2>
        </div>

        <div className="mt-6 border border-[#D4D1CC] p-7">
          <p className="leading-7 text-[#55585B]">
            {term.practical_example}
          </p>
        </div>
      </div>

      {term.related_terms?.length > 0 && (
        <div className="mt-14">
          <h2 className="font-serif text-3xl">
            Termos relacionados
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {term.related_terms.map((related) => (
              <span
                key={related}
                className="border border-[#D4D1CC] px-4 py-2 text-sm"
              >
                {related}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}