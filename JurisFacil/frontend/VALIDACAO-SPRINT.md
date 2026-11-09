# Sprint: estados de tela e login

## Integração de 09/11/2026

Esta versão integra a branch `feat/login-estados` (afce0e2) com a master
`9a48d6d`, mantendo o histórico e as novas rotas da equipe.
A entrega Git contém o merge já resolvido. As instruções de importação estão
no LEIA-ME que acompanha o arquivo jurisfacil-login-localstorage.bundle.
Não reaplicar os patches antigos sobre esta versão.

Preservados da master: listagem de áreas pelo serviço, filtro por área,
atualização de exemplos, seus testes, workflow e documentação.
Preservados da branch da sprint: estados de tela, campos complementares,
tratamento de erros e as correções de dependências/lint já enviadas pelo usuário.
O trabalho ainda não incorporado da branch `codex/frontend-2-117` não faz parte deste merge.

## Implementação

- Login real: POST /api/auth/login com {email, senha}; usa a resposta {token, administrador} já implementada pelo backend.
- JWT enviado como Authorization: Bearer nas operações protegidas e nas consultas do painel.
- Rotas /admin/previa e filhas exigem login. Consultas públicas permanecem públicas.
- Expiração pelo exp do JWT, verificação ao voltar à aba e ao fazer uma requisição.
- 401 com token da sessão atual encerra a sessão e solicita login. 401 no login informa credenciais inválidas. 401 de consulta pública não encerra outra sessão.
- 403 informa falta de permissão e mantém a sessão. Resposta atrasada de um token anterior não encerra um login novo.
- Sair da conta limpa a sessão local. O backend atual não tem revogação de JWT: um token emitido continua sujeito à validade definida pelo servidor. Não há refresh automático.
- Token e perfil persistidos em localStorage nas chaves token/user da equipe, por decisão do projeto. Recarregar e reabrir a página preserva o login enquanto o token for válido. Login/logout são sincronizados entre abas. Expiração e 401 autenticado removem as duas chaves. A senha não é persistida e o perfil armazenado inclui somente id, nome e email.
- localStorage continua acessível a JavaScript da mesma origem; essa escolha não elimina o risco de XSS. Validade, assinatura e permissões devem continuar verificadas no servidor. Falha de acesso ao armazenamento é apresentada sem afirmar que o login foi concluído.
- Ler exp/roles no navegador serve à interface; a assinatura e a autorização são verificadas pelo backend em cada requisição.
- Campos **Explicação simples**, **Explicação simplificada**, **Exemplo de uso** e **Fonte ou referência** visíveis, separados e desabilitados. Não são enviados nem apresentados como salvos; aguardam integração ao salvamento deste formulário. A master já tem rotas separadas para exemplos; elas foram preservadas, mas não são chamadas por estes campos.
- Salvar envia somente termo, significado, categoriaId e areaId, conforme TermoRequest atual. O funcionamento completo da gravação no banco deve ser validado no ambiente da equipe.
- Estados carregando, vazio e erro nas telas públicas e administrativas, tentativa novamente e cancelamento de consultas antigas.
- Textos centralizados em src/utils/requestMessages.js, ainda provisórios até aprovação do Design.
- Correções anteriores preservadas: cartões de áreas, links por ID, contagens do painel e GET /areas com IDs reais.
- Compose repassa JWT_EXPIRATION ao backend, mantendo o padrão PT1H (uma hora).

## Rodar e validar

Frontend, em JurisFacil/frontend:

```powershell
npm.cmd ci
npm.cmd run lint
npm.cmd test
npm.cmd run build
```

Backend com Java 21:

```powershell
cd ..\backend
.\mvnw.cmd clean package
cd ..
docker compose up -d --build
docker compose ps
```

O Dockerfile do backend copia o JAR de target. Por isso o clean package deve concluir antes de reconstruir a imagem.

Usar JWT_SECRET local já previsto pelo projeto, com pelo menos 32 bytes. Não incluir .env, tokens ou senhas no Git.

Abrir http://localhost/admin/login e usar uma conta administrativa existente no banco. Este patch não cria uma conta nem define uma senha padrão. A equipe responsável pelo banco deve fornecer ou cadastrar o acesso. O backend usa BCrypt e já tem migração das senhas legadas.

