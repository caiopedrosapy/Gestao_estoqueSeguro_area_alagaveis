import { AlertasService } from './alertas.service.js';
import { CreateAlertaDto } from './dto/create-alerta.dto.js';
import { UpdateAlertaDto } from './dto/update-alerta.dto.js';
export declare class AlertasController {
    private readonly alertasService;
    constructor(alertasService: AlertasService);
    create(createAlertaDto: CreateAlertaDto): import("./entities/alerta.entity.js").Alerta;
    findAll(): import("./entities/alerta.entity.js").Alerta[];
    findOne(id: number): import("./entities/alerta.entity.js").Alerta;
    update(id: number, updateAlertaDto: UpdateAlertaDto): import("./entities/alerta.entity.js").Alerta;
    remove(id: number): import("./entities/alerta.entity.js").Alerta;
}
