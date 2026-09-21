var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovimentacoesService } from './movimentacoes.service.js';
import { CreateMovimentacoeDto } from './dto/create-movimentacoe.dto.js';
import { UpdateMovimentacoeDto } from './dto/update-movimentacoe.dto.js';
let MovimentacoesController = class MovimentacoesController {
    movimentacoesService;
    constructor(movimentacoesService) {
        this.movimentacoesService = movimentacoesService;
    }
    create(createMovimentacoeDto) {
        return this.movimentacoesService.create(createMovimentacoeDto);
    }
    findAll() {
        return this.movimentacoesService.findAll();
    }
    findOne(id) {
        return this.movimentacoesService.findOne(+id);
    }
    update(id, updateMovimentacoeDto) {
        return this.movimentacoesService.update(+id, updateMovimentacoeDto);
    }
    remove(id) {
        return this.movimentacoesService.remove(+id);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateMovimentacoeDto]),
    __metadata("design:returntype", void 0)
], MovimentacoesController.prototype, "create", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MovimentacoesController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MovimentacoesController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateMovimentacoeDto]),
    __metadata("design:returntype", void 0)
], MovimentacoesController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MovimentacoesController.prototype, "remove", null);
MovimentacoesController = __decorate([
    Controller('movimentacoes'),
    __metadata("design:paramtypes", [MovimentacoesService])
], MovimentacoesController);
export { MovimentacoesController };
//# sourceMappingURL=movimentacoes.controller.js.map