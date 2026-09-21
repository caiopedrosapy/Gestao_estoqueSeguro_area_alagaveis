import { CreateProdutoDto } from './dto/create-produto.dto.js';
import { UpdateProdutoDto } from './dto/update-produto.dto.js';
export declare class ProdutosService {
    create(createProdutoDto: CreateProdutoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateProdutoDto: UpdateProdutoDto): string;
    remove(id: number): string;
}
