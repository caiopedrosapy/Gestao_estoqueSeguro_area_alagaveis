# Executar a entrega de entidades e migracoes

Dentro de backend, com PostgreSQL e DATABASE_URL configurados:

```powershell
npm run migration:run
npm run seed
npm run verify:entrega
npm run lint
npm test
npm run test:e2e
npm run start:dev
```

TEST_DATABASE_URL deve apontar para um banco exclusivo de testes. A API usa a conexao DATABASE_URL; o teste integrado usa TEST_DATABASE_URL.

Listagem: GET /produtos?pagina=1&tamanho=5. A resposta contem itens, total, pagina e tamanho; cada item inclui estoque e categorias. Tamanho maximo: 100. Os filtros estoqueId e prioritario continuam disponiveis.

O seed cria 30 produtos DEMO e cobre as relacoes 1-N e N-N. Reexecutar o seed nao repete entradas e saidas ja criadas. A quantidade e mantida coerente com os movimentos.

## Migracao

A nova migracao cria categorias e a ligacao, e copia as classificacoes antigas sem apagar o texto de Produto.categoria. Nomes sao normalizados com lower e btrim no preenchimento. Saldos e historicos nao sao alterados.

O down remove as novas tabelas e classificacoes, mas preserva produtos, quantidades, movimentos e o texto antigo. Classificacoes adicionadas depois nao sao restauradas: testar retorno somente em banco descartavel.

Para ensaiar retorno em banco descartavel, antes do seed:

```powershell
npm run migration:run
npm run migration:revert
npm run migration:run
```

O primeiro revert desfaz apenas o ajuste mais recente dos índices de classificação. Reverter também a migração Categorias remove os novos vínculos e as novas categorias.

Nao executar revert sobre o banco utilizado para registros importantes.

## Limites desta entrega

O cadastro de produtos conserva o contrato legado com categoria em texto. A migracao e o seed demonstram a classificacao N-N; o cadastro e a edicao completa de categorias pela API ficam como evolucao posterior. Os alertas permanecem manuais. As rotas existentes conservam seus identificadores numericos; Categoria possui UUID publico.

Use npm run migration:check depois de aplicar as migrações. Se o TypeORM apontar diferenças, revise o SQL antes de gerar e aplicar alterações. O resultado da validação está em [ensaio-migracoes.md](ensaio-migracoes.md).

O comando npm run verify:entrega usa curl (curl.exe no Windows) e grava o SQL da listagem e a resposta HTTP 409 em [verificacao-entrega.md](verificacao-entrega.md). Rode depois do seed.
