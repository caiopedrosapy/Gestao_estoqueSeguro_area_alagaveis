import { ApiProperty } from '@nestjs/swagger';
import type { Movimentacao } from '../entities/movimentacao.entity.js';
import { TipoMovimentacao } from '../entities/movimentacao.entity.js';

export class MovimentacaoResponseDto {
  @ApiProperty({ type: 'integer' })
  id!: number;
  @ApiProperty({ type: 'integer' })
  produtoId!: number;
  @ApiProperty({ enum: TipoMovimentacao })
  tipo!: TipoMovimentacao;
  @ApiProperty({ type: 'integer' })
  quantidade!: number;
  @ApiProperty({ format: 'date-time' })
  criadaEm!: string;

  static from(m: Movimentacao): MovimentacaoResponseDto {
    return {
      id: m.id,
      produtoId: m.produtoId,
      tipo: m.tipo,
      quantidade: m.quantidade,
      criadaEm: m.criadaEm.toISOString(),
    };
  }
}