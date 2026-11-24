import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { TipoMovimentacao } from '../entities/movimentacao.entity.js';

export class QueryMovimentacaoDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(2147483647)
  @ApiPropertyOptional({ type: 'integer', minimum: 1, maximum: 2147483647 })
  produtoId?: number;

  @IsOptional()
  @IsEnum(TipoMovimentacao)
  @ApiPropertyOptional({ enum: TipoMovimentacao })
  tipo?: TipoMovimentacao;
}