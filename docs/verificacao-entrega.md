# Verificação executada da entrega

Data UTC: 2026-11-23T23:13:40.661Z

Comando: npm run verify:entrega (após migração e seed).

## Consultas da listagem
- Página com tamanho 5: 5 produtos, 3 SELECTs; total 30.
- Página com tamanho 20: 20 produtos, 3 SELECTs; total 30.

## Restrição do banco e resposta da API

A tentativa de excluir o local DEMO com produtos foi recusada no banco (23001) e a API respondeu HTTP 409.
O ensaio SQL usou uma transação revertida. O estoque permanece no banco.

```sh
curl -i -X DELETE http://127.0.0.1:55632/estoques/1
```

```http
HTTP/1.1 409 Conflict
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 105
ETag: W/"69-b6hY8+zY88VmWTSdKpplZYSkf1U"
Date: Mon, 23 Nov 2026 23:13:40 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Operação impedida por vínculos com outros registros.","error":"Conflict","statusCode":409}
```

O comando acima foi executado com a API em uma porta temporária. Para reproduzir, use a porta e o ID do local no seu banco de demonstração.

## SQL capturado na listagem

```sql
-- Página com tamanho 5: 5 produtos, 3 SELECTs; total 30.
SELECT DISTINCT "distinctAlias"."Produto_id" AS "ids_Produto_id", "distinctAlias"."Produto_id" FROM (SELECT "Produto"."id" AS "Produto_id", "Produto"."nome" AS "Produto_nome", "Produto"."categoria" AS "Produto_categoria", "Produto"."quantidade" AS "Produto_quantidade", "Produto"."prioritario" AS "Produto_prioritario", "Produto"."estoque_id" AS "Produto_estoque_id", "Produto__Produto_estoque"."id" AS "Produto__Produto_estoque_id", "Produto__Produto_estoque"."nome" AS "Produto__Produto_estoque_nome", "Produto__Produto_estoque"."localizacao" AS "Produto__Produto_estoque_localizacao", "Produto__Produto_estoque"."altura_cm" AS "Produto__Produto_estoque_altura_cm", "Produto__Produto_estoque"."seguro" AS "Produto__Produto_estoque_seguro", "Produto__Produto_categorias"."id" AS "Produto__Produto_categorias_id", "Produto__Produto_categorias"."public_id" AS "Produto__Produto_categorias_public_id", "Produto__Produto_categorias"."nome" AS "Produto__Produto_categorias_nome" FROM "produtos" "Produto" LEFT JOIN "estoques" "Produto__Produto_estoque" ON "Produto__Produto_estoque"."id"="Produto"."estoque_id"  LEFT JOIN "produtos_categorias" "Produto_Produto__Produto_categorias" ON "Produto_Produto__Produto_categorias"."produto_id"="Produto"."id" LEFT JOIN "categorias" "Produto__Produto_categorias" ON "Produto__Produto_categorias"."id"="Produto_Produto__Produto_categorias"."categoria_id") "distinctAlias" ORDER BY "distinctAlias"."Produto_id" ASC, "Produto_id" ASC LIMIT 5 OFFSET 0
SELECT "Produto"."id" AS "Produto_id", "Produto"."nome" AS "Produto_nome", "Produto"."categoria" AS "Produto_categoria", "Produto"."quantidade" AS "Produto_quantidade", "Produto"."prioritario" AS "Produto_prioritario", "Produto"."estoque_id" AS "Produto_estoque_id", "Produto__Produto_estoque"."id" AS "Produto__Produto_estoque_id", "Produto__Produto_estoque"."nome" AS "Produto__Produto_estoque_nome", "Produto__Produto_estoque"."localizacao" AS "Produto__Produto_estoque_localizacao", "Produto__Produto_estoque"."altura_cm" AS "Produto__Produto_estoque_altura_cm", "Produto__Produto_estoque"."seguro" AS "Produto__Produto_estoque_seguro", "Produto__Produto_categorias"."id" AS "Produto__Produto_categorias_id", "Produto__Produto_categorias"."public_id" AS "Produto__Produto_categorias_public_id", "Produto__Produto_categorias"."nome" AS "Produto__Produto_categorias_nome" FROM "produtos" "Produto" LEFT JOIN "estoques" "Produto__Produto_estoque" ON "Produto__Produto_estoque"."id"="Produto"."estoque_id"  LEFT JOIN "produtos_categorias" "Produto_Produto__Produto_categorias" ON "Produto_Produto__Produto_categorias"."produto_id"="Produto"."id" LEFT JOIN "categorias" "Produto__Produto_categorias" ON "Produto__Produto_categorias"."id"="Produto_Produto__Produto_categorias"."categoria_id" WHERE "Produto"."id" IN (1, 2, 3, 4, 5) ORDER BY "Produto"."id" ASC
SELECT COUNT(DISTINCT("Produto"."id")) AS "cnt" FROM "produtos" "Produto" LEFT JOIN "estoques" "Produto__Produto_estoque" ON "Produto__Produto_estoque"."id"="Produto"."estoque_id"  LEFT JOIN "produtos_categorias" "Produto_Produto__Produto_categorias" ON "Produto_Produto__Produto_categorias"."produto_id"="Produto"."id" LEFT JOIN "categorias" "Produto__Produto_categorias" ON "Produto__Produto_categorias"."id"="Produto_Produto__Produto_categorias"."categoria_id"

-- Página com tamanho 20: 20 produtos, 3 SELECTs; total 30.
SELECT DISTINCT "distinctAlias"."Produto_id" AS "ids_Produto_id", "distinctAlias"."Produto_id" FROM (SELECT "Produto"."id" AS "Produto_id", "Produto"."nome" AS "Produto_nome", "Produto"."categoria" AS "Produto_categoria", "Produto"."quantidade" AS "Produto_quantidade", "Produto"."prioritario" AS "Produto_prioritario", "Produto"."estoque_id" AS "Produto_estoque_id", "Produto__Produto_estoque"."id" AS "Produto__Produto_estoque_id", "Produto__Produto_estoque"."nome" AS "Produto__Produto_estoque_nome", "Produto__Produto_estoque"."localizacao" AS "Produto__Produto_estoque_localizacao", "Produto__Produto_estoque"."altura_cm" AS "Produto__Produto_estoque_altura_cm", "Produto__Produto_estoque"."seguro" AS "Produto__Produto_estoque_seguro", "Produto__Produto_categorias"."id" AS "Produto__Produto_categorias_id", "Produto__Produto_categorias"."public_id" AS "Produto__Produto_categorias_public_id", "Produto__Produto_categorias"."nome" AS "Produto__Produto_categorias_nome" FROM "produtos" "Produto" LEFT JOIN "estoques" "Produto__Produto_estoque" ON "Produto__Produto_estoque"."id"="Produto"."estoque_id"  LEFT JOIN "produtos_categorias" "Produto_Produto__Produto_categorias" ON "Produto_Produto__Produto_categorias"."produto_id"="Produto"."id" LEFT JOIN "categorias" "Produto__Produto_categorias" ON "Produto__Produto_categorias"."id"="Produto_Produto__Produto_categorias"."categoria_id") "distinctAlias" ORDER BY "distinctAlias"."Produto_id" ASC, "Produto_id" ASC LIMIT 20 OFFSET 0
SELECT "Produto"."id" AS "Produto_id", "Produto"."nome" AS "Produto_nome", "Produto"."categoria" AS "Produto_categoria", "Produto"."quantidade" AS "Produto_quantidade", "Produto"."prioritario" AS "Produto_prioritario", "Produto"."estoque_id" AS "Produto_estoque_id", "Produto__Produto_estoque"."id" AS "Produto__Produto_estoque_id", "Produto__Produto_estoque"."nome" AS "Produto__Produto_estoque_nome", "Produto__Produto_estoque"."localizacao" AS "Produto__Produto_estoque_localizacao", "Produto__Produto_estoque"."altura_cm" AS "Produto__Produto_estoque_altura_cm", "Produto__Produto_estoque"."seguro" AS "Produto__Produto_estoque_seguro", "Produto__Produto_categorias"."id" AS "Produto__Produto_categorias_id", "Produto__Produto_categorias"."public_id" AS "Produto__Produto_categorias_public_id", "Produto__Produto_categorias"."nome" AS "Produto__Produto_categorias_nome" FROM "produtos" "Produto" LEFT JOIN "estoques" "Produto__Produto_estoque" ON "Produto__Produto_estoque"."id"="Produto"."estoque_id"  LEFT JOIN "produtos_categorias" "Produto_Produto__Produto_categorias" ON "Produto_Produto__Produto_categorias"."produto_id"="Produto"."id" LEFT JOIN "categorias" "Produto__Produto_categorias" ON "Produto__Produto_categorias"."id"="Produto_Produto__Produto_categorias"."categoria_id" WHERE "Produto"."id" IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20) ORDER BY "Produto"."id" ASC
SELECT COUNT(DISTINCT("Produto"."id")) AS "cnt" FROM "produtos" "Produto" LEFT JOIN "estoques" "Produto__Produto_estoque" ON "Produto__Produto_estoque"."id"="Produto"."estoque_id"  LEFT JOIN "produtos_categorias" "Produto_Produto__Produto_categorias" ON "Produto_Produto__Produto_categorias"."produto_id"="Produto"."id" LEFT JOIN "categorias" "Produto__Produto_categorias" ON "Produto__Produto_categorias"."id"="Produto_Produto__Produto_categorias"."categoria_id"

```

O ensaio de banco vazio, preservação e reversão está em [ensaio-migracoes.md](ensaio-migracoes.md).
