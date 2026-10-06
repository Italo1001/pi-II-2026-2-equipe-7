import { useState } from 'react';
import { Link } from 'react-router-dom';
import { legalTerms } from '../../data/legalTerms';
import { searchTerms } from '../../utils/search';

export default function AdminTerms() {
  const [query, setQuery] = useState('');
  const terms = query.trim() ? searchTerms(legalTerms, query) : legalTerms;
  return <>
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div><h1 className="font-serif text-4xl sm:text-5xl">Termos</h1></div>
      <Link to="/admin/previa/termos/novo" className="inline-flex min-h-12 items-center bg-[#1A1C1E] px-5 text-white">Novo termo</Link>
    </div>
    <label htmlFor="admin-term-search" className="mb-2 mt-8 block text-sm font-semibold">Pesquisar na lista</label>
    <input id="admin-term-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Nome ou explicação do termo" className="min-h-12 w-full max-w-lg border border-[#D4D1CC] bg-white px-4" />
    <p role="status" className="my-4 text-sm text-[#696969]">{terms.length} termo(s) encontrado(s)</p>
    {terms.length ? <div className="overflow-x-auto border border-[#D4D1CC]"><table className="w-full text-left text-sm">
      <caption className="sr-only">Termos do dicionário</caption>
      <thead className="bg-[#EEEAE4]"><tr><th scope="col" className="p-4">Termo</th><th scope="col" className="p-4">Área</th><th scope="col" className="p-4">Consulta</th></tr></thead>
      <tbody>{terms.map(term => <tr key={term.id} className="border-t border-[#D4D1CC]">
        <th scope="row" className="p-4 font-medium">{term.term}</th><td className="p-4">{term.category}</td>
        <td className="p-4"><Link className="inline-flex min-h-10 items-center underline" to={`/termo/${term.slug}`}>Ver termo<span className="sr-only"> {term.term}</span></Link></td>
      </tr>)}</tbody>
    </table></div> : <p className="border border-dashed border-[#D4D1CC] p-8">Nenhum termo encontrado. Tente outra palavra.</p>}
  </>;
}
