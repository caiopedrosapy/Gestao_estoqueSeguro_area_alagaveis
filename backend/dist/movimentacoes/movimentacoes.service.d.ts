import { CreateMovimentacoeDto } from './dto/create-movimentacoe.dto.js';
import { UpdateMovimentacoeDto } from './dto/update-movimentacoe.dto.js';
export declare class MovimentacoesService {
    create(createMovimentacoeDto: CreateMovimentacoeDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateMovimentacoeDto: UpdateMovimentacoeDto): string;
    remove(id: number): string;
}
