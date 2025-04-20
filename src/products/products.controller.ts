import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

// Группируем эндпоинты под тегом "products"
@ApiTags('products')
@ApiBearerAuth('jwt-auth')
@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка всех продуктов' })
  @ApiResponse({
    status: 200,
    description: 'Список продуктов',
    type: [Product],
  })
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':longId')
  @ApiOperation({ summary: 'Получение продукта по longId' })
  @ApiParam({
    name: 'longId',
    description: 'Уникальный идентификатор продукта',
    example: 201000000003,
  })
  @ApiResponse({ status: 200, description: 'Продукт найден', type: Product })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  async findOne(@Param('longId') longId: number): Promise<Product> {
    const product = await this.productsService.findOne(longId);
    if (!product) {
      throw new NotFoundException(`Продукт с longId ${longId} не найден`);
    }
    return product;
  }

  @Post()
  @UsePipes(new ValidationPipe()) // Включаем валидацию
  @ApiOperation({ summary: 'Создание нового продукта' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Продукт создан', type: Product })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Put(':longId')
  @UsePipes(new ValidationPipe()) // Включаем валидацию
  @ApiOperation({ summary: 'Обновление продукта по longId' })
  @ApiParam({
    name: 'longId',
    description: 'Уникальный идентификатор продукта',
    example: 201000000003,
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Продукт обновлен', type: Product })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  async update(
    @Param('longId') longId: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productsService.update(longId, updateProductDto);
    if (!product) {
      throw new NotFoundException(`Продукт с longId ${longId} не найден`);
    }
    return product;
  }

  @Delete(':longId')
  @ApiOperation({ summary: 'Удаление продукта по longId' })
  @ApiParam({
    name: 'longId',
    description: 'Уникальный идентификатор продукта',
    example: 201000000003,
  })
  @ApiResponse({ status: 204, description: 'Продукт удален' })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  async remove(@Param('longId') longId: number): Promise<void> {
    const result = await this.productsService.remove(longId);
    if (!result) {
      throw new NotFoundException(`Продукт с longId ${longId} не найден`);
    }
  }
}
