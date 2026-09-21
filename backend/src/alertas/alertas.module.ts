import { Module } from '@nestjs/common';
import { AlertasService } from './alertas.service.js';
import { AlertasController } from './alertas.controller.js';

@Module({
  controllers: [AlertasController],
  providers: [AlertasService],
})
export class AlertasModule {}
