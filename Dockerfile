# Используем свежий образ Node.js
FROM node:23-alpine

# Установка зависимостей системы
RUN apk add --no-cache bash

# Рабочая директория
WORKDIR /app

# Копируем package.json и yarn.lock
COPY package*.json yarn.lock ./

# Установка зависимостей
RUN yarn install --frozen-lockfile

# Копируем исходный код
COPY . .

# Сборка приложения
RUN yarn build

# Указываем порт
EXPOSE 3000

# Команда запуска
CMD ["yarn", "start:prod"]
