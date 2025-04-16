// Файл: src/auth/jwt.strategy.ts
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common'; // Импортируем декораторы и исключения
import { PassportStrategy } from '@nestjs/passport'; // Импортируем базовый класс для стратегий
import { ExtractJwt, Strategy } from 'passport-jwt'; // Импортируем утилиты JWT
import { AuthService } from './auth.service'; // Импортируем AuthService
import { ConfigService } from '@nestjs/config'; // Импортируем ConfigService

// Определяем интерфейс для payload токена
interface JwtPayload {
  sub: number; // ID пользователя
  email: string; // Email пользователя
  role: string; // Роль пользователя (например, 'user' или 'admin')
}

@Injectable() // Указываем, что это сервис
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService, // Внедряем AuthService
    private configService: ConfigService, // Внедряем ConfigService
  ) {
    // Получаем JWT_SECRET и проверяем его наличие
    const secretOrKey = configService.get<string>('JWT_SECRET');
    if (!secretOrKey) {
      throw new BadRequestException(
        'JWT_SECRET is not defined in environment variables',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Извлекаем токен из заголовка
      ignoreExpiration: false, // Проверяем срок действия токена
      secretOrKey, // Используем проверенную строку
    });
  }

  async validate(payload: JwtPayload) {
    // Типизируем payload
    // Проверяем наличие всех полей
    if (!payload.sub || !payload.email || !payload.role) {
      throw new UnauthorizedException('Неверный формат токена');
    }

    // Проверяем существование пользователя
    const user = await this.authService.validateUser(payload.email, '');
    if (!user) {
      throw new UnauthorizedException('Недействительный токен');
    }

    // Возвращаем данные пользователя для request.user
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
