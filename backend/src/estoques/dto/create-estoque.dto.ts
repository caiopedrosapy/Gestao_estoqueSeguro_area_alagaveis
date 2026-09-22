import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateEstoqueDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  localizacao!: string;

  @IsInt()
  @Min(0)
  alturaCm!: number;

  @IsBoolean()
  @IsOptional()
  seguro?: boolean;
}
