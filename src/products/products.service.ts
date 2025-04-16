// Сервис отвечает за логику работы с продуктами (CRUD).
import { Injectable, NotFoundException } from '@nestjs/common'; // Импортируем декоратор Injectable
import { InjectRepository } from '@nestjs/typeorm'; // Импортируем декоратор для репозитория
import { Repository } from 'typeorm'; // Импортируем тип Repository
import { Product } from './product.entity'; // Импортируем обновленную сущность Product

@Injectable() // Указываем, что это сервис
export class ProductsService {
  constructor(
    @InjectRepository(Product) // Внедряем репозиторий для Product
    private productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    // Метод для получения всех продуктов
    return this.productRepository.find(); // Возвращаем все записи из таблицы
  }
  async findOne(longId: number): Promise<Product> {
    // Изменяем на Promise<Product>
    const product = await this.productRepository.findOneBy({ longId }); // Ищем продукт
    if (!product) {
      // Проверяем, существует ли продукт
      throw new NotFoundException(`Product with longId ${longId} not found`); // Бросаем ошибку
    }
    return product; // Возвращаем продукт
  }

  create(product: Partial<Product>): Promise<Product> {
    // Метод для создания продукта
    const newProduct = this.productRepository.create(product); // Создаем новую запись
    return this.productRepository.save(newProduct); // Сохраняем в БД
  }

  async update(longId: number, product: Partial<Product>): Promise<Product> {
    // Метод для обновления продукта
    await this.productRepository.update({ longId }, product); // Обновляем запись по longId
    return this.findOne(longId); // Возвращаем обновленный продукт
  }

  async remove(longId: number): Promise<void> {
    // Метод для удаления продукта
    await this.productRepository.delete({ longId }); // Удаляем запись по longId
  }
}
