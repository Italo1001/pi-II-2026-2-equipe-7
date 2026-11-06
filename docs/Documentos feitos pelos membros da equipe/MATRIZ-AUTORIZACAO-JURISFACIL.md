# Matriz de Autorização — JurisFácil

**Projeto:** JurisFácil — Dicionário Jurídico  
**Repositório:** https://github.com/Italo1001/pi-II-2026-2-equipe-7  
**Data de elaboração:** 06/11/2026

## 1. Objetivo

Este documento define **quem pode acessar cada tela e executar cada operação** do JurisFácil. A matriz segue o formato do documento de exemplo disponibilizado e adapta as permissões às funcionalidades do dicionário jurídico.

O JurisFácil permite que qualquer pessoa consulte os termos, significados, exemplos e categorias sem criar uma conta. As tarefas de cadastro, edição e exclusão de conteúdo ficam reservadas aos administradores.

> **Importante:** esta matriz descreve as **permissões que o sistema deve respeitar**, e não garante que todas já estejam funcionando no código. Os caminhos marcados como **confirmados** foram vistos nos arquivos consultados; os demais devem ser conferidos com a equipe antes de serem tratados como rotas implementadas.

## 2. Perfis de acesso

| Perfil | Descrição |
|---|---|
| **Visitante (usuário comum)** | Pessoa que acessa o site sem login. Pode pesquisar e ler o conteúdo público. |
| **Administrador** | Pessoa que realizou login administrativo. Pode consultar o conteúdo público e gerenciar os termos, categorias e áreas do Direito. |

**Legenda:** **Sim** = permitido; **Não** = proibido; **Público** = permitido sem login. O administrador também tem acesso às funcionalidades públicas.

## 3. Matriz de autorização por operação

| Operação | Visitante | Administrador | Requisito | Regra de acesso |
|---|:---:|:---:|:---:|---|
| Abrir a página inicial | Público | Sim | RF05 | Exibir os conteúdos destinados à consulta. |
| Listar termos jurídicos | Público | Sim | RF05 | Apenas consulta; não permite alterar o cadastro. |
| Pesquisar um termo pelo nome | Público | Sim | RF01 | A pesquisa não exige login. |
| Consultar o significado de um termo | Público | Sim | RF02 | Termo consultado deve existir. |
| Consultar exemplos de uso | Público | Sim | RF03 | Os exemplos fazem parte da consulta pública. |
| Visualizar categorias e áreas do Direito | Público | Sim | RF04 | Somente leitura para visitantes. |
| Filtrar termos por categoria | Público | Sim | RF12 | Retornar os termos da categoria escolhida. |
| Visualizar aviso de termo não encontrado | Público | Sim | RF11 | Informar quando não houver resultado. |
| Consultar informações sobre o projeto | Público | Sim | RF13 | Conteúdo informativo, sem edição pelo visitante. |
| Abrir a tela de login administrativo | Público | Sim | RF06 | A tela pode ser aberta sem estar autenticado. |
| Realizar login administrativo | Público | Sim | RF06, RF14 | Somente credenciais válidas dão acesso à administração. |
| Abrir o painel administrativo | Não | Sim | RF14 | Exige administrador autenticado. |
| Listar termos na área administrativa | Não | Sim | RF05, RF14 | Exige administrador autenticado. |
| Cadastrar termo jurídico | Não | Sim | RF07, RF14 | Exige dados válidos, inclusive nome, significado e categoria. |
| Editar termo jurídico | Não | Sim | RF08, RF14 | Alterar somente termo existente; validar dados enviados. |
| Excluir termo jurídico | Não | Sim | RF09, RF14 | Confirmar a exclusão e verificar se o termo existe. |
| Abrir gerenciamento de categorias | Não | Sim | RF10, RF14 | Acesso restrito à área administrativa. |
| Cadastrar, editar ou excluir categorias | Não | Sim | RF10, RF14 | Verificar os dados e possíveis vínculos com termos. |
| Abrir gerenciamento de áreas do Direito | Não | Sim | RF10, RF14* | Acesso administrativo previsto na interface consultada. |
| Alterar áreas do Direito | Não | Sim | RF10, RF14* | Operação administrativa; verificar se a API possui essas rotas. |

