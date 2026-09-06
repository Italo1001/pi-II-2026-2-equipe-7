# ⚖️ JurisFácil

### **O Direito explicado de forma simples.**

<p align="center">
  <strong>🔎 Pesquise • 📖 Entenda • 💡 Aprenda</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow" alt="Status">
  <img src="https://img.shields.io/badge/metodologia-Ágil-blue" alt="Metodologia">
  <img src="https://img.shields.io/badge/gestão-Kanban-purple" alt="Kanban">
  <img src="https://img.shields.io/badge/GitHub-versionamento-black" alt="GitHub">
</p>

---

## 📌 Sobre o Projeto

O **JurisFácil** é um sistema web desenvolvido com o objetivo de **facilitar a compreensão de termos e expressões jurídicas**, apresentando seus significados em uma linguagem mais simples, clara e acessível.

A plataforma foi idealizada para pessoas que não possuem conhecimento técnico na área do Direito e desejam compreender rapidamente o significado de palavras e conceitos jurídicos.

O projeto busca contribuir para a **democratização do acesso à informação jurídica**, permitindo que qualquer usuário pesquise termos desconhecidos e encontre explicações de fácil compreensão.

> **JurisFácil — tornando o conhecimento jurídico mais acessível.**

---

## 🎯 Objetivo

Desenvolver uma plataforma web capaz de transformar conceitos e termos jurídicos complexos em informações mais fáceis de compreender, proporcionando uma experiência simples e intuitiva para o usuário.

### Objetivos específicos ( sujestão da FPJ)

* 🔎 Permitir a pesquisa de termos jurídicos;
* 📖 Apresentar significados em linguagem simplificada;
* 💡 Disponibilizar exemplos de utilização;
* 🏷️ Organizar os termos por categorias;
* 🔐 Implementar autenticação para administradores;
* ⚙️ Criar uma área administrativa;
* ✏️ Permitir cadastro, edição e exclusão de termos;
* 🗄️ Armazenar as informações em banco de dados;
* 📱 Garantir responsividade em diferentes dispositivos;
* 🧪 Realizar testes das funcionalidades;
* 📋 Utilizar Sprints e Kanban para organização do desenvolvimento;
* 🔄 Utilizar GitHub para versionamento e gerenciamento do projeto.

---

## ✨ Funcionalidades
( até o momento vamos trabalhar em cima desses topicos, já que foram solicitados pela FPJ)
### 👤 Para o usuário

| Funcionalidade                  | Descrição                                             |
| ------------------------------- | ----------------------------------------------------- |
| 🔎 **Pesquisa**                 | Permite pesquisar termos jurídicos                    |
| 📖 **Significado simplificado** | Exibe explicações em linguagem acessível              |
| 💡 **Exemplos**                 | Apresenta exemplos de utilização dos termos           |
| 🏷️ **Categorias**              | Organiza os termos por categorias                     |
| 🔍 **Filtros**                  | Permite filtrar termos por categoria                  |
| 📚 **Lista de termos**          | Permite visualizar os termos cadastrados              |
| ❌ **Termo não encontrado**      | Informa quando o termo pesquisado não está cadastrado |
| ℹ️ **Sobre o projeto**          | Disponibiliza informações sobre o JurisFácil          |

### 🔐 Para administradores

| Funcionalidade               | Descrição                                |
| ---------------------------- | ---------------------------------------- |
| 🔑 **Login**                 | Acesso autenticado à área administrativa |
| ➕ **Cadastrar termos**       | Adiciona novos termos jurídicos          |
| ✏️ **Editar termos**         | Atualiza informações existentes          |
| 🗑️ **Excluir termos**       | Remove termos cadastrados                |
| 🏷️ **Gerenciar categorias** | Cria e gerencia categorias               |
| 🔒 **Controle de acesso**    | Protege a área administrativa            |

---

## 🧩 Como o JurisFácil funciona

### 👤 Fluxo do usuário

```text
              👤 USUÁRIO
                  │
                  ▼
          🔎 Pesquisa um termo
                  │
                  ▼
          📚 Sistema realiza busca
                  │
            ┌─────┴─────┐
            │           │
            ▼           ▼
       ✅ Encontrado   ❌ Não encontrado
            │           │
            ▼           ▼
      📖 Significado   ⚠️ Aviso
            │
            ▼
       💡 Exemplos
            │
            ▼
      🧠 Compreensão
```

