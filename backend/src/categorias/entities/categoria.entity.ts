import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Produto } from '../../produtos/entities/produto.entity.js';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'public_id',
    type: 'uuid',
    unique: true,
    default: () => 'gen_random_uuid()',
  })
  publicId!: string;

  @Column({
    type: 'varchar',
    length: 80,
    unique: true,
  })
  nome!: string;

  @ManyToMany(() => Produto, (produto) => produto.categorias, {
    onDelete: 'RESTRICT',
  })
  produtos!: Relation<Produto[]>;
}
