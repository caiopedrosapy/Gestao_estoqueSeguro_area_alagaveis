import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreateMovimentacaoDto {
  @IsString()
  @IsNotEmpty()
  produto!: string;

  @IsIn(['ENTRADA', 'SAIDA'])
  tipo!: string;

  @IsInt()
  @Min(1)
  quantidade!: number;
}