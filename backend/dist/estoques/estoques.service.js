var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, NotFoundException, } from '@nestjs/common';
let EstoquesService = class EstoquesService {
    estoques = [];
    proximoId = 1;
    create(createEstoqueDto) {
        const estoque = {
            id: this.proximoId++,
            nome: createEstoqueDto.nome,
            localizacao: createEstoqueDto.localizacao,
            alturaCm: createEstoqueDto.alturaCm,
            seguro: createEstoqueDto.seguro ?? false,
        };
        this.estoques.push(estoque);
        return estoque;
    }
    findAll() {
        return this.estoques;
    }
    findOne(id) {
        const estoque = this.estoques.find((estoque) => estoque.id === id);
        if (!estoque) {
            throw new NotFoundException('Estoque não encontrado');
        }
        return estoque;
    }
    update(id, updateEstoqueDto) {
        const estoque = this.findOne(id);
        Object.assign(estoque, updateEstoqueDto);
        return estoque;
    }
    remove(id) {
        const estoque = this.findOne(id);
        this.estoques = this.estoques.filter((item) => item.id !== id);
        return estoque;
    }
};
EstoquesService = __decorate([
    Injectable()
], EstoquesService);
export { EstoquesService };
//# sourceMappingURL=estoques.service.js.map