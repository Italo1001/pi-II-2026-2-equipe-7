import { useEffect, useSyncExternalStore } from 'react';
import { getAccessToken, getSessionSnapshot, subscribeSession } from './session';

export default function useSession() {
  const snapshot = useSyncExternalStore(subscribeSession, getSessionSnapshot, getSessionSnapshot);
  useEffect(() => {
    const checkExpiry = () => { getAccessToken(); };
    window.addEventListener('focus', checkExpiry);
    document.addEventListener('visibilitychange', checkExpiry);
    return () => {
      window.removeEventListener('focus', checkExpiry);
      document.removeEventListener('visibilitychange', checkExpiry);
    };
  }, []);
  return snapshot;
}
