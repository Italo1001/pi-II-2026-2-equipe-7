# JurisFácil

**Dicionário jurídico desenvolvido no Projeto Integrador II da UFC, em parceria com a Faculdade Primeiro de Janeiro (FPJ).**

O JurisFácil é um sistema web criado para facilitar a consulta de termos e expressões jurídicas. A proposta é reunir os termos em um só lugar e apresentar seus significados em uma linguagem que também possa ser compreendida por quem não estuda ou trabalha com Direito.

Além da consulta pública, o projeto conta com uma área administrativa para manter o conteúdo do dicionário. O sistema está em desenvolvimento, e as funcionalidades são implementadas e revisadas ao longo das sprints da equipe.

## 1. Sobre o projeto

Em documentos, notícias e situações do dia a dia, é comum encontrar palavras jurídicas cujo significado não é claro para quem não conhece a área. O JurisFácil surgiu para ajudar a resolver esse problema, permitindo que a pessoa pesquise uma expressão, consulte uma explicação mais simples e, quando disponível, veja um exemplo de uso.

Os termos também são organizados por categorias e áreas do Direito, facilitando a navegação pelo conteúdo. A equipe responsável pelo sistema pode cadastrar e atualizar essas informações pela área administrativa, sem precisar alterar diretamente os registros no banco de dados.

### Objetivos

- Facilitar a pesquisa e a consulta de termos jurídicos.
- Apresentar definições em linguagem acessível.
- Usar exemplos para ajudar na compreensão dos conceitos.
- Organizar os termos por categorias e áreas do Direito.
- Permitir que administradores mantenham o conteúdo atualizado.
- Oferecer uma interface que funcione em diferentes tamanhos de tela.

### Quem pode utilizar

**Visitante:** pessoa que acessa o dicionário para pesquisar e consultar informações, sem necessidade de login.

**Administrador:** responsável por cadastrar, alterar, organizar e remover informações do dicionário. Para acessar as funções administrativas, é necessário passar pela autenticação do sistema.

## 2. Funcionalidades

As funcionalidades abaixo fazem parte do escopo do projeto. Como o desenvolvimento é feito por etapas, a existência de um requisito ou de uma tela não significa, por si só, que todo o fluxo já esteja concluído.

### Área pública

| Funcionalidade | O que faz |
| --- | --- |
| Pesquisa de termos | Permite procurar palavras e expressões jurídicas cadastradas. |
| Significado simplificado | Apresenta o conteúdo do termo de forma mais fácil de entender. |
| Exemplos | Ajuda a relacionar o significado com situações em que o termo é utilizado. |
| Lista de termos | Permite navegar pelos termos disponíveis. |
| Categorias | Organiza o conteúdo por assunto. |
| Filtro por categoria | Restringe os resultados à categoria escolhida. |
| Pesquisa sem resultado | Informa quando não há um termo correspondente à busca. |
| Informações do projeto | Explica a finalidade do JurisFácil. |

### Área administrativa

| Funcionalidade | O que faz |
| --- | --- |
| Login | Identifica o administrador antes de liberar o acesso à área restrita. |
| Cadastro de termos | Permite incluir novos termos e suas informações. |
| Edição de termos | Permite corrigir ou atualizar conteúdos já cadastrados. |
| Exclusão de termos | Permite remover registros que não devem continuar disponíveis. |
| Gerenciamento de categorias | Mantém as categorias utilizadas para organizar os termos. |
| Organização por área | Permite trabalhar com áreas do Direito no painel administrativo. |
| Controle de acesso | Restringe as ações administrativas a usuários autorizados. |

## 3. Como o sistema funciona

O projeto é dividido em três partes principais:

1. **Frontend:** apresenta as páginas do dicionário, recebe as pesquisas e mostra os resultados.
2. **Backend:** recebe as requisições, executa as regras do sistema, valida os dados e controla o acesso às operações administrativas.
3. **Banco de dados:** armazena os termos e as demais informações necessárias ao funcionamento da aplicação.

O fluxo de uma consulta pode ser resumido assim:

```text
Usuário acessa o JurisFácil
             |
             v
   Frontend (React)
             |
             v
   Requisição para a API
             |
             v
    Backend (Spring Boot)
             |
             v
     Banco PostgreSQL
             |
             v
    Resposta para a API
             |
             v
     Resultado na tela
```

