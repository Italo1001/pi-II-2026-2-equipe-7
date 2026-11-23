export function readClaims(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3 || !parts.every(Boolean)) return null;
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const claims = JSON.parse(atob(payload));
    if (!claims.sub || !Number.isFinite(claims.exp) || claims.exp * 1000 <= Date.now()) return null;
    return claims;
  } catch {
    return null;
  }
}

// This only controls the interface. The API verifies the JWT signature and permissions.
export function sessionStatus(token) {
  const claims = readClaims(token);
  if (!claims) return 'anonymous';
  return Array.isArray(claims.roles) && claims.roles.includes('ADMIN') ? 'admin' : 'forbidden';
}

export function getToken() {
  return localStorage.getItem('token') || '';
}

export function clearSession() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.dispatchEvent(new Event('jurisfacil-session'));
}

export function saveSession(data) {
  if (sessionStatus(data.token || '') === 'anonymous') throw new Error('A sessão retornada é inválida.');
  localStorage.setItem('token', data.token);
  if (data.administrador) localStorage.setItem('user', JSON.stringify(data.administrador));
  else localStorage.removeItem('user');
  window.dispatchEvent(new Event('jurisfacil-session'));
}
