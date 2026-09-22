import { PartialType } from '@nestjs/mapped-types';
import { CreateMovimentacaoDto } from './create-movimentacao.dto.js';

export class UpdateMovimentacaoDto extends PartialType(
  CreateMovimentacaoDto,
) {}