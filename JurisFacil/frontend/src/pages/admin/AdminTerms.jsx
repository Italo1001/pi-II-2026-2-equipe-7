import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listarTermos } from '../../api/api';
import { useSession } from '../../auth/useSession';

export default function AdminTerms() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const location = useLocation();
  const status = useSession();

  useEffect(() => {
    let active = true;
    listarTermos()
      .then(termos => {
        if (!Array.isArray(termos)) throw new Error('Resposta inválida ao carregar os termos.');
        if (active) setResult({ attempt, termos });
      })
      .catch(error => { if (active) setResult({ attempt, error: error.message }); });
    return () => { active = false; };
  }, [attempt]);

  const terms = (result?.termos ?? []).filter(term =>
    `${term.nome ?? term.termo ?? ''} ${term.significado ?? ''}`.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR'))
  );

  return <>
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[.2em] text-[#8C7356]">Administração</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Termos jurídicos</h1>
      </div>
      {status === 'admin' && <Link to="/admin/previa/termos/novo" className="inline-flex min-h-12 items-center bg-[#1A1C1E] px-5 text-white">Novo termo</Link>}
    </div>
    {location.state?.message && <p role="status" className="mt-6 border-l-2 border-[#8C7356] bg-[#EEEAE4] p-4">{location.state.message}</p>}
    <label htmlFor="admin-term-search" className="mb-2 mt-8 block text-sm font-semibold">Pesquisar na lista</label>
    <input id="admin-term-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Nome ou significado do termo" className="min-h-12 w-full max-w-lg border border-[#D4D1CC] bg-white px-4" />
    {result?.attempt !== attempt ? <p role="status" className="mt-8">Carregando termos...</p>
      : result.error ? <section className="mt-8 border border-[#D4D1CC] p-6">
        <p role="alert">{result.error}</p><button onClick={() => setAttempt(value => value + 1)} className="mt-4 min-h-12 underline">Tentar novamente</button>
      </section>
      : <>
        <p role="status" className="my-4 text-sm text-[#696969]">{terms.length} termo(s) encontrado(s)</p>
        {!terms.length ? <p className="border border-dashed border-[#D4D1CC] p-8">{query ? 'Nenhum termo encontrado. Tente outra palavra.' : 'Nenhum termo cadastrado.'}</p>
          : <div className="overflow-x-auto border border-[#D4D1CC]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#EEEAE4]"><tr><th scope="col" className="p-4">Termo</th><th scope="col" className="p-4">Área</th><th scope="col" className="p-4">Ações</th></tr></thead>
              <tbody>{terms.map(term => <tr key={term.id} className="border-t border-[#D4D1CC]">
                <th scope="row" className="p-4 font-medium">{term.nome ?? term.termo}</th>
                <td className="p-4">{term.area?.nome ?? term.area ?? '—'}</td>
                <td className="p-4"><div className="flex flex-wrap gap-4">
                  <Link className="inline-flex min-h-10 items-center underline" to={`/termo/${term.id}`}>Ver termo<span className="sr-only"> {term.nome ?? term.termo}</span></Link>
                  {status === 'admin' && <Link className="inline-flex min-h-10 items-center underline" to={`/admin/previa/termos/${term.id}/editar`}>Editar<span className="sr-only"> {term.nome ?? term.termo}</span></Link>}
                </div></td>
              </tr>)}</tbody>
            </table>
          </div>}
      </>}
  </>;
}
