import { EstoquesService } from './estoques.service.js';
import { CreateEstoqueDto } from './dto/create-estoque.dto.js';
import { UpdateEstoqueDto } from './dto/update-estoque.dto.js';
export declare class EstoquesController {
    private readonly estoquesService;
    constructor(estoquesService: EstoquesService);
    create(createEstoqueDto: CreateEstoqueDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEstoqueDto: UpdateEstoqueDto): string;
    remove(id: string): string;
}
