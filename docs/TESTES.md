# Validação do Estoque Seguro

Na pasta backend, configure TEST_DATABASE_URL para um banco separado. Rode npm run lint, npm test e npm run test:e2e. Os testes de ponta a ponta aplicam as migrações nesse banco e verificam os quatro módulos da API.

| Caso | Resultado esperado |
| --- | --- |
| Criar local, produto, movimentação ou alerta válidos | 201 |
| Listar produtos ou estoques | 200 com itens, total, pagina e tamanho |
| Listar produtos ou estoques com tamanho maior que 100 | 400 |
| Enviar quantidade diretamente na edição de produto, valor inválido ou ID malformado | 400 |
| Buscar um recurso inexistente | 404 |
| Excluir produto, estoque ou alerta quando permitido | 204 com corpo vazio |
| Excluir estoque com vínculos ou produto que tenha histórico | 409 |
| Registrar saída superior ao saldo | 409 e nenhuma movimentação gravada |
| Registrar duas saídas concorrentes que somadas excedem o saldo | Uma 201 e outra 409 |
| Editar ou excluir movimentação | 404. O histórico é preservado. |
| Consultar produtos em risco de alerta ALTO ativo em local vulnerável | Somente produtos com saldo positivo, com prioridade primeiro |

Com a API em execução, o Swagger está em http://localhost:3000/api/docs. O contrato está em [backend/openapi.json](../backend/openapi.json).

A execução de banco vazio e reversão está no [ensaio de migrações](ensaio-migracoes.md). O [relatório de verificação](verificacao-entrega.md) registra o SQL e a demonstração de HTTP 409.
