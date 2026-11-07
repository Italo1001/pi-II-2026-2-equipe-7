const API_URL = "/api";

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

async function getJson(url) {
  const resposta = await fetch(url, {
    headers: getAuthHeaders(),
  });

  if (!resposta.ok) {
    const error = new Error(
      `Falha na API (${resposta.status}): ${resposta.statusText}`
    );

    error.status = resposta.status;
    throw error;
  }

  return await resposta.json();
}

export async function realizarLogin(email, senha) {
  const resposta = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha }),
  });

  if (!resposta.ok) {
    const errorData = await resposta.json().catch(() => ({}));
    throw new Error(errorData.message || `Erro ao fazer login (${resposta.status})`);
  }

  const dados = await resposta.json();

  if (dados.token) {
    localStorage.setItem('token', dados.token);
    if (dados.administrador) {
      localStorage.setItem('user', JSON.stringify(dados.administrador));
    }
  }

  return dados;
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
    headers: getAuthHeaders(),
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
    headers: getAuthHeaders(),
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