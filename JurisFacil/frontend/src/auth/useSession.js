import { useEffect, useSyncExternalStore } from 'react';
import { clearSession, getToken, readClaims, sessionStatus } from './session';

function subscribe(callback) {
  window.addEventListener('storage', callback);
  window.addEventListener('jurisfacil-session', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('jurisfacil-session', callback);
  };
}

export function useSession() {
  const token = useSyncExternalStore(subscribe, getToken, () => '');
  useEffect(() => {
    const claims = readClaims(token);
    if (!claims) return;
    const timer = setTimeout(clearSession, Math.min(claims.exp * 1000 - Date.now(), 2147483647));
    return () => clearTimeout(timer);
  }, [token]);
  return sessionStatus(token);
}