Na execução com Docker, o Nginx entrega o frontend e encaminha as requisições iniciadas por `/api/` ao backend. Isso permite acessar a aplicação pelo navegador sem precisar informar diretamente o endereço interno do serviço Java.

As operações administrativas seguem o mesmo fluxo geral, mas exigem autenticação e passam pelas verificações de acesso do backend.

## 4. Tecnologias utilizadas

| Tecnologia | Uso no projeto |
| --- | --- |
| Java 21 | Linguagem do backend. |
| Spring Boot 4.1.1 | Desenvolvimento da API e configuração da aplicação. |
| Spring Web MVC | Recebimento e resposta das requisições HTTP. |
| Spring Security | Proteção das funcionalidades administrativas. |
| JWT | Autenticação baseada em token. |
| Spring Data JPA / Hibernate | Acesso e persistência dos dados. |
| PostgreSQL 17 | Banco de dados utilizado no Docker. |
| Maven | Gerenciamento de dependências, compilação e testes do backend. |
| React 19 | Construção das páginas do frontend. |
| React Router | Navegação entre as páginas. |
| Vite 8 | Ambiente de desenvolvimento e geração dos arquivos do frontend. |
| Tailwind CSS 4 | Estilização da interface. |
| Docker e Docker Compose | Execução conjunta dos serviços. |
| Nginx | Disponibilização do frontend e encaminhamento de requisições para a API. |
| Git e GitHub | Controle de versões, issues e trabalho em equipe. |

## 5. Organização do repositório

```text
pi-II-2026-2-equipe-7/
|
|-- .github/                    # Arquivos de configuração do GitHub
|-- JurisFacil/
|   |-- backend/                # Aplicação Java com Spring Boot
|   |   |-- src/                # Código-fonte e testes
|   |   |-- pom.xml             # Dependências e configuração do Maven
|   |   `-- Dockerfile          # Imagem usada para executar a API
|   |
|   |-- frontend/               # Aplicação React
|   |   |-- src/                # Páginas, componentes e demais arquivos
|   |   |-- package.json        # Dependências e comandos do frontend
|   |   |-- nginx.conf          # Configuração do servidor web
|   |   `-- Dockerfile          # Build do frontend e imagem com Nginx
|   |
|   |-- bancoDados/             # Arquivos de inicialização do banco
|   |-- backups/                # Destino dos backups gerados localmente
|   `-- docker-compose.yml      # Configuração dos serviços do sistema
|
|-- docs/                       # Documentos do projeto
|-- scripts/                    # Scripts de backup e teste de restauração
|-- .gitignore
`-- README.md
```

A pasta `backups/` é criada pelo script de backup quando necessário. Ela não precisa existir em uma instalação recém-clonada.

## 6. Páginas e acesso

O frontend possui rotas públicas e rotas que passam por proteção de acesso.

| Caminho | Finalidade | Acesso |
| --- | --- | --- |
| `/` | Página inicial e consulta de termos. | Público |
| `/termo/:id` | Página de detalhes de um termo. | Público |
| `/admin/login` | Login do administrador. | Público |
| `/admin/previa` | Visão geral do painel administrativo. | Restrito |
| `/admin/previa/termos` | Gerenciamento dos termos. | Restrito |
| `/admin/previa/termos/novo` | Formulário de novo termo. | Restrito |
| `/admin/previa/categorias` | Gerenciamento de categorias. | Restrito |
| `/admin/previa/areas` | Gerenciamento das áreas do Direito. | Restrito |
| `/teste` | Página de teste de comunicação com o backend. | Público |

Os caminhos acima correspondem às rotas declaradas no frontend. A proteção das páginas deve ser acompanhada da validação das permissões no backend: esconder uma tela não substitui a proteção da API.

## 7. Requisitos do projeto

O repositório mantém uma relação de requisitos funcionais, que serve de referência para o desenvolvimento e para os documentos da equipe. A numeração pode ser atualizada conforme as decisões tomadas nas sprints.

| Código | Requisito funcional |
| --- | --- |
| RF01 | Pesquisa de termos jurídicos. |
| RF02 | Apresentação do significado simplificado. |
| RF03 | Apresentação de exemplos. |
| RF04 | Organização por categorias. |
| RF05 | Visualização dos termos cadastrados. |
| RF06 | Login do administrador. |
| RF07 | Cadastro de novos termos. |
| RF08 | Edição de termos. |
| RF09 | Exclusão de termos. |
| RF10 | Gerenciamento de categorias. |
| RF11 | Aviso de termo não cadastrado. |
| RF12 | Filtragem por categoria. |
| RF13 | Página sobre o projeto. |
| RF14 | Controle de acesso administrativo. |

