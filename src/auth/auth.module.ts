// Файл: src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module'; // Импортируем UsersModule
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule, // Предоставляет UsersService
    PassportModule.register({ defaultStrategy: 'jwt' }), // Регистрируем стратегию JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('JWT_SECRET не определен в переменных окружения');
        }
        return {
          secret,
          signOptions: { expiresIn: '60m' },
        };
      },
    }),
    ConfigModule, // Для доступа к .env
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
