// Файл: src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Регистрируем репозиторий для User
  ],
  providers: [UsersService], // Предоставляем UsersService
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule], // Экспортируем UsersService для других модулей
})
export class UsersModule {}
