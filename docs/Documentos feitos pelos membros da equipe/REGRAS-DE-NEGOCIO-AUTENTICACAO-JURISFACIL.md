# Regras de Negócio da Autenticação — JurisFácil

**Projeto:** JurisFácil — Dicionário Jurídico  
**Repositório:** https://github.com/Italo1001/pi-II-2026-2-equipe-7  
**Data:** 06/11/2026  
**Situação:** Proposta de regras para validação com a equipe

## 1. Objetivo

Este documento descreve como o **login administrativo** do JurisFácil deve funcionar em situações como senha incorreta, várias tentativas de acesso, expiração de sessão e saída do sistema. As regras têm o objetivo de proteger as funcionalidades de **cadastro, edição e exclusão** de termos e categorias.

No JurisFácil, o **visitante não precisa fazer login** para pesquisar e consultar os termos jurídicos. A autenticação é necessária para acessar a **área administrativa**.

> **Importante:** o README define a necessidade de login e controle de acesso, mas não informa quantas tentativas de senha são permitidas, quanto tempo dura a sessão ou se há bloqueio temporário. Portanto, os números e comportamentos abaixo são **regras propostas**, e não uma afirmação de que já estão implementados no código.

## 2. Requisitos relacionados

| Código | Requisito do projeto | Relação com este documento |
|---|---|---|
| **RF06** | Login do administrador | Validação das credenciais e entrada no sistema. |
| **RF14** | Controle de acesso administrativo | Proteção das telas e operações administrativas. |
| **RNF04** | Senhas armazenadas com segurança | Proteção das senhas dos administradores. |

