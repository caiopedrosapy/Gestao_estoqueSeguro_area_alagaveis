import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { MovimentacoesService } from './movimentacoes.service.js';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto.js';
import { UpdateMovimentacaoDto } from './dto/update-movimentacao.dto.js';

@Controller('movimentacoes')
export class MovimentacoesController {
  constructor(
    private readonly movimentacoesService: MovimentacoesService,
  ) {}

  @Post()
  create(
    @Body()
    createMovimentacaoDto: CreateMovimentacaoDto,
  ) {
    return this.movimentacoesService.create(
      createMovimentacaoDto,
    );
  }

  @Get()
  findAll() {
    return this.movimentacoesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.movimentacoesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateMovimentacaoDto: UpdateMovimentacaoDto,
  ) {
    return this.movimentacoesService.update(
      id,
      updateMovimentacaoDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.movimentacoesService.remove(id);
  }
}