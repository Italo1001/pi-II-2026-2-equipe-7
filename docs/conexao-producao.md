# Conexão com o banco de produção — JurisFácil

## 1. Plataforma

O banco de dados de produção do JurisFácil está hospedado no **Supabase**, utilizando PostgreSQL 17.

A conexão com o banco é realizada por meio do Session Pooler, com comunicação criptografada via SSL.

## 2. Parâmetros de conexão

| Parâmetro | Valor |
|---|---|
| Host | `aws-0-us-east-2.pooler.supabase.com` |
| Porta | `5432` |
| Banco de dados | `postgres` |
| Usuário | `postgres.vuuoouzebhdcknidaynj` |
| SSL | `require` |

## 3. Configuração no Spring Boot

As seguintes variáveis podem ser utilizadas na configuração da aplicação:

```env
DB_HOST=aws-0-us-east-2.pooler.supabase.com
DB_PORT=5432
DB_NAME=postgres
DB_USERNAME=postgres.vuuoouzebhdcknidaynj
DB_PASSWORD=
DB_SSL_MODE=require
```

A senha deve ser fornecida individualmente por cada responsável, utilizando um canal seguro.

### URL JDBC

```properties
spring.datasource.url=jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=require
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

**Observação:** as variáveis devem ser compatibilizadas com a configuração efetivamente utilizada pelo projeto Spring Boot.

## 4. Backup e restauração

Foi realizado um backup do banco PostgreSQL local utilizando o formato customizado do PostgreSQL (`pg_dump -Fc`).

O arquivo foi restaurado no banco de produção do Supabase.

A integridade da migração foi verificada por meio da conferência das tabelas e da quantidade de registros.

### Resultado da migração

| Tabela | Registros |
|---|---:|
| administrador | 10 |
| area_direito | 10 |
| categoria | 10 |
| exemplo | 10 |
| termo | 10 |
| termos | 0 |

## 5. Segurança

- A senha do banco de dados não deve ser armazenada neste documento.
- Credenciais devem ser mantidas em variáveis de ambiente.
- Arquivos `.env` não devem ser enviados ao GitHub.
- A conexão com o banco de produção deve utilizar SSL.

## 6. Responsabilidade

A configuração do banco PostgreSQL de produção, a realização do backup, a restauração e a validação dos dados foram realizadas pela equipe responsável pelo Backend 1.
