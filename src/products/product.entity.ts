import { Entity, Column, PrimaryColumn } from 'typeorm'; // Импортируем декораторы TypeORM
import { ApiProperty } from '@nestjs/swagger'; // Импортируем декоратор для Swagger

@Entity() // Указываем, что это сущность (таблица в базе данных)
export class Product {
  @PrimaryColumn({ type: 'bigint' }) // Используем longId как первичный ключ, тип bigint для больших чисел
  @ApiProperty({
    description: 'Уникальный идентификатор продукта',
    example: 201000000003,
  }) // Добавляем описание для Swagger
  longId: number;

  @Column({ nullable: true }) // Колонка для родительской категории или бренда
  @ApiProperty({
    description: 'Родительская категория или бренд продукта',
    example: 'Pasta Category',
    required: false,
  })
  parent: string;

  @Column({ nullable: true }) // Колонка для полного названия продукта
  @ApiProperty({
    description: 'Полное название продукта',
    example: 'Penne Rigate Pasta',
    required: false,
  })
  displayName: string;

  @Column({ nullable: true }) // Колонка для страны производства
  @ApiProperty({
    description: 'Страна производства продукта',
    example: 'Italy',
    required: false,
  })
  countryOfOrigin: string;

  @Column({ nullable: true }) // Колонка для бренда
  @ApiProperty({
    description: 'Бренд продукта',
    example: 'Barilla',
    required: false,
  })
  brand: string;

  @Column({ nullable: true }) // Колонка для группы продукции (категории)
  @ApiProperty({
    description: 'Группа продукции (категория)',
    example: 'Pasta',
    required: false,
  })
  productGroup: string;

  @Column('decimal', { nullable: true }) // Колонка для стоимости (цены), тип decimal для точности
  @ApiProperty({ description: 'Цена продукта', example: 3.99, required: false })
  price: number;

  @Column({ nullable: true }) // Колонка для формы пасты
  @ApiProperty({
    description: 'Форма пасты (например, спагетти, пенне и т.д.)',
    example: 'Penne',
    required: false,
  })
  pastaShape: string;

  @Column({ nullable: true }) // Колонка для описания (необязательная, так как отсутствует в данных)
  @ApiProperty({
    description: 'Описание продукта',
    example: 'Итальянская паста высокого качества',
    required: false,
  })
  description?: string;

  @Column({ nullable: true }) // Колонка для количества на складе (необязательная)
  @ApiProperty({
    description: 'Количество продукта на складе',
    example: 150,
    required: false,
  })
  stock?: number;

  @Column({ nullable: true }) // Колонка для URL изображения (необязательная)
  @ApiProperty({
    description: 'URL изображения продукта',
    example: 'http://example.com/product.jpg',
    required: false,
  })
  imageUrl?: string;
}
