import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProdutosModule } from './produtos/produtos.module.js';
import { EstoquesModule } from './estoques/estoques.module.js';
import { MovimentacoesModule } from './movimentacoes/movimentacoes.module.js';
import { AlertasModule } from './alertas/alertas.module.js';

@Module({
  imports: [ProdutosModule, EstoquesModule, MovimentacoesModule, AlertasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
