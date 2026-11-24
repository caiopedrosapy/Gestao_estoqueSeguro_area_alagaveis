param(
    [uri]$BaseUrl = 'http://localhost:3000',
    [switch]$VerificarContrato
)

$ErrorActionPreference = 'Stop'
if (!$BaseUrl.IsLoopback -or $BaseUrl.Scheme -ne 'http' -or $BaseUrl.AbsolutePath -ne '/') {
    throw 'Informe o endereco da API local, por exemplo http://localhost:3000.'
}
$api = $BaseUrl.GetLeftPart([UriPartial]::Authority)
$inicio = [Diagnostics.Stopwatch]::StartNew()

function Chamar($metodo, $rota, $statusEsperado, $dados = $null) {
    $argumentos = @('--silent', '--show-error', '--max-time', '10', '--request', $metodo,
        '--write-out', '\n%{http_code}', ($api + $rota))
    $arquivo = $null
    try {
        if ($null -ne $dados) {
            $arquivo = [IO.Path]::GetTempFileName()
            [IO.File]::WriteAllText($arquivo, ($dados | ConvertTo-Json -Compress))
            $argumentos += @('--header', 'Content-Type: application/json', '--data-binary', "@$arquivo")
        }
        $linhas = @(& curl.exe @argumentos)
        if ($LASTEXITCODE -ne 0) { throw "Falha no curl para $metodo $rota." }
        $status = [int]$linhas[-1]
        $texto = ($linhas | Select-Object -SkipLast 1) -join [Environment]::NewLine
        Write-Host "$status $metodo $rota"
        if ($status -ne $statusEsperado) { throw "Esperava $statusEsperado. Resposta: $texto" }
        if ($status -eq 204 -and $texto.Trim()) { throw 'A resposta 204 precisa ter corpo vazio.' }
        if ($texto.Trim()) { return ($texto | ConvertFrom-Json) }
    } finally {
        if ($arquivo) { Remove-Item -LiteralPath $arquivo }
    }
}

$rotulo = [guid]::NewGuid().ToString('N').Substring(0, 6)
$local = Chamar POST '/estoques' 201 @{
    nome = "Deposito terreo P2 $rotulo"; localizacao = 'Terreo'; alturaCm = 20; seguro = $false
}
$produto = Chamar POST '/produtos' 201 @{
    nome = "Arroz P2 $rotulo"; categoria = 'Alimentos'; estoqueId = $local.id; prioritario = $true
}
if ($produto.quantidade -ne 0) { throw 'O saldo inicial precisa ser zero.' }

$null = Chamar POST '/movimentacoes' 201 @{ produtoId = $produto.id; tipo = 'ENTRADA'; quantidade = 10 }
$null = Chamar POST '/movimentacoes' 201 @{ produtoId = $produto.id; tipo = 'SAIDA'; quantidade = 3 }
$saldo = Chamar GET "/produtos/$($produto.id)" 200
if ($saldo.quantidade -ne 7) { throw 'Saldo esperado: 7.' }
Write-Host "Saldo persistido: $($saldo.quantidade)."

$alerta = Chamar POST '/alertas' 201 @{
    estoqueId = $local.id; titulo = 'Risco alto de alagamento'; nivel = 'ALTO'
    descricao = 'Alerta de demonstracao informado pelo comerciante'; ativo = $true
}
$risco = Chamar GET "/alertas/$($alerta.id)/produtos-em-risco" 200
$emRisco = @($risco.produtos | Where-Object { $_.id -eq $produto.id })
if ($emRisco.Count -ne 1 -or $emRisco[0].quantidade -ne 7) {
    throw 'O produto prioritario com saldo 7 deveria aparecer no resultado de risco.'
}
Write-Host "Produto em risco: $($emRisco[0].nome), $($emRisco[0].quantidade) unidades."

$invalido = Chamar POST '/movimentacoes' 400 @{ produtoId = $produto.id; tipo = 'SAIDA'; quantidade = 0 }
Write-Host ($invalido.message -join '; ')
$confirmacao = Chamar GET "/produtos/$($produto.id)" 200
if ($confirmacao.quantidade -ne 7) { throw 'A entrada invalida alterou o saldo.' }

if ($VerificarContrato) {
    $pagina = Chamar GET "/produtos?estoqueId=$($local.id)&prioritario=true&pagina=1&tamanho=5" 200
    if ($pagina.total -ne 1 -or $pagina.itens[0].id -ne $produto.id -or $pagina.itens[0].estoque.id -ne $local.id) {
        throw 'O filtro de produtos e o relacionamento com estoque devem retornar o produto do roteiro.'
    }
    $null = Chamar GET '/produtos?tamanho=101' 400

    $descartavel = Chamar POST '/produtos' 201 @{
        nome = "Produto removivel P2 $rotulo"; categoria = 'Teste'; estoqueId = $local.id
    }
    $null = Chamar PATCH "/produtos/$($descartavel.id)" 200 @{ nome = "Produto alterado P2 $rotulo" }
    $null = Chamar DELETE "/produtos/$($descartavel.id)" 204
    $null = Chamar GET "/produtos/$($descartavel.id)" 404

    $novoLocal = Chamar POST '/estoques' 201 @{
        nome = "Local removivel P2 $rotulo"; localizacao = 'Deposito'; alturaCm = 80; seguro = $true
    }
    $null = Chamar PATCH "/estoques/$($novoLocal.id)" 200 @{ nome = "Local alterado P2 $rotulo" }
    $null = Chamar DELETE "/estoques/$($novoLocal.id)" 204
    $null = Chamar GET "/estoques/$($novoLocal.id)" 404

    $novoAlerta = Chamar POST '/alertas' 201 @{
        estoqueId = $local.id; titulo = 'Alerta removivel P2'; nivel = 'BAIXO'; descricao = 'Teste de contrato'
    }
    $null = Chamar PATCH "/alertas/$($novoAlerta.id)" 200 @{ titulo = 'Alerta alterado P2' }
    $null = Chamar DELETE "/alertas/$($novoAlerta.id)" 204
    $null = Chamar GET "/alertas/$($novoAlerta.id)" 404
}
Write-Host ('Demonstracao concluida em {0:N1} s.' -f $inicio.Elapsed.TotalSeconds)
