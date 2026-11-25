# Validação do Cenário Principal da P2

**Data do ensaio:** 24/11/2026  
**Commit:** `08f315a`  
**Banco de dados:** `estoque_p2_validacao`  
**SGBD:** PostgreSQL 18.4

## 1. Migrações e Seed

| Etapa | Descrição | Resultado |
|---|---|---|
| Migração 1 | Inicial | Executada com sucesso |
| Migração 2 | Categorias | Executada com sucesso |
| Migração 3 | Índices de classificação | Executada com sucesso |
| Seed | Carregamento dos dados de exemplo | 30 produtos cadastrados |
| API | Consulta de `/api/docs` | HTTP 200 |

## 2. Testes do cenário principal pela API

| Nº | Operação realizada | Resultado esperado | Resultado obtido |
|---|---|---|---|
| 1 | Cadastro de local vulnerável | Local cadastrado | HTTP 200 |
| 2 | Cadastro de produto prioritário | Produto cadastrado | HTTP 200 |
| 3 | Entrada de 10 unidades | Aumentar o estoque | Saldo atualizado |
| 4 | Saída de 3 unidades | Diminuir o estoque | Saldo final de 7 |
| 5 | Criação de alerta manual | Alerta de nível alto | HTTP 200 |
| 6 | Consulta de produtos em risco | Identificar produto em risco | Produto encontrado |
| 7 | Saída com quantidade zero | Rejeitar movimentação | HTTP 400 |
| 8 | Nova consulta do produto | Manter saldo anterior | Saldo permaneceu em 7 |

## 3. Evidências dos testes

| Requisição | Código HTTP | Evidência |
|---|---|---|
| `GET /produtos/31` | 200 | Produto consultado com sucesso |
| `GET /alertas/2/produtos-em-risco` | 200 | Produto identificado em risco |
| `POST /movimentacoes` | 400 | Quantidade zero recusada |
| `GET /produtos/31` | 200 | Saldo permaneceu em 7 unidades |

## 4. Resultado do estoque

| Descrição | Quantidade |
|---|---:|
| Estoque inicial | 0 |
| Entrada registrada | +10 |
| Saída registrada | -3 |
| Tentativa de saída inválida | 0 |
| **Saldo final** | **7 unidades** |

## 5. Conclusão da validação

| Critério avaliado | Situação |
|---|---|
| Execução das migrações | Aprovado |
| Carregamento dos dados | Aprovado |
| Funcionamento da API | Aprovado |
| Cadastro e consulta de produtos | Aprovado |
| Registro de movimentações | Aprovado |
| Funcionamento dos alertas | Aprovado |
| Validação de dados inválidos | Aprovado |
| Preservação do saldo após erro | Aprovado |

## 6. Conclusão geral

O cenário principal da P2 foi executado com sucesso. Os testes demonstraram que as migrações foram aplicadas corretamente, os dados foram carregados no PostgreSQL e as operações de estoque e alertas funcionaram conforme esperado.

Também foi confirmada a rejeição de movimentações inválidas, sem alteração indevida do saldo do produto.
