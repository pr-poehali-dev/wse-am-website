import os
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import Command, StateFilter
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, ReplyKeyboardRemove
import asyncio
import logging
from datetime import datetime
import gspread
from google.oauth2.service_account import Credentials

logging.basicConfig(level=logging.INFO)

BOT_TOKEN = '8066655989:AAEqpJmKgS5uxrrJyYJTcTDAsQGoZZnrJoY'
ADMIN_CHAT_ID = '5730801538'
SPREADSHEET_ID = ''

bot = Bot(token=BOT_TOKEN)
storage = MemoryStorage()
dp = Dispatcher(storage=storage)

scope = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
]

def get_google_sheets_client():
    try:
        creds = Credentials.from_service_account_file('credentials.json', scopes=scope)
        client = gspread.authorize(creds)
        return client
    except Exception as e:
        logging.error(f'Ошибка подключения к Google Sheets: {e}')
        return None

def save_to_google_sheets(data):
    try:
        client = get_google_sheets_client()
        if not client:
            return False
        
        if SPREADSHEET_ID:
            sheet = client.open_by_key(SPREADSHEET_ID).sheet1
        else:
            sheet = client.open('Заявки на аренду жилья').sheet1
        
        row = [
            datetime.now().strftime('%d.%m.%Y %H:%M'),
            ', '.join(data['districts']),
            ', '.join(data['property_type']),
            data['move_in_date'],
            data['rental_period'],
            data['residents'],
            data['with_children'],
            data['with_pets'],
            data['budget'],
            data['rooms'],
            data['wishes'],
            data['contact']
        ]
        
        if sheet.row_count == 0 or sheet.row_values(1) == []:
            headers = [
                'Дата/Время', 'Районы', 'Тип жилья', 'Дата заезда', 
                'Срок аренды', 'Жильцов', 'Дети', 'Питомцы', 
                'Бюджет', 'Комнат', 'Пожелания', 'Контакт'
            ]
            sheet.append_row(headers)
        
        sheet.append_row(row)
        return True
    except Exception as e:
        logging.error(f'Ошибка сохранения в Google Sheets: {e}')
        return False


class RentalForm(StatesGroup):
    districts = State()
    property_type = State()
    move_in_date = State()
    rental_period = State()
    residents = State()
    with_children = State()
    with_pets = State()
    budget = State()
    rooms = State()
    wishes = State()
    contact = State()


DISTRICTS = [
    'Аван', 'Арабкир', 'Ачапняк', 'Давташен', 
    'Канакер-Зейтун', 'Кентрон (Центр)', 'Малатия-Себастия',
    'Нор-Норк', 'Норк-Мараш', 'Шенгавит', 'Эребуни'
]


def make_districts_keyboard():
    buttons = [[KeyboardButton(text=district)] for district in DISTRICTS]
    buttons.append([KeyboardButton(text='✅ Готово')])
    return ReplyKeyboardMarkup(keyboard=buttons, resize_keyboard=True)


def make_property_keyboard():
    keyboard = [
        [KeyboardButton(text='Квартира')],
        [KeyboardButton(text='Дом')],
        [KeyboardButton(text='✅ Готово')]
    ]
    return ReplyKeyboardMarkup(keyboard=keyboard, resize_keyboard=True)


def make_rental_period_keyboard():
    keyboard = [
        [KeyboardButton(text='6 месяцев')],
        [KeyboardButton(text='1 год')],
    ]
    return ReplyKeyboardMarkup(keyboard=keyboard, resize_keyboard=True, one_time_keyboard=True)


def make_residents_keyboard():
    keyboard = [
        [KeyboardButton(text='1'), KeyboardButton(text='2'), KeyboardButton(text='3')],
    ]
    return ReplyKeyboardMarkup(keyboard=keyboard, resize_keyboard=True, one_time_keyboard=True)


