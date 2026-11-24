import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiConflito, ApiEntradaInvalida, ApiRecursoInexistente } from '../common/api-erros.js';
import { MovimentacaoResponseDto } from './dto/movimentacao-response.dto.js';
import { IdPipe } from '../common/id.pipe.js';
import { MovimentacoesService } from './movimentacoes.service.js';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto.js';
import { QueryMovimentacaoDto } from './dto/query-movimentacao.dto.js';

@ApiTags('Movimentações')
@ApiEntradaInvalida()
@Controller('movimentacoes')
export class MovimentacoesController {
  constructor(private readonly service: MovimentacoesService) {}

  @Post()
  @ApiCreatedResponse({ type: MovimentacaoResponseDto })
  @ApiRecursoInexistente('Produto não encontrado.')
  @ApiConflito('Saldo insuficiente ou quantidade acima do limite.')
  create(@Body() dto: CreateMovimentacaoDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: [MovimentacaoResponseDto] })
  findAll(@Query() query: QueryMovimentacaoDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: MovimentacaoResponseDto })
  @ApiRecursoInexistente('Movimentação não encontrada.')
  findOne(@Param('id', IdPipe) id: number) {
    return this.service.findOne(id);
  }
}