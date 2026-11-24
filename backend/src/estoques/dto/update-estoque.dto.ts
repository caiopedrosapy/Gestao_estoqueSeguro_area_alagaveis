import { PartialType } from '@nestjs/swagger';
import { CreateEstoqueDto } from './create-estoque.dto.js';

export class UpdateEstoqueDto extends PartialType(CreateEstoqueDto, {
  skipNullProperties: false,
}) {}