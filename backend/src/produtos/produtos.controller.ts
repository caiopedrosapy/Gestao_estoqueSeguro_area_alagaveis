import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiConflito, ApiEntradaInvalida, ApiRecursoInexistente } from '../common/api-erros.js';
import { IdPipe } from '../common/id.pipe.js';
import { CreateProdutoDto } from './dto/create-produto.dto.js';
import { ProdutoPaginaDto } from './dto/produto-pagina.dto.js';
import { ProdutoResponseDto } from './dto/produto-response.dto.js';
import { QueryProdutoDto } from './dto/query-produto.dto.js';
import { UpdateProdutoDto } from './dto/update-produto.dto.js';
import { ProdutosService } from './produtos.service.js';

@ApiTags('Produtos')
@ApiEntradaInvalida()
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly service: ProdutosService) {}

  @Post()
  @ApiCreatedResponse({ type: ProdutoResponseDto })
  @ApiRecursoInexistente('Estoque não encontrado.')
  @ApiConflito('A operação conflita com vínculos do produto.')
  create(@Body() dto: CreateProdutoDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: ProdutoPaginaDto })
  findAll(@Query() query: QueryProdutoDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: ProdutoResponseDto })
  @ApiRecursoInexistente('Produto não encontrado.')
  findOne(@Param('id', IdPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProdutoResponseDto })
  @ApiRecursoInexistente('Produto ou estoque não encontrado.')
  @ApiConflito('Produto com movimentação não pode trocar de local.')
  update(@Param('id', IdPipe) id: number, @Body() dto: UpdateProdutoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Produto removido.' })
  @ApiRecursoInexistente('Produto não encontrado.')
  @ApiConflito('Produto possui saldo ou histórico de movimentações.')
  async remove(@Param('id', IdPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
