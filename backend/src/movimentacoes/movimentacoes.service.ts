import { Injectable } from '@nestjs/common';
import { CreateMovimentacoeDto } from './dto/create-movimentacoe.dto.js';
import { UpdateMovimentacoeDto } from './dto/update-movimentacoe.dto.js';

@Injectable()
export class MovimentacoesService {
  create(createMovimentacoeDto: CreateMovimentacoeDto) {
    return 'This action adds a new movimentacoe';
  }

  findAll() {
    return `This action returns all movimentacoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movimentacoe`;
  }

  update(id: number, updateMovimentacoeDto: UpdateMovimentacoeDto) {
    return `This action updates a #${id} movimentacoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} movimentacoe`;
  }
}
