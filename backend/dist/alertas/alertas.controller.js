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
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, } from '@nestjs/common';
import { AlertasService } from './alertas.service.js';
import { CreateAlertaDto } from './dto/create-alerta.dto.js';
import { UpdateAlertaDto } from './dto/update-alerta.dto.js';
let AlertasController = class AlertasController {
    alertasService;
    constructor(alertasService) {
        this.alertasService = alertasService;
    }
    create(createAlertaDto) {
        return this.alertasService.create(createAlertaDto);
    }
    findAll() {
        return this.alertasService.findAll();
    }
    findOne(id) {
        return this.alertasService.findOne(id);
    }
    update(id, updateAlertaDto) {
        return this.alertasService.update(id, updateAlertaDto);
    }
    remove(id) {
        return this.alertasService.remove(id);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAlertaDto]),
    __metadata("design:returntype", void 0)
], AlertasController.prototype, "create", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AlertasController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AlertasController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateAlertaDto]),
    __metadata("design:returntype", void 0)
], AlertasController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AlertasController.prototype, "remove", null);
AlertasController = __decorate([
    Controller('alertas'),
    __metadata("design:paramtypes", [AlertasService])
], AlertasController);
export { AlertasController };
//# sourceMappingURL=alertas.controller.js.map