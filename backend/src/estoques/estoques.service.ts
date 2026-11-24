import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { databaseError } from '../common/database-error.js';
import type { PaginacaoDto } from '../common/paginacao.dto.js';
import { Estoque } from './entities/estoque.entity.js';
import { CreateEstoqueDto } from './dto/create-estoque.dto.js';
import { UpdateEstoqueDto } from './dto/update-estoque.dto.js';
import { EstoqueResponseDto } from './dto/estoque-response.dto.js';
import type { EstoquePaginaDto } from './dto/estoque-pagina.dto.js';

@Injectable()
export class EstoquesService {
  constructor(
    @InjectRepository(Estoque)
    private readonly repo: Repository<Estoque>,
  ) {}

  async create(dto: CreateEstoqueDto) {
    const estoque = await this.repo.save(
      this.repo.create({
        nome: dto.nome,
        localizacao: dto.localizacao,
        alturaCm: dto.alturaCm,
        seguro: dto.seguro ?? false,
      }),
    );
    return EstoqueResponseDto.from(estoque);
  }

  async findAll({ pagina, tamanho }: PaginacaoDto): Promise<EstoquePaginaDto> {
    const [rows, total] = await this.repo.findAndCount({
      order: { id: 'ASC' },
      skip: (pagina - 1) * tamanho,
      take: tamanho,
    });
    return { itens: rows.map((estoque) => EstoqueResponseDto.from(estoque)), total, pagina, tamanho };
  }

  async findOne(id: number) {
    const estoque = await this.repo.findOneBy({ id });
    if (!estoque) throw new NotFoundException('Estoque não encontrado.');
    return EstoqueResponseDto.from(estoque);
  }

  async update(id: number, dto: UpdateEstoqueDto) {
    await this.findOne(id);
    if (Object.keys(dto).length > 0) {
      await this.repo.update(id, dto);
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    try {
      const resultado = await this.repo.delete(id);
      if (!resultado.affected) throw new NotFoundException('Estoque não encontrado.');
    } catch (error) {
      databaseError(error);
    }
  }
}
