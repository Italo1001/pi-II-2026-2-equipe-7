import { useState } from 'react';

export default function TesteBackend() {
  const [resultado, setResultado] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function consultar(caminho) {
    setCarregando(true);
    setResultado('Consultando o backend...');

    try {
      const resposta = await fetch(
        `http://localhost:8080${caminho}`
      );

      const texto = await resposta.text();

      setResultado(
        `Status HTTP: ${resposta.status}\n\n${texto}`
      );
    } catch (erro) {
      setResultado(`Erro: ${erro.message}`);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={{ padding: 30, fontFamily: 'Arial' }}>
      <h1>Teste de Integração - JurisFácil</h1>

      <button
        onClick={() => consultar('/termos')}
        disabled={carregando}
      >
        Listar termos
      </button>

      <button
        onClick={() => consultar('/termos/1')}
        disabled={carregando}
        style={{ marginLeft: 10 }}
      >
        Buscar termo 1
      </button>

      <h2>Resultado</h2>

      <pre style={{ whiteSpace: 'pre-wrap' }}>
        {resultado || 'Clique em um botão para testar.'}
      </pre>
    </div>
  );
}