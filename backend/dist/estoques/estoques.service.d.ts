import { CreateEstoqueDto } from './dto/create-estoque.dto.js';
import { UpdateEstoqueDto } from './dto/update-estoque.dto.js';
export declare class EstoquesService {
    create(createEstoqueDto: CreateEstoqueDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEstoqueDto: UpdateEstoqueDto): string;
    remove(id: number): string;
}
