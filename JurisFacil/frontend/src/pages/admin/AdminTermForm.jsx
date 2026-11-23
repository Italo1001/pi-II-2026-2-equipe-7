import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  cadastrarTermo,
  listarCategorias,
  listarAreas,
} from '../../api/api';

import useApiResource from '../../hooks/useApiResource';
import RequestState from '../../components/RequestState';
import { getRequestMessage, requestMessages } from '../../utils/requestMessages';

async function loadOptions(options) {
  const [categorias, areas] = await Promise.all([listarCategorias(options), listarAreas(options)]);
  return { categorias, areas };
}

export default function AdminTermForm() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { data, loading: loadingOptions, error, retry } = useApiResource(loadOptions);
  const categorias = data?.categorias ?? [];
  const areas = data?.areas ?? [];
  const [nome, setNome] = useState('');
  const [tecnica, setTecnica] = useState('');
  const [area, setArea] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const missingOptions = !loadingOptions && !error && (!areas.length || !categorias.length);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    if (!areas.some(item => String(item.id) === area) || !categorias.some(item => String(item.id) === categoriaId) || !nome.trim() || !tecnica.trim()) {
      setMessage(requestMessages.invalidForm);
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

      setMessage(requestMessages.saved);
      setNome('');
      setTecnica('');
      setArea('');
      setCategoriaId('');
    } catch (error) {
      setMessage(getRequestMessage(error));
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

      <RequestState loading={loadingOptions} loadingMessage={requestMessages.loadingData} error={error} onRetry={retry}
        empty={missingOptions} emptyMessage={requestMessages.missingOptions} />
      <form
        className="mt-8 max-w-3xl space-y-6"
        onSubmit={handleSubmit}
      >
        <fieldset disabled={loading || loadingOptions || Boolean(error) || missingOptions} className="space-y-6">
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

        <fieldset disabled aria-describedby="pending-fields-help" className="space-y-5 border border-[#D4D1CC] p-5">
          <legend className="px-2 text-sm font-semibold">Informações complementares</legend>
          <p id="pending-fields-help" className="text-sm leading-6 text-[#55585B]">{requestMessages.pendingFields}</p>
          <div>
            <label htmlFor="term-simples" className="mb-2 block text-sm font-semibold">Explicação simples</label>
            <textarea id="term-simples" rows={3} className="w-full border border-[#D4D1CC] bg-[#EEEAE4] p-3" />
          </div>
          <div>
            <label htmlFor="term-simplificada" className="mb-2 block text-sm font-semibold">Explicação simplificada</label>
            <textarea id="term-simplificada" rows={3} className="w-full border border-[#D4D1CC] bg-[#EEEAE4] p-3" />
          </div>
          <div>
            <label htmlFor="term-exemplo" className="mb-2 block text-sm font-semibold">Exemplo de uso</label>
            <textarea id="term-exemplo" rows={3} className="w-full border border-[#D4D1CC] bg-[#EEEAE4] p-3" />
          </div>
          <div>
            <label htmlFor="term-fonte" className="mb-2 block text-sm font-semibold">Fonte ou referência</label>
            <input id="term-fonte" type="text" className="min-h-12 w-full border border-[#D4D1CC] bg-[#EEEAE4] px-3" />
          </div>
        </fieldset>

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
              {areas.map(item => (
                <option key={item.id} value={item.id}>
                  {item.nome}
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
              disabled={loadingOptions || categorias.length === 0}
              className="min-h-12 w-full border border-[#D4D1CC] bg-white px-3"
            >
              <option value="">
                {loadingOptions
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

        </fieldset>
        {message && (
          <p
            role={message === requestMessages.saved ? "status" : "alert"}
            className="border-l-2 border-[#8C7356] bg-[#EEEAE4] p-4 text-sm leading-6"
          >
            {message}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={loading || loadingOptions || Boolean(error) || missingOptions}
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