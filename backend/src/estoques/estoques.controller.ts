import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiConflito, ApiEntradaInvalida, ApiRecursoInexistente } from '../common/api-erros.js';
import { IdPipe } from '../common/id.pipe.js';
import { PaginacaoDto } from '../common/paginacao.dto.js';
import { CreateEstoqueDto } from './dto/create-estoque.dto.js';
import { EstoquePaginaDto } from './dto/estoque-pagina.dto.js';
import { EstoqueResponseDto } from './dto/estoque-response.dto.js';
import { UpdateEstoqueDto } from './dto/update-estoque.dto.js';
import { EstoquesService } from './estoques.service.js';

@ApiTags('Estoques')
@ApiEntradaInvalida()
@Controller('estoques')
export class EstoquesController {
  constructor(private readonly service: EstoquesService) {}

  @Post()
  @ApiCreatedResponse({ type: EstoqueResponseDto })
  create(@Body() dto: CreateEstoqueDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: EstoquePaginaDto })
  findAll(@Query() query: PaginacaoDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: EstoqueResponseDto })
  @ApiRecursoInexistente('Estoque não encontrado.')
  findOne(@Param('id', IdPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: EstoqueResponseDto })
  @ApiRecursoInexistente('Estoque não encontrado.')
  update(@Param('id', IdPipe) id: number, @Body() dto: UpdateEstoqueDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Estoque removido.' })
  @ApiRecursoInexistente('Estoque não encontrado.')
  @ApiConflito('Estoque possui produtos ou alertas vinculados.')
  async remove(@Param('id', IdPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
