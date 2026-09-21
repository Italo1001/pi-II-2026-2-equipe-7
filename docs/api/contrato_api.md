# Contrato da API — JurisFácil

## 1. Objetivo

Este documento define o contrato da API do sistema **JurisFácil**, especificando as rotas utilizadas para a comunicação entre o frontend e o backend.

Para cada rota são definidos:

* Método HTTP;
* Caminho (endpoint);
* Objetivo;
* Parâmetros de entrada;
* Corpo da requisição, quando aplicável;
* Resposta esperada;
* Código HTTP;
* Requisito funcional associado.

---

# 2. Rotas da API

## RF-01 — Listar termos

### Rota 01 — Listar termos

**Método:** `GET`

**Caminho:**

/termos

**Objetivo:**
Retornar a lista de termos jurídicos cadastrados no sistema.

**Entrada:**

Não possui corpo de requisição.

Opcionalmente, podem ser utilizados parâmetros de consulta:

/termos?page=1&limit=20

**Saída:**
json
{
  "termos": [
    {
      "id": 1,
      "termo": "Habeas Corpus",
      "categoria": "Direito Constitucional"
    },
    {
      "id": 2,
      "termo": "Usucapião",
      "categoria": "Direito Civil"
    }
  ]
}

**Código HTTP:**

200 OK

**Requisito associado:** `RF-01`

---

## RF-02 — Consultar termo

### Rota 02 — Buscar termo por identificador

**Método:** `GET`

**Caminho:**

/termos/{id}

**Objetivo:**
Retornar as informações completas de um termo jurídico específico.

**Entrada:**

Identificador do termo na URL.

Exemplo:

/termos/1

**Saída:**
json
{
  "id": 1,
  "termo": "Habeas Corpus",
  "significado": "Instrumento jurídico utilizado para proteger a liberdade de locomoção.",
  "categoria": {
    "id": 1,
    "nome": "Direito Constitucional"
  },
  "exemplos": [
    "O advogado entrou com um habeas corpus."
  ]
}

**Código HTTP:**

200 OK

Caso o termo não seja encontrado:

404 Not Found

**Requisito associado:** `RF-02`

---

## RF-03 — Pesquisar termo

### Rota 03 — Pesquisar termos

**Método:** `GET`

**Caminho:**

/termos/busca

**Objetivo:**
Pesquisar termos jurídicos utilizando uma palavra ou expressão informada pelo usuário.

**Entrada:**

Parâmetro de consulta:

/termos/busca?q=habeas

**Saída:**
json
{
  "resultados": [
    {
      "id": 1,
      "termo": "Habeas Corpus",
      "categoria": "Direito Constitucional"
    }
  ]
}

Caso nenhum termo seja encontrado:
json
{
  "resultados": [],
  "mensagem": "Nenhum termo encontrado."
}

**Código HTTP:**

200 OK

**Requisito associado:** `RF-03`

---

## RF-04 — Listar categorias

### Rota 04 — Consultar categorias

**Método:** `GET`

**Caminho:**

/categorias

**Objetivo:**
Retornar todas as categorias disponíveis no JurisFácil.

**Entrada:**

Não possui corpo de requisição.

**Saída:**
json
{
  "categorias": [
    {
      "id": 1,
      "nome": "Direito Constitucional"
    },
    {
      "id": 2,
      "nome": "Direito Civil"
    },
    {
      "id": 3,
      "nome": "Direito Penal"
    }
  ]
}

**Código HTTP:**

200 OK

**Requisito associado:** `RF-04`

---

## RF-04 — Filtrar termos por categoria

### Rota 05 — Listar termos de uma categoria

**Método:** `GET`

**Caminho:**

/categorias/{id}/termos

**Objetivo:**
Retornar os termos pertencentes a uma determinada categoria.

**Entrada:**

Identificador da categoria na URL.

Exemplo:

/categorias/1/termos

**Saída:**
json
{
  "categoria": {
    "id": 1,
    "nome": "Direito Constitucional"
  },
  "termos": [
    {
      "id": 1,
      "termo": "Habeas Corpus"
    },
    {
      "id": 5,
      "termo": "Mandado de Segurança"
    }
  ]
}

**Código HTTP:**

200 OK

**Requisito associado:** `RF-04`

---

# 3. Rotas administrativas

As rotas a seguir são utilizadas pelos administradores do sistema.

O usuário comum **não realiza login**. A autenticação é destinada exclusivamente aos administradores.

---

## RF-05 — Login do administrador

### Rota 06 — Autenticar administrador

**Método:** `POST`

**Caminho:**

/auth/login

**Objetivo:**
Autenticar um administrador para acesso às funcionalidades administrativas.

**Entrada:**
json
{
  "email": "admin@jurisfacil.com",
  "senha": "123456"
}

**Saída:**
json
{
  "token": "jwt-token-exemplo",
  "administrador": {
    "id": 1,
    "nome": "Administrador",
    "email": "admin@jurisfacil.com"
  }
}

**Código HTTP em caso de sucesso:**

200 OK

**Código HTTP em caso de credenciais inválidas:**

401 Unauthorized

**Requisito associado:** `RF-05`

---

## RF-06 — Cadastrar termo

### Rota 07 — Criar termo

**Método:** `POST`

**Caminho:**

/termos

