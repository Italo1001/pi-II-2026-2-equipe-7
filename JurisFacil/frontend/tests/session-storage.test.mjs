import test from 'node:test';
import assert from 'node:assert/strict';

let sequence = 0;
function response(id = 'one', exp = Math.floor(Date.now() / 1000) + 60) {
  return {
    token: 'header.' + Buffer.from(JSON.stringify({ sub: '1', exp, roles: ['ADMIN'], jti: id })).toString('base64url') + '.signature',
    administrador: { id: 1, nome: 'Admin de teste', email: 'admin@example.test' },
  };
}
async function browserSession(t, initial = {}) {
  const values = new Map(Object.entries(initial));
  const browser = new EventTarget();
  browser.localStorage = {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: key => values.delete(key),
  };
  globalThis.window = browser;
  const session = await import(`../src/auth/session.js?storage-test=${++sequence}`);
  t.after(() => { session.endSession(); delete globalThis.window; });
  return { session, browser, store: browser.localStorage };
}
function writeSession(store, data) {
  store.setItem('user', JSON.stringify(data.administrador));
  store.setItem('token', data.token);
}
function storageEvent(browser, key = 'token') {
  const event = new Event('storage');
  Object.defineProperty(event, 'key', { value: key });
  browser.dispatchEvent(event);
}

test('restaura o token/user da equipe ao abrir ou recarregar a página', async t => {
  const data = response();
  const { session } = await browserSession(t, { token: data.token, user: JSON.stringify(data.administrador) });
  assert.equal(session.getAccessToken(), data.token);
  assert.equal(session.getSessionSnapshot().session.administrador.nome, data.administrador.nome);
});

test('login persiste somente token e perfil permitido; logout remove ambos', async t => {
  const { session, store } = await browserSession(t);
  const data = response();
  data.administrador.senha = 'nao-persistir';
  session.startSession(data);
  assert.equal(store.getItem('token'), data.token);
  assert.equal(JSON.parse(store.getItem('user')).senha, undefined);
  session.endSession('signedOut');
  assert.equal(store.getItem('token'), null);
  assert.equal(store.getItem('user'), null);
  assert.equal(session.getAccessToken(), null);
});

test('token expirado persistido é removido antes de autorizar a interface', async t => {
  const data = response('expired', 1);
  const { session, store } = await browserSession(t, { token: data.token, user: JSON.stringify(data.administrador) });
  assert.equal(session.getAccessToken(), null);
  assert.equal(session.getSessionSnapshot().reason, 'expired');
  assert.equal(store.getItem('token'), null);
  assert.equal(store.getItem('user'), null);
});

test('perfil persistido corrompido não quebra a página nem libera a sessão', async t => {
  const { session, store } = await browserSession(t, { token: response().token, user: '{broken' });
  assert.equal(session.getAccessToken(), null);
  assert.equal(session.getSessionSnapshot().reason, 'invalid');
  assert.equal(store.getItem('token'), null);
});

test('login e logout em outra aba atualizam o estado desta aba', async t => {
  const { session, browser, store } = await browserSession(t);
  const data = response('other-tab');
  writeSession(store, data);
  storageEvent(browser);
  assert.equal(session.getSessionSnapshot().session.token, data.token);
  store.removeItem('token');
  store.removeItem('user');
  storageEvent(browser);
  assert.equal(session.getSessionSnapshot().session, null);
  assert.equal(session.getSessionSnapshot().reason, 'signedOut');
});

test('401 antigo não apaga token renovado em outra aba antes do evento storage', async t => {
  const { session, store } = await browserSession(t);
  const old = response('old');
  const latest = response('new');
  session.startSession(old);
  writeSession(store, latest);
  session.endSession('invalid', old.token);
  assert.equal(session.getAccessToken(), latest.token);
  assert.equal(store.getItem('token'), latest.token);
});

test('expiração remove localStorage, mas temporizador antigo preserva renovação', async t => {
  t.mock.timers.enable({ apis: ['Date', 'setTimeout'], now: 100000 });
  const { session, store } = await browserSession(t);
  session.startSession(response('short', 102));
  writeSession(store, response('renewed', 110));
  t.mock.timers.tick(2001);
  assert.ok(session.getAccessToken());
  t.mock.timers.tick(8000);
  assert.equal(session.getAccessToken(), null);
  assert.equal(store.getItem('token'), null);
  assert.equal(session.getSessionSnapshot().reason, 'expired');
});

test('falha ao gravar localStorage não produz login falsamente bem-sucedido', async t => {
  const { session, store } = await browserSession(t);
  store.setItem = () => { throw new Error('armazenamento bloqueado'); };
  assert.throws(() => session.startSession(response()), error => error.code === 'STORAGE_UNAVAILABLE');
  assert.equal(session.getSessionSnapshot().session, null);
  assert.equal(store.getItem('token'), null);
});
