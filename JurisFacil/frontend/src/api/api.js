const API_URL = "http://localhost:8080";

async function getJson(url) {
    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error(`Falha na API (${resposta.status}): ${resposta.statusText}`);
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
