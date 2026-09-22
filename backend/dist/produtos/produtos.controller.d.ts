import { ProdutosService } from './produtos.service.js';
import { CreateProdutoDto } from './dto/create-produto.dto.js';
import { UpdateProdutoDto } from './dto/update-produto.dto.js';
export declare class ProdutosController {
    private readonly produtosService;
    constructor(produtosService: ProdutosService);
    create(createProdutoDto: CreateProdutoDto): import("./entities/produto.entity.js").Produto;
    findAll(): import("./entities/produto.entity.js").Produto[];
    findOne(id: number): import("./entities/produto.entity.js").Produto;
    update(id: number, updateProdutoDto: UpdateProdutoDto): import("./entities/produto.entity.js").Produto;
    remove(id: number): import("./entities/produto.entity.js").Produto;
}
