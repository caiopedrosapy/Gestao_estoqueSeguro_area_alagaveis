import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovimentacoesService } from './movimentacoes.service.js';
import { CreateMovimentacoeDto } from './dto/create-movimentacoe.dto.js';
import { UpdateMovimentacoeDto } from './dto/update-movimentacoe.dto.js';

@Controller('movimentacoes')
export class MovimentacoesController {
  constructor(private readonly movimentacoesService: MovimentacoesService) {}

  @Post()
  create(@Body() createMovimentacoeDto: CreateMovimentacoeDto) {
    return this.movimentacoesService.create(createMovimentacoeDto);
  }

  @Get()
  findAll() {
    return this.movimentacoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimentacoesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovimentacoeDto: UpdateMovimentacoeDto) {
    return this.movimentacoesService.update(+id, updateMovimentacoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimentacoesService.remove(+id);
  }
}
