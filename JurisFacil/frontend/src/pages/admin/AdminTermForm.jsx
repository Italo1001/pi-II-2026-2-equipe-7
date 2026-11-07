import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  cadastrarTermo,
  listarCategorias,
  listarTermos,
} from '../../api/api';

export default function AdminTermForm() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [loadingCategorias, setLoadingCategorias] = useState(true);

  const [nome, setNome] = useState('');
  const [tecnica, setTecnica] = useState('');
  const [simples, setSimples] = useState('');
  const [exemplo, setExemplo] = useState('');
  const [fonte, setFonte] = useState('');
  const [area, setArea] = useState('');
  const [categoriaId, setCategoriaId] = useState('');

 const [areas, setAreas] = useState([]);

  useEffect(() => {
    listarTermos()
      .then(termos => {
        setAreas([...new Set(termos.map(termo => termo.area))].sort());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    listarCategorias()
      .then(setCategorias)
      .catch(() => setCategorias([]))
      .finally(() => setLoadingCategorias(false));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    if (!categoriaId) {
      setMessage('Não há categorias disponíveis para selecionar.');
      return;
    }

    setLoading(true);

    try {
      await cadastrarTermo({
        termo: nome.trim(),
        significado: tecnica.trim(),
        categoriaId: Number(categoriaId),
        areaId: Number(area),
      });

      setMessage('Termo cadastrado com sucesso!');
      setNome('');
      setTecnica('');
      setSimples('');
      setExemplo('');
      setFonte('');
      setArea('');
      setCategoriaId('');
    } catch (error) {
      setMessage(
        `Não foi possível salvar o termo. ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Link
        to="/admin/previa/termos"
        className="inline-flex min-h-10 items-center text-sm underline"
      >
        Voltar aos termos
      </Link>

      <h1 className="mt-4 font-serif text-4xl sm:text-5xl">
        Novo termo
      </h1>

      <form
        className="mt-8 max-w-3xl space-y-6"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="term-nome" className="mb-2 block text-sm font-semibold">
            Nome do termo
          </label>
          <input
            id="term-nome"
            name="nome"
            value={nome}
            onChange={event => setNome(event.target.value)}
            maxLength={150}
            required
            placeholder="Ex.: Dano moral"
            className="min-h-12 w-full border border-[#D4D1CC] bg-white px-3"
          />
        </div>

        <div>
          <label htmlFor="term-tecnica" className="mb-2 block text-sm font-semibold">
            Definição técnica
          </label>
          <textarea
            id="term-tecnica"
            name="tecnica"
            value={tecnica}
            onChange={event => setTecnica(event.target.value)}
            required
            rows={3}
            placeholder="Descreva o significado jurídico."
            className="w-full border border-[#D4D1CC] bg-white p-3"
          />
        </div>

        <div>
          <label htmlFor="term-simples" className="mb-2 block text-sm font-semibold">
            Explicação simples
          </label>
          <textarea
            id="term-simples"
            value={simples}
            onChange={event => setSimples(event.target.value)}
            rows={3}
            placeholder="Explique de forma acessível."
            className="w-full border border-[#D4D1CC] bg-white p-3"
          />
        </div>

        <div>
          <label htmlFor="term-exemplo" className="mb-2 block text-sm font-semibold">
            Exemplo de uso
          </label>
          <textarea
            id="term-exemplo"
            value={exemplo}
            onChange={event => setExemplo(event.target.value)}
            rows={3}
            placeholder="Apresente uma situação prática."
            className="w-full border border-[#D4D1CC] bg-white p-3"
          />
        </div>

        <div>
          <label htmlFor="term-fonte" className="mb-2 block text-sm font-semibold">
            Fonte ou referência
          </label>
          <input
            id="term-fonte"
            value={fonte}
            onChange={event => setFonte(event.target.value)}
            placeholder="Ex.: Código Civil"
            className="min-h-12 w-full border border-[#D4D1CC] bg-white px-3"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="term-area" className="mb-2 block text-sm font-semibold">
              Área do Direito
            </label>
            <select
              id="term-area"
              value={area}
              onChange={event => setArea(event.target.value)}
              required
              className="min-h-12 w-full border border-[#D4D1CC] bg-white px-3"
            >
              <option value="">Selecione uma área</option>
              {areas.map(nomeArea => (
                <option key={nomeArea} value={nomeArea}>
                  {nomeArea}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="term-category" className="mb-2 block text-sm font-semibold">
              Categoria
            </label>
            <select
              id="term-category"
              value={categoriaId}
              onChange={event => setCategoriaId(event.target.value)}
              required
              disabled={loadingCategorias || categorias.length === 0}
              className="min-h-12 w-full border border-[#D4D1CC] bg-white px-3"
            >
              <option value="">
                {loadingCategorias
                  ? 'Carregando categorias...'
                  : categorias.length === 0
                    ? 'Nenhuma categoria disponível'
                    : 'Selecione uma categoria'}
              </option>

              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        {message && (
          <p
            role="alert"
            className="border-l-2 border-[#8C7356] bg-[#EEEAE4] p-4 text-sm leading-6"
          >
            {message}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={loading || loadingCategorias || categorias.length === 0}
            className="min-h-12 bg-[#1A1C1E] px-5 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Salvando...' : 'Salvar termo'}
          </button>

          <Link
            to="/admin/previa/termos"
            className="inline-flex min-h-12 items-center border border-[#D4D1CC] px-5"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </>
  );
}