import { Injectable } from '@nestjs/common'; // Импортируем декоратор Injectable
import { InjectRepository } from '@nestjs/typeorm'; // Импортируем декоратор для репозитория
import { Repository } from 'typeorm'; // Импортируем тип Repository
import { JwtService } from '@nestjs/jwt'; // Импортируем сервис для JWT
import * as bcrypt from 'bcrypt'; // Импортируем bcrypt для хеширования паролей
import { User } from '../users/user.entity'; // Импортируем сущность User

@Injectable() // Указываем, что это сервис
export class AuthService {
  constructor(
    @InjectRepository(User) // Внедряем репозиторий для User
    private userRepository: Repository<User>,
    private jwtService: JwtService, // Внедряем сервис для работы с JWT
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    // Проверяем учетные данные
    const user = await this.userRepository.findOneBy({ email }); // Ищем пользователя по email
    if (user && (await bcrypt.compare(password, user.password))) {
      // Сравниваем пароли
      return user; // Возвращаем пользователя, если данные верны
    }
    return null; // Возвращаем null, если пользователь не найден или пароль неверный
  }

  login(user: User) {
    // Метод для генерации JWT
    const payload = { email: user.email, sub: user.id, role: user.role }; // Формируем payload для токена
    return {
      access_token: this.jwtService.sign(payload), // Генерируем и возвращаем токен
    };
  }

  async register(email: string, password: string): Promise<User> {
    // Метод для регистрации
    const hashedPassword = await bcrypt.hash(password, 10); // Хешируем пароль
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    }); // Создаем пользователя
    return this.userRepository.save(user); // Сохраняем в БД
  }
}