def make_yes_no_keyboard(yes_text: str, no_text: str):
    keyboard = [
        [KeyboardButton(text=yes_text)],
        [KeyboardButton(text=no_text)],
    ]
    return ReplyKeyboardMarkup(keyboard=keyboard, resize_keyboard=True, one_time_keyboard=True)


@dp.message(Command('start'))
async def cmd_start(message: types.Message, state: FSMContext):
    logging.info(f'Получена команда /start от пользователя {message.from_user.id}')
    await state.clear()
    await message.answer(
        "🏠 <b>Добро пожаловать в бот поиска жилья в Ереване!</b>\n\n"
        "Я помогу вам найти идеальное жильё. Давайте начнём с небольшого опроса.\n\n"
        "Используйте /cancel чтобы начать заново.",
        parse_mode='HTML'
    )
    await asyncio.sleep(1)
    await message.answer(
        "📍 <b>Шаг 1/11: Выберите район</b>\n\n"
        "Выберите один или несколько районов из списка ниже.\n"
        "Вы также можете написать свой вариант.\n\n"
        "Когда закончите, нажмите <b>✅ Готово</b>",
        reply_markup=make_districts_keyboard(),
        parse_mode='HTML'
    )
    await state.set_state(RentalForm.districts)
    await state.update_data(districts=[])


@dp.message(Command('cancel'))
async def cmd_cancel(message: types.Message, state: FSMContext):
    await state.clear()
    await message.answer(
        "❌ Заявка отменена. Используйте /start чтобы начать заново.",
        reply_markup=ReplyKeyboardRemove()
    )


@dp.message(RentalForm.districts)
async def process_districts(message: types.Message, state: FSMContext):
    data = await state.get_data()
    districts = data.get('districts', [])
    
    if message.text == '✅ Готово':
        if not districts:
            await message.answer("⚠️ Выберите хотя бы один район!")
            return
        
        await message.answer(
            f"✅ Выбраны районы: {', '.join(districts)}\n\n"
            "🏘 <b>Шаг 2/11: Квартира или дом?</b>\n\n"
            "Выберите один или несколько вариантов.\n"
            "Когда закончите, нажмите <b>✅ Готово</b>",
            reply_markup=make_property_keyboard(),
            parse_mode='HTML'
        )
        await state.set_state(RentalForm.property_type)
        await state.update_data(property_type=[])
    else:
        if message.text not in districts:
            districts.append(message.text)
            await state.update_data(districts=districts)
            await message.answer(
                f"✅ Добавлено: {message.text}\n"
                f"📝 Выбрано районов: {len(districts)}\n\n"
                f"Продолжайте выбирать или нажмите <b>✅ Готово</b>",
                parse_mode='HTML'
            )


@dp.message(RentalForm.property_type)
async def process_property_type(message: types.Message, state: FSMContext):
    data = await state.get_data()
    property_types = data.get('property_type', [])
    
    if message.text == '✅ Готово':
        if not property_types:
            await message.answer("⚠️ Выберите хотя бы один тип жилья!")
            return
        
        await message.answer(
            f"✅ Выбрано: {', '.join(property_types)}\n\n"
            "📅 <b>Шаг 3/11: Дата заезда</b>\n\n"
            "Укажите приблизительную дату заезда.\n"
            "Например: <i>1 декабря 2024</i> или <i>начало января</i>",
            reply_markup=ReplyKeyboardRemove(),
            parse_mode='HTML'
        )
        await state.set_state(RentalForm.move_in_date)
    else:
        if message.text not in property_types:
            property_types.append(message.text)
            await state.update_data(property_type=property_types)
            await message.answer(
                f"✅ Добавлено: {message.text}\n\n"
                f"Продолжайте выбирать или нажмите <b>✅ Готово</b>",
                parse_mode='HTML'
            )


