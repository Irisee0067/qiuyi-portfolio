param(
    [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'
$projectDirectory = $PSScriptRoot
$siteAddress = 'http://127.0.0.1:5173/'
Set-Location -LiteralPath $projectDirectory

$systemNode = Get-Command node -ErrorAction SilentlyContinue
$bundledNode = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'

if ($systemNode) {
    $portfolioNode = $systemNode.Source
} elseif (Test-Path -LiteralPath $bundledNode) {
    $portfolioNode = $bundledNode
} else {
    throw 'Node.js was not found. Install Node.js 20.19+ or 22.12+, then run npm install.'
}

$viteEntry = Join-Path $projectDirectory 'node_modules/vite/bin/vite.js'
if (-not (Test-Path -LiteralPath $viteEntry)) {
    throw 'Project dependencies are missing. Run npm install or pnpm install first.'
}

function Test-PortfolioSite {
    try {
        $response = Invoke-WebRequest -Uri $siteAddress -UseBasicParsing -TimeoutSec 1
        return $response.StatusCode -eq 200
    } catch {
        return $false
    }
}

if (-not (Test-PortfolioSite)) {
    Start-Process -FilePath $portfolioNode `
        -ArgumentList @($viteEntry, '--host', '127.0.0.1') `
        -WorkingDirectory $projectDirectory `
        -WindowStyle Hidden

    $siteReady = $false
    for ($attempt = 0; $attempt -lt 20; $attempt++) {
        Start-Sleep -Milliseconds 350
        if (Test-PortfolioSite) {
            $siteReady = $true
            break
        }
    }

    if (-not $siteReady) {
        throw 'The website did not start. Check whether port 5173 is already in use.'
    }
}

Write-Host "Portfolio preview is ready: $siteAddress"
if (-not $NoBrowser) {
    Start-Process $siteAddress
}
