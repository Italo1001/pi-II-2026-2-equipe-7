const API_URL = "http://localhost:8080";

export async function listarTermos() {
    const resposta = await fetch(`${API_URL}/termos`);
    return await resposta.json();
}

export async function buscarTermo(id) {
    const resposta = await fetch(`${API_URL}/termos/${id}`);
    return await resposta.json();
}

export async function pesquisarTermo(q) {
    const resposta = await fetch(`${API_URL}/termos/busca?q=${q}`);
    return await resposta.json();
}

export async function listarCategorias() {
    const resposta = await fetch(`${API_URL}/categorias`);
    return await resposta.json();
}

export async function listarTermosPCategoria(id) {
    const resposta = await fetch(`${API_URL}/categorias/${id}termos`);
    return await resposta.json();
}
