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

import { AlertasService } from './alertas.service.js';
import { CreateAlertaDto } from './dto/create-alerta.dto.js';
import { UpdateAlertaDto } from './dto/update-alerta.dto.js';

@Controller('alertas')
export class AlertasController {
  constructor(
    private readonly alertasService: AlertasService,
  ) {}

  @Post()
  create(@Body() createAlertaDto: CreateAlertaDto) {
    return this.alertasService.create(createAlertaDto);
  }

  @Get()
  findAll() {
    return this.alertasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.alertasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlertaDto: UpdateAlertaDto,
  ) {
    return this.alertasService.update(id, updateAlertaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.alertasService.remove(id);
  }
}
