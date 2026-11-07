# Verificacao executada da entrega
Data UTC: 2026-11-07T02:55:36.043Z

Comando: npm run verify:entrega

## Consultas da listagem
- Pagina com tamanho 5: 5 produtos, 3 SELECTs; total 32.
- Pagina com tamanho 20: 20 produtos, 3 SELECTs; total 32.

## Restricao do banco e resposta da API
A tentativa de excluir o local DEMO com produtos foi recusada no banco (23001) e a API respondeu 409.
O ensaio SQL usou transacao revertida. Nenhum estoque foi removido.
```json
{"message":"Operação impedida por vínculos com outros registros.","error":"Conflict","statusCode":409}
```

Requisicao reproduzivel: DELETE /estoques/3

Banco vazio, atualizacao de dados antigos e rollback devem ser registrados separadamente com as respectivas execucoes. Esta verificacao nao afirma que esses ensaios foram realizados nesta maquina.
## Migracao e testes executados nesta maquina

A migracao Categorias1794000000000 foi executada com sucesso e COMMIT.
O seed criou os registros DEMO.
A verificacao encontrou 32 produtos e executou 3 SELECTs tanto para pagina de 5 quanto de 20 produtos.
A restricao de exclusao foi recusada no banco com codigo 23001 e tratada pela API com status 409.
npm run test:e2e terminou com 11 testes aprovados, zero falhas e zero cancelamentos.
