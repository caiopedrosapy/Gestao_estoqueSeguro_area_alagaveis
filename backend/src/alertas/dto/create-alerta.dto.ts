import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAlertaDto {
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @IsIn(['BAIXO', 'MEDIO', 'ALTO'])
  nivel!: string;

  @IsString()
  @IsNotEmpty()
  descricao!: string;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}