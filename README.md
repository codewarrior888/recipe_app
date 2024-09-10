## проект recipe_app на Django(backend)/React(frontend)

Приложение-каталог кулинарных рецептов.

## Установка и настройка проекта

### 1. Клонировать репозиторий на локальным компьютер
```bash
git clone git@github.com:codewarrior888/recipe_app.git
```

### 2. Подключить виртальную среду.
```bash
python3 -m venv .venv
```
```bash
source .venv/bin/activate
```
### 3. Перейти в директорию проекта (серверная часть):
```bash
cd backend/recipe_app
```

### 4. Установить зависимости серверной стороны:
```bash
pip install -r requirements.txt
```

### 5. Перейти в директорию проекта (клиентская часть):
```bash
cd frontend
```

### 6. Установить зависимости клиентской стороны:
```bash
npm i
```

### 7. Локальный запуск (запустить сервер из backend/recipe_app и клиента из frontend)
```bash
python manage.py runserver
```
```bash
npm run dev
```
Проект будет доступен по адресу http://localhost:3000

6. Сборка проекта
```bash
npm run prod
```
