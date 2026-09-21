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
import { EstoquesService } from './estoques.service.js';
import { CreateEstoqueDto } from './dto/create-estoque.dto.js';
import { UpdateEstoqueDto } from './dto/update-estoque.dto.js';
let EstoquesController = class EstoquesController {
    estoquesService;
    constructor(estoquesService) {
        this.estoquesService = estoquesService;
    }
    create(createEstoqueDto) {
        return this.estoquesService.create(createEstoqueDto);
    }
    findAll() {
        return this.estoquesService.findAll();
    }
    findOne(id) {
        return this.estoquesService.findOne(+id);
    }
    update(id, updateEstoqueDto) {
        return this.estoquesService.update(+id, updateEstoqueDto);
    }
    remove(id) {
        return this.estoquesService.remove(+id);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateEstoqueDto]),
    __metadata("design:returntype", void 0)
], EstoquesController.prototype, "create", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EstoquesController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EstoquesController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateEstoqueDto]),
    __metadata("design:returntype", void 0)
], EstoquesController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EstoquesController.prototype, "remove", null);
EstoquesController = __decorate([
    Controller('estoques'),
    __metadata("design:paramtypes", [EstoquesService])
], EstoquesController);
export { EstoquesController };
//# sourceMappingURL=estoques.controller.js.map