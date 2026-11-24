import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';

export class QueryAlertaDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(2147483647)
  @ApiPropertyOptional({ type: 'integer', minimum: 1, maximum: 2147483647 })
  estoqueId?: number;

  @IsOptional()
  @IsIn(['true', 'false'])
  @ApiPropertyOptional({ enum: ['true', 'false'] })
  ativo?: 'true' | 'false';
}
