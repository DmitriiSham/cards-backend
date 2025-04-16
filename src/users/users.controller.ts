// Файл: src/users/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common'; // Импортируем декораторы и исключения
import { UsersService } from './users.service'; // Импортируем сервис
import { User } from './user.entity'; // Импортируем сущность

@Controller('users') // Указываем префикс маршрута /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // Внедряем сервис

  @Get() // Обрабатываем GET-запрос на /users
  findAll(): Promise<User[]> {
    return this.usersService.findAll(); // Возвращаем всех пользователей
  }

  @Get(':id') // Обрабатываем GET-запрос на /users/:id
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id); // Получаем пользователя
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`); // Бросаем 404, если не найден
    }
    return user; // Возвращаем пользователя
  }

  @Post() // Обрабатываем POST-запрос на /users
  create(
    @Body() body: { email: string; password: string; role?: string },
  ): Promise<User> {
    return this.usersService.create(body.email, body.password, body.role); // Создаем пользователя
  }

  @Put(':id') // Обрабатываем PUT-запрос на /users/:id
  update(
    @Param('id') id: number,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    return this.usersService.update(id, updateData); // Обновляем пользователя
  }

  @Delete(':id') // Обрабатываем DELETE-запрос на /users/:id
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id); // Удаляем пользователя
  }
}
