# Real estate agent's personal account

## Описание

Веб-приложение, позволяющее агентам по недвижимости:
- авторизоваться,
- просматривать объявления,
- редактировать, фильтровать, удалять и добавлять новые объявления.

---

## Функционал

- Регистрация и авторизация агентов
- JWT-авторизация 
- Управление **своими** объявлениями
- Фильтрация и сортировка объявлений
- Редактирование и удаление записей
- Добавление новых объявлений

---

## Технологии

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Knex.js](https://knexjs.org/) 
- [Docker](https://www.docker.com/)
- [React](https://react.dev/) 
- [Vite](https://vitejs.dev/)

---

## Быстрый старт Backend (через Docker)

### 1. Клонировать репозиторий

```bash
git clone https://github.com/StepanDubrovin/esoft-practice.git
cd esoft-practice/backend
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Создать файл `.env` в корне проекта и заполнить переменные:

```env
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_DATABASE=campus_todo
DB_MIN=0
DB_MAX=10
DB_TIMEOUTMILLIS=30000
PORT=3000
SESSION_DURATION=3600
JWT_SECRET=your_jwt_secret
SALT_ROUNDS=10
CLIENT_URL=your_localhost
```

### 4. Собрать и запустить контейнер

```bash
docker compose up --build
```

Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000)

## Быстрый старт Frontend (через Docker)

### 1. Установить зависимости

```bash
cd ../frontend
npm install
```

### 2. Запутсить Frontend

```bash
npm run dev
```