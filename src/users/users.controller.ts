import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common'; // Импорт декораторов NestJS
import { UsersService } from './users.service'; // Сервис пользователей
import { User } from './user.entity'; // Сущность User (из TypeORM)
import { CreateUserDto, UpdateUserDto } from './users.dto'; // DTO для создания и обновления пользователя
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger'; // Swagger-декораторы
import { AuthGuard } from '@nestjs/passport';

// Группируем все эндпоинты под тегом "users" в Swagger
@ApiTags('users')
@ApiBearerAuth('jwt-auth')
@UseGuards(AuthGuard('jwt'))
@Controller('users') // Префикс маршрутов: /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // Внедрение UsersService

  // GET /users — получить всех пользователей
  @Get()
  @ApiOperation({ summary: 'Получение списка всех пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Список пользователей',
    type: [User],
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // GET /users/:id — получить пользователя по ID
  @Get(':id')
  @ApiOperation({ summary: 'Получение пользователя по ID' })
  @ApiParam({ name: 'id', description: 'ID пользователя', example: 1 })
  @ApiResponse({ status: 200, description: 'Пользователь найден', type: User })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id); // Пытаемся найти пользователя
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`); // Если не найден — кидаем 404
    }
    return user;
  }

  // POST /users — создать нового пользователя
  @Post()
  @UsePipes(new ValidationPipe()) // Включаем валидацию DTO
  @ApiOperation({ summary: 'Создание нового пользователя' })
  @ApiBody({ type: CreateUserDto }) // Описание тела запроса
  @ApiResponse({ status: 201, description: 'Пользователь создан', type: User })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    // Вызываем метод сервиса, передавая email, пароль и опциональную роль
    return this.usersService.create(
      createUserDto.email,
      createUserDto.password,
      createUserDto.role,
    );
  }

  // PUT /users/:id — обновление пользователя
  @Put(':id')
  @UsePipes(new ValidationPipe()) // Валидация для update DTO
  @ApiOperation({ summary: 'Обновление пользователя' })
  @ApiParam({ name: 'id', description: 'ID пользователя', example: 1 })
  @ApiBody({ type: UpdateUserDto }) // Описание тела запроса
  @ApiResponse({
    status: 200,
    description: 'Пользователь обновлён',
    type: User,
  })
  update(
    @Param('id') id: number,
    @Body() updateData: UpdateUserDto, // Частичное обновление
  ): Promise<User> {
    return this.usersService.update(id, updateData);
  }

  // DELETE /users/:id — удалить пользователя
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiParam({ name: 'id', description: 'ID пользователя', example: 1 })
  @ApiResponse({ status: 204, description: 'Пользователь удалён' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
