import { Module } from '@nestjs/common';

import { AlertasController } from './alertas.controller.js';
import { AlertasService } from './alertas.service.js';

@Module({
  controllers: [AlertasController],
  providers: [AlertasService],
})
export class AlertasModule {}