**Referência adicional:** a issue [#93 — Implementar autenticação, validação e códigos de erro](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/93) pede que credenciais inválidas neguem o login e que acessos sem autenticação sejam bloqueados. Ela não define limites de tentativas nem tempos de expiração.

## 3. Regras de negócio

### RN-AUT01 — Login com dados corretos

**Regra:** O administrador só poderá entrar na área administrativa se informar credenciais válidas e sua conta não estiver temporariamente bloqueada.

**Comportamento esperado:**
- O sistema confere os dados informados.
- Se estiverem corretos, libera o acesso à área administrativa.
- Se houver tentativas anteriores de senha incorreta, a contagem é zerada após o login bem-sucedido.

**Requisitos relacionados:** RF06 e RF14.

### RN-AUT02 — Senha ou usuário incorreto

**Regra:** Se a identificação do administrador ou a senha estiver incorreta, o sistema deve **negar o login**.

**Comportamento esperado:**
- Exibir a mensagem: **"Usuário ou senha inválidos."**
- Não informar qual dos dois dados está incorreto.
- Não liberar nenhuma tela ou operação administrativa.
- Registrar a tentativa malsucedida para aplicar o limite da RN-AUT03.

**Resposta sugerida da API:** `401 Unauthorized`.

**Requisitos relacionados:** RF06 e RF14.

### RN-AUT03 — Limite de tentativas de login

**Regra proposta:** O sistema permitirá até **4 tentativas incorretas** dentro de um período de **15 minutos**. Na **5ª tentativa incorreta**, o acesso por aquela conta será bloqueado temporariamente.

**Comportamento esperado:**
- Contar tentativas incorretas feitas em uma janela de 15 minutos.
- Ao atingir 5 erros, ativar o bloqueio da RN-AUT04.
- O contador não deve ser controlado apenas pelo navegador; o backend deve aplicar a regra.
- Um login correto antes do bloqueio zera a contagem.
- Tentativas antigas deixam de contar quando saem da janela de 15 minutos.

**Requisitos relacionados:** RF06 e RF14.

### RN-AUT04 — Bloqueio temporário após várias tentativas

**Regra proposta:** Depois de 5 tentativas incorretas dentro de 15 minutos, o login da conta ficará bloqueado por **15 minutos**.

**Comportamento esperado:**
- Durante o bloqueio, não permitir novo login, mesmo com a senha correta.
- Exibir uma mensagem genérica: **"Não foi possível entrar agora. Tente novamente mais tarde."**
- Após os 15 minutos, permitir novas tentativas e reiniciar a contagem.
- Novas tentativas durante o bloqueio não devem prolongá-lo indefinidamente.
- O bloqueio do administrador não deve impedir o visitante de consultar o dicionário.

**Resposta sugerida da API:** `429 Too Many Requests` para excesso de tentativas, conforme o contrato definido pela equipe.

**Observação:** para evitar que alguém prejudique um administrador de propósito, a equipe deve complementar essa regra com limite de requisições e registro de tentativas suspeitas. A mensagem pública não precisa revelar se a conta existe.

**Requisitos relacionados:** RF06 e RF14.

### RN-AUT05 — Expiração da sessão por inatividade

**Regra proposta:** Se o administrador ficar **30 minutos sem realizar atividade autenticada**, a sessão deverá expirar.

**Comportamento esperado:**
- Ao expirar, o sistema não poderá continuar aceitando operações administrativas usando a sessão antiga.
- Na próxima tentativa de acessar uma tela protegida ou alterar dados, o sistema deverá exigir novo login.
- Exibir: **"Sua sessão expirou. Entre novamente para continuar."**
- A consulta pública aos termos continuará disponível.

**Resposta sugerida da API:** `401 Unauthorized` para uma sessão expirada.

**Atenção para a implementação:** o prazo por inatividade deve ser verificado pelo **backend**. Se a equipe usar um token com horário fixo de validade, isso **não significa automaticamente** que exista expiração após 30 minutos de inatividade; esse comportamento precisa ser desenvolvido e testado.

**Requisitos relacionados:** RF06 e RF14.

### RN-AUT06 — Acesso sem autenticação ou com sessão expirada

**Regra:** Nenhuma pessoa sem autenticação administrativa válida poderá cadastrar, editar ou excluir termos e categorias.

**Comportamento esperado:**
- Impedir o acesso às operações protegidas, inclusive quando alguém tenta usar diretamente uma rota da API.
- Não confiar apenas no fato de o frontend esconder o botão de editar ou excluir.
- Quando o problema for falta de login ou sessão inválida, retornar `401 Unauthorized`.
- Quando houver uma pessoa autenticada, mas sem permissão para a operação, retornar `403 Forbidden`.

**Requisitos relacionados:** RF14.

### RN-AUT07 — Saída do sistema (logout)

**Regra:** Ao clicar em **Sair**, o administrador deverá perder o acesso às funções protegidas até entrar novamente.

**Comportamento esperado:**
- Encerrar a autenticação ativa.
- Redirecionar o administrador para a área pública ou tela de login.
- Impedir que a sessão encerrada seja reutilizada para realizar operações administrativas.
- Voltar pelo navegador não deverá permitir alterações sem uma autenticação válida.

**Observação técnica:** se a aplicação utilizar tokens, apenas apagar os dados do navegador não garante o encerramento imediato de um token ainda válido. A equipe deverá definir uma forma de invalidá-lo ou usar uma sessão controlada pelo servidor.

**Requisitos relacionados:** RF06 e RF14.

### RN-AUT08 — Proteção das senhas

**Regra:** A senha do administrador não poderá ser guardada em texto simples nem ser exibida no sistema.

**Comportamento esperado:**
- Armazenar somente uma forma protegida da senha, usando um algoritmo próprio para senhas, como **BCrypt** ou **Argon2id**.
- Conferir a senha recebida no login sem armazenar ou registrar seu valor original.
- Não mostrar senhas em mensagens de erro, registros do sistema ou respostas da API.

**Requisito relacionado:** RNF04.

## 4. Resumo das situações

| Situação | O que o sistema deve fazer | Acesso administrativo |
|---|---|:---:|
| Administrador informa dados corretos | Autentica e libera o painel | **Permitido** |
| Senha incorreta | Mostra mensagem genérica e conta uma falha | **Negado** |
| 5 erros em até 15 minutos | Bloqueia a conta por 15 minutos | **Negado** |
| Conta ainda bloqueada | Impede login até acabar o prazo | **Negado** |
| Prazo de bloqueio encerrado | Permite tentar entrar novamente | **Depende do novo login** |
| Sessão sem atividade há 30 minutos | Expira a sessão e exige novo login | **Negado** |
| Administrador clica em Sair | Encerra a autenticação | **Negado** |
| Visitante pesquisa um termo | Permite a consulta sem login | **Não necessário** |
| Visitante tenta editar um termo | Bloqueia a operação | **Negado** |

## 5. Exemplos de funcionamento

### Exemplo 1 — Administrador erra a senha

1. O administrador abre a tela de login.
2. Digita os dados e erra a senha.
3. O sistema mostra **"Usuário ou senha inválidos."**
4. O administrador permanece fora da área administrativa.
5. A tentativa incorreta é contabilizada.

### Exemplo 2 — Administrador erra várias vezes

1. O administrador erra a senha 5 vezes dentro de 15 minutos.
2. O sistema ativa um bloqueio de 15 minutos.
3. Uma nova tentativa durante esse período é recusada.
4. Quando o prazo termina, o administrador pode tentar entrar novamente.

### Exemplo 3 — Sessão expira

1. O administrador faz login normalmente.
2. Fica 30 minutos sem atividade autenticada.
3. O sistema considera a sessão expirada.
4. Ao tentar cadastrar um termo, recebe o aviso de sessão expirada.
5. Precisa entrar novamente para continuar.

## 6. Critérios de aceitação e testes

Marcar os itens abaixo depois que a funcionalidade for implementada e testada:

- [ ] Login com dados válidos permite entrar no painel administrativo.
- [ ] Login com senha errada não permite entrar no painel.
- [ ] Mensagem de erro não revela se o usuário ou a senha está incorreto.
- [ ] Após 5 tentativas incorretas em 15 minutos, o login é bloqueado.
- [ ] Durante os 15 minutos de bloqueio, novas tentativas são recusadas.
- [ ] Depois do bloqueio, uma tentativa válida permite login novamente.
- [ ] Após 30 minutos de inatividade, o acesso administrativo expira.
- [ ] Com a sessão expirada, a API não aceita cadastro, edição ou exclusão.
- [ ] Após clicar em Sair, a autenticação antiga não permite alterar dados.
- [ ] Um visitante consegue consultar termos sem precisar fazer login.
- [ ] Um visitante não consegue cadastrar, editar nem excluir termos ou categorias.
- [ ] A senha não fica armazenada em texto simples.

## 7. Decisões que a equipe precisa validar

Os itens a seguir foram **propostos neste documento** para deixar as regras completas. A equipe deve confirmar se adotará esses valores e implementar os comportamentos correspondentes:

| Decisão | Proposta |
|---|---|
| Quantidade máxima de falhas | 5 tentativas incorretas |
| Período para contar falhas | 15 minutos |
| Duração do bloqueio | 15 minutos |
| Tempo máximo de inatividade | 30 minutos |
| Resposta para login inválido | HTTP `401` |
| Resposta para excesso de tentativas | HTTP `429` |
| Resposta para rota protegida sem login | HTTP `401` |
| Resposta para usuário autenticado sem permissão | HTTP `403` |

**Estado da implementação:** a documentação consultada confirma a necessidade de autenticação e que a issue #93 foi encerrada, mas **não comprova** que os limites de tentativas, o bloqueio temporário ou a expiração por inatividade já estejam presentes no código atual. Esses pontos precisam ser verificados com os desenvolvedores do backend.

## 8. Referências

- [README — JurisFácil (requisitos RF06, RF14 e RNF04)](https://github.com/Italo1001/pi-II-2026-2-equipe-7/blob/master/README.md)
- [Issue #93 — Implementar autenticação, validação e códigos de erro](https://github.com/Italo1001/pi-II-2026-2-equipe-7/issues/93)
- `MATRIZ-AUTORIZACAO-JURISFACIL.md` — documento complementar sobre quem pode acessar cada tela e operação.
