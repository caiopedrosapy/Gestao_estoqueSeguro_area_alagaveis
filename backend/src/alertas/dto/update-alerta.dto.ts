import { PartialType } from '@nestjs/swagger';
import { CreateAlertaDto } from './create-alerta.dto.js';

export class UpdateAlertaDto extends PartialType(CreateAlertaDto, {
  skipNullProperties: false,
}) {}
