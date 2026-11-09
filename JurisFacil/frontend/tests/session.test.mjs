import test from 'node:test';
import assert from 'node:assert/strict';
import { startSession, endSession, getSessionSnapshot, getAccessToken, safeAdminDestination } from '../src/auth/session.js';
import { autenticar, cadastrarTermo, listarTermos } from '../src/api/api.js';

function response(id = 'one', exp = Math.floor(Date.now() / 1000) + 60) {
  return {
    token: 'header.' + Buffer.from(JSON.stringify({ exp, roles: ['ADMIN'], jti: id })).toString('base64url') + '.signature',
    administrador: { id: 1, nome: 'Admin de teste' },
  };
}

test.afterEach(() => endSession());

test('login envia email/senha ao contrato real e não cria sessão em 401', async t => {
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, '/api/auth/login');
    assert.deepEqual(JSON.parse(options.body), { email: 'admin@example.test', senha: 'senha-de-teste' });
    assert.equal(options.headers.Authorization, undefined);
    return new Response('{}', { status: 401 });
  });
  await assert.rejects(autenticar(' admin@example.test ', 'senha-de-teste'), e => e.status === 401);
  assert.equal(getSessionSnapshot().session, null);
  assert.equal(getSessionSnapshot().reason, null);
});

test('resposta de login inválida não autoriza a interface', () => {
  assert.throws(() => startSession({ token: 'inválido' }));
  assert.equal(getSessionSnapshot().session, null);
});

test('expiração automática encerra sessão sem esperar a próxima requisição', t => {
  t.mock.timers.enable({ apis: ['Date', 'setTimeout'], now: 100000 });
  startSession(response('short', 102));
  assert.ok(getAccessToken());
  t.mock.timers.tick(2001);
  assert.equal(getAccessToken(), null);
  assert.equal(getSessionSnapshot().reason, 'expired');
});

test('401 autenticado encerra sessão, mas 403 preserva o login', async t => {
  const data = response();
  startSession(data);
  t.mock.method(globalThis, 'fetch', async () => new Response('{}', { status: 403 }));
  await assert.rejects(cadastrarTermo({}), e => e.status === 403);
  assert.equal(getAccessToken(), data.token);
  t.mock.restoreAll();
  t.mock.method(globalThis, 'fetch', async () => new Response('{}', { status: 401 }));
  await assert.rejects(cadastrarTermo({}), e => e.code === 'SESSION_INVALID');
  assert.equal(getAccessToken(), null);
  assert.equal(getSessionSnapshot().reason, 'invalid');
});

test('401 de consulta pública não encerra sessão administrativa', async t => {
  const data = response();
  startSession(data);
  t.mock.method(globalThis, 'fetch', async (_, options) => {
    assert.equal(options.headers.Authorization, undefined);
    return new Response('{}', { status: 401 });
  });
  await assert.rejects(listarTermos(), e => e.status === 401);
  assert.equal(getAccessToken(), data.token);
});

test('resposta 401 atrasada não encerra um novo login', async t => {
  let resolve;
  startSession(response('old'));
  t.mock.method(globalThis, 'fetch', () => new Promise(r => { resolve = r; }));
  const pending = cadastrarTermo({});
  const latest = response('new');
  startSession(latest);
  resolve(new Response('{}', { status: 401 }));
  await assert.rejects(pending, e => e.status === 401);
  assert.equal(getAccessToken(), latest.token);
});

test('logout impede operações protegidas e retorno aceita apenas rotas administrativas', async t => {
  startSession(response());
  endSession('signedOut');
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => { throw new Error('não chamar'); });
  await assert.rejects(cadastrarTermo({}), e => e.code === 'AUTH_REQUIRED');
  assert.equal(fetchMock.mock.callCount(), 0);
  assert.equal(safeAdminDestination('https://example.test'), '/admin/previa');
  assert.equal(safeAdminDestination('//example.test'), '/admin/previa');
  assert.equal(safeAdminDestination('/admin/previa/termos/novo'), '/admin/previa/termos/novo');
});