Entre os requisitos não funcionais definidos para o sistema estão: interface simples e responsiva, linguagem clara, proteção das senhas, integridade dos dados, compatibilidade com navegadores, desempenho adequado e facilidade de manutenção do código.

Para conferir a situação de cada requisito, é necessário consultar as issues, as implementações e os documentos atualizados da sprint. Esta tabela descreve o escopo, não uma lista de funcionalidades inteiramente finalizadas.

## 8. Como executar com Docker

Esta é a forma mais prática de iniciar os três serviços do projeto no mesmo ambiente.

### Pré-requisitos

- Git instalado.
- Docker Desktop aberto e em execução, ou Docker Engine com Compose.
- Java 21 e Maven instalados para gerar o `.jar` do backend.

O frontend é compilado durante a construção da imagem Docker, que já utiliza Node.js 22. Não é necessário instalar Node.js localmente apenas para executar a versão com Docker.

### Passo 1 — Clonar o projeto

```bash
git clone https://github.com/Italo1001/pi-II-2026-2-equipe-7.git
cd pi-II-2026-2-equipe-7
```

### Passo 2 — Compilar o backend

No terminal, entre na pasta do backend:

```bash
cd JurisFacil/backend
mvn clean package -DskipTests
```

Esse comando compila a aplicação e gera um arquivo `.jar` em `target/`. Essa etapa é necessária porque o Dockerfile do backend copia o `.jar` já gerado, em vez de executar o Maven durante a criação da imagem.

Volte para a pasta `JurisFacil`:

```bash
cd ..
```

### Passo 3 — Configurar a chave de autenticação

Crie um arquivo chamado `.env` na pasta `JurisFacil`, ao lado de `docker-compose.yml`, e informe uma chave própria:

```env
JWT_SECRET=troque_este_valor_por_uma_chave_longa_e_aleatoria
```

A aplicação exige uma chave de autenticação com pelo menos 32 bytes. Não coloque senhas ou chaves reais nos arquivos enviados ao GitHub.

No PowerShell, uma forma de criar o arquivo é:

```powershell
notepad .env
```

Cole a variável, salve e feche o editor.

### Passo 4 — Iniciar os serviços

Na pasta `JurisFacil`, execute:

```bash
docker compose up --build -d
```

O Compose configura os seguintes serviços:

| Serviço | Contêiner | Porta no computador | Função |
| --- | --- | --- | --- |
| `frontend` | `pi2-frontend` | 80 | Disponibiliza o site pelo Nginx. |
| `backend` | `pi2-backend` | 8080 | Executa a API Spring Boot. |
| `database` | `pi2-database` | 5432 | Executa o PostgreSQL 17. |

O serviço do banco possui uma verificação de disponibilidade (`healthcheck`). O backend aguarda o banco ficar disponível antes de iniciar.

### Passo 5 — Conferir a execução

```bash
docker compose ps
```

Para acompanhar mensagens do backend:

```bash
docker compose logs -f backend
```

Para visualizar os serviços, utilize:

- Site: http://localhost
- Backend: http://localhost:8080
- Banco: `localhost:5432`

A porta 8080 é a entrada HTTP da API, não necessariamente uma página inicial acessível pelo navegador. O site deve ser aberto pela porta 80.

### Parar o sistema

```bash
docker compose down
```

O comando encerra os contêineres e mantém o volume utilizado pelo banco. Evite `docker compose down -v`, porque a opção `-v` remove volumes associados à aplicação e pode apagar os dados locais.

## 9. Desenvolvimento sem subir todos os contêineres

### Backend

Para desenvolver a API separadamente, tenha Java 21, Maven e PostgreSQL disponíveis. Configure a conexão do banco e a variável `JWT_SECRET` antes de iniciar o servidor.

Na pasta `JurisFacil/backend`:

```bash
mvn spring-boot:run
```

O backend utiliza a porta `8080`. A configuração padrão do projeto aponta para um banco PostgreSQL chamado `JurisFacil`, na porta `5432`.

### Frontend

Para trabalhar somente na interface, instale Node.js e npm. Na pasta `JurisFacil/frontend`:

```bash
npm install
npm run dev
```

O Vite informa no terminal o endereço utilizado para abrir o frontend em modo de desenvolvimento.

