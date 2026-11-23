# Implementação — FRONTEND 2 (#117)

Data: 08/11/2026. Base: master b7920705b6429a14714a0f1193b89454d71d0e9b.
Branch: codex/frontend-2-117. Entrega para revisão por pull request.

## Escopo preparado

A issue #135 não nomeia as três telas. Para atender aos fluxos de consulta e alteração
previstos, esta proposta reaproveita e completa a listagem e o cadastro existentes,
e acrescenta a tela/rota de edição. A escolha deve ser revisada antes da publicação.

| Tela | Rota frontend | API | Requisito |
| --- | --- | --- | --- |
| Listagem administrativa | /admin/previa/termos | GET /termos | RF05, RF14 |
| Cadastro de termo | /admin/previa/termos/novo | GET /categorias, GET /areas, POST /termos | RF07, RF14 |
| Edição de termo | /admin/previa/termos/:id/editar | GET /termos/{id}, GET /categorias, GET /areas, PUT /termos/{id} | RF08, RF14 |

No navegador, as chamadas usam o prefixo /api. O proxy do Vite o remove para
acessar o backend local em localhost:8080, assim como a configuração do Nginx.

## Alterações propostas

- Listagem com pesquisa, estados de carregamento/vazio/erro, nova tentativa e links
  por ID numérico. A gravação bem-sucedida retorna à lista e refaz a consulta.
- Cadastro e edição enviam nome, significado, categoriaId e areaId conforme
  TermoRequest; os IDs vêm das opções da API e são convertidos para número.
- Validação de campos obrigatórios e texto composto apenas por espaços. Erros
  preservam os dados digitados; salvar fica indisponível durante a requisição.
- Campos sem suporte no DTO atual (explicação simples separada, exemplo e fonte)
  deixam de aparecer neste formulário, para não sugerir que foram persistidos.
  Nenhum campo do banco ou endpoint é removido.
- Autenticação reaproveita a estrutura do login do PR #154 (autor tmluizo),
  ajusta o destino para /admin/previa e usa as chaves token/user existentes.
  Os PRs #154 e #155 permanecem intocados.
- Acesso administrativo exige token não expirado e perfil ADMIN. Visitante segue
  ao login; outro perfil recebe a página de acesso negado. Ações administrativas
  ficam dentro da área protegida. Sair remove token e dados de perfil.
- POST/PUT enviam Authorization: Bearer; resposta 403 leva ao acesso negado.
  O frontend apenas adapta a interface aos claims; a assinatura do JWT e a
  autorização efetiva continuam sendo verificadas pelo backend.
- Correção de dois erros de lint preexistentes do painel: contador de exemplos
  não utilizado e setters redundantes na montagem da tela de categorias.
- Adição de jsdom como dependência de desenvolvimento e do comando npm test.

## Validação realizada

- npm test: 16 testes aprovados, com API simulada.
- npm run lint: aprovado em todo o frontend.
- npm run build: aprovado.
- git diff --check: aprovado.
- Não houve execução bem-sucedida de navegador visual: o Chromium local não pôde
  iniciar devido às restrições do ambiente. Não há evidência visual aprovada.
- Não houve teste completo com Spring Boot/PostgreSQL reais.

Os testes cobrem perfis, token expirado/malformado, login, logout, cabeçalho Bearer,
consulta pública sem token, links numéricos, envio de cadastro/edição, preservação
do formulário após falha, ID inválido, erro 403 e recuperação após erro 501.

## Dependências e limites para a entrega completa

1. Na master analisada, GET /areas retorna 501. Cadastro e edição precisam dessa
   rota para obter IDs válidos. A tela informa a indisponibilidade e permite nova
   tentativa; não inventa IDs nem simula uma gravação. Essa dependência é de backend.
2. GET /termos/{id} omite categoriaId no modelo atual. Na edição, se a associação
   não vier na resposta, o administrador precisa selecionar a categoria antes de
   salvar; há um aviso explícito. A área é associada pelo nome quando o ID é omitido.
3. Os testes usam o contrato atual com respostas simuladas. A aprovação definitiva
   da #135 exige validar os fluxos com as rotas reais disponíveis.
4. As issues #117/#135/#136 permanecem abertas até a validação completa.
   Esta entrega deve ser revisada por pull request antes de merge.

## Como verificar localmente

Dentro de JurisFacil/frontend:

    npm ci
    npm test
    npm run lint
    npm run build
    npm run dev

Com o backend em localhost:8080, abrir /admin/login e usar uma conta de teste.
Conferir também o bloqueio de /admin/previa/termos sem sessão e a página
/acesso-negado para um perfil autenticado sem ADMIN.
