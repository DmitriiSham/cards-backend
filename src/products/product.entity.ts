import { Entity, Column, PrimaryColumn } from 'typeorm'; // Импортируем декораторы TypeORM

@Entity() // Указываем, что это сущность (таблица в базе данных)
export class Product {
  @PrimaryColumn({ type: 'bigint' }) // Используем longId как первичный ключ, тип bigint для больших чисел
  longId: number;

  @Column({ nullable: true }) // Колонка для родительской категории или бренда
  parent: string;

  @Column({ nullable: true }) // Колонка для полного названия продукта
  displayName: string;

  @Column({ nullable: true }) // Колонка для страны производства
  countryOfOrigin: string;

  @Column({ nullable: true }) // Колонка для бренда
  brand: string;

  @Column({ nullable: true }) // Колонка для группы продукции (категории)
  productGroup: string;

  @Column('decimal', { nullable: true }) // Колонка для стоимости (цены), тип decimal для точности
  price: number;

  @Column({ nullable: true }) // Колонка для формы пасты
  pastaShape: string;

  @Column({ nullable: true }) // Колонка для описания (необязательная, так как отсутствует в данных)
  description?: string;

  @Column({ nullable: true }) // Колонка для количества на складе (необязательная)
  stock?: number;

  @Column({ nullable: true }) // Колонка для URL изображения (необязательная)
  imageUrl?: string;
}
