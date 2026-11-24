import 'reflect-metadata';
import { execFile } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module.js';
import { Estoque } from '../estoques/entities/estoque.entity.js';

const executar = promisify(execFile);
const app = await NestFactory.create(AppModule, { logger: false });
try {
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  await app.listen(0, '127.0.0.1');
  const url = await app.getUrl();
  const db = app.get(DataSource);
  const original = db.logger.logQuery.bind(db.logger);
  let sqlDaPagina: string[] | undefined;
  db.logger.logQuery = (q, params, runner) => {
    if (sqlDaPagina && /^\s*SELECT/i.test(q)) {
      sqlDaPagina.push(params?.length ? q + ' -- PARAMETERS: ' + JSON.stringify(params) : q);
    }
    original(q, params, runner);
  };
  const medidas: string[] = [];
  const consultas: string[] = [];
  for (const tamanho of [5, 20]) {
    const sql: string[] = [];
    sqlDaPagina = sql;
    const response = await fetch(url + '/produtos?pagina=1&tamanho=' + tamanho);
    const data = await response.json() as { itens: Array<{ estoque: unknown; categorias: unknown[] }>; total: number };
    sqlDaPagina = undefined;
    if (response.status !== 200 || data.itens?.length !== tamanho
      || !data.itens.every(p => p.estoque && Array.isArray(p.categorias))) {
      throw new Error('Listagem relacionada inválida. Rode o seed antes deste comando.');
    }
    const medida = 'Página com tamanho ' + tamanho + ': ' + data.itens.length + ' produtos, '
      + sql.length + ' SELECTs; total ' + data.total + '.';
    medidas.push(medida);
    consultas.push('-- ' + medida, ...sql, '');
    console.log(medida);
  }

  const local = await db.getRepository(Estoque).findOneByOrFail({ nome: 'DEMO Local vulneravel' });
  const q = db.createQueryRunner();
  await q.connect();
  await q.startTransaction();
  let sqlstate = '';
  try {
    await q.query('DELETE FROM estoques WHERE id = $1', [local.id]);
  } catch (error) {
    sqlstate = (error as { driverError?: { code?: string }; code?: string }).driverError?.code
      ?? (error as { code?: string }).code ?? '';
  } finally {
    await q.rollbackTransaction();
    await q.release();
  }
  if (!['23503', '23001'].includes(sqlstate)) throw new Error('Restrição FK não demonstrada.');
  const alvo = url + '/estoques/' + local.id;
  const { stdout } = await executar('curl', ['--silent', '--show-error', '--include', '-X', 'DELETE', alvo], {
    windowsHide: true, timeout: 10000,
  });
  if (!/^HTTP\/\S+\s+409\b/.test(stdout)) throw new Error('Esperado HTTP 409: ' + stdout);
  console.log('A FK recusou a exclusão (' + sqlstate + ') e a API respondeu 409.');

  const fence = '```';
  const report = [
    '# Verificação executada da entrega',
    '',
    'Data UTC: ' + new Date().toISOString(), '',
    'Comando: npm run verify:entrega (após migração e seed).', '',
    '## Consultas da listagem', ...medidas.map(s => '- ' + s), '',
    '## Restrição do banco e resposta da API',
    '',
    'A tentativa de excluir o local DEMO com produtos foi recusada no banco (' + sqlstate + ') e a API respondeu HTTP 409.',
    'O ensaio SQL usou uma transação revertida. O estoque permanece no banco.', '',
    fence + 'sh', 'curl -i -X DELETE ' + alvo, fence, '',
    fence + 'http', stdout.replace(/\r\n/g, '\n').trimEnd(), fence, '',
    'O comando acima foi executado com a API em uma porta temporária. Para reproduzir, use a porta e o ID do local no seu banco de demonstração.', '',
    '## SQL capturado na listagem', '',
    fence + 'sql', ...consultas, fence, '',
    'O ensaio de banco vazio, preservação e reversão está em [ensaio-migracoes.md](ensaio-migracoes.md).',
  ].join('\n');
  writeFileSync(resolve('..', 'docs', 'verificacao-entrega.md'), report + '\n');
  console.log('Relatório salvo em docs/verificacao-entrega.md.');
} finally {
  await app.close();
}
