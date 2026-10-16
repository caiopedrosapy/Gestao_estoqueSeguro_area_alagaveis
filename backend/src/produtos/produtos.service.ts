import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { Estoque } from '../estoques/entities/estoque.entity.js';
import { CreateProdutoDto } from './dto/create-produto.dto.js';
import { QueryProdutoDto } from './dto/query-produto.dto.js';
import { UpdateProdutoDto } from './dto/update-produto.dto.js';
import { Produto } from './entities/produto.entity.js';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(createProdutoDto: CreateProdutoDto) {
    const estoque = await this.dataSource
      .getRepository(Estoque)
      .findOne({
        where: { id: createProdutoDto.estoqueId },
      });

    if (!estoque) {
      throw new NotFoundException('Estoque não encontrado');
    }

    const produto = this.dataSource
      .getRepository(Produto)
      .create({
        nome: createProdutoDto.nome,
        categoria: createProdutoDto.categoria,
        estoqueId: createProdutoDto.estoqueId,
        quantidade: 0,
        prioritario: createProdutoDto.prioritario ?? false,
      });

    return this.dataSource.getRepository(Produto).save(produto);
  }

  async findAll(query: QueryProdutoDto) {
    const repository = this.dataSource.getRepository(Produto);
    const queryBuilder = repository
      .createQueryBuilder('produto')
      .orderBy('produto.id', 'ASC');

    if (query.estoqueId !== undefined) {
      queryBuilder.andWhere('produto.estoqueId = :estoqueId', {
        estoqueId: query.estoqueId,
      });
    }

    if (query.prioritario !== undefined) {
      queryBuilder.andWhere('produto.prioritario = :prioritario', {
        prioritario: query.prioritario === 'true',
      });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: number) {
    const produto = await this.dataSource
      .getRepository(Produto)
      .findOne({ where: { id } });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const repository = this.dataSource.getRepository(Produto);
    const produto = await this.findOne(id);

    if (updateProdutoDto.estoqueId !== undefined) {
      const movimentacoes = await this.dataSource
        .getRepository('movimentacoes')
        .createQueryBuilder('movimentacao')
        .where('movimentacao.produtoId = :id', { id })
        .getCount();

      if (movimentacoes > 0) {
        throw new BadRequestException(
          'Não é possível alterar o estoque de um produto com movimentações',
        );
      }

      const estoque = await this.dataSource
        .getRepository(Estoque)
        .findOne({
          where: { id: updateProdutoDto.estoqueId },
        });

      if (!estoque) {
        throw new NotFoundException('Estoque não encontrado');
      }
    }

    Object.assign(produto, updateProdutoDto);

    return repository.save(produto);
  }

  async remove(id: number) {
    const repository = this.dataSource.getRepository(Produto);
    const produto = await this.findOne(id);

    if (produto.quantidade !== 0) {
      throw new BadRequestException(
        'Só é possível excluir produtos com quantidade zero',
      );
    }

    await repository.remove(produto);

    return produto;
  }
}