# Lista consolidada de ajustes – Sprint 5

**Projeto:** JurisFácil  
**Disciplina:** Projeto Integrador II – 2026.2  
**Equipe:** 7  
**Cliente:** Faculdade Primeiro de Janeiro (FPJ)  
**Origem:** Ata de Reunião de Validação – Sprint 5 (Google Meet, registro às 20h17)

## 1. Objetivo

Consolidar o retorno recebido durante a reunião de validação com o cliente, identificando as solicitações de alteração, os requisitos envolvidos e os encaminhamentos necessários para as próximas etapas do projeto.

## 2. Consolidação do retorno do cliente

| Item | Retorno do cliente | Encaminhamento |
| --- | --- | --- |
| Cores e interface | As cores foram bem avaliadas e a interface foi considerada simples. | Manter a apresentação atual. |
| Textos | Os textos foram considerados claros e explicativos. | Manter os textos apresentados. |
| Capacidade de requisições | O cliente perguntou quantas requisições o sistema suportaria. A equipe informou até 200 requisições e esclareceu a dúvida. | Nenhuma alteração solicitada. |
| Login institucional | O cliente propôs um acesso inicial que permita cadastrar posteriormente um perfil próprio da faculdade. | Detalhar o requisito e registrar a solicitação em issue. |

A capacidade de 200 requisições foi informada pela equipe durante a reunião. Não há, na ata, indicação de intervalo de tempo, simultaneidade ou teste de carga que comprove esse valor. O questionamento não foi apresentado como solicitação de mudança.

## 3. Lista de ajustes e priorização

| Ordem | ID | Ajuste solicitado | Requisitos relacionados | Prioridade | Situação | Issue |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | AJ-01 | Disponibilizar acesso inicial e permitir o cadastro de um perfil próprio da FPJ. | RF06 e RF14 (vinculação preliminar) | A confirmar com o cliente | Proposta em análise | A abrir |

O AJ-01 ocupa a primeira posição por ser a única alteração solicitada pelo cliente. Não foi registrada uma classificação formal de prioridade (alta, média, baixa ou MoSCoW). Essa classificação deverá ser confirmada com o cliente antes da definição do prazo de implementação.

Não foram identificadas outras solicitações de ajuste na sessão. Os elogios à interface e aos textos e a dúvida sobre requisições não constituem itens de desenvolvimento.

## 4. Detalhamento do ajuste AJ-01

O cliente deseja que a faculdade tenha um acesso próprio ao JurisFácil. A proposta prevê uma credencial inicial para acessar o sistema e, posteriormente, cadastrar um perfil vinculado à instituição.

Conforme o README do projeto, os requisitos atualmente relacionados são:

- RF06 – Login do administrador;
- RF14 – Controle de acesso administrativo.

A relação com esses requisitos é inicial. A equipe deverá verificar se será necessário atualizar os RFs existentes ou cadastrar um novo RF específico para o perfil institucional. O RNF04 (senhas armazenadas com segurança) também deverá ser considerado na especificação técnica, caso sejam utilizadas senhas.

Ainda precisam ser definidos com o cliente: a forma de geração e entrega da credencial inicial, os dados necessários para cadastrar o perfil e as permissões desse perfil no sistema.

## 5. Issue proposta para o GitHub

### Título

[REQ] AJ-01 – Acesso e cadastro de perfil institucional da FPJ

### Labels

- REQUISITOS
- RF-06
- RF-14

As labels de RF são preliminares e deverão ser revisadas caso seja criado um requisito específico. Vincular a issue ao marco SPRINT 5 - Requisitos Importantes, como registro da demanda recebida nessa sprint.

### Estimativa

2h para levantamento, detalhamento e atualização da documentação do requisito (estimativa proposta pela equipe de Requisitos, a confirmar). A implementação deverá ser estimada separadamente após a definição do fluxo.

### Conceito e descrição

Detalhar a solicitação apresentada pelo cliente durante a reunião de validação da Sprint 5 referente à criação de um acesso próprio para a Faculdade Primeiro de Janeiro. Definir o fluxo de acesso inicial e cadastro do perfil institucional, verificando os impactos nos requisitos de autenticação e controle de acesso já existentes.

### Critérios de aceitação

- [ ] Fluxo de acesso inicial definido e validado com o cliente.
- [ ] Dados necessários para o cadastro do perfil institucional definidos.
- [ ] Permissões do perfil institucional especificadas.
- [ ] Prioridade da solicitação confirmada com o cliente.
- [ ] Requisito funcional correspondente identificado ou criado e documentado.
- [ ] Regras de negócio e matriz de rastreabilidade atualizadas quando afetadas.

### Resultado esperado

Solicitação do cliente documentada e validada, com o fluxo de autenticação institucional definido e informações suficientes para orientar o desenvolvimento e os testes da funcionalidade.

### Responsável e situação

Responsável: a definir pela equipe de Requisitos.  
Situação: issue a abrir. Após a abertura, registrar seu número ou link na tabela da seção 3. A issue proposta trata do detalhamento do requisito, não representa a implementação concluída.

## 6. Encaminhamentos

Após a confirmação do fluxo e da prioridade com o cliente, a equipe deverá atualizar os requisitos e regras de negócio afetados, registrando a data, o motivo e o solicitante da alteração. A matriz de rastreabilidade deverá relacionar o requisito definitivo às respectivas telas, rotas, regras de negócio e issues, conforme forem definidos. As tarefas de implementação e teste deverão ser planejadas com as equipes responsáveis.

## 7. Referências

- Ata de Reunião de Validação – Sprint 5 (`ATA-VALIDACAO-SPRINT-05.md`).
- [README do JurisFácil](https://github.com/Italo1001/pi-II-2026-2-equipe-7).
- [Issue #161 – Condução da sessão de testes com o cliente](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/161).

---

Documento integrante dos artefatos de Requisitos da Sprint 5 do projeto JurisFácil.
