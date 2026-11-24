import { ApiProperty } from '@nestjs/swagger';

import type { Produto } from '../entities/produto.entity.js';

export class ProdutoResponseDto {
  @ApiProperty({ type: 'integer' })
  id!: number;
  @ApiProperty()
  nome!: string;
  @ApiProperty()
  categoria!: string;
  @ApiProperty({ type: 'integer' })
  estoqueId!: number;
  @ApiProperty({ type: 'integer' })
  quantidade!: number;
  @ApiProperty()
  prioritario!: boolean;

  static from(p: Produto): ProdutoResponseDto {
    return {
      id: p.id,
      nome: p.nome,
      categoria: p.categoria,
      estoqueId: p.estoqueId,
      quantidade: p.quantidade,
      prioritario: p.prioritario,
    };
  }
}