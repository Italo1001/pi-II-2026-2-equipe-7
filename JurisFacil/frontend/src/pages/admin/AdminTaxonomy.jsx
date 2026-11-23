import { listarAreas, listarCategorias } from '../../api/api';
import useApiResource from '../../hooks/useApiResource';
import RequestState from '../../components/RequestState';
import { requestMessages } from '../../utils/requestMessages';

export default function AdminTaxonomy({ type }) {
  const isArea = type === 'areas';
  const { data, loading, error, retry } = useApiResource(isArea ? listarAreas : listarCategorias);
  const items = data ?? [];
  return <>
    <h1 className="font-serif text-4xl sm:text-5xl">{isArea ? 'Áreas do Direito' : 'Categorias'}</h1>
    <p className="mt-4 max-w-2xl leading-7 text-[#55585B]">
      {isArea ? 'Campos do Direito usados para organizar os termos.' : 'Categorias agrupam termos por assunto, separadamente das áreas do Direito.'}
    </p>
    <RequestState loading={loading} loadingMessage={requestMessages.loadingData} error={error} onRetry={retry}
      empty={items.length === 0} emptyMessage={isArea ? requestMessages.emptyAreas : requestMessages.emptyCategories} />
    {!loading && !error && items.length > 0 && <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map(item => <li key={item.id} className="border border-[#D4D1CC] p-6">
        <h2 className="font-serif text-2xl">{item.nome}</h2>
      </li>)}
    </ul>}
  </>;
}
