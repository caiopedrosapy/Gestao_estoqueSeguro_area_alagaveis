import { PartialType } from '@nestjs/swagger';
import { CreateProdutoDto } from './create-produto.dto.js';

export class UpdateProdutoDto extends PartialType(CreateProdutoDto, {
    skipNullProperties: false,
}) {}
