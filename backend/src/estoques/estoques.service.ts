import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateEstoqueDto } from './dto/create-estoque.dto.js';
import { UpdateEstoqueDto } from './dto/update-estoque.dto.js';
import { Estoque } from './entities/estoque.entity.js';

@Injectable()
export class EstoquesService {
  private estoques: Estoque[] = [];
  private proximoId = 1;

  create(createEstoqueDto: CreateEstoqueDto) {
    const estoque: Estoque = {
      id: this.proximoId++,
      nome: createEstoqueDto.nome,
      localizacao: createEstoqueDto.localizacao,
      alturaCm: createEstoqueDto.alturaCm,
      seguro: createEstoqueDto.seguro ?? false,
    };

    this.estoques.push(estoque);

    return estoque;
  }

  findAll() {
    return this.estoques;
  }

  findOne(id: number) {
    const estoque = this.estoques.find(
      (estoque) => estoque.id === id,
    );

    if (!estoque) {
      throw new NotFoundException(
        'Estoque não encontrado',
      );
    }

    return estoque;
  }

  update(
    id: number,
    updateEstoqueDto: UpdateEstoqueDto,
  ) {
    const estoque = this.findOne(id);

    Object.assign(estoque, updateEstoqueDto);

    return estoque;
  }

  remove(id: number) {
    const estoque = this.findOne(id);

    this.estoques = this.estoques.filter(
      (item) => item.id !== id,
    );

    return estoque;
  }
}