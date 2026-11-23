import { useEffect, useState } from 'react';

// load é uma função estável, definida fora do componente.
export default function useApiResource(load, key = '') {
  const [response, setResponse] = useState(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    Promise.resolve().then(() => load({ signal: controller.signal, authenticated: true }, key))
      .then(data => {
        if (!controller.signal.aborted) setResponse({ load, key, attempt, data, error: null });
      })
      .catch(error => {
        if (!controller.signal.aborted) setResponse({ load, key, attempt, data: null, error });
      });
    return () => controller.abort();
  }, [load, key, attempt]);
  const current = response?.load === load && response?.key === key && response?.attempt === attempt;
  return {
    data: current ? response.data : null,
    error: current ? response.error : null,
    loading: !current,
    retry: () => setAttempt(value => value + 1),
  };
}
