// - TypeOrmModule.forFeature([Product]) предоставляет доступ к репозиторию Product.
// - Модуль связывает контроллер и сервис.

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Импортируем TypeOrmModule
import { SeedController } from './seed.controller'; // Импортируем контроллер
import { SeedService } from './seed.service'; // Импортируем сервис
import { Product } from '../products/product.entity'; // Импортируем сущность Product

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]), // Регистрируем репозиторий для Product
  ],
  controllers: [SeedController], // Регистрируем контроллер
  providers: [SeedService], // Регистрируем сервис
})
export class SeedModule {}
