// Preserva as chaves token/user do login da equipe.
// Os claims orientam a interface; assinatura e autorização são validadas pelo backend.
let snapshot = { session: null, reason: null };
let timer;
const listeners = new Set();
const storage = () => typeof window === 'undefined' ? null : window.localStorage;

function publish(next) {
  snapshot = next;
  for (const listener of listeners) listener();
}

export function subscribeSession(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
export const getSessionSnapshot = () => snapshot;

function readSession(data) {
  if (typeof data?.token !== 'string') throw new Error();
  const parts = data.token.split('.');
  if (parts.length !== 3 || !parts.every(Boolean)) throw new Error();
  const part = parts[1].replace(/-/g, '+').replace(/_/g, '/');
  const claims = JSON.parse(atob(part.padEnd(Math.ceil(part.length / 4) * 4, '=')));
  if (typeof claims.exp !== 'number' || !Number.isFinite(claims.exp)) throw new Error();
  const expiresAt = claims.exp * 1000;
  if (!Number.isFinite(expiresAt)) throw new Error();
  if (expiresAt <= Date.now()) {
    const error = new Error();
    error.code = 'SESSION_EXPIRED';
    throw error;
  }
  if (!Array.isArray(claims.roles) || !claims.roles.includes('ADMIN')) throw new Error();
  if (data.administrador?.id == null || typeof data.administrador.nome !== 'string') throw new Error();
  if (claims.sub != null && String(data.administrador.id) !== String(claims.sub)) throw new Error();
  const administrador = { id: data.administrador.id, nome: data.administrador.nome };
  if (typeof data.administrador.email === 'string') administrador.email = data.administrador.email;
  return { token: data.token, administrador, expiresAt };
}

function clearStoredSession() {
  try {
    const store = storage();
    store?.removeItem('token');
    store?.removeItem('user');
    return true;
  } catch {
    return false;
  }
}

function clearSession(reason) {
  clearTimeout(timer);
  const cleared = clearStoredSession();
  publish({ session: null, reason: cleared ? reason : 'storageUnavailable' });
}

function scheduleExpiry(token, expiresAt) {
  clearTimeout(timer);
  const remaining = expiresAt - Date.now();
  if (remaining <= 0) {
    endSession('expired', token);
    return;
  }
  timer = setTimeout(() => {
    // Outra aba pode ter renovado a sessão antes de este temporizador executar.
    restoreSession();
    if (snapshot.session?.token === token) scheduleExpiry(token, expiresAt);
  }, Math.min(remaining, 2147483647));
  timer.unref?.();
}

export function restoreSession() {
  let token;
  let user;
  try {
    const store = storage();
    if (!store) return; // Execução de testes sem navegador.
    token = store.getItem('token');
    user = store.getItem('user');
  } catch {
    clearTimeout(timer);
    publish({ session: null, reason: 'storageUnavailable' });
    return;
  }
  if (!token) {
    clearTimeout(timer);
    if (snapshot.session) publish({ session: null, reason: 'signedOut' });
    return;
  }
  try {
    const session = readSession({ token, administrador: JSON.parse(user) });
    if (snapshot.session?.token === token && JSON.stringify(snapshot.session.administrador) === JSON.stringify(session.administrador)) return;
    publish({ session, reason: null });
    scheduleExpiry(token, session.expiresAt);
  } catch (error) {
    clearSession(error.code === 'SESSION_EXPIRED' ? 'expired' : 'invalid');
  }
}

export function endSession(reason = null, expectedToken) {
  // Um 401 atrasado não remove um login mais recente, inclusive em outra aba.
  restoreSession();
  if (expectedToken && snapshot.session?.token !== expectedToken) return;
  clearSession(reason);
}

export function startSession(data) {
  let session;
  try {
    session = readSession(data);
  } catch {
    const error = new Error('Resposta de autenticação inválida.');
    error.code = 'INVALID_RESPONSE';
    throw error;
  }
  try {
    const store = storage();
    // token por último: o evento já encontrará os dados do usuário.
    store?.setItem('user', JSON.stringify(session.administrador));
    store?.setItem('token', session.token);
  } catch {
    clearSession('storageUnavailable');
    const error = new Error('Não foi possível salvar a sessão.');
    error.code = 'STORAGE_UNAVAILABLE';
    throw error;
  }
  publish({ session, reason: null });
  scheduleExpiry(session.token, session.expiresAt);
}


export function getAccessToken() {
  restoreSession();
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

if (typeof window !== 'undefined') {
  restoreSession();
  window.addEventListener('storage', event => {
    if (event.key === 'token' || event.key === null) restoreSession();
  });
}
