import type { MigrationInterface, QueryRunner } from 'typeorm';
export class Categorias1794000000000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE categorias (
        id SERIAL PRIMARY KEY,
        public_id UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
        nome VARCHAR(80) NOT NULL UNIQUE CHECK (btrim(nome) <> '')
      );
      CREATE TABLE produtos_categorias (
        produto_id INTEGER NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
        categoria_id INTEGER NOT NULL REFERENCES categorias(id) ON DELETE RESTRICT,
        PRIMARY KEY (produto_id, categoria_id)
      );
      CREATE INDEX idx_produtos_categorias_categoria ON produtos_categorias(categoria_id);
      INSERT INTO categorias(nome)
        SELECT DISTINCT lower(btrim(categoria)) FROM produtos
        WHERE btrim(categoria) <> '' ON CONFLICT (nome) DO NOTHING;
      INSERT INTO produtos_categorias(produto_id, categoria_id)
        SELECT p.id, c.id FROM produtos p JOIN categorias c
        ON c.nome = lower(btrim(p.categoria))
        ON CONFLICT DO NOTHING;
    `);
  }
  // Remove as novas classificacoes e vinculos. O texto legado, os produtos,
  // saldos e movimentos sao preservados. Classificacoes novas apos o deploy
  // nao podem ser recuperadas por este down: ensaiar somente em banco descartavel.
  async down(q: QueryRunner): Promise<void> {
    await q.query('DROP TABLE produtos_categorias; DROP TABLE categorias;');
  }
}
