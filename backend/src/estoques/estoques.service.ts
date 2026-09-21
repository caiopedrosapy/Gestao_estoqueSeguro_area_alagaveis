import { Injectable } from '@nestjs/common';
import { CreateEstoqueDto } from './dto/create-estoque.dto.js';
import { UpdateEstoqueDto } from './dto/update-estoque.dto.js';

@Injectable()
export class EstoquesService {
  create(createEstoqueDto: CreateEstoqueDto) {
    return 'This action adds a new estoque';
  }

  findAll() {
    return `This action returns all estoques`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estoque`;
  }

  update(id: number, updateEstoqueDto: UpdateEstoqueDto) {
    return `This action updates a #${id} estoque`;
  }

  remove(id: number) {
    return `This action removes a #${id} estoque`;
  }
}
