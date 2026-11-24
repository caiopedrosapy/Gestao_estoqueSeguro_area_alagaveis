import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, Max, Min } from 'class-validator';
import { TipoMovimentacao } from '../entities/movimentacao.entity.js';

export class CreateMovimentacaoDto {
  @IsInt()
  @Min(1)
  @Max(2147483647)
  @ApiProperty({ type: 'integer', minimum: 1, maximum: 2147483647 })
  produtoId!: number;

  @IsEnum(TipoMovimentacao)
  @ApiProperty({ enum: TipoMovimentacao })
  tipo!: TipoMovimentacao;

  @IsInt()
  @Min(1)
  @Max(2147483647)
  @ApiProperty({ type: 'integer', minimum: 1, maximum: 2147483647 })
  quantidade!: number;
}