**Atenção:** o arquivo `vite.config.js` atual não define um encaminhamento automático de `/api/` para o backend. Por isso, executar o frontend isoladamente pode exigir uma configuração adicional para as chamadas da API. Na versão com Docker, esse encaminhamento já está configurado no Nginx.

Outros comandos do frontend:

```bash
npm run build
npm run preview
npm run lint
```

O primeiro gera os arquivos para distribuição, o segundo permite visualizar o resultado do build e o terceiro executa o ESLint.

## 10. Banco de dados

O sistema utiliza PostgreSQL para armazenar as informações do dicionário. Na configuração Docker, o banco é criado com o nome `JurisFacil` e o serviço utiliza um volume chamado `postgres_data` para manter os dados entre reinicializações dos contêineres.

O backend faz acesso aos dados com Spring Data JPA/Hibernate. A configuração atual utiliza `spring.jpa.hibernate.ddl-auto=update`, que atualiza a estrutura conforme as entidades mapeadas. Os arquivos de inicialização existentes em `JurisFacil/bancoDados/` também são disponibilizados ao contêiner do PostgreSQL.

Os scripts de backup e restauração trabalham com cinco tabelas do banco:

| Tabela | Informação principal |
| --- | --- |
| `termo` | Termos cadastrados no dicionário. |
| `categoria` | Categorias utilizadas na organização. |
| `area_direito` | Áreas do Direito. |
| `exemplo` | Exemplos relacionados aos termos. |
| `administrador` | Registros referentes aos administradores. |

A estrutura detalhada dos campos e relacionamentos deve ser consultada nos arquivos do banco e nas entidades do backend.

**Observação:** a configuração atual do Compose usa o usuário e a senha `postgres` no ambiente local. Antes de disponibilizar o sistema em um servidor público, essas credenciais e outras configurações de segurança precisam ser revisadas.

## 11. Autenticação e controle de acesso

O JurisFácil separa as operações de consulta das operações administrativas.

- A consulta pública de termos não exige conta.
- O painel administrativo possui uma tela própria de login.
- As páginas administrativas do frontend são agrupadas em uma rota protegida.
- O backend utiliza Spring Security e autenticação com JWT para controlar o acesso à API.
- A validade padrão configurada para o token é de uma hora (`PT1H`), podendo ser alterada pela variável `JWT_EXPIRATION`.

A documentação de autorização da equipe deve ser usada para conferir quem pode acessar cada tela e cada rota da API. Os detalhes sobre erros de login, expiração da sessão e demais comportamentos precisam ser validados com as regras de negócio e os testes da sprint correspondente.

## 12. Testes e verificação

O projeto possui dependências de teste no backend, incluindo ferramentas do Spring Boot, Mockito e H2 para testes que utilizam banco em memória.

Para executar os testes automatizados do backend, entre em `JurisFacil/backend` e utilize:

```bash
mvn test
```

Para conferir o código do frontend, em `JurisFacil/frontend`:

```bash
npm run lint
```

Além dos comandos automatizados, os principais fluxos a verificar durante as sprints são:

- Pesquisa com um termo existente e com um termo não cadastrado.
- Exibição de significado, exemplos e categoria.
- Listagem e filtros dos termos.
- Login com credenciais válidas e inválidas.
- Tentativa de acesso à administração sem autenticação.
- Cadastro de termos com dados obrigatórios ausentes.
- Edição e exclusão de registros.
- Mensagens exibidas quando a API retorna algum erro.

Essa relação indica cenários importantes para teste; não afirma que todos já tenham testes automatizados implementados.

## 13. Backup e restauração do banco

O repositório possui scripts em PowerShell para gerar backups do PostgreSQL e testar se os dados podem ser recuperados.

Antes de utilizá-los, inicie o banco. Na pasta `JurisFacil`:

```powershell
docker compose up -d database
```

Para gerar um backup:

```powershell
powershell -ExecutionPolicy Bypass -File ..\scripts\backup.ps1
```

O script executa o `pg_dump`, verifica o arquivo gerado e salva a cópia na pasta `JurisFacil/backups/`. O nome contém a data e a hora de criação.

Para testar a recuperação do backup mais recente:

```powershell
powershell -ExecutionPolicy Bypass -File ..\scripts\test-restore.ps1
```

