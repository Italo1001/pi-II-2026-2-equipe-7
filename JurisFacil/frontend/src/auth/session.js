// Token somente em memória: recarregar/fechar a aba exige novo login.
// Ler exp serve para a interface. A assinatura e a autorização são verificadas no backend.
let snapshot = { session: null, reason: null };
let timer;
const listeners = new Set();

function publish(next) {
  snapshot = next;
  for (const listener of listeners) listener();
}

export function subscribeSession(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
export const getSessionSnapshot = () => snapshot;

export function endSession(reason = null, expectedToken) {
  if (expectedToken && snapshot.session?.token !== expectedToken) return;
  clearTimeout(timer);
  publish({ session: null, reason });
}

function scheduleExpiry(token, expiresAt) {
  clearTimeout(timer);
  const remaining = expiresAt - Date.now();
  if (remaining <= 0) {
    endSession('expired', token);
    return;
  }
  timer = setTimeout(() => scheduleExpiry(token, expiresAt), Math.min(remaining, 2147483647));
  timer.unref?.();
}

export function startSession(data) {
  try {
    if (typeof data?.token !== 'string' || data.token.split('.').length !== 3) throw new Error();
    const part = data.token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const claims = JSON.parse(atob(part.padEnd(Math.ceil(part.length / 4) * 4, '=')));
    const expiresAt = claims.exp * 1000;
    if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) throw new Error();
    if (!Array.isArray(claims.roles) || !claims.roles.includes('ADMIN')) throw new Error();
    if (data.administrador?.id == null || typeof data.administrador.nome !== 'string') throw new Error();
    const session = { token: data.token, administrador: data.administrador, expiresAt };
    clearTimeout(timer);
    publish({ session, reason: null });
    scheduleExpiry(session.token, expiresAt);
  } catch {
    const error = new Error('Resposta de autenticação inválida.');
    error.code = 'INVALID_RESPONSE';
    throw error;
  }
}

export function getAccessToken() {
  const session = snapshot.session;
  if (session && session.expiresAt <= Date.now()) {
    endSession('expired', session.token);
    return null;
  }
  return session?.token ?? null;
}

export function safeAdminDestination(path) {
  const allowed = ['/admin/previa', '/admin/previa/termos', '/admin/previa/termos/novo', '/admin/previa/areas', '/admin/previa/categorias'];
  return allowed.includes(path) ? path : '/admin/previa';
}
