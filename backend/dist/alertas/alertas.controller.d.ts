import { AlertasService } from './alertas.service.js';
import { CreateAlertaDto } from './dto/create-alerta.dto.js';
import { UpdateAlertaDto } from './dto/update-alerta.dto.js';
export declare class AlertasController {
    private readonly alertasService;
    constructor(alertasService: AlertasService);
    create(createAlertaDto: CreateAlertaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAlertaDto: UpdateAlertaDto): string;
    remove(id: string): string;
}
