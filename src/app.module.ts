import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; // Импортируем модуль для TypeORM
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Инициализируем ConfigModule
      isGlobal: true, // Делаем модуль глобальным, чтобы не импортировать в других модулях
      envFilePath: '.env', // Указываем путь к файлу .env (по умолчанию .env)
    }),
    TypeOrmModule.forRootAsync({
      // Используем асинхронную настройку TypeOrm
      imports: [ConfigModule], // Импортируем ConfigModule для доступа к ConfigService
      inject: [ConfigService], // Внедряем ConfigService
      useFactory: (configService: ConfigService) => ({
        // Определяем конфигурацию TypeORM
        type: 'postgres', // Тип базы данных
        host: configService.get<string>('DATABASE_HOST', 'localhost'), // Получаем хост, с дефолтным значением
        port: configService.get<number>('DATABASE_PORT', 5432), // Получаем порт, с дефолтным значением
        username: configService.get<string>('DATABASE_USER', 'postgres'), // Получаем имя пользователя
        password: configService.get<string>('DATABASE_PASSWORD', 'password'), // Получаем пароль
        database: configService.get<string>('DATABASE_NAME', 'shop_db'), // Получаем имя БД
        ssl:
          configService.get<string>('DATABASE_SSL') === 'true'
            ? { rejectUnauthorized: false }
            : false,
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Путь к сущностям
        synchronize: true, // Автоматически создаем таблицы (ТОЛЬКО ДЛЯ РАЗРАБОТКИ)
      }),
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
