import { getToken, saveSession, sessionStatus } from '../auth/session.js';

const API_URL = '/api';

async function request(path, { method = 'GET', body, protectedRoute = false } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (protectedRoute) {
    const token = getToken();
    if (sessionStatus(token) !== 'admin') {
      const error = new Error('Você precisa de uma sessão de administrador válida.');
      error.status = sessionStatus(token) === 'forbidden' ? 403 : 401;
      throw error;
    }
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${API_URL}${path}`, {
    method, headers, ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  const data = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    const messages = {
      400: 'Verifique os dados informados.',
      401: 'Sua sessão não é válida. Entre novamente.',
      403: 'Seu perfil não tem permissão para esta ação.',
      404: 'O recurso solicitado não foi encontrado.',
      501: 'Esta funcionalidade ainda não está disponível no servidor.',
    };
    const error = new Error(messages[response.status] || 'Não foi possível concluir a solicitação. Tente novamente.');
    error.status = response.status;
    throw error;
  }
  return data;
}

export async function realizarLogin(email, senha) {
  const data = await request('/auth/login', { method: 'POST', body: { email, senha } });
  saveSession(data || {});
  return data;
}

export const listarTermos = () => request('/termos');
export const buscarTermo = id => request(`/termos/${encodeURIComponent(id)}`);
export const pesquisarTermo = q => request(`/termos/busca?${new URLSearchParams({ q })}`);
export const listarCategorias = () => request('/categorias');
export const listarTermosPCategoria = id => request(`/categorias/${encodeURIComponent(id)}/termos`);
export const listarAreas = () => request('/areas');
export const cadastrarTermo = body => request('/termos', { method: 'POST', body, protectedRoute: true });
export const editarTermo = (id, body) => request(`/termos/${encodeURIComponent(id)}`, { method: 'PUT', body, protectedRoute: true });
