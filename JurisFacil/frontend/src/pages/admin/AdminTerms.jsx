import { Link } from 'react-router-dom';
import { useState } from 'react';
import useApiResource from '../../hooks/useApiResource';
import RequestState from '../../components/RequestState';
import { requestMessages } from '../../utils/requestMessages';
import { listarTermos } from '../../api/api';
import { Search } from 'lucide-react';

function normalizar(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim();
}

export default function AdminTerms() {
  const [query, setQuery] = useState('');
  const { data, loading, error, retry } = useApiResource(listarTermos);
  const allTerms = data ?? [];

  const prefixo = normalizar(query);
  const terms = allTerms
    .filter(term => {
      const nome = normalizar(term.nome ?? term.termo);
      const significado = normalizar(
        term.significado ?? term.definicao
      );

      return (
        !prefixo ||
        nome.startsWith(prefixo) ||
        significado.startsWith(prefixo)
      );
    })
    .sort((a, b) =>
      (a.nome ?? a.termo ?? '').localeCompare(
        b.nome ?? b.termo ?? '',
        'pt-BR',
        { sensitivity: 'base' }
      )
    );

  return <>
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div><h1 className="font-serif text-4xl sm:text-5xl">Termos</h1></div>
      <Link to="/admin/previa/termos/novo" className="inline-flex min-h-12 items-center bg-[#1A1C1E] px-5 text-white">Novo termo</Link>
    </div>
    <label htmlFor="admin-term-search" className="mb-2 mt-8 block text-sm font-semibold">Pesquisar na lista</label>

    <form
      role="search"
      onSubmit={event => {
        event.preventDefault();
        setQuery(query.trim());
      }}
      className="mt-8 flex min-h-12 w-full max-w-lg border border-[#D4D1CC] bg-white focus-within:border-[#8C7356]"
    >
      <label htmlFor="admin-term-search" className="sr-only">
        Pesquisar termos
      </label>

      <input
        id="admin-term-search"
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
        placeholder="Nome ou explicação do termo"
        className="min-w-0 flex-1 bg-transparent px-4 outline-none"
      />

      <button
        type="submit"
        aria-label="Pesquisar termos"
        className="grid min-w-12 place-items-center border-l border-[#D4D1CC] hover:bg-[#EEEAE4]"
      >
        <Search size={18} aria-hidden="true" />
      </button>
    </form>
    {loading || error ? (
      <RequestState loading={loading} loadingMessage={requestMessages.loadingTerms} error={error} onRetry={retry} />
    ) : (
  <>
    <p role="status" className="my-4 text-sm text-[#696969]">
      {terms.length} termo(s) encontrado(s)
    </p>

    {terms.length ? (
      <div className="overflow-x-auto border border-[#D4D1CC]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#EEEAE4]">
            <tr>
              <th scope="col" className="p-4">Termo</th>
              <th scope="col" className="p-4">Área</th>
              <th scope="col" className="p-4">Consulta</th>
            </tr>
          </thead>
          <tbody>
            {terms.map(term => {
              const nome = term.nome ?? term.termo;
              return (
                <tr key={term.id} className="border-t border-[#D4D1CC]">
                  <th scope="row" className="p-4 font-medium">{nome}</th>
                  <td className="p-4">
                    {term.area?.nome ?? term.area ?? term.categoria?.nome ?? '—'}
                  </td>
                  <td className="p-4">
                    <Link
                      className="inline-flex min-h-10 items-center underline"
                      to={`/termo/${term.id}`}
                    >
                      Ver termo
                      <span className="sr-only"> {nome}</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    ) : (
      <p role="status" className="border border-dashed border-[#D4D1CC] p-8">
        {allTerms.length === 0 ? requestMessages.emptyTerms : requestMessages.emptySearch}
      </p>
    )}
  </>
)}
  </>;
}
