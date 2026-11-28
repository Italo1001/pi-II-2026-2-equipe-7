# Atualização de Requisitos e Regras de Negócio – Sprint 5

**Projeto:** JurisFácil  
**Disciplina:** Projeto Integrador II – 2026.2  
**Equipe:** 7  
**Cliente:** Faculdade Primeiro de Janeiro (FPJ)  
**Data da revisão documental:** 28/11/2026  
**Issue:** [#185 – Atualizar requisitos e regras de negócio](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/185)

## 1. Objetivo

Registrar os impactos do retorno do cliente sobre os requisitos e as regras de negócio do JurisFácil, mantendo o histórico da alteração e a relação com a ata e a lista consolidada de ajustes da Sprint 5.

## 2. Retorno da validação

O cliente avaliou positivamente as cores, a simplicidade da interface e a clareza dos textos. Não solicitou alterações nesses aspectos. A dúvida sobre a capacidade de requisições foi esclarecida pela equipe, que informou até 200 requisições, sem registro de intervalo, simultaneidade ou teste de carga. Portanto, não foi estabelecida uma nova meta de desempenho.

A única solicitação de mudança foi o acesso próprio da faculdade: disponibilizar uma credencial inicial para entrar no sistema e, posteriormente, cadastrar um perfil vinculado à instituição. Essa demanda corresponde ao ajuste AJ-01 da lista consolidada.

## 3. Revisão dos requisitos funcionais

As descrições abaixo constituem a atualização proposta a partir do feedback. O escopo administrativo existente é preservado. A aprovação dos detalhes do fluxo e a decisão sobre a criação de um RF independente ainda precisam ser registradas.

| Código | Descrição anterior (README) | Complemento proposto | Motivo | Situação |
|---|---|---|---|---|
| RF06 | Login do administrador | Manter o login administrativo e prever um acesso inicial autorizado para que a FPJ possa cadastrar seu perfil institucional. | Permitir que a instituição possua acesso próprio. | Em revisão |
| RF14 | Controle de acesso administrativo | Manter a proteção da área administrativa e aplicar ao perfil institucional somente as permissões que forem definidas e aprovadas. | Evitar acesso indevido durante e após o cadastro do perfil. | Em revisão |

### 3.1 RF06 – Login do administrador (complemento)

O sistema deverá manter a autenticação administrativa existente. Como extensão proposta, deverá permitir que um representante autorizado da FPJ utilize uma credencial inicial válida e realize o cadastro de um perfil da instituição, conforme o fluxo a ser definido.

Critérios de aceitação propostos:

- Dado que o representante possui uma credencial inicial válida, quando realizar a autenticação, então deverá conseguir acessar a etapa de cadastro institucional autorizada.
- Dado que a credencial é inválida, quando tentar entrar, então o acesso deverá ser negado.
- Dado que o cadastro foi preenchido com os dados exigidos e aprovados, quando for confirmado, então o perfil deverá ficar associado à FPJ.

### 3.2 RF14 – Controle de acesso administrativo (complemento)

O sistema deverá impedir que usuários sem autorização acessem funções restritas. O acesso inicial e o perfil institucional deverão obedecer às permissões definidas pela equipe e pelo cliente, sem concessão automática de privilégios administrativos.

Critérios de aceitação propostos:

- Dado que o usuário não possui uma credencial inicial válida nem outra autorização aplicável, quando tentar acessar o cadastro institucional restrito, então o acesso deverá ser negado.
- Dado que um perfil institucional foi cadastrado, quando tentar executar uma operação fora de suas permissões, então a operação deverá ser bloqueada no servidor.
- A consulta pública aos termos deverá continuar disponível sem login, preservando o fluxo existente.

### 3.3 Requisitos não funcionais relacionados

| Código | Requisito | Encaminhamento |
|---|---|---|
| RNF04 | Senhas armazenadas com segurança | Aplicar a proteção de credenciais também ao acesso institucional, caso utilize senha. Não há alteração de meta de segurança solicitada pelo cliente. |
| RNF03 | Tempo de resposta adequado | Manter a especificação vigente. O questionamento sobre 200 requisições não foi uma solicitação de alteração nem comprovação de capacidade. |
| RNF01 | Interface simples e intuitiva | Manter a especificação vigente, considerando o retorno positivo. |

Não foi atribuído um novo código RF ao AJ-01 nesta revisão, pois ainda não foi decidido se o cadastro institucional será uma extensão dos RF06/RF14 ou um requisito independente. Os demais RFs permanecem sem alteração motivada pela reunião.

## 4. Revisão das regras de negócio

Para não sobrescrever a numeração de regras já existente, foram usados identificadores provisórios de complemento. No documento detalhado anterior, a RN04 tratava da autenticação e criação de contas, e a RN05 tratava de registros de acesso; confirmar essa correspondência no catálogo vigente antes da integração.

| Código provisório | Regra proposta | RF relacionado | Situação |
|---|---|---|---|
| RN-INST01 | O acesso inicial para cadastro do perfil institucional deverá ser autorizado mediante credencial válida. | RF06, RF14 | A validar |
| RN-INST02 | Após o acesso inicial autorizado, o sistema deverá permitir o cadastro de um perfil vinculado à FPJ. | RF06 | A validar |
| RN-INST03 | O perfil institucional deverá possuir somente as permissões aprovadas para sua função; a autorização deverá ser verificada no servidor. | RF14 | A validar |
| RN-INST04 | As credenciais institucionais deverão seguir as regras de proteção aplicáveis às demais contas, sem exposição de senhas em registros ou respostas. | RF06, RF14, RNF04 | A validar |

As regras de segurança complementares são propostas técnicas para viabilizar a solicitação, não novas exigências expressas pelo cliente. Permanecem as regras anteriores de autenticação, consulta pública e gerenciamento de conteúdo, salvo alteração posteriormente aprovada. A numeração definitiva deverá ser conciliada com o documento oficial de regras de negócio.

## 5. Histórico de mudanças

| ID | Data da revisão | Data da solicitação | Solicitante | Artefato afetado | Motivo e alteração | Estado |
|---|---|---|---|---|---|---|
| ALT-01 | 28/11/2026 | A confirmar na ata | Cliente – representante da FPJ | RF06 | Prever acesso inicial e cadastro de perfil institucional. | Proposta registrada |
| ALT-02 | 28/11/2026 | A confirmar na ata | Cliente – representante da FPJ; detalhamento pela equipe | RF14 | Definir controle de acesso do novo perfil sem alterar permissões existentes indevidamente. | Proposta registrada |
| ALT-03 | 28/11/2026 | A confirmar na ata | Cliente – representante da FPJ; detalhamento pela equipe | RN-INST01 a RN-INST04 | Especificar condições do acesso, cadastro, permissões e proteção de credenciais. | Regras propostas |

Origem: AJ-01, registrado na ata da validação (Google Meet, horário registrado de 20h17). O nome individual de quem formulou o pedido e a data exata da reunião não foram confirmados. A data de revisão não representa a data da reunião.

## 6. Encaminhamento no GitHub

| Informação | Registro |
|---|---|
| Issue de atualização documental | #185 |
| Ajuste solicitado | AJ-01 |
| Issue específica do AJ-01 | A abrir ou vincular, se já existente |
| Labels a aplicar à demanda | RF-06 e RF-14 (preliminares); REQUISITOS |
| Prioridade | Primeiro e único ajuste da sessão; classificação formal a confirmar com a FPJ |
| Estimativa para especificação | 2h (proposta da lista consolidada) |
| Resultado esperado | Fluxo institucional especificado, regras revisadas e matriz atualizada, com critérios aprovados para implementação e QA. |

Antes de considerar o requisito aprovado, devem ser definidos com o cliente a emissão e entrega da credencial inicial, os campos do cadastro, a forma de vinculação à instituição, as permissões e a prioridade. A implementação e os testes deverão ter issues próprias, vinculadas aos RFs efetivamente aprovados.

## 7. Referências

- `ATA-VALIDACAO-SPRINT-05.md`.
- `LISTA-DE-AJUSTES-SPRINT-05.md`.
- `Requisitos_Dicionario_Juridico_Detalhado.pdf` (versão de trabalho anterior).
- [README do JurisFácil](https://github.com/Italo1001/pi-II-2026-2-equipe-7).
- [Issue #185](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/185).
- [Issue #182 – Atualização da matriz](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/182).

A pasta de documentação versionada não pôde ser consultada integralmente nesta revisão. Integrar os complementos ao catálogo vigente após conferir a numeração e preservar as regras não afetadas.
