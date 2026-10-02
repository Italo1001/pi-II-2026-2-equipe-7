import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { legalTerms } from '../data/legalTerms';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TermContent from '../components/TermContent';

export default function TermDetail() {
  const { slug } = useParams();
  const [simple, setSimple] = useState(false);

  const term = legalTerms.find((item) => item.slug === slug);

  if (!term) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#F9F8F6] p-6 text-center">
        <div>
          <p className="font-serif text-5xl">
            Termo não encontrado.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex min-h-12 items-center text-[#8C7356] underline"
          >
            Voltar ao dicionário
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F9F8F6] text-[#1A1C1E]">
      <Header />

      <article className="mx-auto max-w-7xl px-6 pb-32 pt-32 lg:px-10 lg:pt-40">
        <Link
          to="/"
          className="inline-flex min-h-12 items-center gap-2 text-sm text-[#55585B] hover:text-[#8C7356]"
        >
          <ArrowLeft size={17} />
          Voltar ao dicionário
        </Link>

        <div className="mt-12 border-b border-[#1A1C1E] pb-16">
          <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#8C7356]">
            {term.category}
          </p>

          <h1 className="mt-5 font-serif text-6xl leading-none sm:text-8xl">
            {term.term}
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#55585B]">
            {term.short_definition}
          </p>
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#8C7356]">
              Anatomia do termo
            </p>

            <dl className="mt-7 divide-y divide-[#D4D1CC] border-y border-[#D4D1CC]">
              <div className="py-5">
                <dt className="text-xs text-[#696969]">
                  Origem
                </dt>

                <dd className="mt-2 font-serif text-xl">
                  {term.origin}
                </dd>
              </div>

              <div className="py-5">
                <dt className="text-xs text-[#696969]">
                  Pronúncia
                </dt>

                <dd className="mt-2 font-serif text-xl">
                  {term.pronunciation}
                </dd>
              </div>
            </dl>
          </aside>

          <TermContent
            term={term}
            simple={simple}
            setSimple={setSimple}
          />
        </div>
      </article>

      <Footer />
    </main>
  );
}