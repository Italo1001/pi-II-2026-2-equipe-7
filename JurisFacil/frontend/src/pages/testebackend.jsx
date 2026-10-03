import { useState } from 'react';

export default function TesteBackend() {
  const [termos, setTermos] = useState([]);
  const [termo, setTermo] = useState(null);


  function listarTermos() {
fetch('http://localhost:8080/termos', {
  headers: {
    Authorization:
      'Basic ' +
      btoa('user:57532ec4-b9ea-42c5-867a-843a9b32600e'),
  },
})
      .then(response => response.json())
      .then(data => setTermos(data))
      .catch(error => console.error(error));
  }

  function buscarTermo() {
fetch('/termos/1', { 
    headers: {
    Authorization:
      'Basic ' +
      btoa('user:57532ec4-b9ea-42c5-867a-843a9b32600e'),
  },
})
      .then(response => response.json())
      .then(data => setTermo(data))
      .catch(error => console.error(error));
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1>Teste de Integração</h1>

      <button onClick={listarTermos}>
        Listar termos
      </button>

      <button onClick={buscarTermo} style={{ marginLeft: '10px' }}>
        Buscar termo 1
      </button>

      <h2>Todos os termos</h2>

      {termos.map(item => (
        <div key={item.id}>
          <strong>{item.termo}</strong>
          <p>{item.definicao}</p>
        </div>
      ))}

      {termo && (
        <div>
          <h2>Termo encontrado</h2>
          <strong>{termo.termo}</strong>
          <p>{termo.definicao}</p>
        </div>
      )}
    </div>
  );
}