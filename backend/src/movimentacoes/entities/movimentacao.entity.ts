import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Produto } from '../../produtos/entities/produto.entity.js';

export enum TipoMovimentacao {
  ENTRADA = 'ENTRADA',
  SAIDA = 'SAIDA',
}

@Entity('movimentacoes')
@Check('movimentacoes_tipo_check', "tipo IN ('ENTRADA', 'SAIDA')")
@Check('movimentacoes_quantidade_check', 'quantidade > 0')
@Index('idx_movimentacoes_produto', ['produtoId'])
export class Movimentacao {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'produto_id', type: 'integer' })
  produtoId!: number;

  @ManyToOne(() => Produto, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'produto_id', foreignKeyConstraintName: 'movimentacoes_produto_id_fkey' })
  produto!: Relation<Produto>;

  @Column({ type: 'varchar', length: 7 })
  tipo!: TipoMovimentacao;

  @Column({ type: 'integer' })
  quantidade!: number;

  @CreateDateColumn({ name: 'criada_em', type: 'timestamptz' })
  criadaEm!: Date;
}
