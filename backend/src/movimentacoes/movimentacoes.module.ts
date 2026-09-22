import { Module } from '@nestjs/common';
import { MovimentacoesService } from './movimentacoes.service.js';
import { MovimentacoesController } from './movimentacoes.controller.js';

@Module({
  controllers: [MovimentacoesController],
  providers: [MovimentacoesService],
})
export class MovimentacoesModule {}