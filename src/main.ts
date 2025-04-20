import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Настраиваем глобальную валидацию
  app.useGlobalPipes(new ValidationPipe());

  // Настраиваем Swagger
  const config = new DocumentBuilder()
    .setTitle('Интернет-магазин')
    .setDescription(
      'API для управления пользователями, продуктами и импортом данных',
    )
    .setVersion('1.0')
    .addBearerAuth(
      // <-- вот это добавляет поле авторизации
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Введите JWT токен',
        in: 'header',
      },
      'jwt-auth', // это название схемы, нужно будет использовать ниже
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Доступ по /api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
