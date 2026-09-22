import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto.js';
import { UpdateMovimentacaoDto } from './dto/update-movimentacao.dto.js';
import { Movimentacao } from './entities/movimentacao.entity.js';

@Injectable()
export class MovimentacoesService {
  private movimentacoes: Movimentacao[] = [];
  private proximoId = 1;

  create(createMovimentacaoDto: CreateMovimentacaoDto) {
    const movimentacao: Movimentacao = {
      id: this.proximoId++,
      produto: createMovimentacaoDto.produto,
      tipo: createMovimentacaoDto.tipo,
      quantidade: createMovimentacaoDto.quantidade,
    };

    this.movimentacoes.push(movimentacao);

    return movimentacao;
  }

  findAll() {
    return this.movimentacoes;
  }

  findOne(id: number) {
    const movimentacao = this.movimentacoes.find(
      (movimentacao) => movimentacao.id === id,
    );

    if (!movimentacao) {
      throw new NotFoundException(
        'Movimentação não encontrada',
      );
    }

    return movimentacao;
  }

  update(
    id: number,
    updateMovimentacaoDto: UpdateMovimentacaoDto,
  ) {
    const movimentacao = this.findOne(id);

    Object.assign(
      movimentacao,
      updateMovimentacaoDto,
    );

    return movimentacao;
  }

  remove(id: number) {
    const movimentacao = this.findOne(id);

    this.movimentacoes =
      this.movimentacoes.filter(
        (item) => item.id !== id,
      );

    return movimentacao;
  }
}