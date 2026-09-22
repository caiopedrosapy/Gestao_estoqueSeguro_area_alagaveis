import { CreateEstoqueDto } from './dto/create-estoque.dto.js';
import { UpdateEstoqueDto } from './dto/update-estoque.dto.js';
import { Estoque } from './entities/estoque.entity.js';
export declare class EstoquesService {
    private estoques;
    private proximoId;
    create(createEstoqueDto: CreateEstoqueDto): Estoque;
    findAll(): Estoque[];
    findOne(id: number): Estoque;
    update(id: number, updateEstoqueDto: UpdateEstoqueDto): Estoque;
    remove(id: number): Estoque;
}
