import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { pesquisarTermo } from '../api/api';

export default function HeaderSearch() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const [attempt, setAttempt] = useState(0);

  const container = useRef(null);
  const input = useRef(null);
  const id = useId();

  const search = query.trim();
  const visible = open && Boolean(search);

  const current =
    response?.search === search &&
    response?.attempt === attempt;

  const loading = Boolean(search) && !current;
  const results = current ? response.results : [];
  const error = current ? response.error : '';

  useEffect(() => {
    if (!search) return;

    let active = true;

    const timer = setTimeout(async () => {
      try {
        const data = await pesquisarTermo(search);

        if (!Array.isArray(data)) {
          throw new Error('Resposta inválida da API.');
        }

        if (active) {
          setResponse({
            search,
            attempt,
            results: data,
            error: '',
          });
        }
      } catch {
        if (active) {
          setResponse({
            search,
            attempt,
            results: [],
            error: 'Não foi possível pesquisar. Tente novamente.',
          });
        }
      }
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [search, attempt]);

  useEffect(() => {
    function closeOutside(event) {
      if (!container.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', closeOutside);

    return () => {
      document.removeEventListener('pointerdown', closeOutside);
    };
  }, []);

  function closeResults() {
    input.current?.focus({ preventScroll: true });
    setOpen(false);
  }

  function submit(event) {
    event.preventDefault();
    setOpen(true);
    input.current?.focus({ preventScroll: true });

    if (search) {
      setAttempt((value) => value + 1);
    }
  }

  return (
    <div
      ref={container}
      className="relative min-w-0 flex-1 sm:max-w-xs"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          closeResults();
        }
      }}
    >
      <form
        role="search"
        aria-label="Busca no cabeçalho"
        onSubmit={submit}
        className="flex h-12 border border-[#D4D1CC] bg-white/60 focus-within:border-[#8C7356]"
      >
        <label htmlFor={id} className="sr-only">
          Pesquisar termo no cabeçalho
        </label>

        <input
          ref={input}
          id={id}
          type="search"
          value={query}
          autoComplete="off"
          placeholder="Pesquisar termo…"
          aria-controls={visible ? `${id}-results` : undefined}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          className="min-w-0 w-full bg-transparent px-3 text-sm outline-none"
        />

        <button
          type="submit"
          aria-label="Pesquisar no cabeçalho"
          className="grid min-w-12 place-items-center border-l border-[#D4D1CC] hover:bg-[#EEEAE4]"
        >
          <Search size={18} aria-hidden="true" />
        </button>
      </form>

      {visible && (
        <section
          id={`${id}-results`}
          aria-label="Resultados da busca no cabeçalho"
          aria-busy={loading}
          className="fixed left-3 right-3 top-20 max-h-[65vh] overflow-y-auto border border-[#D4D1CC] bg-[#F9F8F6] shadow-xl sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-96"
        >
          <div className="flex items-center justify-between border-b border-[#D4D1CC] px-4">
            <p role="status" className="text-xs text-[#55585B]">
              {loading
                ? 'Pesquisando…'
                : error
                  ? 'Busca indisponível'
                  : `${results.length} termo(s) encontrado(s)`}
            </p>

            <button
              type="button"
              aria-label="Fechar resultados"
              onClick={closeResults}
              className="grid min-h-12 min-w-12 place-items-center"
            >
              <X size={16} />
            </button>
          </div>

          {!loading && error && (
            <div role="alert" className="p-5 text-sm text-[#55585B]">
              <p>{error}</p>
              <button
                type="button"
                onClick={() => setAttempt((value) => value + 1)}
                className="mt-3 min-h-12 underline"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {!loading && !error && (
            results.length > 0 ? (
              <ul>
                {results.map((term) => (
                  <li key={term.id}>
                    <Link
                      to={`/termo/${term.id}`}
                      onClick={() => {
                        setOpen(false);
                        setQuery('');
                      }}
                      className="block border-b border-[#D4D1CC] px-4 py-4 hover:bg-[#EEEAE4]"
                    >
                      <span className="block font-serif text-xl">
                        {term.nome}
                      </span>
                      <span className="mt-1 block text-xs text-[#696969]">
                        {term.area || 'Área não informada'}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-5 text-sm text-[#55585B]">
                Nenhum termo encontrado. Tente outra palavra.
              </p>
            )
          )}
        </section>
      )}
    </div>
  );
}