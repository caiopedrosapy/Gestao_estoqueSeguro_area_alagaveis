import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiConflito, ApiEntradaInvalida, ApiRecursoInexistente } from '../common/api-erros.js';
import { AlertaResponseDto } from './dto/alerta-response.dto.js';
import { ProdutosEmRiscoResponseDto } from './dto/produtos-em-risco-response.dto.js';
import { IdPipe } from '../common/id.pipe.js';
import { AlertasService } from './alertas.service.js';
import { CreateAlertaDto } from './dto/create-alerta.dto.js';
import { UpdateAlertaDto } from './dto/update-alerta.dto.js';
import { QueryAlertaDto } from './dto/query-alerta.dto.js';

@ApiTags('Alertas')
@ApiEntradaInvalida()
@Controller('alertas')
export class AlertasController {
  constructor(private readonly service: AlertasService) {}

  @Post()
  @ApiCreatedResponse({ type: AlertaResponseDto })
  @ApiRecursoInexistente('Estoque não encontrado.')
  @ApiConflito('A operação conflita com vínculos do alerta.')
  create(@Body() dto: CreateAlertaDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: [AlertaResponseDto] })
  findAll(@Query() query: QueryAlertaDto) {
    return this.service.findAll(query);
  }

  @Get(':id/produtos-em-risco')
  @ApiOkResponse({ type: ProdutosEmRiscoResponseDto })
  @ApiRecursoInexistente('Alerta não encontrado.')
  produtosEmRisco(@Param('id', IdPipe) id: number) {
    return this.service.produtosEmRisco(id);
  }

  @Get(':id')
  @ApiOkResponse({ type: AlertaResponseDto })
  @ApiRecursoInexistente('Alerta não encontrado.')
  findOne(@Param('id', IdPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: AlertaResponseDto })
  @ApiRecursoInexistente('Alerta ou estoque não encontrado.')
  @ApiConflito('A operação conflita com vínculos do alerta.')
  update(@Param('id', IdPipe) id: number, @Body() dto: UpdateAlertaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Alerta removido.' })
  @ApiRecursoInexistente('Alerta não encontrado.')
  async remove(@Param('id', IdPipe) id: number) {
    await this.service.remove(id);
  }
}
