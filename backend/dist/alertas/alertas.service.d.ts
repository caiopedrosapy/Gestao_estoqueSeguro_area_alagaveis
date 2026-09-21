import { CreateAlertaDto } from './dto/create-alerta.dto.js';
import { UpdateAlertaDto } from './dto/update-alerta.dto.js';
export declare class AlertasService {
    create(createAlertaDto: CreateAlertaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAlertaDto: UpdateAlertaDto): string;
    remove(id: number): string;
}