\* **Áreas do Direito:** as telas de áreas aparecem no código do frontend consultado, mas o README não traz um requisito funcional separado para elas. O vínculo com RF10 é uma associação de documentação a ser validada pela equipe.

## 4. Matriz de autorização das telas (frontend)

Na versão de `App.jsx` consultada no histórico do repositório, os caminhos abaixo eram definidos no React Router. **Eles devem ser conferidos com a versão atual do frontend**, pois a estrutura do projeto pode ter mudado.

| Tela | Caminho encontrado | Visitante | Administrador | Regra |
|---|---|:---:|:---:|---|
| Página inicial, lista e pesquisa | `/` | Sim | Sim | Página pública. |
| Detalhes de um termo | `/termo/:id` | Sim | Sim | Mostrar definição e exemplos. |
| Login do administrador | `/admin/login` | Sim | Sim | Somente o login válido libera a administração. |
| Visão geral administrativa | `/admin/previa` | Não | Sim | Proteger o acesso ao painel. |
| Lista administrativa de termos | `/admin/previa/termos` | Não | Sim | Proteger as opções de gerenciamento. |
| Formulário de novo termo | `/admin/previa/termos/novo` | Não | Sim | Somente administrador pode cadastrar. |
| Gerenciamento de categorias | `/admin/previa/categorias` | Não | Sim | Somente administrador pode alterar categorias. |
| Gerenciamento de áreas | `/admin/previa/areas` | Não | Sim | Somente administrador pode alterar áreas. |
| Página de teste da API | `/teste` | **Restringir em produção** | **Restringir em produção** | Rota técnica; não deve expor informações sensíveis. |
| Página não encontrada | `*` | Sim | Sim | Apenas mostra que a página não existe. |

**Observações sobre as telas:**

- A pesquisa de termos aparece na própria interface pública; **não foi confirmada uma rota `/buscar` separada**.
- A seção *Sobre o projeto* consta no README, mas **não foi confirmada uma rota `/sobre` separada** na versão de `App.jsx` analisada.
- O frontend consultado usa o nome `/admin/previa`; isso **não significa** que a proteção de acesso já esteja aplicada. A verificação deve ocorrer também no backend.
- Um caminho específico de **edição de termo** não foi confirmado em `App.jsx` nessa revisão. A operação continua reservada ao administrador, independentemente da tela utilizada.

## 5. Matriz de autorização das rotas da API (backend)

### 5.1. Rotas de consulta confirmadas no `api.js` da branch `master`

| Método e rota | Visitante | Administrador | Requisito | Regra |
|---|:---:|:---:|:---:|---|
| `GET /api/termos` | Sim | Sim | RF05 | Lista os termos disponíveis. |
| `GET /api/termos/{id}` | Sim | Sim | RF02, RF03 | Retorna o detalhe do termo informado. |
| `GET /api/termos/busca?q={texto}` | Sim | Sim | RF01, RF11 | Pesquisa por texto e informa quando não há resultados. |
| `GET /api/categorias` | Sim | Sim | RF04 | Lista as categorias para consulta. |
| `GET /api/categorias/{id}/termos` | Sim | Sim | RF12 | Lista os termos da categoria indicada. |

**Confirmadas** significa que esses endereços são utilizados no `JurisFacil/frontend/src/api/api.js` consultado. Isso não substitui o teste das permissões no backend.

### 5.2. Operações administrativas e rotas a validar

