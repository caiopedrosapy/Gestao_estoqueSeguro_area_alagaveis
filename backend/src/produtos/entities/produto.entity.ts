
import {
  Check,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Estoque } from '../../estoques/entities/estoque.entity.js';
import { Categoria } from '../../categorias/entities/categoria.entity.js';

@Entity('produtos')
@Check('produtos_nome_check', "btrim(nome) <> ''")
@Check('produtos_categoria_check', "btrim(categoria) <> ''")
@Check('produtos_quantidade_check', 'quantidade >= 0')
@Index('idx_produtos_estoque', ['estoqueId'])
export class Produto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 120 })
  nome!: string;

  // Campo antigo mantido durante a transição.
  @Column({ type: 'varchar', length: 80 })
  categoria!: string;

  @Column({ type: 'integer', default: 0 })
  quantidade!: number;

  @Column({ type: 'boolean', default: false })
  prioritario!: boolean;

  @Column({ name: 'estoque_id', type: 'integer' })
  estoqueId!: number;

  @ManyToOne(() => Estoque, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'estoque_id', foreignKeyConstraintName: 'produtos_estoque_id_fkey' })
  estoque!: Relation<Estoque>;

  @ManyToMany(() => Categoria, (categoria) => categoria.produtos, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'produtos_categorias',
    joinColumn: {
      name: 'produto_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'produtos_categorias_produto_id_fkey',
    },
    inverseJoinColumn: {
      name: 'categoria_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'produtos_categorias_categoria_id_fkey',
    },
  })
  categorias!: Relation<Categoria[]>;
}
