import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'; // Импортируем декораторы TypeORM

@Entity() // Указываем, что это сущность
export class User {
  @PrimaryGeneratedColumn() // Автоинкрементный ID
  id: number;

  @Column() // Колонка для email пользователя
  email: string;

  @Column() // Колонка для хешированного пароля
  password: string;

  @Column({ default: 'user' }) // Колонка для роли (по умолчанию 'user')
  role: string; // Например, 'user' или 'admin'
}
