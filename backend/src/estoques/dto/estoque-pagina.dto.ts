import { ApiProperty } from '@nestjs/swagger';
import { MetadadosPaginaDto } from '../../common/paginacao.dto.js';
import { EstoqueResponseDto } from './estoque-response.dto.js';

export class EstoquePaginaDto extends MetadadosPaginaDto {
  @ApiProperty({ type: [EstoqueResponseDto] }) itens!: EstoqueResponseDto[];
}
