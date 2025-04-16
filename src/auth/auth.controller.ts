import { Controller, Post, Body } from '@nestjs/common'; // Импортируем декораторы
import { AuthService } from './auth.service'; // Импортируем сервис

@Controller('auth') // Указываем префикс маршрута /auth
export class AuthController {
  constructor(private authService: AuthService) {} // Внедряем сервис

  @Post('login') // Обрабатываем POST-запрос на /auth/login
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password); // Проверяем пользователя
    if (!user) throw new Error('Invalid credentials'); // Ошибка, если данные неверны
    return this.authService.login(user); // Генерируем токен
  }

  @Post('register') // Обрабатываем POST-запрос на /auth/register
  register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password); // Регистрируем пользователя
  }
}
