import { test, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { createServer } from 'vite';
import React, { act } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/' });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.localStorage = dom.window.localStorage;
globalThis.Event = dom.window.Event;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const { createRoot } = await import('react-dom/client');
const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' });
const Form = (await vite.ssrLoadModule('/src/pages/admin/AdminTermForm.jsx')).default;
const Terms = (await vite.ssrLoadModule('/src/pages/admin/AdminTerms.jsx')).default;
const Gate = (await vite.ssrLoadModule('/src/auth/RequireAdmin.jsx')).default;
const node = document.getElementById('root');
let root;
let writes;
let unavailable;
const jwt = roles => 'header.' + Buffer.from(JSON.stringify({ sub: '1', roles, exp: Date.now() / 1000 + 3600 })).toString('base64url') + '.signature';
const h = React.createElement;
beforeEach(async () => {
  if (root) await act(async () => root.unmount());
  root = createRoot(node);
  localStorage.clear();
  localStorage.setItem('token', jwt(['ADMIN']));
  writes = [];
  unavailable = false;
  globalThis.fetch = async (url, options) => {
    if (options.method === 'POST' || options.method === 'PUT') {
      writes.push({ url, ...options });
      return Response.json({ id: 10 });
    }
    if (url.endsWith('/categorias')) return Response.json([{ id: 3, nome: 'Civil' }]);
    if (url.endsWith('/areas')) return unavailable ? Response.json({}, { status: 501 }) : Response.json([{ id: 4, nome: 'Direito Civil' }]);
    if (url.endsWith('/termos/10')) return Response.json({ id: 10, nome: 'Dano moral', significado: 'Definição', area: 'Direito Civil' });
    return Response.json([{ id: 10, nome: 'Dano moral', significado: 'Definição', area: 'Direito Civil' }]);
  };
});
after(async () => { if (root) await act(async () => root.unmount()); await vite.close(); dom.window.close(); });
async function render(path, element, route) {
  await act(async () => {
    root.render(h(MemoryRouter, { initialEntries: [path] },
      h(Routes, null,
        h(Route, { path: route, element }),
        h(Route, { path: '/admin/previa/termos', element: h('p', null, 'Lista após salvar') }),
        h(Route, { path: '/admin/login', element: h('p', null, 'Login obrigatório') }),
        h(Route, { path: '/acesso-negado', element: h('p', null, 'Acesso negado') })
      )));
  });
}
async function fill(name, value) {
  const field = document.querySelector('[name="' + name + '"]');
  const prototype = field.tagName === 'SELECT' ? window.HTMLSelectElement.prototype : field.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
  await act(async () => {
    Object.getOwnPropertyDescriptor(prototype, 'value').set.call(field, value);
    field.dispatchEvent(new Event(field.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }));
  });
}

test('listagem usa o identificador numérico nos links de consulta e edição', async () => {
 await render('/lista', h(Terms), '/lista');
 assert.equal(document.querySelector('a[href="/termo/10"]').textContent.trim(), 'Ver termo Dano moral');
 assert.ok(document.querySelector('a[href="/admin/previa/termos/10/editar"]'));
});

test('cadastro envia dados válidos e segue para listagem', async () => {
 await render('/novo', h(Form), '/novo');
 await fill('termo', '  Novo termo  ');
 await fill('significado', '  Significado  ');
 await fill('categoriaId', '3');
 await fill('areaId', '4');
 await act(async () => document.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
 assert.equal(writes.length, 1);
 assert.equal(writes[0].url, '/api/termos');
 assert.equal(writes[0].method, 'POST');
 assert.deepEqual(JSON.parse(writes[0].body), { termo: 'Novo termo', significado: 'Significado', categoriaId: 3, areaId: 4 });
 assert.match(node.textContent, /Lista após salvar/);
});

test('edição carrega detalhe e exige confirmar categoria quando omitida pela API', async () => {
 await render('/termos/10/editar', h(Form), '/termos/:id/editar');
 assert.equal(document.querySelector('[name="termo"]').value, 'Dano moral');
 assert.equal(document.querySelector('[name="areaId"]').value, '4');
 assert.equal(document.querySelector('[name="categoriaId"]').value, '');
 await fill('termo', 'Termo revisado');
 await fill('categoriaId', '3');
 await act(async () => document.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
 assert.equal(writes[0].method, 'PUT');
 assert.equal(writes[0].url, '/api/termos/10');
 assert.equal(JSON.parse(writes[0].body).termo, 'Termo revisado');
});

test('backend indisponível mostra erro e tentar novamente recupera o formulário', async () => {
 unavailable = true;
 await render('/novo', h(Form), '/novo');
 assert.match(node.textContent, /ainda não está disponível/);
 assert.equal(document.querySelector('form'), null);
 unavailable = false;
 await act(async () => document.querySelector('button').click());
 assert.ok(document.querySelector('form'));
});

test('nome composto só por espaços não é salvo', async () => {
 await render('/novo', h(Form), '/novo');
 await fill('termo', '   ');
 await fill('significado', 'Texto');
 await act(async () => document.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
 assert.equal(writes.length, 0);
 assert.match(node.textContent, /texto válido/);
});

test('visitante é redirecionado e perfil sem ADMIN não vê ações administrativas', async () => {
 localStorage.clear();
 await render('/privado', h(Gate), '/privado');
 assert.match(node.textContent, /Login obrigatório/);
 await act(async () => root.unmount());
 root = createRoot(node);
 localStorage.setItem('token', jwt(['VISITANTE']));
 await render('/privado', h(Gate), '/privado');
 assert.match(node.textContent, /Acesso negado/);
 assert.equal(document.querySelector('form'), null);
});

test('identificador inválido não consulta nem grava o termo', async () => {
 globalThis.fetch = () => assert.fail('Identificador inválido não deve consultar API');
 await render('/termos/abc/editar', h(Form), '/termos/:id/editar');
 assert.match(node.textContent, /Identificador de termo inválido/);
 assert.equal(document.querySelector('form'), null);
});

test('403 do servidor leva à tela de acesso negado sem mensagem de sucesso', async () => {
 await render('/termos/10/editar', h(Form), '/termos/:id/editar');
 await fill('categoriaId', '3');
 globalThis.fetch = async () => Response.json({}, { status: 403 });
 await act(async () => document.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
 assert.match(node.textContent, /Acesso negado/);
 assert.doesNotMatch(node.textContent, /Lista após salvar/);
});

test('falha de gravação preserva o formulário para correção', async () => {
 await render('/termos/10/editar', h(Form), '/termos/:id/editar');
 await fill('categoriaId', '3');
 await fill('termo', 'Nome preservado');
 globalThis.fetch = async () => Response.json({}, { status: 400 });
 await act(async () => document.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
 assert.match(node.textContent, /Verifique os dados/);
 assert.equal(document.querySelector('[name="termo"]').value, 'Nome preservado');
 assert.equal(document.querySelector('button[type="submit"]').disabled, false);
});
