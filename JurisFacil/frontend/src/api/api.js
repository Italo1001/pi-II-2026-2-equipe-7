const API_URL = "/api";

async function getJson(url) {
  const resposta = await fetch(url);

  if (!resposta.ok) {
    const error = new Error(
      `Falha na API (${resposta.status}): ${resposta.statusText}`
    );

    error.status = resposta.status;
    throw error;
  }

  return await resposta.json();
}

export async function listarTermos() {
    return getJson(`${API_URL}/termos`);
}

export async function buscarTermo(id) {
    return getJson(`${API_URL}/termos/${id}`);
}

export async function pesquisarTermo(q) {
    const params = new URLSearchParams({ q });
    return getJson(`${API_URL}/termos/busca?${params}`);
}

export async function listarCategorias() {
    return getJson(`${API_URL}/categorias`);
}

export async function listarTermosPCategoria(id) {
    return getJson(`${API_URL}/categorias/${id}/termos`);
}

export async function cadastrarTermo(dados) {
  const resposta = await fetch(`${API_URL}/termos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    throw new Error(`Erro ao cadastrar termo: ${resposta.status}`);
  }

  return resposta.json();
}

export async function editarTermo(id, dados) {
  const resposta = await fetch(`${API_URL}/termos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    throw new Error(`Erro ao editar termo: ${resposta.status}`);
  }

  return resposta.json();
}

export async function listarAreas() {
  return getJson(`${API_URL}/areas`);
}