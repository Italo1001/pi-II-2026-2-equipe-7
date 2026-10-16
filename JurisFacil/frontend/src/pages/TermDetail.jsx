import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { buscarTermo } from '../api/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermDetail() {
  const { id } = useParams();
  const [response, setResponse] = useState(null);
  const [attempt, setAttempt] = useState(0);

  const validId = /^[1-9]\d*$/.test(id);

  useEffect(() => {
    if (!validId) return;

    let active = true;

    buscarTermo(id)
      .then((data) => {
        if (!data || data.id == null || typeof data.nome !== 'string') {
          throw new Error('Resposta inválida do servidor.');
        }

        if (active) {
          setResponse({
            id,
            attempt,
            term: data,
            error: null,
          });
        }
      })
      .catch((error) => {
        if (active) {
          setResponse({
            id,
            attempt,
            term: null,
            error,
          });
        }
      });

    return () => {
      active = false;
    };
  }, [id, attempt, validId]);

  const current =
    response?.id === id &&
    response?.attempt === attempt;

  const loading = validId && !current;
  const error = current ? response.error : null;
  const term = current ? response.term : null;
  const notFound = !validId || error?.status === 404;

  return (
    <main className="min-h-screen bg-[#F9F8F6] text-[#1A1C1E]">
      <Header />

      <article className="mx-auto max-w-5xl px-6 pb-32 pt-32 lg:pt-40">
        <Link
          to="/"
          className="inline-flex min-h-12 items-center gap-2 text-[#55585B] underline"
        >
          <ArrowLeft size={17} />
          Voltar ao dicionário
        </Link>

        {loading && (
          <p role="status" className="mt-10">
            Carregando termo…
          </p>
        )}

        {notFound && (
          <h1 className="mt-12 font-serif text-4xl">
            Termo não encontrado.
          </h1>
        )}

        {!notFound && error && (
          <div role="alert" className="mt-10">
            <p>
              Não foi possível carregar o termo.
              Verifique a conexão com o servidor.
            </p>

            <button
              type="button"
              onClick={() => setAttempt((value) => value + 1)}
              className="mt-4 min-h-12 underline"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!notFound && term && (
          <>
            <div className="mt-12 border-b border-[#D4D1CC] pb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#8C7356]">
                {term.area || 'Área não informada'}
              </p>

              <h1 className="mt-5 break-words font-serif text-5xl sm:text-7xl">
                {term.nome}
              </h1>
            </div>

            <section className="mt-12">
              <h2 className="font-serif text-3xl">
                Definição jurídica
              </h2>

              <p className="mt-6 whitespace-pre-line text-lg leading-8 text-[#55585B]">
                {term.significado || 'Definição não informada.'}
              </p>
            </section>
          </>
        )}
      </article>

      <Footer />
    </main>
  );
}