# 📊 Настройка Google Sheets

## Шаг 1: Создайте проект в Google Cloud

1. Перейдите на https://console.cloud.google.com/
2. Создайте новый проект или выберите существующий
3. В меню слева выберите **APIs & Services** → **Library**
4. Найдите и включите:
   - **Google Sheets API**
   - **Google Drive API**

## Шаг 2: Создайте сервисный аккаунт

1. Перейдите в **APIs & Services** → **Credentials**
2. Нажмите **Create Credentials** → **Service Account**
3. Заполните форму:
   - Service account name: `rental-bot`
   - Service account ID: автоматически заполнится
   - Нажмите **Create and Continue**
4. В поле **Role** выберите **Editor** или **Owner**
5. Нажмите **Continue**, затем **Done**

## Шаг 3: Получите JSON-ключ

1. Найдите созданный сервисный аккаунт в списке
2. Нажмите на email сервисного аккаунта
3. Перейдите на вкладку **Keys**
4. Нажмите **Add Key** → **Create new key**
5. Выберите формат **JSON**
6. Нажмите **Create** — файл скачается автоматически

## Шаг 4: Настройте файл credentials.json

1. Переименуйте скачанный файл в `credentials.json`
2. Переместите его в папку `telegram-bot/`
3. Убедитесь, что файл находится рядом с `bot.py`

## Шаг 5: Создайте Google Таблицу

### Вариант А: Создать новую таблицу

1. Откройте https://docs.google.com/spreadsheets/
2. Создайте новую таблицу
3. Назовите её: **Заявки на аренду жилья**
4. Откройте файл `credentials.json` и найдите поле `client_email`
5. Скопируйте email (например: `rental-bot@project-id.iam.gserviceaccount.com`)
6. В Google Таблице нажмите **Share** (Поделиться)
7. Вставьте скопированный email и дайте права **Editor**

### Вариант Б: Использовать существующую таблицу

1. Откройте вашу таблицу в Google Sheets
2. Скопируйте ID таблицы из URL:
   ```
   https://docs.google.com/spreadsheets/d/1abc...xyz/edit
                                        ^^^^^^^^
                                        это ID
   ```
3. Откройте `.env` и добавьте:
   ```
   SPREADSHEET_ID=ваш_id_таблицы
   ```
4. Поделитесь таблицей с email из `credentials.json` (см. Вариант А, шаг 6-7)

## Шаг 6: Настройте админ-чат

1. Создайте группу/канал в Telegram или используйте свой личный чат
2. Добавьте вашего бота в группу (если это группа)
3. Получите Chat ID:
   - Для личного чата: напишите @userinfobot — он покажет ваш ID
   - Для группы: добавьте @RawDataBot в группу — он покажет chat_id
4. Откройте `.env` и добавьте:
   ```
   ADMIN_CHAT_ID=-1001234567890
   ```
   (для групп ID начинается с `-100`)

## Шаг 7: Обновите .env файл

Ваш `.env` должен выглядеть так:

```env
BOT_TOKEN=8066655989:AAEqpJmKgS5uxrrJyYJTcTDAsQGoZZnrJoY
ADMIN_CHAT_ID=-1001234567890
SPREADSHEET_ID=1abc...xyz
```

## Шаг 8: Запустите бота

```bash
pip install -r requirements.txt
python bot.py
```

## ✅ Проверка работы

1. Отправьте `/start` боту в Telegram
2. Заполните все 11 шагов анкеты
3. Проверьте:
   - ✅ В админ-чат пришло уведомление с заявкой
   - ✅ В Google Таблице появилась новая строка с данными

## 🔧 Решение проблем

### Ошибка: "Permission denied"
- Убедитесь, что вы дали права сервисному аккаунту на таблицу

### Ошибка: "Spreadsheet not found"
- Проверьте SPREADSHEET_ID в .env
- Убедитесь, что таблица существует

### Заявка не приходит в чат
- Проверьте ADMIN_CHAT_ID в .env
- Убедитесь, что бот добавлен в группу (если это группа)
- Для групп ID должен начинаться с `-100`

### Не подключается к Google Sheets
- Проверьте, что credentials.json находится в папке с bot.py
- Убедитесь, что включены Google Sheets API и Google Drive API
