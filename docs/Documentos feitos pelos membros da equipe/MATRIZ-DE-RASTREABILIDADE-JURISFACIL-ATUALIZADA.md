# Matriz de Rastreabilidade — JurisFácil

**Projeto:** Projeto Integrador II — 2026.2 — Equipe 7  
**Sistema:** JurisFácil — Dicionário Jurídico  
**Sprint de referência:** Sprint 4 — Requisitos Essenciais (marco com prazo em 01/11/2026)  
**Repositório:** https://github.com/Italo1001/pi-II-2026-2-equipe-7  
**Issue principal:** [#150 — Critérios Gherkin e matriz de rastreabilidade atualizada](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/150)

> **Como usar este documento:** conteúdo revisado para **substituir o texto do arquivo de matriz de rastreabilidade que já existe**, sem criar uma segunda matriz no repositório. Inclui também os cenários Gherkin pedidos na issue #150. A revisão foi baseada numa versão anterior da matriz (Sprint 2), no README, no código público da branch `master`, nas issues e no documento detalhado de requisitos disponível. Não foi possível consultar diretamente a listagem e o conteúdo do arquivo da matriz *atualmente versionado* na pasta `docs`; antes de substituir, confira se houve alterações de outros integrantes que precisam ser preservadas.

## 1. Objetivo e critérios usados

A matriz liga **requisitos funcionais (RFs)** a **casos de uso (UC)**, **telas**, **rotas**, **regras de negócio (RN)**, **issues**, **cenários Gherkin** e **testes**. Assim, é possível saber o que existe no projeto, o que foi solicitado nesta sprint e o que ainda precisa ser validado.

### Como interpretar o andamento

| Indicação | Significado |
|---|---|
| **Evidência no `master`** | Há código identificável para a função descrita. Não prova teste de ponta a ponta. |
| **Parcial** | Há tela ou parte do fluxo, mas falta comportamento, integração ou validação. |
| **Não confirmado** | Não encontrei evidência suficiente para declarar a função concluída. |
| **Pendente na Sprint 4** | Existe issue aberta ligada ao trabalho; isso não prova ausência de código em outras branches. |
| **Concluído em issue anterior** | Issue encerrada no GitHub; não significa, por si só, que a funcionalidade completa está operante no `master`. |

**Importante:** separar **tela pronta**, **rota chamada pelo frontend**, **backend implementado**, **teste aprovado** e **issue fechada**. Uma dessas evidências não substitui as demais.

## 2. Requisitos funcionais e situação observada

Os nomes dos RFs seguem o README oficial. A coluna de situação descreve o que foi possível verificar em **06/11/2026** e não é uma homologação final.

| RF | Requisito funcional | Evidência e situação | Relação com a Sprint 4 |
|---|---|---|---|
| **RF01** | Pesquisa de termos jurídicos | **Evidência no `master`:** a página inicial carrega termos da API e oferece pesquisa na interface. Confirmar o funcionamento final da busca. | Conferir estados e testes das telas ([#138](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/138), [#140](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/140)). |
| **RF02** | Apresentação do significado simplificado | **Evidência no `master`:** `/termo/:id` consulta `GET /api/termos/{id}` e mostra `significado`. | Verificação funcional em [#140](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/140). |
| **RF03** | Apresentação de exemplos | **Não confirmado:** a página de detalhes consultada mostra a definição; não identifiquei nela uma seção de exemplos. | Verificar protótipo, backend e testes ([#147](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/147)). |
| **RF04** | Organização por categorias | **Parcial:** a página inicial filtra termos por um campo exibido como área; a API possui chamada para listar categorias. É preciso confirmar a associação categoria–termo. | [#134](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/134), [#135](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/135), conforme telas entregues. |
| **RF05** | Visualização dos termos cadastrados | **Evidência no `master`:** a página inicial usa `GET /api/termos` e apresenta a listagem. | [#139](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/139), [#140](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/140). |
| **RF06** | Login do administrador | **Parcial:** existe `/admin/login`, mas o envio do formulário ainda não chama autenticação real no `master`. Issue anterior [#93](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/93) foi encerrada (backend); não equivale a login completo integrado. | [#124](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/124), [#125](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/125), [#132](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/132), [#149](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/149). |
| **RF07** | Cadastro de novos termos | **Parcial:** existe o formulário `/admin/previa/termos/novo`, mas o envio apenas mostra mensagem de falha, sem salvar o termo, no código consultado. | [#126](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/126), [#130](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/130), [#140](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/140). |
| **RF08** | Edição de termos | **Não confirmado:** não identifiquei rota de edição no `App.jsx` atual. A issue anterior #93 menciona validações, mas não prova fluxo completo de edição. | [#147](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/147), [#140](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/140). |
| **RF09** | Exclusão de termos | **Não confirmado:** não foi encontrado fluxo de exclusão completo nas telas administrativas consultadas. | [#147](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/147), [#140](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/140). |
| **RF10** | Gerenciamento de categorias | **Parcial:** existe `/admin/previa/categorias`, porém a tela consultada informa que não há categorias disponíveis e não implementa CRUD. | [#134](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/134), [#135](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/135), [#147](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/147). |
| **RF11** | Aviso de termo não cadastrado | **Evidência no `master`:** a tela de detalhes trata ID inválido e resposta HTTP 404 exibindo “Termo não encontrado.” | [#138](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/138), [#140](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/140). |
| **RF12** | Filtragem por categoria | **Parcial:** a página inicial aplica filtro local por `category`; o cliente da API também define chamada `/api/categorias/{id}/termos`, mas não foi verificado o uso dela na tela atual. | [#138](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/138), [#140](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/140). |
| **RF13** | Página sobre o projeto | **Não confirmado:** não há rota específica de “Sobre” no `App.jsx` consultado. | [#147](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/147) (se incluído entre os RFs restantes). |
| **RF14** | Controle de acesso administrativo | **Parcial / sem proteção comprovada:** o `App.jsx` apresenta rotas `/admin/previa` sem um componente de proteção visível; a issue de backend #93 foi fechada, mas a autorização completa depende de validação no servidor. | [#125](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/125), [#130](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/130), [#136](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/136), [#137](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/137), [#141](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/141), [#148](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/148). |

### 2.1. O que foi efetivamente comprovado **nesta sprint**?

As issues da **Sprint 4** consultadas para autenticação, autorização e documentação permaneciam **abertas/Backlog**, e o marco da sprint aparecia com **17% de conclusão** na data da consulta. Assim, **não é possível afirmar que os RF06, RF07 ou RF14 foram integralmente concluídos nesta sprint**. A matriz registra as partes verificadas no `master` e mantém o restante sob validação. O encerramento anterior da **issue #93 na Sprint 3** é evidência de uma tarefa anterior, não de conclusão automática da Sprint 4.

## 3. Casos de uso — identificadores mantidos da matriz anterior

| Caso de uso | Descrição | RF vinculado |
|---|---|---|
| UC01 | Pesquisar termo | RF01, RF11 |
| UC02 | Consultar significado e exemplos | RF02, RF03 |
| UC03 | Listar termos | RF05 |
| UC04 | Consultar categorias e filtrar | RF04, RF12 |
| UC05 | Fazer login e acessar área administrativa | RF06, RF14 |
| UC06 | Cadastrar termo | RF07 |
| UC07 | Editar termo | RF08 |
| UC08 | Excluir termo | RF09 |
| UC09 | Gerenciar categorias | RF10 |
| UC10 | Consultar informações sobre o projeto | RF13 |

> **Nota:** UC01–UC10 são os identificadores usados na matriz anterior recuperada. Confirmar os códigos com o documento oficial de casos de uso, caso ele use outra numeração.

## 4. Regras de negócio e requisitos de qualidade ligados aos RFs

A matriz anterior usava **RB01–RB05** como propostas. Para evitar confundir esses rótulos com códigos oficiais, agora usamos os códigos **RN01–RN06** encontrados no documento detalhado de requisitos (também classificados ali como **decisões a confirmar**):

| Regra | Assunto | RFs relacionados |
|---|---|---|
| **RN01** | Campos obrigatórios do termo | RF07, RF08 |
| **RN02** | Duplicidade de termos | RF07, RF08 |
| **RN03** | Exclusão de categoria com termos associados | RF04, RF10 |
| **RN04** | Autenticação, criação de contas e encerramento de sessão | RF06, RF14 |
| **RN05** | Registro de acessos sem registrar senhas | RF06, RF14 |
| **RN06** | Revisão e correção de conteúdo jurídico | RF02, RF03, RF07, RF08 |

**Regras complementares propostas:** `RN-AUT01` a `RN-AUT08` (login, credenciais inválidas, limite de tentativas, bloqueio, sessão expirada, logout e segurança) devem ser conferidas no documento de autenticação antes de serem aprovadas. Limite de cinco falhas e timeout de 30 minutos eram **propostas**, não comportamentos confirmados no sistema.

**Requisitos não funcionais relacionados:** RNF04 (segurança de senhas), RNF06 (documentação) e **RNF11** (controle de acesso, constante no documento detalhado e nas labels de issues da Sprint 4). Há divergência de numeração/descritivo entre o README simplificado e algumas labels do GitHub: por exemplo, a label de RNF08 em uma issue significa armazenamento em banco, mas o README chama RNF08 de futuras expansões. **Conferir e padronizar o documento de requisitos antes de mudar os códigos.**

## 5. Matriz principal de rastreabilidade (RF → UC → tela → rota → RN → issue → teste)

**Legenda das rotas:** `CONF.` = caminho observado no código (`api.js` ou `App.jsx`); `PREV.` = operação esperada, cujo endpoint exato não foi verificado. A existência de uma chamada no frontend não prova execução bem-sucedida no backend.

| RF | UC | Tela / componente | Rota ou operação | RN | Issues principais | Teste(s) |
|---|---|---|---|---|---|---|
| RF01 | UC01 | `/` — Home, SearchHero | `GET /api/termos` (CONF.); `GET /api/termos/busca?q=...` (CONF. no cliente, não necessariamente usado pela Home) | — | [#138](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/138), [#140](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/140) | CT01, CT02 |
| RF02 | UC02 | `/termo/:id` — TermDetail | `GET /api/termos/{id}` (CONF.) | RN06 | [#140](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/140) | CT03 |
| RF03 | UC02 | Detalhes — seção de exemplos a verificar | `GET /api/termos/{id}` (CONF. para dados do termo; campo de exemplo a verificar) | RN06 | [#147](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/147) | CT04 |
| RF04 | UC04 | `/` — CategoryLibrary; formulário administrativo | `GET /api/categorias` (CONF. no cliente); associação no cadastro (PREV.) | RN03 | [#134](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/134), [#135](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/135) | CT05 |
| RF05 | UC03 | `/` — TermIndex | `GET /api/termos` (CONF.) | — | [#139](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/139) | CT06 |
| RF06 | UC05 | `/admin/login` — AdminLogin | Autenticação real: endpoint a confirmar (PREV.); frontend atual não envia o login | RN04, RN05, RN-AUT* | [#93](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/93), [#124](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/124), [#125](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/125), [#132](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/132), [#149](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/149) | CT07–CT09 |
| RF07 | UC06 | `/admin/previa/termos/novo` — AdminTermForm | Cadastro administrativo: endpoint a confirmar (PREV.) | RN01, RN02, RN06 | [#126](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/126), [#130](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/130) | CT10, CT11 |
| RF08 | UC07 | Formulário de edição a confirmar | Edição de termo: método/URL a confirmar (PREV.) | RN01, RN02, RN06 | [#93](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/93), [#147](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/147) | CT12 |
| RF09 | UC08 | Administração de termos — exclusão a confirmar | Exclusão de termo: método/URL a confirmar (PREV.) | — | [#93](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/93), [#147](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/147) | CT13 |
| RF10 | UC09 | `/admin/previa/categorias` — AdminTaxonomy | Gestão de categorias: métodos/URLs a confirmar (PREV.) | RN03 | [#134](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/134), [#135](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/135), [#147](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/147) | CT14 |
| RF11 | UC01 | `/termo/:id` — mensagem de não encontrado; busca sem resultados | `GET /api/termos/{id}` (CONF.); pesquisa `/api/termos/busca` (cliente) | — | [#138](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/138) | CT02, CT15 |
| RF12 | UC04 | `/` — CategoryLibrary / TermIndex | Filtro local na Home (CONF.); `GET /api/categorias/{id}/termos` (CONF. no cliente) | — | [#138](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/138) | CT16 |
| RF13 | UC10 | Página Sobre — ainda não localizada | Conteúdo estático/rota de frontend a confirmar (PREV.) | — | [#147](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/147) | CT17 |
| RF14 | UC05 | `/admin/previa/*` e login | Proteger operações administrativas na API (PREV.); checagem de token e permissões a confirmar | RN04, RN05, RN-AUT* | [#93](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/93), [#130](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/130), [#136](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/136), [#137](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/137), [#141](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/141), [#148](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/148) | CT08, CT09, CT18–CT20 |

**Correções em relação à matriz anterior:** as antigas rotas `GET /termos?busca={texto}`, `GET /termos?categoria={id}` e `GET /termos/{id}` foram substituídas, quando havia evidência, pelos caminhos efetivamente escritos no cliente `api.js`. O antigo `POST /auth/login` e as rotas de escrita passaram a ser **não confirmados**, pois não foram localizados no frontend inspecionado. A matriz deixou de tratar sugestões como endpoints implementados.

## 6. Telas e rotas de navegação confirmadas no `App.jsx`

| Tela / página | Caminho de frontend | RF(s) | Situação observada |
|---|---|---|---|
| Página inicial / pesquisa / listagem / filtros | `/` | RF01, RF04, RF05, RF11, RF12 | Código de consulta integrado a `GET /api/termos`; filtro visual existente. |
| Detalhes de termo | `/termo/:id` | RF02, RF03, RF11 | Mostra definição, carrega API e trata 404; exemplos não foram identificados. |
| Login administrativo | `/admin/login` | RF06, RF14 | Interface pronta; autenticação real ainda não conectada no `master` consultado. |
| Visão geral da administração | `/admin/previa` | RF14 | Prévia administrativa renderizada; proteção real não comprovada. |
| Lista de termos na administração | `/admin/previa/termos` | RF05, RF07, RF08, RF09 | Usa lista local `legalTerms`; CRUD completo não verificado. |
| Novo termo | `/admin/previa/termos/novo` | RF07 | Formulário visual; ação de salvar ainda simulada/sem sucesso. |
| Categorias administrativas | `/admin/previa/categorias` | RF04, RF10 | Tela de prévia sem CRUD. |
| Áreas do Direito | `/admin/previa/areas` | RF04 | Tela de prévia com dados locais. |
| Tela de teste do backend | `/teste` | Apoio ao desenvolvimento | **Não é requisito funcional público**; retirar ou proteger antes da publicação. |
| Página não encontrada | `*` | Apoio à navegação | Rota de fallback. |

**Ainda não confirmadas em `App.jsx`:** rota específica de edição, página “Sobre” e uma tela própria de confirmação de exclusão. Os requisitos respectivos continuam na matriz como entregas previstas.

## 7. Issues da Sprint 4 vinculadas a requisitos, telas, API e QA

A Sprint 4 aparece como **“Requisitos Essenciais”** no GitHub. Os vínculos abaixo são feitos pelo título, objetivo, critérios de aceitação e/ou labels das issues (sem declarar conclusão automaticamente).

| Issue | Entrega solicitada | RF/RNF relacionados | Estado consultado |
|---|---|---|---|
| [#123](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/123) | Migrar tabela de usuários e perfis | RF06, RF14, RNF04 | Conferir implementação e estado |
| [#124](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/124) | Implementar hash de senhas | RF06, RF14, RNF04 | Aberta / Backlog |
| [#125](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/125) | Criar usuário inicial de cada perfil | RF06, RF14, RNF04 | Aberta / Backlog |
| [#126](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/126) | Acesso a dados de novas entidades | RFs dos cadastros envolvidos | Aberta na listagem consultada |
| [#130](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/130) | Proteger API com autorização por perfil | RF14, RNF11 | Aberta / Backlog |
| [#132](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/132) | Integrar login e token | RF06, RF14 | Aberta / Backlog |
| [#133](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/133) | Redirecionamento de telas | RF06, RF14 (se relacionado à autenticação) | Aberta na listagem consultada |
| [#134](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/134), [#135](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/135) | Implementar três telas novas (cada issue) | Confirmar telas e seus RFs | Abertas na listagem consultada |
| [#136](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/136) | Adaptar interface às permissões do perfil | RF14 | Aberta na listagem consultada |
| [#137](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/137) | Sessão expirada, respostas 401/403 | RF06, RF14, RNF11 | Aberta / Backlog |
| [#138](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/138) | Estados de tela | RF01, RF11 e outros conforme componentes | Aberta na listagem consultada |
| [#139](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/139) | Validação em dispositivo real | RFs das telas testadas; RNF02 | Aberta na listagem consultada |
| [#140](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/140) | Casos de teste dos requisitos essenciais | RFs essenciais | Aberta na listagem consultada |
| [#141](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/141) | Teste do controle de acesso | RF14 | Aberta na listagem consultada |
| [#142](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/142), [#143](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/143) | Retestes e cinco novos casos de teste | RFs afetados | Abertas na listagem consultada |
| [#144](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/144), [#145](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/145), [#146](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/146) | Protótipos de autenticação, telas restantes e correções | RF06, RF14 e RFs das telas | Abertas na listagem consultada |
| [#147](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/147) | Especificar RFs essenciais restantes | RFs sem especificação final | Aberta / Backlog |
| [#148](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/148) | Atualizar matriz de autorização | RF14 | Aberta na listagem consultada |
| [#149](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/149) | Regras de negócio da autenticação | RF06, RF14, RNF04 | Aberta na listagem consultada |
| [#150](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/150) | **Atualizar Gherkin e esta matriz** | RFs essenciais, RNF06 | Aberta / Backlog |

**Não confundIR com a Sprint 4:** [#93](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/93) (autenticação, validação e códigos de erro) foi encerrada na **Sprint 3**. O [PR #113](https://github.com/Italo1001/pi-II-2026-2-equipe-7/pull/113) descreve integrações administrativas em uma **proposta de merge ainda aberta**, com pendências de ID da área, erro 403 e cadastro completo; por isso, não se deve somar essas operações como entregas já concluídas na `master`.

## 8. Critérios de aceitação em Gherkin — atualizados para a Sprint 4

Os cenários abaixo representam **comportamentos esperados para validação**, não testes já executados. Eles ampliam a seção Gherkin da matriz anterior e contemplam sucesso, falha e restrição de acesso, conforme a issue #150.

### RF01 e RF11 — Pesquisa e ausência de resultado (CT01, CT02)

```gherkin
Funcionalidade: Pesquisar termos jurídicos
  Cenário: Pesquisar um termo existente
    Dado que há um termo cadastrado no sistema
    Quando o visitante pesquisar pelo nome desse termo
    Então o sistema deve mostrar o termo correspondente

  Cenário: Pesquisar termo inexistente
    Dado que o termo informado não está cadastrado
    Quando o visitante realizar a pesquisa
    Então o sistema deve informar que nenhum termo foi encontrado
    E não deve mostrar um termo diferente como correspondência
```

### RF02 e RF03 — Significado e exemplos (CT03, CT04)

```gherkin
Funcionalidade: Consultar detalhes de termos
  Cenário: Mostrar significado simplificado
    Dado que existe um termo com significado cadastrado
    Quando o visitante abrir seus detalhes
    Então deve visualizar o nome e o significado do termo

  Cenário: Mostrar somente exemplos existentes
    Dado que um termo não possui exemplo cadastrado
    Quando o visitante abrir seus detalhes
    Então o sistema não deve inventar um exemplo
```

### RF04, RF05 e RF12 — Lista e categorias (CT05, CT06, CT16)

```gherkin
Funcionalidade: Listar e organizar termos
  Cenário: Exibir termos cadastrados
    Dado que há termos armazenados no sistema
    Quando o visitante abrir a página inicial
    Então deve visualizar os termos disponíveis

  Cenário: Filtrar por categoria
    Dado que existem termos associados a categorias diferentes
    Quando o visitante escolher uma categoria
    Então deve visualizar somente os termos vinculados a ela
    E deve conseguir remover o filtro

  Cenário: Manter a associação de categoria
    Dado que existe uma categoria cadastrada
    E que o administrador está autenticado
    Quando ele vincular um termo à categoria e salvar
    Então o termo deve permanecer associado à categoria escolhida
```

### RF06 — Login (CT07, CT08, CT09)

```gherkin
Funcionalidade: Autenticação do administrador
  Cenário: Login com credenciais válidas
    Dado que existe um administrador cadastrado
    Quando informar suas credenciais corretas
    Então o sistema deve validar as credenciais
    E deve permitir o acesso administrativo

  Cenário: Login com credenciais inválidas
    Dado que o visitante informou uma senha incorreta
    Quando tentar entrar na área administrativa
    Então o sistema deve negar o acesso
    E deve exibir uma mensagem genérica de credenciais inválidas

  Cenário: Sessão expirada
    Dado que a sessão do administrador deixou de ser válida
    Quando ele tentar executar uma operação protegida
    Então a operação deve ser recusada
    E o sistema deve solicitar uma nova autenticação
```

### RF07 — Cadastro de termo (CT10, CT11)

```gherkin
Funcionalidade: Cadastrar termo jurídico
  Cenário: Salvar termo com dados válidos
    Dado que o administrador está autenticado
    E preencheu os campos obrigatórios
    Quando confirmar o cadastro
    Então o sistema deve salvar o termo
    E o novo termo deve aparecer na listagem

  Cenário: Recusar cadastro incompleto
    Dado que o administrador está autenticado
    E deixou um campo obrigatório vazio
    Quando tentar salvar o novo termo
    Então o sistema deve avisar qual informação precisa ser preenchida
    E não deve salvar o registro incompleto

  Cenário: Impedir cadastro por visitante
    Dado que um visitante não está autenticado
    Quando tentar cadastrar um novo termo pela API
    Então a operação deve ser negada
```

### RF08 e RF09 — Alteração e exclusão de termos (CT12, CT13)

```gherkin
Funcionalidade: Manter termos jurídicos
  Cenário: Editar termo existente
    Dado que o administrador está autenticado
    E o termo já está cadastrado
    Quando alterar seu significado e confirmar
    Então o sistema deve salvar o novo significado

  Cenário: Excluir termo após confirmação
    Dado que o administrador está autenticado
    E selecionou um termo existente
    Quando confirmar a exclusão
    Então o termo deve deixar de aparecer nas consultas públicas

  Cenário: Cancelar a exclusão
    Dado que o administrador selecionou um termo para excluir
    Quando cancelar a confirmação
    Então o termo deve continuar cadastrado
```

### RF10 — Gerenciamento de categorias (CT14)

```gherkin
Funcionalidade: Gerenciar categorias
  Cenário: Cadastrar categoria válida
    Dado que o administrador está autenticado
    Quando cadastrar uma categoria com nome válido
    Então a categoria deve ficar disponível para associar termos

  Cenário: Evitar exclusão inconsistente
    Dado que existe uma categoria associada a termos
    Quando o administrador solicitar sua exclusão
    Então o sistema deve aplicar a regra de exclusão aprovada pela equipe
    E não deve deixar os termos com associação inválida
```

### RF13 — Página sobre o projeto (CT17)

```gherkin
Funcionalidade: Informações sobre o projeto
  Cenário: Exibir apresentação do JurisFácil
    Dado que o visitante acessou o sistema
    Quando abrir a página sobre o projeto
    Então deve visualizar o objetivo e a apresentação do JurisFácil
```

### RF14 — Controle de acesso (CT18, CT19, CT20)

```gherkin
Funcionalidade: Proteger funções administrativas
  Cenário: Bloquear operação sem autenticação
    Dado que o visitante não possui sessão válida
    Quando tentar criar, editar ou excluir termos pela API
    Então o servidor deve negar a operação
    E deve responder 401 conforme o contrato de autenticação

  Cenário: Bloquear operação sem permissão
    Dado que o usuário está autenticado sem permissão administrativa
    Quando tentar executar uma operação reservada ao administrador
    Então o servidor deve negar a operação
    E deve responder 403 conforme a política de autorização

  Cenário: Não liberar acesso só por conhecer a URL
    Dado que um visitante conhece o endereço da área administrativa
    Quando acessar diretamente uma operação protegida
    Então a API não deve permitir alteração de dados
```

> **Nota de QA:** os códigos `401` e `403` estão explicitados na issue #130. O comportamento para bloqueio por tentativas repetidas e a duração da sessão devem ser adotados somente depois de aprovação das regras da issue #149; ainda não são resultados comprovados no código.

## 9. Matriz de testes: RF → cenário → resultado esperado → evidência

| Teste | RF(s) | Resultado esperado | Evidência / resultado real |
|---|---|---|---|
| CT01 | RF01 | Pesquisa retorna termo existente | Pendente de execução registrada |
| CT02 | RF01, RF11 | Pesquisa inexistente mostra aviso | Pendente de execução registrada |
| CT03 | RF02 | Significado associado ao termo aparece | Pendente de execução registrada |
| CT04 | RF03 | Exemplo aparece apenas quando cadastrado | Pendente de execução registrada |
| CT05 | RF04 | Associação à categoria é preservada | Pendente de execução registrada |
| CT06 | RF05 | Lista apresenta termos cadastrados | Pendente de execução registrada |
| CT07 | RF06 | Login válido libera área administrativa | Pendente; frontend no `master` ainda não integra login |
| CT08 | RF06, RF14 | Senha inválida nega login | Pendente de execução registrada |
| CT09 | RF06, RF14 | Sessão inválida impede alteração | Pendente; ver issue #137 |
| CT10 | RF07 | Novo termo é salvo e aparece na lista | Pendente; formulário no `master` não salva |
| CT11 | RF07 | Campo obrigatório vazio impede gravação | Pendente de execução registrada |
| CT12 | RF08 | Edição atualiza o termo | Pendente de execução registrada |
| CT13 | RF09 | Exclusão confirmada remove o termo | Pendente de execução registrada |
| CT14 | RF10 | Categoria pode ser cadastrada e a exclusão respeita associações | Pendente de execução registrada |
| CT15 | RF11 | ID inexistente mostra aviso, sem quebra da página | Tratamento visual observado; teste manual ainda pendente |
| CT16 | RF12 | Filtro apresenta só termos da categoria | Comportamento visual encontrado; teste manual ainda pendente |
| CT17 | RF13 | Página Sobre apresenta objetivo do sistema | Pendente de rota/implementação |
| CT18 | RF14 | Requisição sem token válida recebe 401 | Pendente; ver #130 e #141 |
| CT19 | RF14 | Requisição sem permissão recebe 403 | Pendente; ver #130 e #141 |
| CT20 | RF14 | Acesso direto à URL não permite alteração sem sessão | Pendente; ver #130 e #141 |

**Como registrar teste concluído:** informar data, responsável, ambiente, resultado (aprovado/reprovado), link do print/log/relatório e commit ou PR que contém a correção. **Nenhum teste foi dado como aprovado sem evidência disponível.**

## 10. Relação com as entregas anteriores

Esta versão mantém os vínculos já presentes na matriz da Sprint 2 e acrescenta o andamento da Sprint 4. As referências históricas [#51](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/51), [#55](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/55), [#57](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/57), [#59](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/59) e [#62](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/62) continuam ligadas às atividades anteriores de frontend, prototipação, usabilidade e correções. Os RFs específicos afetados devem ser detalhados quando houver evidência das entregas.

## 11. Pendências antes de declarar a Sprint 4 concluída

- [ ] Confirmar o arquivo atual da matriz dentro da pasta `docs` e preservar mudanças não contidas na versão anterior recuperada.
- [ ] Validar quais RFs foram **concluídos especificamente na Sprint 4** com issue fechada, commit/PR incorporado e teste aprovado.
- [ ] Integrar e testar o login real com token (RF06; issue #132).
- [ ] Conferir hash de senhas e dados de teste dos perfis (issues #124 e #125).
- [ ] Proteger backend e rotas administrativas; executar CT18–CT20 (RF14; issues #130 e #141).
- [ ] Tratar sessão expirada e 401/403 no frontend (issue #137).
- [ ] Implementar e testar cadastro, edição, exclusão e gestão de categorias (RF07–RF10).
- [ ] Conferir exemplos no detalhe do termo (RF03) e a página Sobre (RF13).
- [ ] Confirmar os nomes e caminhos definitivos das telas novas (#134 e #135).
- [ ] Validar os cenários Gherkin com a equipe e executar os testes previstos (#140 e #143).
- [ ] Alinhar numeração dos RNFs entre README, documento detalhado e labels das issues.
- [ ] Confirmar as decisões sobre bloqueio por tentativas, duração da sessão e logout (issue #149).

## 12. Fontes e evidências consultadas

1. [README do JurisFácil — RF01–RF14](https://github.com/Italo1001/pi-II-2026-2-equipe-7/blob/master/README.md).
2. [Frontend `src/api/api.js` — chamadas reais de consulta](https://raw.githubusercontent.com/Italo1001/pi-II-2026-2-equipe-7/master/JurisFacil/frontend/src/api/api.js).
3. [Frontend `src/App.jsx` — rotas de navegação](https://raw.githubusercontent.com/Italo1001/pi-II-2026-2-equipe-7/master/JurisFacil/frontend/src/App.jsx).
4. [Frontend `src/pages/Home.jsx` — listagem e filtro](https://raw.githubusercontent.com/Italo1001/pi-II-2026-2-equipe-7/master/JurisFacil/frontend/src/pages/Home.jsx).
5. [Frontend `src/pages/TermDetail.jsx` — significado e 404](https://raw.githubusercontent.com/Italo1001/pi-II-2026-2-equipe-7/master/JurisFacil/frontend/src/pages/TermDetail.jsx).
6. [Frontend `src/pages/AdminLogin.jsx` — login visual](https://raw.githubusercontent.com/Italo1001/pi-II-2026-2-equipe-7/master/JurisFacil/frontend/src/pages/AdminLogin.jsx).
7. [Frontend `src/pages/admin/AdminTermForm.jsx` — formulário ainda sem gravação](https://raw.githubusercontent.com/Italo1001/pi-II-2026-2-equipe-7/master/JurisFacil/frontend/src/pages/admin/AdminTermForm.jsx).
8. [Frontend `src/pages/admin/AdminTerms.jsx` e `AdminTaxonomy.jsx` — prévias administrativas](https://raw.githubusercontent.com/Italo1001/pi-II-2026-2-equipe-7/master/JurisFacil/frontend/src/pages/admin/AdminTerms.jsx).
9. [Issue #93 — autenticação da Sprint 3, concluída](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/93).
10. [Issue #150 — critérios da entrega de documentação](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/150).
11. [Sprint 4 — Requisitos Essenciais](https://github.com/Italo1001/pi-II-2026-2-equipe-7/milestone/5).
12. [PR #113 — integração administrativa ainda com pendências](https://github.com/Italo1001/pi-II-2026-2-equipe-7/pull/113).

