# Jujutsu-Kaisen F.C.G RP — AI Generator v2

Это обновление для твоего существующего GitHub Pages сайта.

## Что добавлено

- настоящая AI-генерация анкет;
- оригинальные врождённые техники;
- логическая проверка силы/ранга;
- Максимальная техника — только если подходит;
- Обратная проклятая техника — только если подходит;
- Раскрытие территории — только если подходит;
- Binding Vow / «клятвы» полностью запрещены;
- генерация внешности по референсу;
- кнопка сохранения сгенерированного изображения;
- API-ключ не находится в GitHub Pages.

## Важно

GitHub Pages нельзя использовать как безопасное место для API-ключа. Ключ OpenAI должен находиться на серверной стороне. OpenAI прямо рекомендует не помещать API-ключ в клиентский код и хранить его в переменной окружения/секретном хранилище.

В этой версии backend подготовлен под Cloudflare Workers.

## Файлы

- `index.html`
- `style.css`
- `script.js`
- `config.js`
- `backend/worker.js`
- `backend/wrangler.toml`

## Установка frontend

Замени файлы в репозитории сайта этими файлами.

После публикации backend открой `config.js`:

    window.JJK_API_URL = "PASTE_BACKEND_URL_HERE";

и вставь URL своего Worker.

## Установка Cloudflare Worker

1. Создай аккаунт Cloudflare.
2. Установи Wrangler.
3. Перейди в папку `backend`.
4. Выполни:

    npm install -g wrangler
    wrangler login

5. Добавь API-ключ:

    wrangler secret put OPENAI_API_KEY

6. Запусти публикацию:

    wrangler deploy

После этого Wrangler покажет URL вида:

    https://jjk-fcg-rp-ai.<твой-аккаунт>.workers.dev

Его вставь в `config.js`.

## OpenAI

Backend использует Responses API для текста и image generation tool для изображений. API-ключ остаётся на backend, а не в браузере.

Перед использованием убедись, что у проекта OpenAI есть доступ/баланс для нужных моделей.

## Структура

Jujutsu-Kaisen-F.C.G-RP/
├── index.html
├── style.css
├── script.js
├── config.js
└── backend/
    ├── worker.js
    └── wrangler.toml
