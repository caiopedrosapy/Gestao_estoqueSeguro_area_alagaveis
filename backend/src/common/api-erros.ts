import { ApiBadRequestResponse, ApiConflictResponse, ApiNotFoundResponse } from '@nestjs/swagger';

export const ApiEntradaInvalida = () => ApiBadRequestResponse({
  description: 'Entrada inválida.',
  example: { statusCode: 400, error: 'Bad Request', message: ['Parâmetro ou corpo inválido.'] },
});

export const ApiRecursoInexistente = (message: string) => ApiNotFoundResponse({
  description: message,
  example: { statusCode: 404, error: 'Not Found', message },
});

export const ApiConflito = (message: string) => ApiConflictResponse({
  description: message,
  example: { statusCode: 409, error: 'Conflict', message },
});
