import { ApiProperty } from '@nestjs/swagger';
import { MetadadosPaginaDto } from '../../common/paginacao.dto.js';
import type { Produto } from '../entities/produto.entity.js';
import { ProdutoResponseDto } from './produto-response.dto.js';

class EstoqueProdutoDto {
  @ApiProperty({ type: 'integer' }) id!: number;
  @ApiProperty() nome!: string;
  @ApiProperty() seguro!: boolean;
}

class CategoriaProdutoDto {
  @ApiProperty({ type: 'integer' }) id!: number;
  @ApiProperty({ format: 'uuid' }) publicId!: string;
  @ApiProperty() nome!: string;
}

export class ProdutoComRelacoesDto extends ProdutoResponseDto {
  @ApiProperty({ type: EstoqueProdutoDto }) estoque!: EstoqueProdutoDto;
  @ApiProperty({ type: [CategoriaProdutoDto] }) categorias!: CategoriaProdutoDto[];

  static override from(p: Produto): ProdutoComRelacoesDto {
    return Object.assign(new ProdutoComRelacoesDto(), ProdutoResponseDto.from(p), {
      estoque: { id: p.estoque.id, nome: p.estoque.nome, seguro: p.estoque.seguro },
      categorias: p.categorias.map(({ id, publicId, nome }) => ({ id, publicId, nome })),
    });
  }
}

export class ProdutoPaginaDto extends MetadadosPaginaDto {
  @ApiProperty({ type: [ProdutoComRelacoesDto] }) itens!: ProdutoComRelacoesDto[];
}
