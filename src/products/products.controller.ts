// Файл: src/products/products.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common'; // Импортируем декораторы
import { ProductsService } from './products.service'; // Импортируем сервис
import { Product } from './product.entity'; // Импортируем сущность

@Controller('products') // Указываем префикс маршрута /products
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {} // Внедряем сервис

  @Get() // Обрабатываем GET-запрос на /products
  findAll(): Promise<Product[]> {
    return this.productsService.findAll(); // Вызываем метод сервиса
  }

  @Get(':longId') // Обрабатываем GET-запрос на /products/:longId
  findOne(@Param('longId') longId: number): Promise<Product> {
    return this.productsService.findOne(longId); // Вызываем метод сервиса
  }

  @Post() // Обрабатываем POST-запрос на /products
  create(@Body() product: Partial<Product>): Promise<Product> {
    return this.productsService.create(product); // Вызываем метод сервиса
  }

  @Put(':longId') // Обрабатываем PUT-запрос на /products/:longId
  update(
    @Param('longId') longId: number,
    @Body() product: Partial<Product>,
  ): Promise<Product> {
    return this.productsService.update(longId, product); // Вызываем метод сервиса
  }

  @Delete(':longId') // Обрабатываем DELETE-запрос на /products/:longId
  remove(@Param('longId') longId: number): Promise<void> {
    return this.productsService.remove(longId); // Вызываем метод сервиса
  }
}
