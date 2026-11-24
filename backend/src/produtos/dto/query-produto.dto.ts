import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { PaginacaoDto } from '../../common/paginacao.dto.js';

export class QueryProdutoDto extends PaginacaoDto {
  @ApiPropertyOptional({ type: 'integer', minimum: 1, maximum: 2147483647 })
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(2147483647)
  estoqueId?: number;
  @ApiPropertyOptional({ enum: ['true', 'false'] })
  @IsOptional() @IsIn(['true', 'false'])
  prioritario?: 'true' | 'false';
}
