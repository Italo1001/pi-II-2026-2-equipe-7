import test from 'node:test';
import assert from 'node:assert/strict';
import { startSession, endSession } from '../src/auth/session.js';
import { listarTermos, pesquisarTermo } from '../src/api/api.js';
import { canRetry, getRequestMessage, requestMessages } from '../src/utils/requestMessages.js';

test('preserva status HTTP e apresenta mensagens adequadas sem confundir 401 com sessão expirada', async t => {
  for (const [status, message, retry] of [
    [401, requestMessages.unauthorized, false],
    [403, requestMessages.forbidden, false],
    [404, requestMessages.notFound, false],
    [503, requestMessages.unavailable, true],
  ]) {
    t.mock.method(globalThis, 'fetch', async () => new Response('{}', { status }));
    await assert.rejects(listarTermos(), error => {
      assert.equal(error.status, status);
      assert.equal(getRequestMessage(error), message);
      assert.equal(canRetry(error), retry);
      return true;
    });
    t.mock.restoreAll();
  }
});

test('lista vazia é sucesso, não falha de conexão', async t => {
  t.mock.method(globalThis, 'fetch', async () => new Response('[]'));
  assert.deepEqual(await listarTermos(), []);
});

test('falha de rede permite nova tentativa', async t => {
  t.mock.method(globalThis, 'fetch', async () => { throw new TypeError('Failed to fetch'); });
  await assert.rejects(listarTermos(), error => {
    assert.equal(getRequestMessage(error), requestMessages.network);
    assert.equal(canRetry(error), true);
    return true;
  });
});

test('HTML recebido no lugar de JSON é erro de resposta', async t => {
  t.mock.method(globalThis, 'fetch', async () => new Response('<html></html>'));
  await assert.rejects(listarTermos(), error => error.code === 'INVALID_RESPONSE');
});

test('busca codifica o texto e repassa o sinal de cancelamento', async t => {
  const controller = new AbortController();
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(new URL(url, 'http://localhost').searchParams.get('q'), 'Dano & ação');
    assert.equal(options.signal, controller.signal);
    throw new DOMException('Aborted', 'AbortError');
  });
  await assert.rejects(pesquisarTermo('Dano & ação', { signal: controller.signal }), error => error.name === 'AbortError');
});

test('preserva listagem de áreas e cadastro/edição com IDs e token da sessão', async t => {
  const token = 'header.' + Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 60, roles: ['ADMIN'] })).toString('base64url') + '.signature';
  startSession({ token, administrador: { id: 1, nome: 'Teste' } });
  t.after(() => endSession());
  const { listarAreas, cadastrarTermo, editarTermo } = await import('../src/api/api.js');
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push({ url, ...options });
    return new Response(JSON.stringify(url === '/api/areas' ? [{ id: 7, nome: 'Civil' }] : { id: 9 }));
  });
  assert.equal((await listarAreas())[0].id, 7);
  const payload = { termo: 'Teste', significado: 'Texto', categoriaId: 3, areaId: 7 };
  await cadastrarTermo(payload);
  await editarTermo(9, payload);
  assert.equal(calls[1].method, 'POST');
  assert.deepEqual(JSON.parse(calls[1].body), payload);
  assert.equal(calls[0].headers.Authorization, undefined);
  assert.equal(calls[1].headers.Authorization, `Bearer ${token}`);
  assert.equal(calls[2].url, '/api/termos/9');
  assert.equal(calls[2].method, 'PUT');
  assert.equal(calls[2].headers.Authorization, `Bearer ${token}`);
});

test('uma lista malformada não é apresentada como banco vazio', async t => {
  t.mock.method(globalThis, 'fetch', async () => new Response('{"items":[]}'));
  await assert.rejects(listarTermos(), error => error.code === 'INVALID_RESPONSE');
});
