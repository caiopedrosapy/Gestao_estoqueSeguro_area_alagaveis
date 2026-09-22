import { EstoquesService } from './estoques.service.js';
import { CreateEstoqueDto } from './dto/create-estoque.dto.js';
import { UpdateEstoqueDto } from './dto/update-estoque.dto.js';
export declare class EstoquesController {
    private readonly estoquesService;
    constructor(estoquesService: EstoquesService);
    create(createEstoqueDto: CreateEstoqueDto): import("./entities/estoque.entity.js").Estoque;
    findAll(): import("./entities/estoque.entity.js").Estoque[];
    findOne(id: string): import("./entities/estoque.entity.js").Estoque;
    update(id: string, updateEstoqueDto: UpdateEstoqueDto): import("./entities/estoque.entity.js").Estoque;
    remove(id: string): import("./entities/estoque.entity.js").Estoque;
}
