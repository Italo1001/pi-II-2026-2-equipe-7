---

name: Caso de Teste
about: Especificação e execução de testes do JurisFàcil
title: 'CT-XXX—'
labels: '
assignees: '
---


#ESPECIFICAÇÃO E EXECUÇÃO DE TESTES.
---
## 1. Plano de teste.
| Campo                | Informação            |
| -------------------- | --------------------- |
| **Projeto**          | JurisFàcil            |
| **Equipe**           | [Nome da equipe]      |
| **Responsável (QA)** | [Nome do responsável] |
| **Data**             | [DD/MM/AAAA]          |

---

## 2. Suítes de teste

Agrupe os casos por funcionalidade. Cada suíte reúne casos de um mesmo conjunto de requisitos.

| Código | Suíte           | Descrição                     |
| ------ | --------------- | ----------------------------- |
| ST-01  | [Nome da suíte] | [Descrição da funcionalidade] |
| ST-02  | [Nome da suíte] | [Descrição da funcionalidade] |

---

## 3. Caso de teste

### CT-XXX — [Título do caso de teste]

| Campo                 | Informação                       |
| --------------------- | -------------------------------- |
| **Identificador**     | CT-XXX                           |
| **Versão**            | 1                                |
| **Suíte de teste**    | ST-XX — [Nome da suíte]          |
| **Autor**             | [Nome do autor]                  |
| **Requisito coberto** | RF-XX — [Descrição do requisito] |
| **Importância**       | Alta / Média / Baixa             |

### Resumo

[Descreva o objetivo do caso de teste e o comportamento que será verificado.]

### Pré-condições

* [Pré-condição 1]
* [Pré-condição 2]
* [Pré-condição 3]

### Passos

| Passo | Ação                           | Resultado esperado   |
| ----- | ------------------------------ | -------------------- |
| 1     | [Ação realizada pelo testador] | [Resultado esperado] |
| 2     | [Ação realizada pelo testador] | [Resultado esperado] |
| 3     | [Ação realizada pelo testador] | [Resultado esperado] |
| 4     | [Ação realizada pelo testador] | [Resultado esperado] |

### Execução

| Testador | Data         | Status        | Defeito | Observações |
| -------- | ------------ | ------------- | ------- | ----------- |
| [Nome]   | [DD/MM/AAAA] | Não executado | —       | —           |

---

## 4. Evidências

Uma evidência deve ser registrada para cada passo reprovado ou bloqueado.

Nomeie no padrão:

`CT-XXX-EX`

Versione os arquivos no repositório em:

`docs/testes/evidencias/`

### Evidência 1

**CT-XXX-E1 — Passo X: [Descrição da evidência]**

<!-- Anexar o print aqui -->

### Evidência 2

**CT-XXX-E2 — Passo X: [Descrição da evidência]**

<!-- Anexar o print aqui -->

---

## 5. Legendas

### Status da execução

* **Aprovado**
* **Reprovado**
* **Bloqueado**
* **Não executado**

### Status do caso

* **Rascunho**
* **Em revisão**
* **Final**
* **Obsoleto**

### Regras

> Um caso é **Reprovado** se qualquer passo divergir do resultado esperado. Registre no campo **Observações** em qual passo ocorreu a divergência.

> O caso é **Bloqueado** quando não foi possível chegar ao passo 1 por indisponibilidade de ambiente ou dependência de outro caso reprovado.

> Todo caso **Reprovado** gera um defeito no repositório. O número da Issue deve ser registrado na coluna **Defeito**.

---

## Resultado do caso

**Status do caso:** Rascunho

**Status da execução:** Não executado

**Defeito relacionado:** —

**Observações finais:** —
