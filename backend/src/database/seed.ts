import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module.js';
import { Estoque } from '../estoques/entities/estoque.entity.js';
import { Produto } from '../produtos/entities/produto.entity.js';
import { Categoria } from '../categorias/entities/categoria.entity.js';
import { Alerta, NivelAlerta } from '../alertas/entities/alerta.entity.js';
import { Movimentacao, TipoMovimentacao } from '../movimentacoes/entities/movimentacao.entity.js';
import { MovimentacoesService } from '../movimentacoes/movimentacoes.service.js';
const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
try {
  const db = app.get(DataSource);
  const er = db.getRepository(Estoque);
  const locais: Estoque[] = [];
  for (const [nome, seguro] of [['DEMO Local vulneravel', false], ['DEMO Local seguro', true]] as const) {
    locais.push(await er.findOneBy({ nome }) ?? await er.save(er.create({ nome, seguro, localizacao: 'Demonstracao', alturaCm: seguro ? 200 : 20 })));
  }
  const cr = db.getRepository(Categoria);
  const cats: Categoria[] = [];
  for (const nome of ['alimentos', 'pereciveis', 'limpeza']) {
    cats.push(await cr.findOneBy({ nome }) ?? await cr.save(cr.create({ nome })));
  }
  const pr = db.getRepository(Produto);
  for (let i = 1; i <= 30; i++) {
    const nome = `DEMO Produto ${String(i).padStart(2, '0')}`;
    const estoqueId = locais[i % 2]!.id;
    let p = await pr.findOneBy({ nome, estoqueId });
    if (!p) p = await pr.save(pr.create({ nome, categoria: 'alimentos', estoqueId, quantidade: 0, prioritario: i % 3 === 0 }));
    p.categorias = i % 2 === 0 ? [cats[0]!, cats[1]!] : [cats[0]!, cats[2]!];
    await pr.save(p);
    const has = await db.getRepository(Movimentacao).existsBy({ produtoId: p.id });
    if (!has && i % 5 !== 0) {
      await app.get(MovimentacoesService).create({ produtoId: p.id, tipo: TipoMovimentacao.ENTRADA, quantidade: 10 });
      await app.get(MovimentacoesService).create({ produtoId: p.id, tipo: TipoMovimentacao.SAIDA, quantidade: 3 });
    }
  }
  const ar = db.getRepository(Alerta);
  const titulo = 'DEMO Risco informado manualmente';
  if (!await ar.existsBy({ titulo })) await ar.save(ar.create({ titulo, estoqueId: locais[0]!.id, nivel: NivelAlerta.ALTO, descricao: 'Demonstracao manual', ativo: true }));
  console.log('Seed concluido: 30 produtos DEMO, dois locais, categorias, vinculos, movimentos e alerta.');
  console.log('Reexecutar nao repete as movimentacoes iniciais.');
} finally { await app.close(); }
