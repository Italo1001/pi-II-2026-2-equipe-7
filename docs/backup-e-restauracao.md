# Backup e Restauracao - JurisFacil

## Objetivo
Garantir a copia de seguranca do banco PostgreSQL e verificar se os dados podem ser recuperados.

## Pre-requisitos
- Docker instalado e em execucao.
- Containers do projeto disponiveis.
- Banco PostgreSQL iniciado.

## 1. Iniciar o banco
Na pasta JurisFacil, execute:

    docker compose up -d database

## 2. Gerar backup
Execute na pasta JurisFacil:

    powershell -ExecutionPolicy Bypass -File ..\scripts\backup.ps1

O arquivo sera salvo em JurisFacil/backups, com data e hora no nome.

## 3. Testar restauracao
Execute:

    powershell -ExecutionPolicy Bypass -File ..\scripts\test-restore.ps1

O procedimento cria um banco temporario, restaura o backup e compara os hashes dos dados das cinco tabelas.

Se os hashes forem iguais, a restauracao foi validada. O banco temporario sera removido ao final.

## 4. Cuidados importantes
- Manter os backups em local seguro.
- Nao apagar backups sem verificar se existe outra copia.
- Nao executar docker compose down -v, pois isso pode apagar o volume do banco.
- Executar backups periodicamente.
- Testar periodicamente a restauracao.

## 5. Resultado do teste realizado
Data: 07/11/2026.

- Cinco tabelas verificadas.
- 50 registros conferidos.
- Hashes identicos entre o banco original e o restaurado.
- Restauracao concluida com sucesso.
