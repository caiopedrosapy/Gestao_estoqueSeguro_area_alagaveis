import { ProdutosService } from './produtos.service.js';
import { CreateProdutoDto } from './dto/create-produto.dto.js';
import { UpdateProdutoDto } from './dto/update-produto.dto.js';
export declare class ProdutosController {
    private readonly produtosService;
    constructor(produtosService: ProdutosService);
    create(createProdutoDto: CreateProdutoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateProdutoDto: UpdateProdutoDto): string;
    remove(id: string): string;
}
