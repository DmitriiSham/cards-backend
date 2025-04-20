import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

// Группируем эндпоинты под тегом "auth" в Swagger
@ApiTags('auth')
@Controller('auth') // Указываем префикс маршрута /auth
export class AuthController {
  constructor(private authService: AuthService) {} // Внедряем сервис

  @Post('login') // POST /auth/login
  @UsePipes(new ValidationPipe()) // Включаем валидацию
  @ApiOperation({ summary: 'Вход пользователя' }) // Описание эндпоинта
  @ApiBody({ type: LoginDto }) // Описание входных данных
  @ApiResponse({
    status: 200,
    description: 'Возвращает JWT-токен',
    type: 'object',
    example: { access_token: 'jwt-token' },
  }) // Успешный ответ
  @ApiResponse({ status: 401, description: 'Неверные учетные данные' }) // Ошибка
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password); // Проверяем пользователя
    if (!user) {
      throw new UnauthorizedException('Неверные учетные данные'); // Ошибка, если данные неверны
    }
    return this.authService.login(user); // Генерируем токен
  }

  @Post('register') // POST /auth/register
  @UsePipes(new ValidationPipe()) // Включаем валидацию
  @ApiOperation({ summary: 'Регистрация пользователя' }) // Описание эндпоинта
  @ApiBody({ type: RegisterDto }) // Описание входных данных
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно зарегистрирован',
    type: 'object',
    example: { id: 1, email: 'user@example.com', role: 'user' },
  }) // Успешный ответ
  @ApiResponse({
    status: 409,
    description: 'Пользователь с таким email уже существует',
  }) // Ошибка
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password, body.role); // Регистрируем пользователя
  }
}