### 🔐 Fluxo administrativo

```text
             🔐 LOGIN
                │
                ▼
       ⚙️ ÁREA ADMINISTRATIVA
                │
       ┌────────┼────────┐
       │        │        │
       ▼        ▼        ▼
      ➕       ✏️       🗑️
   Cadastrar   Editar   Excluir
       │        │        │
       └────────┼────────┘
                │
                ▼
          🗄️ BANCO DE DADOS
```

---

## 🛠️ Tecnologias
aqui a gente preenche com o tempo...

### Front-end

* `[Tecnologia]`
* `[Framework/Biblioteca]`
* `[Outra tecnologia]`

### Back-end

* `[Tecnologia]`
* `[Framework]`
* `[Outra tecnologia]`

### Banco de Dados

* `[Banco de dados utilizado]`

### Ferramentas

* Git
* GitHub
* GitHub Projects / Kanban
* [IDE utilizada (pessoal modifiquem aqui viu de acordo com oq voces forem usando)]`
* [Outras ferramentas( mesma obs da de cima)]`

---

## 🏗️ Estrutura do Projeto



```text
calma doutor, tá no processo ainda
```

---

## 🗄️ Banco de Dados

O banco de dados será responsável pelo armazenamento e gerenciamento das informações utilizadas pelo sistema.

### Principais dados
(caso for surjindo algo, adicionamos aqui também)
* 📚 Termos jurídicos;
* 📖 Explicações;
* 💡 Exemplos;
* 🏷️ Categorias;
* 👤 Usuários administrativos.


---

## 📋 Requisitos Funcionais
(isso não está escrito em pedra)
| Código | Requisito                                |
| ------ | ---------------------------------------- |
| RF01   | Pesquisa de termos jurídicos             |
| RF02   | Apresentação do significado simplificado |
| RF03   | Apresentação de exemplos                 |
| RF04   | Organização por categorias               |
| RF05   | Visualização dos termos cadastrados      |
| RF06   | Login do administrador                   |
| RF07   | Cadastro de novos termos                 |
| RF08   | Edição de termos                         |
| RF09   | Exclusão de termos                       |
| RF10   | Gerenciamento de categorias              |
| RF11   | Armazenamento em banco de dados          |
| RF12   | Aviso de termo não cadastrado            |
| RF13   | Filtragem por categoria                  |
| RF14   | Página sobre o projeto                   |
| RF15   | Controle de acesso administrativo        |

(Sujeito a alterações)
---

## ⚙️ Requisitos Não Funcionais

* 🎨 Interface simples e intuitiva;
* 📱 Design responsivo;
* ⚡ Tempo de resposta adequado;
* 🔐 Armazenamento seguro de senhas;
* 🛡️ Controle de acesso;
* 🗄️ Integridade dos dados;
* 💻 Compatibilidade com navegadores modernos;
* 🧹 Código organizado e documentado;
* 📈 Estrutura preparada para futuras expansões;
* 📖 Conteúdo apresentado em linguagem clara;
* 🔒 Mecanismos básicos contra acessos não autorizados. ( apenas pro adm modificar)

---

## 🧪 Testes

Durante o desenvolvimento serão realizados testes para verificar o funcionamento das principais funcionalidades.

### Checklist
(quando a gente for fazendo vai marcando aqui)
* [ ] 🔎 Pesquisa de termos
* [ ] 🔐 Login
* [ ] ➕ Cadastro
* [ ] ✏️ Edição
* [ ] 🗑️ Exclusão
* [ ] 🏷️ Filtros
* [ ] 📱 Responsividade
* [ ] 🗄️ Integridade dos dados

---

## 📊 Metodologia de Desenvolvimento

O desenvolvimento do JurisFácil será realizado utilizando uma abordagem **Ágil**, organizada através de **Sprints** e um **quadro Kanban**.

### Fluxo de trabalho

```text
💡 Planejamento
      │
      ▼
📋 Backlog
      │
      ▼
🔄 Sprint
      │
      ▼
💻 Desenvolvimento
      │
      ▼
🧪 Testes
      │
      ▼
🔍 Revisão
      │
      ▼
✅ Concluído
```

