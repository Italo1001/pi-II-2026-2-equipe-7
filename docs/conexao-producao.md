Conexão com o banco de produção — JurisFácil

Plataforma

O banco de dados de produção do JurisFácil está hospedado no Supabase, utilizando PostgreSQL 17.

Parâmetros de conexão

Parâmetro

Valor

Host

aws-0-us-east-2.pooler.supabase.com

Porta

5432

Banco de dados

postgres

Usuário

postgres.vuuoouzebhdcknidaynj

SSL

require

Configuração no Spring Boot

As variáveis de ambiente necessárias são:

DB_HOST=aws-0-us-east-2.pooler.supabase.com
DB_PORT=5432
DB_NAME=postgres
DB_USERNAME=postgres.vuuoouzebhdcknidaynj
DB_PASSWORD=
DB_SSL_MODE=require

A senha deve ser configurada individualmente por cada responsável, utilizando um canal seguro.

Backup e restauração

Foi realizado um backup do banco PostgreSQL local e sua restauração no Supabase.

A integridade da migração foi verificada por meio da conferência das tabelas e da quantidade de registros.
