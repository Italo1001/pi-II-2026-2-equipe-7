$ErrorActionPreference = "Stop"

$container = "pi2-database"
$database = "JurisFacil"
$backupDir = Join-Path $PSScriptRoot "..\JurisFacil\backups"
$timestamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
$fileName = "jurisfacil_$timestamp.backup"
$containerPath = "/tmp/$fileName"
$localPath = Join-Path $backupDir $fileName

New-Item -ItemType Directory -Force $backupDir | Out-Null

$running = docker inspect -f "{{.State.Running}}" $container
if ($running -ne "true") {
    throw "O container $container nao esta em execucao."
}

Write-Host "Criando backup do banco $database..."

docker exec $container pg_dump -U postgres -d $database -Fc -f $containerPath
if ($LASTEXITCODE -ne 0) {
    throw "Falha ao criar o backup."
}

docker cp "${container}:${containerPath}" $localPath
if ($LASTEXITCODE -ne 0) {
    throw "Falha ao copiar o backup para o computador."
}

docker exec $container pg_restore -l $containerPath | Out-Null
if ($LASTEXITCODE -ne 0) {
    throw "O arquivo de backup nao passou na validacao."
}

docker exec $container rm $containerPath

Write-Host ""
Write-Host "Backup criado e validado com sucesso!"
Write-Host "Arquivo: $localPath"
