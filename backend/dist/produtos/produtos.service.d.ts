import { CreateProdutoDto } from './dto/create-produto.dto.js';
import { UpdateProdutoDto } from './dto/update-produto.dto.js';
import { Produto } from './entities/produto.entity.js';
export declare class ProdutosService {
    private produtos;
    private proximoId;
    create(createProdutoDto: CreateProdutoDto): Produto;
    findAll(): Produto[];
    findOne(id: number): Produto;
    update(id: number, updateProdutoDto: UpdateProdutoDto): Produto;
    remove(id: number): Produto;
}
