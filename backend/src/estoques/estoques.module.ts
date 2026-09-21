import { Module } from '@nestjs/common';
import { EstoquesService } from './estoques.service.js';
import { EstoquesController } from './estoques.controller.js';

@Module({
  controllers: [EstoquesController],
  providers: [EstoquesService],
})
export class EstoquesModule {}
