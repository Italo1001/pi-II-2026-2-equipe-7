import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { buscarTermo, cadastrarTermo, editarTermo, listarAreas, listarCategorias } from '../../api/api';

const inputClass = 'min-h-12 w-full border border-[#D4D1CC] bg-white px-3 disabled:opacity-50';

export default function AdminTermForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const validId = !editing || /^[1-9]\d*$/.test(id);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [form, setForm] = useState({ termo: '', significado: '', categoriaId: '', areaId: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!validId) return;
    let active = true;
    Promise.all([listarCategorias(), listarAreas(), editing ? buscarTermo(id) : Promise.resolve(null)])
      .then(([categorias, areas, termo]) => {
        if (!Array.isArray(categorias) || !Array.isArray(areas)) throw new Error('O servidor retornou opções inválidas.');
        if (!active) return;
        setForm({
          termo: termo?.nome ?? termo?.termo ?? '',
          significado: termo?.significado ?? '',
          categoriaId: String(termo?.categoriaId ?? termo?.categoria?.id ?? ''),
          areaId: String(termo?.areaId ?? areas.find(area => area.nome === termo?.area)?.id ?? ''),
        });
        setLoaded({ id, attempt, categorias, areas });
      })
      .catch(failure => {
        if (active) setLoaded({ id, attempt, error: failure.message });
      });
    return () => { active = false; };
  }, [id, editing, validId, attempt]);

  function update(event) {
    setForm(previous => ({ ...previous, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    if (saving) return;
    setError('');
    if (!form.termo.trim() || !form.significado.trim()) {
      setError('Preencha o nome e o significado com texto válido.');
      return;
    }
    if (!loaded.categorias.some(item => String(item.id) === form.categoriaId)
        || !loaded.areas.some(item => String(item.id) === form.areaId)) {
      setError('Selecione uma categoria e uma área disponíveis.');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        termo: form.termo.trim(), significado: form.significado.trim(),
        categoriaId: Number(form.categoriaId), areaId: Number(form.areaId),
      };
      if (editing) await editarTermo(id, payload);
      else await cadastrarTermo(payload);
      navigate('/admin/previa/termos', { replace: true, state: { message: editing ? 'Termo atualizado com sucesso.' : 'Termo cadastrado com sucesso.' } });
    } catch (failure) {
      if (failure.status === 403) navigate('/acesso-negado');
      else setError(failure.message || 'Não foi possível salvar o termo.');
    } finally {
      setSaving(false);
    }
  }

  const ready = loaded?.id === id && loaded?.attempt === attempt;
  const unavailable = ready && !loaded.error && (!loaded.categorias.length || !loaded.areas.length);

  return <>
    <Link to="/admin/previa/termos" className="inline-flex min-h-10 items-center text-sm underline">Voltar aos termos</Link>
    <h1 className="mt-4 font-serif text-4xl sm:text-5xl">{editing ? 'Editar termo' : 'Novo termo'}</h1>
    <p className="mt-4 max-w-2xl leading-7 text-[#55585B]">Informe o nome, o significado e a classificação do termo.</p>
    {!validId ? <p role="alert" className="mt-8">Identificador de termo inválido.</p>
      : !ready ? <p role="status" className="mt-8">Carregando formulário...</p>
      : loaded.error ? <section className="mt-8 border border-[#D4D1CC] p-6">
        <p role="alert">{loaded.error}</p>
        <button className="mt-4 min-h-12 underline" onClick={() => setAttempt(value => value + 1)}>Tentar novamente</button>
      </section>
      : <form onSubmit={submit} className="mt-8 max-w-3xl space-y-6">
        <div>
          <label htmlFor="term-name" className="mb-2 block text-sm font-semibold">Nome do termo</label>
          <input id="term-name" name="termo" value={form.termo} onChange={update} required maxLength={150} disabled={saving} className={inputClass} />
        </div>
        <div>
          <label htmlFor="term-definition" className="mb-2 block text-sm font-semibold">Significado</label>
          <textarea id="term-definition" name="significado" value={form.significado} onChange={update} required rows={5} disabled={saving} className="w-full border border-[#D4D1CC] bg-white p-3" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="term-category" className="mb-2 block text-sm font-semibold">Categoria</label>
            <select id="term-category" name="categoriaId" value={form.categoriaId} onChange={update} required disabled={saving || unavailable} className={inputClass}>
              <option value="">Selecione uma categoria</option>
              {loaded.categorias.map(item => <option key={item.id} value={item.id}>{item.nome}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="term-area" className="mb-2 block text-sm font-semibold">Área do Direito</label>
            <select id="term-area" name="areaId" value={form.areaId} onChange={update} required disabled={saving || unavailable} className={inputClass}>
              <option value="">Selecione uma área</option>
              {loaded.areas.map(item => <option key={item.id} value={item.id}>{item.nome}</option>)}
            </select>
          </div>
        </div>
        {editing && !form.categoriaId && <p className="text-sm text-[#55585B]">Confira a categoria antes de salvar: o detalhe recebido não informa essa associação.</p>}
        {unavailable && <p role="alert">É necessário ter categorias e áreas disponíveis para salvar um termo.</p>}
        {error && <p role="alert" className="border-l-2 border-red-800 bg-red-50 p-4">{error}</p>}
        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={saving || unavailable} className="min-h-12 bg-[#1A1C1E] px-5 text-white disabled:opacity-50">{saving ? 'Salvando...' : editing ? 'Salvar alterações' : 'Cadastrar termo'}</button>
          <Link to="/admin/previa/termos" className="inline-flex min-h-12 items-center border border-[#D4D1CC] px-5">Cancelar</Link>
        </div>
      </form>}
  </>;
}
