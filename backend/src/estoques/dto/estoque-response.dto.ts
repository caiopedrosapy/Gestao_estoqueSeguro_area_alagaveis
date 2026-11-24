import { ApiProperty } from '@nestjs/swagger';
import type { Estoque } from '../entities/estoque.entity.js';

export class EstoqueResponseDto {
  @ApiProperty({ type: 'integer' })
  id!: number;
  @ApiProperty()
  nome!: string;
  @ApiProperty()
  localizacao!: string;
  @ApiProperty({ type: 'integer' })
  alturaCm!: number;
  @ApiProperty()
  seguro!: boolean;

  static from(e: Estoque): EstoqueResponseDto {
    return {
      id: e.id,
      nome: e.nome,
      localizacao: e.localizacao,
      alturaCm: e.alturaCm,
      seguro: e.seguro,
    };
  }
}