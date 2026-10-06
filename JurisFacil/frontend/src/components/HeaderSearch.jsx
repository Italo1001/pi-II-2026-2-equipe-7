import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { legalTerms } from '../data/legalTerms';
import { searchTerms } from '../utils/search';

export default function HeaderSearch() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const container = useRef(null);
  const input = useRef(null);
  const id = useId();
  const results = searchTerms(legalTerms, query);
  const visible = open && Boolean(query.trim());

  useEffect(() => {
    function closeOutside(event) {
      if (!container.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, []);

  function submit(event) {
    event.preventDefault();
    setOpen(true);
    input.current.focus({ preventScroll: true });
  }

  return <div ref={container} className="relative min-w-0 flex-1 sm:max-w-xs"
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    onKeyDown={event => { if (event.key === 'Escape') { input.current.focus({ preventScroll: true }); setOpen(false); } }}>
    <form role="search" aria-label="Busca no cabeçalho" onSubmit={submit} className="flex h-12 border border-[#D4D1CC] bg-white/60 focus-within:border-[#8C7356]">
      <label htmlFor={id} className="sr-only">Pesquisar termo no cabeçalho</label>
      <input ref={input} id={id} type="search" value={query} autoComplete="off"
        placeholder="Pesquisar termo…" aria-controls={visible ? `${id}-results` : undefined}
        onFocus={() => setOpen(true)} onChange={event => { setQuery(event.target.value); setOpen(true); }}
        className="min-w-0 w-full bg-transparent px-3 text-sm outline-none" />
      <button type="submit" aria-label="Pesquisar no cabeçalho" className="grid min-w-12 place-items-center border-l border-[#D4D1CC] hover:bg-[#EEEAE4]">
        <Search size={18} aria-hidden="true" />
      </button>
    </form>
    {visible && <section id={`${id}-results`} aria-label="Resultados da busca no cabeçalho"
      className="fixed left-3 right-3 top-20 max-h-[65vh] overflow-y-auto border border-[#D4D1CC] bg-[#F9F8F6] shadow-xl sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-96">
      <div className="flex items-center justify-between border-b border-[#D4D1CC] px-4">
        <p role="status" className="text-xs text-[#55585B]">{results.length} {results.length === 1 ? 'termo encontrado' : 'termos encontrados'}</p>
        <button type="button" aria-label="Fechar resultados" onClick={() => { input.current.focus({ preventScroll: true }); setOpen(false); }} className="grid min-h-12 min-w-12 place-items-center"><X size={16} /></button>
      </div>
      {results.length ? <ul>{results.map(term => <li key={term.id}>
        <Link to={`/termo/${term.slug}`} onClick={() => { setOpen(false); setQuery(''); }}
          className="block border-b border-[#D4D1CC] px-4 py-4 last:border-0 hover:bg-[#EEEAE4]">
          <span className="block font-serif text-xl">{term.term}</span>
          <span className="mt-1 block text-xs text-[#696969]">{term.category}</span>
        </Link>
      </li>)}</ul> : <p className="p-5 text-sm text-[#55585B]">Nenhum termo encontrado. Tente outra palavra.</p>}
    </section>}
  </div>;
}
