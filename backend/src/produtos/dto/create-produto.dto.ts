import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateProdutoDto {
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  @ApiProperty({ maxLength: 120 })
  nome!: string;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  @ApiProperty({ maxLength: 80 })
  categoria!: string;

  @IsInt()
  @Min(1)
  @Max(2147483647)
  @ApiProperty({ type: 'integer', minimum: 1, maximum: 2147483647 })
  estoqueId!: number;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsBoolean()
  @ApiPropertyOptional()
  prioritario?: boolean;
}