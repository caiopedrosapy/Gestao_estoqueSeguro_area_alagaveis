var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, NotFoundException, } from '@nestjs/common';
let AlertasService = class AlertasService {
    alertas = [];
    proximoId = 1;
    create(createAlertaDto) {
        const alerta = {
            id: this.proximoId++,
            titulo: createAlertaDto.titulo,
            nivel: createAlertaDto.nivel,
            descricao: createAlertaDto.descricao,
            ativo: createAlertaDto.ativo ?? true,
        };
        this.alertas.push(alerta);
        return alerta;
    }
    findAll() {
        return this.alertas;
    }
    findOne(id) {
        const alerta = this.alertas.find((item) => item.id === id);
        if (!alerta) {
            throw new NotFoundException('Alerta não encontrado');
        }
        return alerta;
    }
    update(id, updateAlertaDto) {
        const alerta = this.findOne(id);
        Object.assign(alerta, updateAlertaDto);
        return alerta;
    }
    remove(id) {
        const alerta = this.findOne(id);
        this.alertas = this.alertas.filter((item) => item.id !== id);
        return alerta;
    }
};
AlertasService = __decorate([
    Injectable()
], AlertasService);
export { AlertasService };
//# sourceMappingURL=alertas.service.js.map