$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$systemNode = Get-Command node -ErrorAction SilentlyContinue
$bundledNode = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'
if ($systemNode) {
    $portfolioNode = $systemNode.Source
} elseif (Test-Path -LiteralPath $bundledNode) {
    $portfolioNode = $bundledNode
} else {
    throw '未找到 Node.js。请安装 Node.js 20.19+ 或 22.12+，再运行 npm install。'
}
if (-not (Test-Path -LiteralPath 'node_modules/vite/bin/vite.js')) {
    throw '项目依赖尚未安装，请先运行 npm install 或 pnpm install。'
}
Write-Host '顾邱宜 · 作品集预览：http://127.0.0.1:5173/'
& $portfolioNode 'node_modules/vite/bin/vite.js' '--host' '127.0.0.1'
