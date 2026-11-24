import { ApiProperty } from '@nestjs/swagger';
import { ProdutoResponseDto } from '../../produtos/dto/produto-response.dto.js';

export class ProdutosEmRiscoResponseDto {
  @ApiProperty({ type: 'integer' })
  alertaId!: number;
  @ApiProperty({ type: 'integer' })
  estoqueId!: number;
  @ApiProperty()
  criterioAplicado!: string;
  @ApiProperty({ type: [ProdutoResponseDto] })
  produtos!: ProdutoResponseDto[];
}
