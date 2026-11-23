import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { sessionStatus, saveSession, clearSession } from '../src/auth/session.js';
import { cadastrarTermo, editarTermo, listarTermos, realizarLogin } from '../src/api/api.js';

const storage = new Map();
globalThis.localStorage = {
  getItem: key => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: key => storage.delete(key),
};
globalThis.window = new EventTarget();
const token = (roles, exp = Date.now() / 1000 + 3600) =>
  `header.${Buffer.from(JSON.stringify({ sub: '1', roles, exp })).toString('base64url')}.signature`;

beforeEach(() => storage.clear());

test('perfis ausentes, malformados e expirados não liberam administração', () => {
  for (const value of ['', 'inválido', token(['ADMIN'], 1)]) assert.equal(sessionStatus(value), 'anonymous');
  assert.equal(sessionStatus(token(['VISITANTE'])), 'forbidden');
  assert.equal(sessionStatus(token(undefined)), 'forbidden');
  assert.equal(sessionStatus(token(['ADMIN'])), 'admin');
});

test('login usa email e senha no corpo e armazena sessão compatível com PR #154', async () => {
  const jwt = token(['ADMIN']);
  globalThis.fetch = async (url, options) => {
    assert.equal(url, '/api/auth/login');
    assert.deepEqual(JSON.parse(options.body), { email: 'admin@example.test', senha: 'teste' });
    return Response.json({ token: jwt, administrador: { id: 1 } });
  };
  await realizarLogin('admin@example.test', 'teste');
  assert.equal(storage.get('token'), jwt);
  assert.deepEqual(JSON.parse(storage.get('user')), { id: 1 });
});

test('cadastro e edição enviam Bearer e identificadores numéricos', async () => {
  const jwt = token(['ADMIN']);
  saveSession({ token: jwt });
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return Response.json({ id: 10 });
  };
  const body = { termo: 'Dano moral', significado: 'Definição', categoriaId: 3, areaId: 4 };
  await cadastrarTermo(body);
  await editarTermo(10, body);
  assert.deepEqual(calls.map(call => [call.url, call.options.method]), [['/api/termos', 'POST'], ['/api/termos/10', 'PUT']]);
  for (const call of calls) {
    assert.equal(call.options.headers.Authorization, `Bearer ${jwt}`);
    assert.deepEqual(JSON.parse(call.options.body), body);
  }
});

test('visitante e perfil sem permissão não enviam gravações à API', async () => {
  globalThis.fetch = () => assert.fail('Não deveria enviar requisição');
  await assert.rejects(cadastrarTermo({}), error => error.status === 401);
  saveSession({ token: token(['VISITANTE']) });
  await assert.rejects(editarTermo(10, {}), error => error.status === 403);
});

test('consulta pública não envia token inválido ou exposto', async () => {
  storage.set('token', 'inválido');
  globalThis.fetch = async (_url, options) => {
    assert.equal(options.headers.Authorization, undefined);
    return Response.json([]);
  };
  assert.deepEqual(await listarTermos(), []);
});

test('erros 400, 401, 403, 404 e 501 são informados sem simular sucesso', async () => {
  saveSession({ token: token(['ADMIN']) });
  for (const status of [400, 401, 403, 404, 501]) {
    globalThis.fetch = async () => Response.json({}, { status });
    await assert.rejects(cadastrarTermo({}), error => error.status === status && Boolean(error.message));
  }
});

test('logout remove sessão e dados do perfil', () => {
  saveSession({ token: token(['ADMIN']), administrador: { id: 1 } });
  clearSession();
  assert.equal(storage.size, 0);
});