| Método e rota | Visitante | Administrador | Requisito | Situação da referência |
|---|:---:|:---:|:---:|---|
| `POST /api/termos` | Não | Sim | RF07, RF14 | Encontrada na proposta de integração administrativa (PR #113); conferir implementação atual. |
| `PUT /api/termos/{id}` | Não | Sim | RF08, RF14 | Encontrada na proposta de integração administrativa (PR #113); conferir implementação atual. |
| `DELETE` de termo | Não | Sim | RF09, RF14 | Funcionalidade prevista no README; **caminho não confirmado**. |
| Login administrativo (`POST`, caminho a confirmar) | Público | Sim | RF06, RF14 | Funcionalidade prevista no README; **caminho da API não confirmado**. |
| Criar, editar ou excluir categoria | Não | Sim | RF10, RF14 | Funcionalidade prevista; **métodos e caminhos não confirmados**. |
| `GET /api/areas` | Sim | Sim | RF04* | Encontrada na proposta de integração administrativa (PR #113); conferir implementação atual. |
| Criar, editar ou excluir área | Não | Sim | RF10, RF14* | Tela existente na versão consultada; **caminhos da API não confirmados**. |

**Atenção:** os caminhos marcados como não confirmados **não devem ser inventados para a implementação**. A equipe deve usar o endereço real definido no controller correspondente e atualizar esta tabela.

## 6. Casos negativos obrigatórios

Os testes abaixo verificam se alguém sem permissão é realmente impedido de alterar dados:

- [ ] Visitante tenta cadastrar termo: a API bloqueia a operação (resposta esperada: `401` quando não autenticado).
- [ ] Visitante tenta editar ou excluir termo diretamente pela API: a alteração é bloqueada.
- [ ] Visitante tenta criar, editar ou excluir categoria: a alteração é bloqueada.
- [ ] Visitante digita o endereço `/admin/previa` ou outra tela administrativa: não consegue acessar as funções protegidas.
- [ ] Pessoa envia credenciais inválidas no login: o acesso administrativo é negado (`401`, conforme o contrato da API).
- [ ] Usuário autenticado, mas sem permissão de administrador, tenta alterar conteúdo: acesso negado (`403`).
- [ ] Administrador tenta editar ou excluir um termo inexistente: o sistema informa que o termo não foi encontrado (`404`).
- [ ] Administrador tenta cadastrar termo com dados obrigatórios ausentes: cadastro recusado (`400`, conforme validação adotada).
- [ ] Administrador tenta criar um termo duplicado: operação recusada conforme regra de unicidade definida pelo projeto.
- [ ] Visitante usa somente a interface de consulta: consegue pesquisar, ler termos, ver exemplos e filtrar categorias sem login.

Os códigos HTTP acima são **comportamentos recomendados para teste**; eles devem ser comparados com a implementação real.

## 7. Regras de segurança

- O **visitante não precisa criar conta ou fazer login** para consultar o dicionário.
- Somente o **administrador autenticado** pode cadastrar, editar ou excluir termos e categorias.
- Não basta esconder botões no frontend: a API também deve verificar quem está fazendo a requisição.
- O sistema não deve aceitar que o visitante se declare administrador enviando esse perfil no corpo da requisição.
- O login deve conferir as credenciais antes de liberar as páginas e operações protegidas.
- Senhas não devem ser armazenadas em texto puro.
- Os dados obrigatórios do termo devem ser validados no backend; o termo não deve ser salvo com campos importantes vazios.
- A edição e exclusão só devem acontecer quando o registro existir e as regras do projeto forem atendidas.
- A rota de testes `/teste` deve ser removida ou restrita quando a aplicação for publicada.

## 8. Fontes utilizadas e pontos pendentes

**Fontes do repositório:**

1. [README — descrição do projeto e requisitos RF01 a RF14](https://github.com/Italo1001/pi-II-2026-2-equipe-7/blob/master/README.md).
2. [Código `api.js` da branch `master` — rotas públicas de consulta](https://raw.githubusercontent.com/Italo1001/pi-II-2026-2-equipe-7/master/JurisFacil/frontend/src/api/api.js).
3. [`App.jsx` no commit `2f4e7fe` — rotas das telas](https://github.com/Italo1001/pi-II-2026-2-equipe-7/blob/2f4e7fe119b363633e79b0cd7e4dacc4b7739b32/JurisFacil/frontend/src/App.jsx).
4. [PR #113 — proposta de integração administrativa e operações de cadastro/edição](https://github.com/Italo1001/pi-II-2026-2-equipe-7/pull/113).
5. [Issue #93 — autenticação e validações da área administrativa](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/93).

**Antes de considerar a matriz definitiva:** confirmar os caminhos atuais do frontend, os controllers do backend e os testes de autenticação; atualizar as operações administrativas ainda sem endereço confirmado.