Depois do login, o painel fica em http://localhost/admin/previa. Cadastro: /admin/previa/termos/novo. Acesso direto sem sessão volta ao login e, após entrar, retorna ao destino solicitado.

## Critérios para encerrar as issues

| Requisito | Preparação entregue | Validação pendente |
| --- | --- | --- |
| Sessão expirada e 401/403 | Implementados e testados no frontend com API controlada | Rodar com autenticação real e obter textos aprovados pelo Design |
| Carregando, vazio e erro | Implementados nas telas integradas | Validar com backend/banco da equipe |
| Dispositivo real em rede | Configuração de proxy e roteiro disponíveis | Teste físico, registrar evidências |
| Campos complementares do termo | Quatro campos preservados e desabilitados | Integração de cada campo ao contrato adequado; não são requisito concluído |

Não fechar as issues só por aplicar o patch ou ver o build passar.

## Teste real de autenticação

1. Abrir /admin/previa sem login: redireciona para /admin/login.
2. Credenciais inválidas: mensagem de erro, sem acesso ao painel.
3. Credenciais válidas: painel e identificação do administrador.
4. Navegar por termos, áreas e categorias sem recarregar; sessão preservada.
5. Fazer uma operação autorizada e confirmar na aba Network que o servidor a aceita. Não compartilhar capturas com tokens/senhas.
6. Verificar 403 com perfil sem permissão em ambiente de teste: mantém sessão, sem novo login automático.
7. Verificar token rejeitado/expirado: solicita novo login, sem repetição infinita da requisição.
8. Sair e usar Voltar no navegador: painel continua protegido.
9. Recarregar e abrir outra aba: sessão válida é restaurada. Sair em uma aba deve fechar o painel na outra.
10. Token expirado ou perfil armazenado inválido: limpar as chaves e solicitar novo login, sem tela em branco.

Para testar expiração rapidamente em ambiente de desenvolvimento, definir JWT_EXPIRATION=PT30S no .env local ao lado de docker-compose.yml e executar `docker compose up -d --force-recreate backend`. Fazer novo login e aguardar 30 segundos com o painel aberto. Depois remover esse ajuste ou voltar a PT1H e recriar o backend. Nunca mudar a validade de uma implantação compartilhada sem coordenar com a equipe.

## Dispositivo físico na mesma rede

Executar `ipconfig` no computador. No celular conectado ao mesmo Wi-Fi, abrir http://IP_DO_COMPUTADOR, usando o IPv4 do adaptador ativo. Não usar localhost no celular. O Nginx encaminha /api ao backend.

Se necessário, permitir a porta 80 na rede privada no Firewall do Windows e conferir isolamento de clientes no Wi-Fi. Não desativar o firewall nem abrir portas no roteador.

Alternativa Vite: `npm.cmd run dev -- --host 0.0.0.0` no frontend, backend/banco ativos; usar no celular o IP e a porta exibidos pelo Vite. O proxy encaminha /api a localhost:8080 no computador.

Registrar aparelho, navegador, data, commit, rede e resultado. Testar Home, buscas, detalhe direto, login, painel, quatro campos pendentes, teclado aberto, retrato, paisagem, erro, recuperação e expiração. Para credenciais reais fora de teste local, usar HTTPS.

## Evidências desta preparação

- Frontend: lint e build aprovados; 22 testes Node aprovados; npm audit sem vulnerabilidades.
- Navegador com API controlada: fluxo público preservado, login e senha inválida, carregamento, indisponibilidade, retorno ao destino, Bearer, cadastro conforme contrato, campos pendentes, 401/403, logout, expiração automática, recarga com sessão preservada, logout entre abas e viewport móvel aprovados. As respostas HTTP destes testes são simuladas, não constituem validação com banco real.
- Testes Java: acrescentados login real com BCrypt/H2, token aceito na rota protegida e token expirado; preservados testes de /areas, 401/403 e autorização existentes.
- Execução Maven bloqueada neste ambiente por falha de resolução de repo.maven.apache.org. Não afirmar que os testes Java passaram.
- Docker, PostgreSQL real e celular físico não foram testados nesta preparação.

## Commit depois dos testes

Revisar `git diff`, adicionar somente os arquivos da entrega, conferir `git diff --cached --stat`, fazer commit e push na branch da sprint. Solicitar revisão da equipe antes do merge. Não incluir node_modules, target, dist, .env ou credenciais.
