var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
let MovimentacoesService = class MovimentacoesService {
    create(createMovimentacoeDto) {
        return 'This action adds a new movimentacoe';
    }
    findAll() {
        return `This action returns all movimentacoes`;
    }
    findOne(id) {
        return `This action returns a #${id} movimentacoe`;
    }
    update(id, updateMovimentacoeDto) {
        return `This action updates a #${id} movimentacoe`;
    }
    remove(id) {
        return `This action removes a #${id} movimentacoe`;
    }
};
MovimentacoesService = __decorate([
    Injectable()
], MovimentacoesService);
export { MovimentacoesService };
//# sourceMappingURL=movimentacoes.service.js.map