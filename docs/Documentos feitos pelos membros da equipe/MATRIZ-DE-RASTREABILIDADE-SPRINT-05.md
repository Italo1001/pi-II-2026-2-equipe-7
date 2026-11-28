# Matriz de Rastreabilidade – JurisFácil

**Projeto:** Projeto Integrador II – 2026.2 – Equipe 7  
**Sprint:** 5 – Requisitos Importantes  
**Data da revisão:** 28/11/2026  
**Issue:** [#182 – Atualizar a matriz de rastreabilidade](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/182)

## 1. Objetivo e base da revisão

Relacionar os requisitos aos casos de uso, telas, rotas, regras de negócio, issues e testes, incluindo os requisitos Importantes e a solicitação de acesso institucional recebida na sessão de validação.

Foram mantidos os identificadores dos 14 RFs do README e os casos de uso e testes da matriz de 06/11/2026. A prioridade segue o documento de trabalho `Requisitos_Dicionario_Juridico_Detalhado.pdf`: RF03 e RF12 são Importantes; RF13 é Desejável. Essa classificação deverá ser conferida com o catálogo vigente, pois o README não informa prioridade. Os RNFs Importantes também foram incluídos, em tabela própria.

Os caminhos e códigos de RN recuperados da matriz anterior são referências históricas, não uma inspeção atual do código. O acesso à pasta `docs` e à árvore completa de código atual não foi possível; por isso, as relações não verificadas foram sinalizadas. Issues de documentação e QA são vínculos transversais, não prova de implementação nem substitutos das issues individuais com labels RF/RNF.

## 2. Matriz funcional consolidada

**Legenda:** E = Essencial; I = Importante; D = Desejável. `Anterior` = caminho observado na revisão de 06/11; `A confirmar` = operação ou tela cujo contrato atual não foi verificado. As regras RN01–RN06 e UC01–UC10 seguem a matriz anterior e devem ser conciliadas com os identificadores oficiais.

| RF | Prioridade | Funcionalidade | Caso de uso | Tela / componente | Rota da API / operação | RN | Issues / PRs de referência | Testes |
|---|---|---|---|---|---|---|---|---|
| RF01 | E | Pesquisa de termos jurídicos | UC01 | `/` — Home, SearchHero | `GET /api/termos` (anterior); `GET /api/termos/busca?q=...` (anterior no cliente, não necessariamente usado pela Home) | — | [#138](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/138), [#140](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/140) | CT01, CT02 |
| RF02 | E | Significado simplificado | UC02 | `/termo/:id` — TermDetail | `GET /api/termos/{id}` (anterior) | RN06 | [#140](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/140) | CT03 |
| RF03 | I | Apresentação de exemplos | UC02 | `/termo/:id` – detalhes, seção de exemplos a confirmar | `GET /api/termos/{id}` (anterior); campo de exemplo a confirmar | RN06 | [#147](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/147), [#177](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/177) | CT04 |
| RF04 | E | Organização por categorias | UC04 | `/` — CategoryLibrary; formulário administrativo | `GET /api/categorias` (anterior no cliente); associação no cadastro (a confirmar) | RN03 | [#134](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/134), [#135](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/135) | CT05 |
| RF05 | E | Lista de termos cadastrados | UC03 | `/` — TermIndex | `GET /api/termos` (anterior) | — | [#139](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/139) | CT06 |
| RF06 | E | Login do administrador | UC05 | `/admin/login` — AdminLogin | Autenticação e sessão: endpoint atual a confirmar; PR #159 registra integração de sessão e tratamento 401/403 | RN04, RN05, RN-AUT*, RN-INST (propostas) | [#93](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/93), [#124](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/124), [#125](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/125), [#132](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/132), [#149](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/149), [PR #159](https://github.com/Italo1001/pi-II-2026-2-equipe-7/pull/159), [#185](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/185) | CT07–CT09 |
| RF07 | E | Cadastro de termos | UC06 | `/admin/previa/termos/novo` — AdminTermForm | Cadastro administrativo: endpoint a confirmar; GET /areas (PR #157) como apoio ao formulário | RN01, RN02, RN06 | [#126](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/126), [#130](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/130), [PR #157](https://github.com/Italo1001/pi-II-2026-2-equipe-7/pull/157) | CT10, CT11 |
| RF08 | E | Edição de termos | UC07 | Formulário de edição a confirmar | Edição administrativa: endpoint a confirmar; GET /areas (PR #157) como apoio ao formulário | RN01, RN02, RN06 | [#93](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/93), [#147](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/147), [PR #157](https://github.com/Italo1001/pi-II-2026-2-equipe-7/pull/157) | CT12 |
| RF09 | E | Exclusão de termos | UC08 | Administração de termos — exclusão a confirmar | Exclusão de termo: método/URL a confirmar (a confirmar) | — | [#93](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/93), [#147](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/147) | CT13 |
| RF10 | E | Gerenciamento de categorias | UC09 | `/admin/previa/categorias` — AdminTaxonomy | Gestão de categorias: métodos/URLs a confirmar (a confirmar) | RN03 | [#134](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/134), [#135](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/135), [#147](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/147), [PR #158](https://github.com/Italo1001/pi-II-2026-2-equipe-7/pull/158) | CT14 |
| RF11 | E | Aviso de termo não cadastrado | UC01 | `/termo/:id` — mensagem de não encontrado; busca sem resultados | `GET /api/termos/{id}` (anterior); pesquisa `/api/termos/busca` (cliente) | — | [#138](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/138), [PR #158](https://github.com/Italo1001/pi-II-2026-2-equipe-7/pull/158) | CT02, CT15 |
| RF12 | I | Filtragem por categoria | UC04 | `/` – CategoryLibrary / TermIndex (filtro) | Filtro local e `GET /api/categorias/{id}/termos` (anteriores); PR #158 relacionado ao RF12, contrato atual a confirmar | — | [#138](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/138), [PR #158](https://github.com/Italo1001/pi-II-2026-2-equipe-7/pull/158), [#177](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/177) | CT16 |
| RF13 | D | Página sobre o projeto | UC10 | Página Sobre — ainda não localizada | Conteúdo estático/rota de frontend a confirmar (a confirmar) | — | [#147](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/147) | CT17 |
| RF14 | E | Controle de acesso administrativo | UC05 | `/admin/previa/*` e login | Autorização no servidor: contrato a confirmar; PR #159 registra tratamento de sessão e 401/403 | RN04, RN05, RN-AUT*, RN-INST (propostas) | [#93](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/93), [#130](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/130), [#136](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/136), [#137](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/137), [#141](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/141), [#148](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/148), [PR #159](https://github.com/Italo1001/pi-II-2026-2-equipe-7/pull/159), [#185](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/185) | CT08, CT09, CT18–CT20 |

## 3. Detalhamento dos requisitos funcionais Importantes

| RF | Critério de aceitação | Evidência encontrada | Situação da revisão |
|---|---|---|---|
| RF03 | Exibir o exemplo cadastrado nos detalhes do termo; se não existir, omitir a seção ou indicar sua ausência sem inventar conteúdo. | Tela e rota de detalhes constavam na matriz anterior; campo de exemplo não confirmado. | A verificar no código e no QA. |
| RF12 | Exibir somente termos da categoria escolhida e permitir retirar o filtro. | Filtro local e chamada de categorias constavam na matriz anterior. O [PR #158](https://github.com/Italo1001/pi-II-2026-2-equipe-7/pull/158), integrado em 08/11, possui label RF-12. | Evidência de trabalho de backend; teste de ponta a ponta a confirmar. |

O RF03 e o RF12 devem ser vinculados individualmente às respectivas issues de implementação e aos testes do QA. As issues [#182](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/182) e [#177](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/177) tratam da documentação e dos testes dos Importantes, respectivamente; não comprovam entrega dos RFs.

## 4. Requisitos não funcionais Importantes

A tabela segue a prioridade e o sentido dos RNFs do documento detalhado anterior. Há divergência de códigos entre esse documento e o README: expansão é RNF09 no documento detalhado e RNF08 no README; linguagem acessível é RNF10 no detalhado e RNF09 no README. A persistência, que é Essencial na base anterior, aparece como RNF08 no detalhado e RNF10 no README. Não renumerar issues antes de conciliar os documentos. Os critérios de qualidade quantitativos do documento anterior são propostas, não metas homologadas.

| RNF (documento detalhado / README) | Requisito | RF / tela vinculada | Rota / componente relacionado | Issue / verificação | Estado |
|---|---|---|---|---|---|
| RNF01 / RNF01 | Usabilidade e clareza da interface | RF01, RF02, RF03, RF05, RF12; Home e detalhes | Consulta de termos e categorias | [#175](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/175), [#187](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/187); teste de uso | Feedback positivo do cliente, sem medição formal registrada |
| RNF03 / RNF03 | Desempenho da pesquisa | RF01, RF05, RF12; pesquisa e listagem | Operações de busca e consulta | [#177](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/177) (QA geral), [#214](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/214) (medição na Sprint 6); medir latência e carga | Sem teste de carga registrado na ata |
| RNF06 / RNF06 | Organização e manutenibilidade | Todos os RFs; frontend e backend | Módulos, APIs e README | [#182](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/182), [#215](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/215) (README, Sprint 6); revisar documentação e execução | Revisão parcial, sem aceite final |
| RNF07 / RNF07 | Compatibilidade com navegadores | RF01, RF02, RF06, RF12; Home, detalhes e login | Rotas de navegação e consultas correspondentes | [#173](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/173), [#177](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/177); testar navegadores-alvo | A verificar |
| RNF09 / RNF08 | Capacidade de expansão | RF07, RF10, RF14; administração | Módulos de termos, categorias e autorização | Issue individual a vincular; revisão estrutural e teste de regressão | A verificar |
| RNF10 / RNF09 | Linguagem acessível | RF02, RF03, RF11; detalhes e mensagens | Dados de consulta e tratamento de ausência | [#188](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/188); revisão textual e teste com usuário | Feedback positivo, sem homologação integral |

## 5. Rastreabilidade do retorno do cliente

| Ajuste | RF relacionado | Caso de uso | Tela | Rota / operação | Regras | Issues | Testes propostos | Situação |
|---|---|---|---|---|---|---|---|---|
| AJ-01 – Acesso e cadastro do perfil institucional da FPJ | RF06, RF14 (preliminares); RNF04 | UC05 (extensão); cadastro institucional a especificar | Login e cadastro institucional (tela a definir) | Autenticação inicial e cadastro do perfil (contrato a definir) | RN-INST01 a RN-INST04 (propostas) | [#185](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/185), [#182](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/182); issue específica AJ-01 a vincular | CT21–CT24 | Proposta registrada, aguardando detalhamento e prioridade formal |

O AJ-01 não altera a classificação dos requisitos já existentes nesta revisão. A consulta pública permanece sem login. Os demais pontos da reunião não geraram solicitação de alteração. Ver `ATUALIZACAO-REQUISITOS-E-REGRAS-SPRINT-05.md` e `LISTA-DE-AJUSTES-SPRINT-05.md`.

## 6. Casos de teste dos Importantes e do novo ajuste

Os identificadores CT04 e CT16 foram preservados da matriz anterior; CT21–CT24 são propostos para AJ-01. A tabela contém os resultados esperados, não resultados executados.

| Teste | Requisito | Cenário | Resultado esperado | Evidência real |
|---|---|---|---|---|
| CT04 | RF03 | Abrir termo com exemplo cadastrado e outro sem exemplo | Exibir o exemplo existente; não exibir conteúdo inventado no segundo termo | A confirmar pelo QA |
| CT16 | RF12 | Selecionar categoria com termos, selecionar categoria sem termos e limpar filtro | Mostrar apenas termos correspondentes, tratar lista vazia e restaurar listagem | A confirmar pelo QA |
| CT21 | RF06, AJ-01 | Informar credencial inicial válida | Permitir acesso à etapa autorizada de cadastro | Pendente de especificação e teste |
| CT22 | RF06, RF14, AJ-01 | Informar credencial inválida | Negar o acesso | Pendente de especificação e teste |
| CT23 | RF06, AJ-01 | Cadastrar perfil após acesso autorizado | Registrar vínculo com FPJ conforme campos aprovados | Pendente de especificação e teste |
| CT24 | RF14, AJ-01 | Tentar cadastrar sem autorização ou executar ação não permitida ao perfil | Bloquear a operação no servidor | Pendente de especificação e teste |

### Cenários Gherkin complementares do AJ-01 (propostos)

```gherkin
Funcionalidade: Acesso institucional
  Cenário: Acesso inicial autorizado
    Dado que o representante da FPJ possui uma credencial inicial válida
    Quando realizar a autenticação
    Então deverá acessar a etapa autorizada de cadastro institucional

  Cenário: Acesso inicial inválido
    Dado que o representante possui uma credencial inválida
    Quando tentar entrar no sistema
    Então o acesso deverá ser negado

  Cenário: Cadastro institucional autorizado
    Dado que o representante realizou o acesso inicial autorizado
    Quando confirmar o cadastro com os dados exigidos
    Então o perfil deverá ser vinculado à FPJ

  Cenário: Acesso fora das permissões
    Dado que o perfil institucional não possui permissão para uma operação
    Quando tentar executar a operação
    Então o servidor deverá negá-la
```

## 7. Acompanhamento da entrega

| Grupo | Total na base anterior | Mínimo exigido no marco final | Conclusão comprovada nesta revisão |
|---|---:|---:|---|
| RFs Essenciais | 11 | 11 | Não aferida |
| RFs Importantes | 2 | 2 (60%, arredondado para cima) | Não aferida |
| RNFs Essenciais | 5 | 5, se contabilizados separadamente | Não aferida |
| RNFs Importantes | 6 | 4, se contabilizados separadamente | Não aferida |
| Importantes (RF + RNF) | 8 | 5, se contabilizados em conjunto | Não aferida |

A forma de contabilização deve seguir o professor e o catálogo oficial. A situação de um requisito não pode ser inferida apenas pelo encerramento de uma issue. As issues [#208](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/208) e [#221](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/221) da Sprint 6 registram trabalho de requisitos Importantes pendentes, sem enumerar os RFs específicos.

Para concluir a revisão: confirmar a classificação oficial, revisar as rotas no Swagger/código atual, registrar as issues individuais e respectivas labels, e anexar resultados e evidências do QA. Não substituir alterações mais recentes feitas por outros integrantes sem comparar a matriz atualmente versionada.

## 8. Referências

- [README do JurisFácil](https://github.com/Italo1001/pi-II-2026-2-equipe-7).
- [Marco Sprint 5](https://github.com/Italo1001/pi-II-2026-2-equipe-7/milestone/6).
- [Issue #182 – Matriz](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/182), [#185 – Requisitos e RN](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/185), [#177 – Testes](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/177).
- [PR #157 – Listagem de áreas](https://github.com/Italo1001/pi-II-2026-2-equipe-7/pull/157), [PR #158 – Regras das rotas](https://github.com/Italo1001/pi-II-2026-2-equipe-7/pull/158), [PR #159 – Sessão e estados](https://github.com/Italo1001/pi-II-2026-2-equipe-7/pull/159).
- `MATRIZ-DE-RASTREABILIDADE-JURISFACIL-ATUALIZADA.md` (revisão anterior de 06/11/2026).
- `Requisitos_Dicionario_Juridico_Detalhado.pdf` (documento de trabalho de 18/10/2026).
- Ata, lista consolidada e registro de alterações da Sprint 5.

## Anexo A – Critérios Gherkin preservados da matriz anterior

Os cenários abaixo foram recuperados da revisão de 06/11 e mantidos como referência de teste. Suas descrições não comprovam execução atual. Regras e contratos sugeridos deverão ser conferidos com o catálogo vigente.

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

