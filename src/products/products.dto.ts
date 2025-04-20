/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsNumber,
  IsString,
  Min,
  IsOptional,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTO для создания продукта
export class CreateProductDto {
  @ApiProperty({
    example: 201000000003,
    description: 'Уникальный идентификатор продукта',
  })
  @IsNumber({}, { message: 'longId должен быть числом' })
  @Min(1, { message: 'longId должен быть больше 0' })
  longId: number;

  @ApiProperty({
    example: 'ITALIAN PASTADOM',
    description: 'Родительская категория продукта',
  })
  @IsString({ message: 'parent должен быть строкой' })
  @MinLength(1, { message: 'parent не может быть пустым' })
  parent: string;

  @ApiProperty({
    example: 'МИ «ITALIAN PASTADOM», СПАГЕТТИНИ 250 г, 6 кг',
    description: 'Отображаемое название продукта',
  })
  @IsString({ message: 'displayName должен быть строкой' })
  @MinLength(1, { message: 'displayName не может быть пустым' })
  displayName: string;

  @ApiProperty({
    example: 'Италия',
    description: 'Страна происхождения продукта',
  })
  @IsString({ message: 'countryOfOrigin должен быть строкой' })
  @MinLength(1, { message: 'countryOfOrigin не может быть пустым' })
  countryOfOrigin: string;

  @ApiProperty({ example: 'ITALIAN PASTADOM', description: 'Бренд продукта' })
  @IsString({ message: 'brand должен быть строкой' })
  @MinLength(1, { message: 'brand не может быть пустым' })
  brand: string;

  @ApiProperty({ example: 'Соусы и томаты', description: 'Группа продукта' })
  @IsString({ message: 'productGroup должен быть строкой' })
  @MinLength(1, { message: 'productGroup не может быть пустым' })
  productGroup: string;

  @ApiProperty({ example: 141, description: 'Цена продукта' })
  @IsNumber({}, { message: 'price должен быть числом' })
  @Min(0, { message: 'price не может быть отрицательным' })
  price: number;

  @ApiProperty({ example: 'Спагеттини', description: 'Форма пасты' })
  @IsString({ message: 'pastaShape должен быть строкой' })
  @MinLength(1, { message: 'pastaShape не может быть пустым' })
  pastaShape: string;

  @ApiProperty({
    example: 'Описание продукта',
    description: 'Описание продукта (опционально)',
    required: false,
  })
  @IsString({ message: 'description должен быть строкой' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 100,
    description: 'Количество на складе (опционально)',
    required: false,
  })
  @IsNumber({}, { message: 'stock должен быть числом' })
  @Min(0, { message: 'stock не может быть отрицательным' })
  @IsOptional()
  stock?: number;

  @ApiProperty({
    example: 'http://example.com/image.jpg',
    description: 'URL изображения (опционально)',
    required: false,
  })
  @IsString({ message: 'imageUrl должен быть строкой' })
  @IsOptional()
  imageUrl?: string;
}

// DTO для обновления продукта (все поля опциональны)
export class UpdateProductDto {
  @ApiProperty({
    example: 'ITALIAN PASTADOM',
    description: 'Родительская категория продукта (опционально)',
    required: false,
  })
  @IsString({ message: 'parent должен быть строкой' })
  @IsOptional()
  parent?: string;

  @ApiProperty({
    example: 'МИ «ITALIAN PASTADOM», СПАГЕТТИНИ 250 г, 6 кг',
    description: 'Отображаемое название продукта (опционально)',
    required: false,
  })
  @IsString({ message: 'displayName должен быть строкой' })
  @IsOptional()
  displayName?: string;

  @ApiProperty({
    example: 'Италия',
    description: 'Страна происхождения продукта (опционально)',
    required: false,
  })
  @IsString({ message: 'countryOfOrigin должен быть строкой' })
  @IsOptional()
  countryOfOrigin?: string;

  @ApiProperty({
    example: 'ITALIAN PASTADOM',
    description: 'Бренд продукта (опционально)',
    required: false,
  })
  @IsString({ message: 'brand должен быть строкой' })
  @IsOptional()
  brand?: string;

  @ApiProperty({
    example: 'Соусы и томаты',
    description: 'Группа продукта (опционально)',
    required: false,
  })
  @IsString({ message: 'productGroup должен быть строкой' })
  @IsOptional()
  productGroup?: string;

  @ApiProperty({
    example: 141,
    description: 'Цена продукта (опционально)',
    required: false,
  })
  @IsNumber({}, { message: 'price должен быть числом' })
  @Min(0, { message: 'price не может быть отрицательным' })
  @IsOptional()
  price?: number;

  @ApiProperty({
    example: 'Спагеттини',
    description: 'Форма пасты (опционально)',
    required: false,
  })
  @IsString({ message: 'pastaShape должен быть строкой' })
  @IsOptional()
  pastaShape?: string;

  @ApiProperty({
    example: 'Описание продукта',
    description: 'Описание продукта (опционально)',
    required: false,
  })
  @IsString({ message: 'description должен быть строкой' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 100,
    description: 'Количество на складе (опционально)',
    required: false,
  })
  @IsNumber({}, { message: 'stock должен быть числом' })
  @Min(0, { message: 'stock не может быть отрицательным' })
  @IsOptional()
  stock?: number;

  @ApiProperty({
    example: 'http://example.com/image.jpg',
    description: 'URL изображения (опционально)',
    required: false,
  })
  @IsString({ message: 'imageUrl должен быть строкой' })
  @IsOptional()
  imageUrl?: string;
}
