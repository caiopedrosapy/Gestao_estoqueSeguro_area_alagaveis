import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateProdutoDto } from './dto/create-produto.dto.js';
import { UpdateProdutoDto } from './dto/update-produto.dto.js';
import { Produto } from './entities/produto.entity.js';

@Injectable()
export class ProdutosService {
  private produtos: Produto[] = [];
  private proximoId = 1;

  create(createProdutoDto: CreateProdutoDto) {
    const produto: Produto = {
      id: this.proximoId++,
      nome: createProdutoDto.nome,
      categoria: createProdutoDto.categoria,
      quantidade: createProdutoDto.quantidade,
      prioritario: createProdutoDto.prioritario ?? false,
    };

    this.produtos.push(produto);

    return produto;
  }

  findAll() {
    return this.produtos;
  }

  findOne(id: number) {
    const produto = this.produtos.find(
      (produto) => produto.id === id,
    );

    if (!produto) {
      throw new NotFoundException(
        'Produto não encontrado',
      );
    }

    return produto;
  }

  update(
    id: number,
    updateProdutoDto: UpdateProdutoDto,
  ) {
    const produto = this.findOne(id);

    Object.assign(produto, updateProdutoDto);

    return produto;
  }

  remove(id: number) {
    const produto = this.findOne(id);

    this.produtos = this.produtos.filter(
      (item) => item.id !== id,
    );

    return produto;
  }
}