# Sprint: estados de tela e login

Base do patch completo: master, commit b7920705b6429a14714a0f1193b89454d71d0e9b.

## Qual patch usar

- `jurisfacil-sprint-login.patch`: entrega completa sobre a master b792070, sem patches anteriores.
- `jurisfacil-apenas-login.patch`: complemento para quem já aplicou a versão anterior de `jurisfacil-estados-sprint-atualizado.patch` (a versão com /areas e sem login). Não aplicar os dois.
- Se usou o primeiro patch baseado em 648feda, ou editou os mesmos trechos, executar somente --check e revisar a saída antes de continuar.

Na raiz do repositório, em sua branch de trabalho:

```powershell
git status
git apply --check "$HOME\Downloads\jurisfacil-sprint-login.patch"
git apply --whitespace=nowarn "$HOME\Downloads\jurisfacil-sprint-login.patch"
```

Executar apply somente depois de --check passar. Para o complemento, trocar o nome do arquivo nas duas linhas. Não usar --reject nem sobrescrever api.js.

Para começar sem alterações pendentes: `git switch master`, `git pull --ff-only origin master`, `git switch -c feat/sprint-login-estados`. Mudanças posteriores na master podem exigir adaptar o patch; o --check detecta conflitos. Nenhum desses patches faz commit ou push.

## Implementação

- Login real: POST /api/auth/login com {email, senha}; usa a resposta {token, administrador} já implementada pelo backend.
- JWT enviado como Authorization: Bearer nas operações protegidas e nas consultas do painel.
- Rotas /admin/previa e filhas exigem login. Consultas públicas permanecem públicas.
- Expiração pelo exp do JWT, verificação ao voltar à aba e ao fazer uma requisição.
- 401 com token da sessão atual encerra a sessão e solicita login. 401 no login informa credenciais inválidas. 401 de consulta pública não encerra outra sessão.
- 403 informa falta de permissão e mantém a sessão. Resposta atrasada de um token anterior não encerra um login novo.
- Sair da conta limpa a sessão local. O backend atual não tem revogação de JWT: um token emitido continua sujeito à validade definida pelo servidor. Não há refresh automático.
- Token apenas em memória; não fica em localStorage, sessionStorage, URL ou logs. Recarregar/fechar a aba exige novo login. O campo senha é limpo após resposta e não é persistido pela aplicação.
- Ler exp/roles no navegador serve à interface; a assinatura e a autorização são verificadas pelo backend em cada requisição.
- Campos **Explicação simples**, **Explicação simplificada**, **Exemplo de uso** e **Fonte ou referência** visíveis, separados e desabilitados. Não são enviados nem apresentados como salvos; aguardam contrato/persistência do backend.
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
| Campos complementares do termo | Quatro campos preservados e desabilitados | Modelagem, contrato e persistência no backend; não são requisito concluído |

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
9. Recarregar: solicita login novamente, comportamento intencional desta versão em memória.

Para testar expiração rapidamente em ambiente de desenvolvimento, definir JWT_EXPIRATION=PT30S no .env local ao lado de docker-compose.yml e executar `docker compose up -d --force-recreate backend`. Fazer novo login e aguardar 30 segundos com o painel aberto. Depois remover esse ajuste ou voltar a PT1H e recriar o backend. Nunca mudar a validade de uma implantação compartilhada sem coordenar com a equipe.

## Dispositivo físico na mesma rede

Executar `ipconfig` no computador. No celular conectado ao mesmo Wi-Fi, abrir http://IP_DO_COMPUTADOR, usando o IPv4 do adaptador ativo. Não usar localhost no celular. O Nginx encaminha /api ao backend.

Se necessário, permitir a porta 80 na rede privada no Firewall do Windows e conferir isolamento de clientes no Wi-Fi. Não desativar o firewall nem abrir portas no roteador.

Alternativa Vite: `npm.cmd run dev -- --host 0.0.0.0` no frontend, backend/banco ativos; usar no celular o IP e a porta exibidos pelo Vite. O proxy encaminha /api a localhost:8080 no computador.

Registrar aparelho, navegador, data, commit, rede e resultado. Testar Home, buscas, detalhe direto, login, painel, quatro campos pendentes, teclado aberto, retrato, paisagem, erro, recuperação e expiração. Para credenciais reais fora de teste local, usar HTTPS.

## Evidências desta preparação

- Frontend: lint e build aprovados; 14 testes Node aprovados.
- Navegador com API controlada: fluxo público preservado, login e senha inválida, carregamento, indisponibilidade, retorno ao destino, Bearer, cadastro conforme contrato, campos pendentes, 401/403, logout, expiração automática, recarga e ausência de token no armazenamento do navegador aprovados.
- Testes Java: acrescentados login real com BCrypt/H2, token aceito na rota protegida e token expirado; preservados testes de /areas, 401/403 e autorização existentes.
- Execução Maven bloqueada neste ambiente por falha de resolução de repo.maven.apache.org. Não afirmar que os testes Java passaram.
- Docker, PostgreSQL real e celular físico não foram testados nesta preparação.

## Commit depois dos testes

Revisar `git diff`, adicionar somente os arquivos da entrega, conferir `git diff --cached --stat`, fazer commit e push na branch da sprint. Solicitar revisão da equipe antes do merge. Não incluir node_modules, target, dist, .env ou credenciais.
