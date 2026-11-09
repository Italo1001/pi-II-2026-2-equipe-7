import { endSession, getAccessToken, getSessionSnapshot } from '../auth/session.js';

const API_URL = '/api';

export class ApiError extends Error {
  constructor(status, code) {
    super(`Falha na API: ${code} (${status})`);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

async function requestJson(path, { signal, method = 'GET', data, authenticated = false } = {}) {
  const token = authenticated ? getAccessToken() : null;
  if (authenticated && !token) {
    throw new ApiError(401, getSessionSnapshot().reason === 'expired' ? 'SESSION_EXPIRED' : 'AUTH_REQUIRED');
  }
  const headers = { Accept: 'application/json' };
  if (data !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;
  let resposta;
  try {
    resposta = await fetch(`${API_URL}${path}`, {
      signal, method, headers,
      body: data === undefined ? undefined : JSON.stringify(data),
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new ApiError(0, 'NETWORK');
  }
  if (resposta.status === 401 && token) {
    // Uma resposta atrasada da sessão anterior não encerra um novo login.
    endSession('invalid', token);
    throw new ApiError(401, 'SESSION_INVALID');
  }
  if (!resposta.ok) throw new ApiError(resposta.status, 'HTTP');
  if (resposta.status === 204) return null;
  try {
    return await resposta.json();
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new ApiError(resposta.status, 'INVALID_RESPONSE');
  }
}

async function requestList(path, options) {
  const data = await requestJson(path, options);
  if (!Array.isArray(data) || data.some(item => !item || item.id == null || typeof item.nome !== 'string')) {
    throw new ApiError(200, 'INVALID_RESPONSE');
  }
  return data;
}

export const listarTermos = (options) => requestList('/termos', options);
export const buscarTermo = (id, options) => requestJson(`/termos/${encodeURIComponent(id)}`, options);
export const pesquisarTermo = (q, options) => requestList(`/termos/busca?${new URLSearchParams({ q })}`, options);
export const listarCategorias = (options) => requestList('/categorias', options);
export const listarTermosPCategoria = (id, options) => requestJson(`/categorias/${encodeURIComponent(id)}/termos`, options);
export const listarAreas = (options) => requestList('/areas', options);
export const cadastrarTermo = (dados, options) => requestJson('/termos', { ...options, authenticated: true, method: 'POST', data: dados });
export const editarTermo = (id, dados, options) => requestJson(`/termos/${encodeURIComponent(id)}`, { ...options, authenticated: true, method: 'PUT', data: dados });

export const autenticar = (email, senha, options) => requestJson('/auth/login', {
  ...options, authenticated: false, method: 'POST', data: { email: email.trim(), senha },
});
