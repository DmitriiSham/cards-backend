// - @Controller('seed') задает базовый путь /seed для всех эндпоинтов контроллера.
// - @Post('products') создает эндпоинт POST /seed/products.
// - Метод seedProducts вызывает соответствующий метод в SeedService.
// - @HttpCode(HttpStatus.OK) возвращает статус 200 вместо 201 (по умолчанию для POST), так как импорт — это не создание ресурса в традиционном смысле.

import { Controller, Post } from '@nestjs/common'; // Импортируем декораторы
import { SeedService } from './seed.service'; // Импортируем сервис

@Controller('seed') // Указываем префикс маршрута /seed
export class SeedController {
  constructor(private seedService: SeedService) {} // Внедряем сервис

  @Post('products') // Обрабатываем POST-запрос на /seed/products
  seedProducts() {
    return this.seedService.seedProducts(); // Запускаем импорт
  }
}
