import {
  Check,
  Column,
  Entity,
  Generated,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Produto } from '../../produtos/entities/produto.entity.js';

@Entity('categorias')
@Check('categorias_nome_check', "btrim(nome) <> ''")
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'public_id',
    type: 'uuid',
    unique: true,
  })
  @Generated('uuid')
  publicId!: string;

  @Column({
    type: 'varchar',
    length: 80,
    unique: true,
  })
  nome!: string;

  @ManyToMany(() => Produto, (produto) => produto.categorias, {
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION',
  })
  produtos!: Relation<Produto[]>;
}
