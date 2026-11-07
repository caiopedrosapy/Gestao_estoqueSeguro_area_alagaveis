import 'reflect-metadata';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module.js';
import { Estoque } from '../estoques/entities/estoque.entity.js';
const app = await NestFactory.create(AppModule, { logger: false });
try {
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  await app.listen(0, '127.0.0.1');
  const url = await app.getUrl();
  const db = app.get(DataSource);
  const original = db.logger.logQuery.bind(db.logger);
  let ativo = false, count = 0;
  db.logger.logQuery = (q, params, runner) => {
    if (ativo && /^\s*SELECT/i.test(q)) count++;
    original(q, params, runner);
  };
  const medidas: string[] = [];
  for (const tamanho of [5, 20]) {
    count = 0; ativo = true;
    const response = await fetch(`${url}/produtos?pagina=1&tamanho=${tamanho}`);
    const data = await response.json() as { itens: Array<{ estoque: unknown; categorias: unknown[] }>; total: number };
    ativo = false;
    if (response.status !== 200 || !data.itens?.length || !data.itens.every(p => p.estoque && Array.isArray(p.categorias))) throw new Error('Listagem relacionada invalida');
    const line = `Pagina com tamanho ${tamanho}: ${data.itens.length} produtos, ${count} SELECTs; total ${data.total}.`;
    console.log(line); medidas.push(line);
  }
  const local = await db.getRepository(Estoque).findOneByOrFail({ nome: 'DEMO Local vulneravel' });
  const q = db.createQueryRunner(); await q.connect(); await q.startTransaction();
  let sqlstate = '';
  try { await q.query('DELETE FROM estoques WHERE id = $1', [local.id]); }
  catch (error) { sqlstate = (error as { driverError?: { code?: string }; code?: string }).driverError?.code ?? (error as { code?: string }).code ?? ''; }
  finally { await q.rollbackTransaction(); await q.release(); }
  if (!['23503', '23001'].includes(sqlstate)) throw new Error('Restricao FK nao demonstrada');
  const response = await fetch(`${url}/estoques/${local.id}`, { method: 'DELETE' });
  const body = await response.text();
  if (response.status !== 409) throw new Error(`Esperado 409, recebido ${response.status}`);
  console.log(`FK recusou exclusao no banco (${sqlstate}); API respondeu 409.`);
  const report = [
    '# Verificacao executada da entrega',
    `Data UTC: ${new Date().toISOString()}`, '',
    'Comando: npm run verify:entrega', '',
    '## Consultas da listagem', ...medidas.map(s => '- ' + s), '',
    '## Restricao do banco e resposta da API',
    `A tentativa de excluir o local DEMO com produtos foi recusada no banco (${sqlstate}) e a API respondeu ${response.status}.`,
    'O ensaio SQL usou transacao revertida. Nenhum estoque foi removido.',
    '```json', body, '```', '',
    `Requisicao reproduzivel: DELETE /estoques/${local.id}`, '',
    'Banco vazio, atualizacao de dados antigos e rollback devem ser registrados separadamente com as respectivas execucoes. Esta verificacao nao afirma que esses ensaios foram realizados nesta maquina.',
  ].join('\n');
  writeFileSync(resolve('..', 'docs', 'verificacao-entrega.md'), report);
  console.log('Relatorio salvo em docs/verificacao-entrega.md');
} finally { await app.close(); }
