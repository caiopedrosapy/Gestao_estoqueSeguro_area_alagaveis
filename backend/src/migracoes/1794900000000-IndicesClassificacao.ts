import type { MigrationInterface, QueryRunner } from 'typeorm';

export class IndicesClassificacao1794900000000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      ALTER INDEX idx_produtos_categorias_categoria RENAME TO "IDX_6f64cccd36cd9d952be503d34a";
      CREATE INDEX "IDX_443e0e262892bcd4879d568e6f" ON produtos_categorias(produto_id);
    `);
  }

  async down(q: QueryRunner): Promise<void> {
    await q.query(`
      DROP INDEX "IDX_443e0e262892bcd4879d568e6f";
      ALTER INDEX "IDX_6f64cccd36cd9d952be503d34a" RENAME TO idx_produtos_categorias_categoria;
    `);
  }
}
