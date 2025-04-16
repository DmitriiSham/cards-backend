// Файл: src/users/users.service.ts
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common'; // Импортируем декораторы и исключения
import { InjectRepository } from '@nestjs/typeorm'; // Импортируем декоратор для репозитория
import { Repository } from 'typeorm'; // Импортируем тип Repository
import { User } from './user.entity'; // Импортируем сущность User
import * as bcrypt from 'bcrypt'; // Импортируем bcrypt

@Injectable() // Указываем, что это сервис
export class UsersService {
  constructor(
    @InjectRepository(User) // Внедряем репозиторий для User
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    // Метод для получения всех пользователей
    return this.userRepository.find(); // Возвращаем все записи
  }

  async findOne(id: number): Promise<User> {
    // Изменяем на Promise<User>
    const user = await this.userRepository.findOneBy({ id }); // Ищем пользователя
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`); // Бросаем ошибку
    }
    return user; // Возвращаем пользователя
  }

  async findByEmail(email: string): Promise<User> {
    // Изменяем на Promise<User>
    const user = await this.userRepository.findOneBy({ email }); // Ищем пользователя
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`); // Бросаем ошибку
    }
    return user; // Возвращаем пользователя
  }

  async create(
    email: string,
    password: string,
    role: string = 'user',
  ): Promise<User> {
    // Метод для создания
    const existingUser = await this.userRepository.findOneBy({ email }); // Проверяем существование
    if (existingUser) {
      throw new ConflictException('User with this email already exists'); // Бросаем ошибку
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Хешируем пароль
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      role,
    }); // Создаем запись
    return this.userRepository.save(user); // Сохраняем
  }

  async update(id: number, updateData: Partial<User>): Promise<User> {
    // Метод для обновления
    const user = await this.findOne(id); // Проверяем существование
    if (updateData.password) {
      // Если обновляется пароль
      updateData.password = await bcrypt.hash(updateData.password, 10); // Хешируем
    }
    await this.userRepository.update(id, updateData); // Обновляем
    return user; // Возвращаем обновленного пользователя
  }

  async remove(id: number): Promise<void> {
    // Метод для удаления
    await this.findOne(id); // Проверяем существование
    await this.userRepository.delete(id); // Удаляем
  }
}
