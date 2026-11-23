# Ensaio de migrações

- Ambiente: PostgreSQL 18.4 em banco temporário.
- migration:run no banco vazio aplicou: Inicial1791500000000, Categorias1794000000000, IndicesClassificacao1794900000000.
- Reversão e reaplicação da última migração: índice anterior restaurado e migração aplicada novamente.
- Preservação: produto antigo id=1, texto " Alimentos ", saldo 7 e as duas movimentações (entrada 10 e saída 3) ficaram iguais. A categoria alimentos foi vinculada.
- Comparação de esquema do TypeORM: zero comandos SQL pendentes.

O mesmo banco foi conferido com o comando abaixo depois da reaplicação.

```text
> npm run migration:check
No changes in database schema were found
```

O ensaio de preservação voltou à migração inicial em um banco descartável antes de criar os dados de teste. Depois aplicou as duas migrações seguintes e comparou diretamente as linhas de produtos e movimentações.
