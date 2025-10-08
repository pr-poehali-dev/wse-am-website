# 🏠 Telegram-бот для поиска жилья в Ереване

Полнофункциональный бот для сбора заявок на аренду жилья с пошаговым опросником.

## 🚀 Быстрый старт

### 1. Установите зависимости

```bash
pip install -r requirements.txt
```

### 2. Создайте бота в Telegram

1. Найдите [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте команду `/newbot`
3. Придумайте имя и username для бота
4. Скопируйте полученный токен

### 3. Настройте токен

Создайте файл `.env` из примера:

```bash
cp .env.example .env
```

Откройте `.env` и вставьте ваш токен:

```
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
```

### 4. Запустите бота

```bash
python bot.py
```

Готово! Найдите вашего бота в Telegram и отправьте `/start`

## 📋 Возможности

✅ **11 шагов опроса:**
1. Выбор районов (множественный выбор)
2. Тип жилья: квартира/дом (множественный выбор)
3. Дата заезда (текст)
4. Срок аренды: 6 месяцев/1 год (выбор или текст)
5. Число жильцов: 1/2/3 (выбор или текст)
6. Наличие детей (да/нет)
7. Наличие питомцев (да/нет)
8. Максимальный бюджет (текст)
9. Количество комнат (текст)
10. Пожелания (текст)
11. Контакт для связи (текст)

✅ **Удобный интерфейс:**
- Кнопки для быстрого выбора
- Возможность ввода своего варианта
- Прогресс (Шаг X/11)
- Команда /cancel для отмены

✅ **Валидация данных:**
- Нельзя пропустить обязательные поля
- Множественный выбор с кнопкой "Готово"

## 🔧 Дополнительные настройки

### Отправка заявок администратору

Раскомментируйте строки в конце `bot.py`:

```python
ADMIN_ID = 123456789  # Ваш Telegram ID
await bot.send_message(ADMIN_ID, f"🆕 Новая заявка:\n\n{summary}", parse_mode='HTML')
```

Чтобы узнать свой ID, напишите [@userinfobot](https://t.me/userinfobot)

### Сохранение в базу данных

Добавьте свой код в функцию `process_contact()` для сохранения данных в БД.

## 📝 Команды бота

- `/start` — Начать заполнение заявки
- `/cancel` — Отменить текущую заявку

## 🛠 Технологии

- Python 3.8+
- aiogram 3.7.0 (асинхронная библиотека для Telegram Bot API)
- FSM (Finite State Machine) для управления состояниями

## 📦 Структура файлов

```
telegram-bot/
├── bot.py              # Основной код бота
├── requirements.txt    # Зависимости Python
├── .env.example        # Пример конфигурации
└── README.md          # Документация
```

## 🚀 Деплой на сервер

### Вариант 1: VPS/Сервер

```bash
# Установите зависимости
pip install -r requirements.txt

# Запустите в фоне с помощью screen
screen -S rental-bot
python bot.py
# Нажмите Ctrl+A, затем D для выхода из screen
```

### Вариант 2: Systemd (Linux)

Создайте файл `/etc/systemd/system/rental-bot.service`:

```ini
[Unit]
Description=Rental Bot
After=network.target

[Service]
Type=simple
User=your_user
WorkingDirectory=/path/to/telegram-bot
ExecStart=/usr/bin/python3 bot.py
Restart=always

[Install]
WantedBy=multi-user.target
```

Запустите:

```bash
sudo systemctl enable rental-bot
sudo systemctl start rental-bot
```

## 💡 Идеи для улучшения

- 📊 Добавить админ-панель для просмотра заявок
- 💾 Интеграция с Google Sheets или Airtable
- 📧 Отправка уведомлений на email
- 🖼 Возможность отправки фото объектов
- 🗺 Интеграция с картами для выбора района
- 📊 Статистика и аналитика заявок
