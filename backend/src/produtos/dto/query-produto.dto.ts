import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
export class QueryProdutoDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(2147483647)
  estoqueId?: number;
  @IsOptional() @IsIn(['true', 'false'])
  prioritario?: 'true' | 'false';
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(2147483647)
  pagina?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100)
  tamanho?: number;
}
