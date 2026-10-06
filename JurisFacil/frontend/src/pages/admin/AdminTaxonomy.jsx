import { legalTerms } from '../../data/legalTerms';

export default function AdminTaxonomy({ type }) {
  const isArea = type === 'areas';
  const areas = [...new Set(legalTerms.map(term => term.category))].sort();
  return <>
    <h1 className="font-serif text-4xl sm:text-5xl">{isArea ? 'Áreas do Direito' : 'Categorias'}</h1>
    <p className="mt-4 max-w-2xl leading-7 text-[#55585B]">{isArea ? 'Campos do Direito usados para organizar os termos.' : 'Categorias agrupam termos por assunto, separadamente das áreas do Direito.'}</p>
    {isArea ? <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{areas.map(area => <li key={area} className="border border-[#D4D1CC] p-6">
      <h2 className="font-serif text-2xl">{area}</h2><p className="mt-3 text-sm text-[#696969]">{legalTerms.filter(term => term.category === area).length} termo(s)</p>
    </li>)}</ul> : <section className="mt-8 border border-dashed border-[#D4D1CC] p-8">
      <h2 className="font-serif text-3xl">Nenhuma categoria disponível</h2>
      <p className="mt-3 leading-7 text-[#55585B]">As categorias organizam os termos por assunto.</p>
    </section>}
  </>;
}
