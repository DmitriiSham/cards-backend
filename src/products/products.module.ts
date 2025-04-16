// Модуль объединяет сервис (логику) и контроллер (обработку HTTP-запросов).
import { Module } from '@nestjs/common'; // Импортируем декоратор Module
import { TypeOrmModule } from '@nestjs/typeorm'; // Импортируем TypeOrmModule для работы с сущностями
import { ProductsService } from './products.service'; // Импортируем сервис
import { ProductsController } from './products.controller'; // Импортируем контроллер
import { Product } from './product.entity'; // Импортируем сущность Product

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Регистрируем сущность Product для этого модуля
  providers: [ProductsService], // Указываем сервис как провайдер
  controllers: [ProductsController], // Указываем контроллер
})
export class ProductsModule {} // Экспортируем модуль
