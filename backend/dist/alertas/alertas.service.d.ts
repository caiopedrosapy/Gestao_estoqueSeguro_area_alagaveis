import { CreateAlertaDto } from './dto/create-alerta.dto.js';
import { UpdateAlertaDto } from './dto/update-alerta.dto.js';
import { Alerta } from './entities/alerta.entity.js';
export declare class AlertasService {
    private alertas;
    private proximoId;
    create(createAlertaDto: CreateAlertaDto): Alerta;
    findAll(): Alerta[];
    findOne(id: number): Alerta;
    update(id: number, updateAlertaDto: UpdateAlertaDto): Alerta;
    remove(id: number): Alerta;
}
