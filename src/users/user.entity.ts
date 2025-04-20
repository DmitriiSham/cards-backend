import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'; // Импортируем декораторы TypeORM
import { ApiProperty } from '@nestjs/swagger'; // Импортируем декоратор для Swagger

@Entity() // Указываем, что это сущность
export class User {
  @PrimaryGeneratedColumn() // Автоинкрементный ID
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: 1,
  }) // Добавляем описание для Swagger
  id: number;

  @Column() // Колонка для email пользователя
  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'user@example.com',
  }) // Описание для email
  email: string;

  @Column() // Колонка для хешированного пароля
  @ApiProperty({ description: 'Пароль пользователя', example: 'password123' }) // Описание для пароля
  password: string;

  @Column({ default: 'user' }) // Колонка для роли (по умолчанию 'user')
  @ApiProperty({
    description: 'Роль пользователя',
    example: 'user',
    enum: ['user', 'admin'],
  }) // Описание для роли
  role: string; // Например, 'user' или 'admin'
}
