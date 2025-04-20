import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('seed') // Группируем эндпоинты под тегом "seed"
@Controller('seed')
export class SeedController {
  constructor(private seedService: SeedService) {}

  @Post('products')
  @HttpCode(HttpStatus.OK) // Возвращаем статус 200 вместо 201
  @ApiOperation({ summary: 'Импорт тестовых продуктов в базу данных' })
  @ApiResponse({
    status: 200,
    description: 'Продукты успешно импортированы',
    schema: {
      example: {
        message: '10 продуктов импортировано',
      },
    },
  })
  seedProducts() {
    return this.seedService.seedProducts();
  }
}
