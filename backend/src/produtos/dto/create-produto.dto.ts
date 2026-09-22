import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  categoria!: string;

  @IsInt()
  @Min(0)
  quantidade!: number;

  @IsBoolean()
  @IsOptional()
  prioritario?: boolean;
}