O GitHub será utilizado para:

* 📌 Issues;
* 🏷️ Labels;
* 🎯 Milestones;
* 📋 Kanban / GitHub Projects;
* 🔄 Controle de versões;
* 📝 Histórico de commits;
* 👥 Organização da equipe.

---

## 🗺️ Roadmap

### 🟢 Fase 01 — Planejamento
 
* [x] Definição do problema
* [x] Definição do escopo
* [x] Levantamento dos requisitos
* [x] Definição dos stakeholders
* [x] Configuração do repositório

### 🟡 Fase 02 — Desenvolvimento
vamos adicionando x com o tempo, atualizando
* [ ] Estrutura inicial do sistema
* [ ] Desenvolvimento da interface
* [ ] Implementação da pesquisa
* [ ] Implementação das categorias
* [ ] Implementação do banco de dados

### 🟠 Fase 03 — Área Administrativa

* [ ] Sistema de login
* [ ] Cadastro de termos
* [ ] Edição de termos
* [ ] Exclusão de termos
* [ ] Gerenciamento de categorias
* [ ] Controle de acesso

### 🔵 Fase 04 — Testes

* [ ] Testes funcionais
* [ ] Testes de responsividade
* [ ] Testes de pesquisa
* [ ] Testes de autenticação
* [ ] Testes de integridade dos dados
* [ ] Correção de problemas

### 🟣 Fase 05 — Entrega

* [ ] Documentação
* [ ] Revisão final
* [ ] Apresentação do projeto
* [ ] Entrega do sistema

---

## 👥 Equipe

### 💻 Equipe de Desenvolvimento

| Integrante   | Função   | GitHub    |
| ------------ | -------- | --------- |
| **[Italo]** | [Front-end] | [@italo1001] |
| **[Luiz]** | [Front-end] | [@tmluizo] |
| **[Rykelme]** | [Front-end] | [@Ryck2005] |
| **[Caliel]** | [Back-end] | [@caliel2] |
| **[Pedro]** | [Back-end] | [@PedroMacl] |
| **[Juan]** | [Back-end] | [@0juan1] |
| **[Felipe]** | [Qa/teste] | [@felipeGabriel13] |
| **[Vinicius]** | [Requisitos/Desing] | [@ViniciusAzvd22] |
| **[Larissa]** | [Requisitos/Desing] | [coloque o seu depois aqui] |


---

## 🏛️ Cliente / Instituição

**FPJ — Crateús/CE**

O projeto foi desenvolvido a partir de uma demanda relacionada à área de **Ciência da Computação e Direito**, tendo como finalidade disponibilizar uma ferramenta útil à comunidade e facilitar o acesso à informação jurídica.

---

## ⚠️ Aviso Importante

> **O JurisFácil possui finalidade exclusivamente informativa e educacional.**

O sistema **não substitui advogados, defensores públicos ou outros profissionais habilitados da área jurídica**.

O JurisFácil não realiza:

* ❌ Consultoria jurídica individual;
* ❌ Representação jurídica;
* ❌ Acompanhamento de processos judiciais;
* ❌ Elaboração automática de petições;
* ❌ Geração automática de documentos jurídicos;
* ❌ Tomada de decisões jurídicas;
* ❌ Integração com sistemas de tribunais.

---

## 📚 Documentação

A documentação do projeto contempla:

* 📌 Objetivo;
* 📋 Escopo;
* ⚙️ Requisitos;
* 🏗️ Arquitetura;
* 🗄️ Banco de dados;
* ✨ Funcionalidades;
* 🚀 Instalação;
* 📖 Utilização;
* 🧪 Testes.

---

## 📈 Status do Projeto

<p align="center">

### 🟡 EM DESENVOLVIMENTO

O JurisFácil está sendo desenvolvido de forma incremental através de Sprints, com acompanhamento das atividades por meio do GitHub e Kanban.

</p>
---

## 📄 Licença

> **[a gente vê isso mais tarde]**

---

<p align="center">

### ⚖️ JurisFácil

**Simplificando o Direito. Aproximando a informação.**

Desenvolvido com 💻 pela equipe JurisFácil.
(UFC - universidade vederal do ceará & FPJ-Faculdade Primeiro de Janeiro)

</p>