@dp.message(RentalForm.move_in_date)
async def process_move_in_date(message: types.Message, state: FSMContext):
    await state.update_data(move_in_date=message.text)
    await message.answer(
        f"✅ Дата заезда: {message.text}\n\n"
        "⏱ <b>Шаг 4/11: Срок аренды</b>\n\n"
        "Выберите срок или напишите свой вариант:",
        reply_markup=make_rental_period_keyboard(),
        parse_mode='HTML'
    )
    await state.set_state(RentalForm.rental_period)


@dp.message(RentalForm.rental_period)
async def process_rental_period(message: types.Message, state: FSMContext):
    await state.update_data(rental_period=message.text)
    await message.answer(
        f"✅ Срок аренды: {message.text}\n\n"
        "👥 <b>Шаг 5/11: Число жильцов</b>\n\n"
        "Выберите количество или напишите свой вариант:",
        reply_markup=make_residents_keyboard(),
        parse_mode='HTML'
    )
    await state.set_state(RentalForm.residents)


@dp.message(RentalForm.residents)
async def process_residents(message: types.Message, state: FSMContext):
    await state.update_data(residents=message.text)
    await message.answer(
        f"✅ Количество жильцов: {message.text}\n\n"
        "👶 <b>Шаг 6/11: Наличие детей</b>",
        reply_markup=make_yes_no_keyboard('С детьми', 'Без детей'),
        parse_mode='HTML'
    )
    await state.set_state(RentalForm.with_children)


@dp.message(RentalForm.with_children)
async def process_children(message: types.Message, state: FSMContext):
    await state.update_data(with_children=message.text)
    await message.answer(
        f"✅ {message.text}\n\n"
        "🐾 <b>Шаг 7/11: Наличие питомцев</b>",
        reply_markup=make_yes_no_keyboard('С питомцами', 'Без питомцев'),
        parse_mode='HTML'
    )
    await state.set_state(RentalForm.with_pets)


@dp.message(RentalForm.with_pets)
async def process_pets(message: types.Message, state: FSMContext):
    await state.update_data(with_pets=message.text)
    await message.answer(
        f"✅ {message.text}\n\n"
        "💰 <b>Шаг 8/11: Максимальный бюджет</b>\n\n"
        "Укажите ваш бюджет в AMD или USD.\n"
        "Например: <i>500 USD</i> или <i>200,000 AMD</i>",
        reply_markup=ReplyKeyboardRemove(),
        parse_mode='HTML'
    )
    await state.set_state(RentalForm.budget)


@dp.message(RentalForm.budget)
async def process_budget(message: types.Message, state: FSMContext):
    await state.update_data(budget=message.text)
    await message.answer(
        f"✅ Бюджет: {message.text}\n\n"
        "🚪 <b>Шаг 9/11: Количество комнат</b>\n\n"
        "Укажите желаемое количество комнат.\n"
        "Например: <i>2</i> или <i>студия</i>",
        parse_mode='HTML'
    )
    await state.set_state(RentalForm.rooms)


@dp.message(RentalForm.rooms)
async def process_rooms(message: types.Message, state: FSMContext):
    await state.update_data(rooms=message.text)
    await message.answer(
        f"✅ Комнат: {message.text}\n\n"
        "📝 <b>Шаг 10/11: Ваши пожелания</b>\n\n"
        "Напишите всё, что считаете важным:\n"
        "• Особые требования к жилью\n"
        "• Наличие мебели/техники\n"
        "• Близость к метро/школам\n"
        "• Другие важные детали\n\n"
        "Или напишите <i>«Без особых пожеланий»</i>",
        parse_mode='HTML'
    )
    await state.set_state(RentalForm.wishes)


@dp.message(RentalForm.wishes)
async def process_wishes(message: types.Message, state: FSMContext):
    await state.update_data(wishes=message.text)
    await message.answer(
        "✅ Пожелания учтены\n\n"
        "📞 <b>Шаг 11/11: Контакты</b>\n\n"
        "Как с вами можно связаться?\n"
        "Укажите номер телефона или ваш Telegram.\n\n"
        "Например: <i>+374 99 123456</i> или <i>@username</i>",
        parse_mode='HTML'
    )
    await state.set_state(RentalForm.contact)


