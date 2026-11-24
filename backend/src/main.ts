import 'reflect-metadata';
import { writeFileSync } from 'node:fs';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const gerarContrato = process.argv.includes('--openapi');
  const app = await NestFactory.create(AppModule, gerarContrato ? { logger: false } : {});

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Estoque Seguro')
    .setDescription('API de produtos, locais de estoque, movimentações e alertas.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  if (gerarContrato) {
    try {
      writeFileSync('openapi.json', JSON.stringify(document, null, 2) + '\n');
    } finally {
      await app.close();
    }
    return;
  }

  SwaggerModule.setup('api/docs', app, document, { jsonDocumentUrl: '/api/openapi.json' });
  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