O teste cria um banco temporário, restaura o conteúdo e compara os dados das cinco tabelas usando hashes. Quando a comparação é concluída sem diferenças, o banco de teste é removido.

O procedimento completo e os cuidados necessários estão em [docs/backup-e-restauracao.md](./docs/backup-e-restauracao.md).

## 14. Documentação do projeto

Os materiais produzidos pela equipe são mantidos na pasta [`docs/`](./docs). A documentação acompanha o planejamento e as entregas feitas ao longo da disciplina.

Entre os tipos de documentos trabalhados pela equipe estão:

- Visão e escopo do sistema.
- Requisitos funcionais e não funcionais.
- Regras de negócio e critérios de aceitação.
- Casos de uso e diagramas UML.
- Descrição das telas e das rotas.
- Matriz de rastreabilidade entre requisitos, telas, regras e implementação.
- Matriz de autorização dos perfis de acesso.
- Testes e registros relacionados às sprints.
- Procedimentos de backup e restauração.

Nem todo artefato necessariamente possui o mesmo nome ou formato ao longo do desenvolvimento. A pasta `docs/` e as issues são as referências para localizar as versões atualmente entregues.

## 15. Problemas comuns na execução

**O Docker informa que `JWT_SECRET` não foi definida.**

Verifique se o arquivo `.env` está em `JurisFacil/`, no mesmo diretório do `docker-compose.yml`, e se a variável foi preenchida corretamente.

**A criação da imagem do backend falha porque o `.jar` não foi encontrado.**

O Dockerfile copia os arquivos de `backend/target/`. Execute `mvn clean package -DskipTests` na pasta do backend antes de iniciar o Compose.

**A porta 80, 8080 ou 5432 já está sendo usada.**

Verifique se outro programa ou contêiner está utilizando a porta. Pode ser necessário encerrar o processo ou ajustar o mapeamento no `docker-compose.yml`.

**O backend não consegue se conectar ao banco.**

Confira se o contêiner `pi2-database` está ativo, se a conexão utiliza o endereço correto e se os registros de log apresentam falhas de inicialização:

```bash
docker compose ps
docker compose logs database
docker compose logs backend
```

**O frontend abre, mas as pesquisas não funcionam quando iniciado com `npm run dev`.**

Confira para qual endereço as chamadas de API estão sendo enviadas. O projeto usa o encaminhamento do Nginx na execução com Docker; o Vite não possui esse mesmo proxy configurado por padrão.

## 16. Organização do trabalho da equipe

O desenvolvimento é acompanhado pelo GitHub, com issues para registrar tarefas, correções e requisitos de cada sprint. Os arquivos de documentação e o código são versionados no mesmo repositório para facilitar o acompanhamento das alterações.

Ao realizar uma mudança, a orientação é conferir o requisito relacionado, testar o comportamento alterado e atualizar a documentação quando a modificação afetar regras, telas, rotas ou permissões de acesso.

Repositório: [Italo1001/pi-II-2026-2-equipe-7](https://github.com/Italo1001/pi-II-2026-2-equipe-7)

## 17. Equipe de desenvolvimento

| Integrante | Área | GitHub |
| --- | --- | --- |
| Italo | Frontend | [@Italo1001](https://github.com/Italo1001) |
| Luiz | Frontend | [@tmluizo](https://github.com/tmluizo) |
| Rykelme | Frontend | [@Ryck2005](https://github.com/Ryck2005) |
| Caliel | Backend | [@caliel2](https://github.com/caliel2) |
| Pedro | Backend | [@PedroMacl](https://github.com/PedroMacl) |
| Juan | Backend | [@0juan1](https://github.com/0juan1) |
| Felipe | QA e testes | [@felipeGabriel13](https://github.com/felipeGabriel13) |
| Vinicius | Requisitos e design | [@ViniciusAzvd22](https://github.com/ViniciusAzvd22) |
| Larissa | Requisitos e design | [@larissardr](https://github.com/larissardr) |

## 18. Informações acadêmicas

- **Instituição:** Universidade Federal do Ceará (UFC).
- **Curso:** Ciência da Computação.
- **Disciplina:** Projeto Integrador II.
- **Semestre:** 2026.2.
- **Equipe:** Equipe 7.
- **Instituição parceira:** Faculdade Primeiro de Janeiro (FPJ).

O JurisFácil é desenvolvido como parte das atividades da disciplina, com foco na aplicação prática de requisitos, desenvolvimento web, banco de dados, testes e trabalho em equipe.