@dp.message(RentalForm.contact)
async def process_contact(message: types.Message, state: FSMContext):
    await state.update_data(contact=message.text)
    data = await state.get_data()
    
    summary = (
        "🎉 <b>Заявка заполнена!</b>\n\n"
        "📋 <b>Сводка вашей заявки:</b>\n\n"
        f"📍 <b>Районы:</b> {', '.join(data['districts'])}\n"
        f"🏘 <b>Тип жилья:</b> {', '.join(data['property_type'])}\n"
        f"📅 <b>Дата заезда:</b> {data['move_in_date']}\n"
        f"⏱ <b>Срок аренды:</b> {data['rental_period']}\n"
        f"👥 <b>Жильцов:</b> {data['residents']}\n"
        f"👶 <b>Дети:</b> {data['with_children']}\n"
        f"🐾 <b>Питомцы:</b> {data['with_pets']}\n"
        f"💰 <b>Бюджет:</b> {data['budget']}\n"
        f"🚪 <b>Комнат:</b> {data['rooms']}\n"
        f"📝 <b>Пожелания:</b> {data['wishes']}\n"
        f"📞 <b>Контакт:</b> {data['contact']}\n\n"
        "✅ Ваша заявка отправлена! Мы свяжемся с вами в ближайшее время.\n\n"
        "Используйте /start чтобы создать новую заявку."
    )
    
    await message.answer(summary, parse_mode='HTML')
    
    admin_summary = (
        f"🆕 <b>Новая заявка #{datetime.now().strftime('%Y%m%d-%H%M')}</b>\n\n"
        f"👤 <b>От пользователя:</b> {message.from_user.full_name}\n"
        f"🆔 <b>Username:</b> @{message.from_user.username or 'не указан'}\n"
        f"🆔 <b>User ID:</b> {message.from_user.id}\n\n"
        f"📍 <b>Районы:</b> {', '.join(data['districts'])}\n"
        f"🏘 <b>Тип жилья:</b> {', '.join(data['property_type'])}\n"
        f"📅 <b>Дата заезда:</b> {data['move_in_date']}\n"
        f"⏱ <b>Срок аренды:</b> {data['rental_period']}\n"
        f"👥 <b>Жильцов:</b> {data['residents']}\n"
        f"👶 <b>Дети:</b> {data['with_children']}\n"
        f"🐾 <b>Питомцы:</b> {data['with_pets']}\n"
        f"💰 <b>Бюджет:</b> {data['budget']}\n"
        f"🚪 <b>Комнат:</b> {data['rooms']}\n"
        f"📝 <b>Пожелания:</b> {data['wishes']}\n"
        f"📞 <b>Контакт:</b> {data['contact']}"
    )
    
    if ADMIN_CHAT_ID:
        try:
            await bot.send_message(ADMIN_CHAT_ID, admin_summary, parse_mode='HTML')
            logging.info(f'Заявка отправлена в чат {ADMIN_CHAT_ID}')
        except Exception as e:
            logging.error(f'Ошибка отправки в админ-чат: {e}')
    
    sheets_saved = save_to_google_sheets(data)
    if sheets_saved:
        logging.info('Заявка сохранена в Google Sheets')
    else:
        logging.warning('Не удалось сохранить заявку в Google Sheets')
    
    await state.clear()


async def main():
    logging.info('🚀 Запуск бота...')
    logging.info(f'Bot token начинается с: {BOT_TOKEN[:10]}...')
    logging.info(f'Admin chat ID: {ADMIN_CHAT_ID}')
    try:
        await dp.start_polling(bot, skip_updates=True)
    except Exception as e:
        logging.error(f'Ошибка при запуске: {e}')


if __name__ == '__main__':
    print('🤖 Бот запускается...')
    asyncio.run(main())