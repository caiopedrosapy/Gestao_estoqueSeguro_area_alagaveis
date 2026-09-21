import { PartialType } from '@nestjs/mapped-types';
import { CreateMovimentacoeDto } from './create-movimentacoe.dto.js';

export class UpdateMovimentacoeDto extends PartialType(CreateMovimentacoeDto) {}
