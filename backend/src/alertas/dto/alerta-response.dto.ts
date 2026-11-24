import { ApiProperty } from '@nestjs/swagger';
import type { Alerta } from '../entities/alerta.entity.js';
import { NivelAlerta } from '../entities/alerta.entity.js';

export class AlertaResponseDto {
  @ApiProperty({ type: 'integer' })
  id!: number;
  @ApiProperty({ type: 'integer' })
  estoqueId!: number;
  @ApiProperty()
  titulo!: string;
  @ApiProperty({ enum: NivelAlerta })
  nivel!: NivelAlerta;
  @ApiProperty()
  descricao!: string;
  @ApiProperty()
  ativo!: boolean;
  @ApiProperty({ format: 'date-time' })
  criadoEm!: string;
  @ApiProperty({ enum: ['MANUAL'] })
  origem!: 'MANUAL';

  static from(a: Alerta): AlertaResponseDto {
    return {
      id: a.id,
      estoqueId: a.estoqueId,
      titulo: a.titulo,
      nivel: a.nivel,
      descricao: a.descricao,
      ativo: a.ativo,
      criadoEm: a.criadoEm.toISOString(),
      origem: 'MANUAL',
    };
  }
}
