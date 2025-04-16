// - Метод seedProducts читает cards_data.json, парсит его и сохраняет данные в таблицу Product.
// - Интерфейс CardData соответствует структуре данных (на основе ваших моков с longId, displayName, и т.д.).
// - Ошибки обрабатываются через BadRequestException, возвращая HTTP 400 с описанием проблемы.
// - Поля description, stock, и imageUrl помечены как необязательные, чтобы учесть возможное их отсутствие.
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import * as fs from 'fs';

// Интерфейс для данных
interface CardData {
  longId: number;
  Parent: string; // В JSON используется 'Parent'
  'Display Name': string; // В JSON используется 'Display Name'
  'Страна производства': string; // В JSON используется 'Страна производства'
  Бренд: string; // В JSON используется 'Бренд'
  'Группа продукции': string; // В JSON используется 'Группа продукции'
  Стоимость: number; // В JSON используется 'Стоимость'
  'Форма пасты': string; // В JSON используется 'Форма пасты'
  description?: string;
  stock?: number;
  imageUrl?: string;
}

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async seedProducts() {
    let data: CardData[];

    try {
      // Чтение и парсинг JSON данных
      const rawData = fs.readFileSync('src/seed/cards_data.json', 'utf8');
      data = JSON.parse(rawData) as CardData[];

      if (!Array.isArray(data)) {
        throw new BadRequestException('cards_data.json must contain an array');
      }

      // Обрабатываем каждый элемент данных
      for (const item of data) {
        const product = this.productRepository.create({
          longId: item.longId,
          parent: item.Parent,
          displayName: item['Display Name'],
          countryOfOrigin: item['Страна производства'],
          brand: item['Бренд'],
          productGroup: item['Группа продукции'],
          price: item.Стоимость,
          pastaShape: item['Форма пасты'],
        });

        // Сохраняем продукт в базу данных
        await this.productRepository.save(product);
      }

      return 'Products seeded successfully';
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred';
      throw new BadRequestException(`Failed to seed products: ${message}`);
    }
  }
}
