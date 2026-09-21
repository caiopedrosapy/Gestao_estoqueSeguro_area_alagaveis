import { MovimentacoesService } from './movimentacoes.service.js';
import { CreateMovimentacoeDto } from './dto/create-movimentacoe.dto.js';
import { UpdateMovimentacoeDto } from './dto/update-movimentacoe.dto.js';
export declare class MovimentacoesController {
    private readonly movimentacoesService;
    constructor(movimentacoesService: MovimentacoesService);
    create(createMovimentacoeDto: CreateMovimentacoeDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateMovimentacoeDto: UpdateMovimentacoeDto): string;
    remove(id: string): string;
}
