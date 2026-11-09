import { useEffect, useState } from 'react';
import RequestState from '../components/RequestState';
import { requestMessages } from '../utils/requestMessages';
import { listarTermos } from '../api/api';

import Header from '../components/Header';
import SearchHero from '../components/SearchHero';
import AlphabetIndex from '../components/AlphabetIndex';
import TermIndex from '../components/TermIndex';
import CategoryLibrary from '../components/CategoryLibrary';
import Footer from '../components/Footer';

function adaptarTermo(item) {
  return {
    id: item.id,
    slug: String(item.id),
    term: item.nome,
    category: item.area || 'Área não informada',
    short_definition: item.significado || '',
    full_definition: item.significado || '',
    letter: item.nome
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .charAt(0)
      .toUpperCase(),
  };
}

export default function Home() {
  const [response, setResponse] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    listarTermos({ signal: controller.signal })
      .then((data) => {
        if (!Array.isArray(data) || data.some(item => !item || item.id == null || typeof item.nome !== 'string')) {
          throw new Error('Resposta inválida do servidor.');
        }
        const terms = data.map(adaptarTermo).sort((a, b) => a.term.localeCompare(b.term, 'pt-BR'));
        if (!controller.signal.aborted) setResponse({ attempt, terms, error: null });
      })
      .catch((error) => {
        if (!controller.signal.aborted) setResponse({ attempt, terms: [], error });
      });
    return () => controller.abort();
  }, [attempt]);

  const current = response?.attempt === attempt;
  const loading = !current;
  const error = current ? response.error : null;
  const terms = current ? response.terms : [];
  const retry = () => setAttempt(value => value + 1);

  const visibleTerms = category
    ? terms.filter((term) => term.category === category)
    : terms;

  return (
    <main className="bg-[#F9F8F6] text-[#1A1C1E]">
      <Header />

      {loading || error || terms.length === 0 ? (
        <section className="mx-auto min-h-[65vh] max-w-7xl px-6 pb-20 pt-36" aria-busy={loading}>
          <h1 className="font-serif text-4xl">Dicionário jurídico</h1>
          <RequestState loading={loading} loadingMessage={requestMessages.loadingTerms}
            error={error} empty={terms.length === 0} emptyMessage={requestMessages.emptyTerms}
            onRetry={retry} />
        </section>
      ) : (
        <>
          <SearchHero
            terms={terms}
            query={query}
            setQuery={setQuery}
          />

          <AlphabetIndex terms={visibleTerms} />

          {category && (
            <div
              className="mx-auto max-w-7xl px-6 pt-10"
              role="status"
            >
              Filtrando: {category}.
              <button
                onClick={() => setCategory('')}
                className="ml-3 underline"
              >
                Mostrar todos os termos
              </button>
            </div>
          )}

          <TermIndex terms={visibleTerms} />

          <CategoryLibrary
            terms={terms}
            onSelect={setCategory}
          />
        </>
      )}

      <Footer />
    </main>
  );
}