**Objetivo:**
Permitir que um administrador cadastre um novo termo jurídico.

**Autenticação:**
Obrigatória.

**Entrada:**
json
{
  "termo": "Habeas Data",
  "significado": "Instrumento jurídico destinado a assegurar o conhecimento de informações relativas à pessoa.",
  "categoriaId": 1
}

**Saída:**
json
{
  "id": 10,
  "termo": "Habeas Data",
  "significado": "Instrumento jurídico destinado a assegurar o conhecimento de informações relativas à pessoa.",
  "categoriaId": 1
}

**Código HTTP:**

201 Created

**Requisito associado:** `RF-06`

---

## RF-07 — Editar termo

### Rota 08 — Atualizar termo

**Método:** `PUT`

**Caminho:**

/termos/{id}

**Objetivo:**
Permitir que um administrador altere os dados de um termo cadastrado.

**Autenticação:**
Obrigatória.

**Entrada:**

Exemplo:

/termos/10
json
{
  "termo": "Habeas Data",
  "significado": "Instrumento jurídico destinado ao acesso e correção de informações pessoais.",
  "categoriaId": 1
}

**Saída:**
json
{
  "id": 10,
  "termo": "Habeas Data",
  "significado": "Instrumento jurídico destinado ao acesso e correção de informações pessoais.",
  "categoriaId": 1
}

**Código HTTP:**

200 OK

Caso o termo não exista:

404 Not Found

**Requisito associado:** `RF-07`

---

## RF-08 — Excluir termo

### Rota 09 — Excluir termo

**Método:** `DELETE`

**Caminho:**

/termos/{id}

**Objetivo:**
Permitir que um administrador remova um termo jurídico do sistema.

**Autenticação:**
Obrigatória.

**Entrada:**

Identificador do termo na URL.

Exemplo:

/termos/10

**Saída:**
json
{
  "mensagem": "Termo excluído com sucesso."
}

**Código HTTP:**

204 No Content

> Observação: caso seja utilizado `204 No Content`, a resposta normalmente não deve possuir corpo. A mensagem acima representa uma alternativa caso o backend opte por retornar `200 OK`.

**Requisito associado:** `RF-08`

---

## RF-09 — Cadastrar exemplo

### Rota 10 — Adicionar exemplo de uso ao termo

**Método:** `POST`

**Caminho:**

/termos/{id}/exemplos

**Objetivo:**
Permitir que um administrador cadastre um exemplo de utilização associado a um termo jurídico.

**Autenticação:**
Obrigatória.

**Entrada:**

Exemplo:

/termos/10/exemplos
json
{
  "texto": "O advogado solicitou habeas data para obter acesso às informações."
}

**Saída:**
json
{
  "id": 25,
  "termoId": 10,
  "texto": "O advogado solicitou habeas data para obter acesso às informações."
}

**Código HTTP:**

201 Created

**Requisito associado:** `RF-09`

---

# 4. Resumo das rotas

| Nº | Método   | Endpoint                  | Função                | Requisito |
| -: | -------- | ------------------------- | --------------------- | --------- |
| 01 | `GET`    | `/termos`                 | Listar termos         | `RF-01`   |
| 02 | `GET`    | `/termos/{id}`            | Consultar termo       | `RF-02`   |
| 03 | `GET`    | `/termos/busca`           | Pesquisar termo       | `RF-03`   |
| 04 | `GET`    | `/categorias`             | Listar categorias     | `RF-04`   |
| 05 | `GET`    | `/categorias/{id}/termos` | Filtrar por categoria | `RF-04`   |
| 06 | `POST`   | `/auth/login`             | Login administrativo  | `RF-05`   |
| 07 | `POST`   | `/termos`                 | Cadastrar termo       | `RF-06`   |
| 08 | `PUT`    | `/termos/{id}`            | Editar termo          | `RF-07`   |
| 09 | `DELETE` | `/termos/{id}`            | Excluir termo         | `RF-08`   |
| 10 | `POST`   | `/termos/{id}/exemplos`   | Cadastrar exemplo     | `RF-09`   |

---

# 5. Autenticação

As rotas administrativas exigem autenticação.

Após realizar login em:

POST /auth/login
```

o backend deverá fornecer um token de autenticação.

Nas requisições administrativas, o token deverá ser enviado no cabeçalho:

Authorization: Bearer <token>
```

Exemplo:

Authorization: Bearer jwt-token-exemplo
```

As rotas públicas são:

GET /termos
GET /termos/{id}
GET /termos/busca
GET /categorias
GET /categorias/{id}/termos
POST /auth/login
```

As rotas administrativas são:

POST /termos
PUT /termos/{id}
DELETE /termos/{id}
POST /termos/{id}/exemplos

---

# 6. Códigos HTTP utilizados

| Código | Significado           | Utilização                                       |
| ------ | --------------------- | ------------------------------------------------ |
| `200`  | OK                    | Operação realizada com sucesso                   |
| `201`  | Created               | Recurso criado com sucesso                       |
| `204`  | No Content            | Recurso excluído com sucesso                     |
| `400`  | Bad Request           | Dados de entrada inválidos                       |
| `401`  | Unauthorized          | Usuário não autenticado ou credenciais inválidas |
| `404`  | Not Found             | Recurso não encontrado                           |
| `500`  | Internal Server Error | Erro interno do servidor                         |

---
