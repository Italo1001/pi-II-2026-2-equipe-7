import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listarTermos } from '../../api/api';

export default function AdminTerms() {
  const [query, setQuery] = useState('');
  const [allTerms, setAllTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    listarTermos()
      .then(setAllTerms)
      .catch(() => setError('Não foi possível carregar os termos.'))
      .finally(() => setLoading(false));
  }, []);

  const terms = allTerms.filter(term =>
    `${term.nome ?? term.termo ?? ''} ${term.significado ?? term.definicao ?? ''}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );
  return <>
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div><h1 className="font-serif text-4xl sm:text-5xl">Termos</h1></div>
      <Link to="/admin/previa/termos/novo" className="inline-flex min-h-12 items-center bg-[#1A1C1E] px-5 text-white">Novo termo</Link>
    </div>
    <label htmlFor="admin-term-search" className="mb-2 mt-8 block text-sm font-semibold">Pesquisar na lista</label>
    <input id="admin-term-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Nome ou explicação do termo" className="min-h-12 w-full max-w-lg border border-[#D4D1CC] bg-white px-4" />
    {loading ? (
  <p className="my-4">Carregando termos...</p>
) : error ? (
  <p role="alert" className="my-4">{error}</p>
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
              const slug = term.slug ?? nome?.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');

              return (
                <tr key={term.id} className="border-t border-[#D4D1CC]">
                  <th scope="row" className="p-4 font-medium">{nome}</th>
                  <td className="p-4">
                    {term.area?.nome ?? term.area ?? term.categoria?.nome ?? '—'}
                  </td>
                  <td className="p-4">
                    <Link
                      className="inline-flex min-h-10 items-center underline"
                      to={`/termo/${slug}`}
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
      <p className="border border-dashed border-[#D4D1CC] p-8">
        Nenhum termo encontrado. Tente outra palavra.
      </p>
    )}
  </>
)}
  </>;
}
