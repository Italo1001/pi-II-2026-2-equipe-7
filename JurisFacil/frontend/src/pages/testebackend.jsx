import { useState } from 'react';
import { Link } from 'react-router-dom';
import { listarTermos, buscarTermo } from '../api/api';

export default function TesteBackend() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function consultar(action) {
    setLoading(true); setError(''); setData(null);
    try { setData(await action()); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }
  return <main className="mx-auto max-w-4xl p-8">
    <Link className="underline" to="/">Voltar ao dicionário</Link>
    <h1 className="my-6 font-serif text-4xl">Teste de integração</h1>
    <p>Ferramenta de diagnóstico. As telas públicas ainda usam dados locais.</p>
    <div className="my-6 flex gap-4">
      <button className="border p-3" disabled={loading} onClick={() => consultar(listarTermos)}>Listar termos</button>
      <button className="border p-3" disabled={loading} onClick={() => consultar(() => buscarTermo(1))}>Buscar termo 1</button>
    </div>
    {loading && <p role="status">Carregando…</p>}
    {error && <p role="alert">{error}</p>}
    {data !== null && <><p role="status">Consulta concluída.</p><pre className="mt-4 overflow-auto whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre></>}
  </main>;
}
