$ErrorActionPreference = "Stop"

$container = "pi2-database"
$database = "JurisFacil"
$backupDir = Join-Path $PSScriptRoot "..\JurisFacil\backups"
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$testDb = "jurisfacil_teste_$timestamp"

# Localiza o backup mais recente
$backup = Get-ChildItem $backupDir -Filter "*.backup" |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1

if (-not $backup) {
    throw "Nenhum arquivo de backup encontrado."
}

$running = docker inspect -f "{{.State.Running}}" $container
if ($running -ne "true") {
    throw "O container do banco nao esta em execucao."
}

$containerPath = "/tmp/$($backup.Name)"

Write-Host "Backup selecionado: $($backup.Name)"
Write-Host "Criando banco temporario: $testDb"

docker cp $backup.FullName "${container}:${containerPath}"
if ($LASTEXITCODE -ne 0) {
    throw "Falha ao copiar o backup."
}

docker exec $container createdb -U postgres $testDb
if ($LASTEXITCODE -ne 0) {
    throw "Falha ao criar o banco temporario."
}

Write-Host "Restaurando backup..."

docker exec $container pg_restore --exit-on-error -U postgres -d $testDb $containerPath
if ($LASTEXITCODE -ne 0) {
    throw "Falha ao restaurar o backup. O banco temporario foi preservado para analise."
}

$query = @"
SELECT 'area_direito=' || MD5(COALESCE(STRING_AGG(TO_JSONB(t)::text, E'\n' ORDER BY id), '')) FROM area_direito t
UNION ALL SELECT 'categoria=' || MD5(COALESCE(STRING_AGG(TO_JSONB(t)::text, E'\n' ORDER BY id), '')) FROM categoria t
UNION ALL SELECT 'termo=' || MD5(COALESCE(STRING_AGG(TO_JSONB(t)::text, E'\n' ORDER BY id), '')) FROM termo t
UNION ALL SELECT 'exemplo=' || MD5(COALESCE(STRING_AGG(TO_JSONB(t)::text, E'\n' ORDER BY id), '')) FROM exemplo t
UNION ALL SELECT 'administrador=' || MD5(COALESCE(STRING_AGG(TO_JSONB(t)::text, E'\n' ORDER BY id), '')) FROM administrador t;
"@

Write-Host "Comparando os dados..."

$original = docker exec $container psql -U postgres -d $database -At -c $query
if ($LASTEXITCODE -ne 0) {
    throw "Falha ao consultar o banco original."
}

$restaurado = docker exec $container psql -U postgres -d $testDb -At -c $query
if ($LASTEXITCODE -ne 0) {
    throw "Falha ao consultar o banco restaurado."
}

if (($original -join "`n") -ne ($restaurado -join "`n")) {
    throw "ERRO: os dados do banco restaurado sao diferentes. Banco temporario preservado: $testDb"
}

Write-Host "SUCESSO: todos os hashes sao identicos!"
Write-Host "Os dados foram restaurados corretamente."

docker exec $container dropdb -U postgres $testDb
docker exec $container rm -f $containerPath

Write-Host "Banco temporario removido."
Write-Host "Teste de restauracao concluido!"
