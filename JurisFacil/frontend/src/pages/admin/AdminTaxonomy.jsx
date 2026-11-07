
import { useEffect, useState } from 'react';
import {
  listarTermos,
  listarCategorias,
} from '../../api/api';

export default function AdminTaxonomy({ type }) {
  const isArea = type === 'areas';

  const [areas, setAreas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [termos, setTermos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    setLoading(true);
    setErro('');

    Promise.all([listarTermos(), listarCategorias()])
      .then(([listaTermos, listaCategorias]) => {
        setTermos(listaTermos);
        setCategorias(listaCategorias);

        setAreas(
          [...new Set(listaTermos.map(term => term.area).filter(Boolean))].sort()
        );
      })
      .catch(error => {
        console.error(error);
        setErro('Não foi possível carregar os dados da API.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="mt-8">Carregando...</p>;
  }

  if (erro) {
    return <p className="mt-8" role="alert">{erro}</p>;
  }

  return (
    <>
      <h1 className="font-serif text-4xl sm:text-5xl">
        {isArea ? 'Áreas do Direito' : 'Categorias'}
      </h1>

      <p className="mt-4 max-w-2xl leading-7 text-[#55585B]">
        {isArea
          ? 'Campos do Direito usados para organizar os termos.'
          : 'Categorias agrupam termos por assunto, separadamente das áreas do Direito.'}
      </p>

      {isArea ? (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {areas.map(area => (
            <li key={area} className="border border-[#D4D1CC] p-6">
              <h2 className="font-serif text-2xl">{area}</h2>
              <p className="mt-3 text-sm text-[#696969]">
                {termos.filter(term => term.area === area).length} termo(s)
              </p>
            </li>
          ))}
        </ul>
      ) : categorias.length > 0 ? (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categorias.map(categoria => (
            <li key={categoria.id} className="border border-[#D4D1CC] p-6">
              <h2 className="font-serif text-2xl">{categoria.nome}</h2>
            </li>
          ))}
        </ul>
      ) : (
        <section className="mt-8 border border-dashed border-[#D4D1CC] p-8">
          <h2 className="font-serif text-3xl">
            Nenhuma categoria disponível
          </h2>
          <p className="mt-3 leading-7 text-[#55585B]">
            A API não retornou categorias.
          </p>
        </section>
      )}
    </>
  );
}