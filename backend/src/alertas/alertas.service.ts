import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateAlertaDto } from './dto/create-alerta.dto.js';
import { UpdateAlertaDto } from './dto/update-alerta.dto.js';
import { Alerta } from './entities/alerta.entity.js';

@Injectable()
export class AlertasService {
  private alertas: Alerta[] = [];
  private proximoId = 1;

  create(createAlertaDto: CreateAlertaDto) {
    const alerta: Alerta = {
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

  findOne(id: number) {
    const alerta = this.alertas.find(
      (item) => item.id === id,
    );

    if (!alerta) {
      throw new NotFoundException(
        'Alerta não encontrado',
      );
    }

    return alerta;
  }

  update(
    id: number,
    updateAlertaDto: UpdateAlertaDto,
  ) {
    const alerta = this.findOne(id);

    Object.assign(alerta, updateAlertaDto);

    return alerta;
  }

  remove(id: number) {
    const alerta = this.findOne(id);

    this.alertas = this.alertas.filter(
      (item) => item.id !== id,
    );

    return alerta;
  }
}