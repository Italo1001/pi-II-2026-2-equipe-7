import { useEffect, useState } from 'react';
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
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    let active = true;

    listarTermos()
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('A API retornou uma lista inválida.');
        }

        const adaptedTerms = data
          .map(adaptarTermo)
          .sort((a, b) => a.term.localeCompare(b.term, 'pt-BR'));

        if (active) {
          setTerms(adaptedTerms);
        }
      })
      .catch(() => {
        if (active) {
          setError(
            'Não foi possível carregar os termos. Verifique o servidor e tente novamente.'
          );
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const visibleTerms = category
    ? terms.filter((term) => term.category === category)
    : terms;

  return (
    <main className="bg-[#F9F8F6] text-[#1A1C1E]">
      <Header />

      {loading ? (
        <section className="px-6 pb-20 pt-36" role="status">
          Carregando termos…
        </section>
      ) : error ? (
        <section className="px-6 pb-20 pt-36" role="alert">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 min-h-12 underline"
          >
            Tentar novamente
          </button>
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