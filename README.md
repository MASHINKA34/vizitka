# 🌌 VoiDteam Portfolio

<div align="center">

![VoiDteam Banner](https://img.shields.io/badge/VoiDteam-Portfolio-8B5CF6?style=for-the-badge&logo=react&logoColor=white)

**Современный портфолио-лендинг full-stack команды разработчиков**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[Демо](#) • [Установка](#-установка) • [Технологии](#-технологии) • [Структура](#-структура-проекта)

</div>

---

## 📋 Описание

**VoiDteam Portfolio** — это современный одностраничный веб-сайт с анимациями и интерактивными элементами, созданный для презентации услуг команды full-stack разработчиков. Сайт включает:

-  **Современный дизайн** с градиентами и эффектами blur
-  **Плавные анимации** на основе Framer Motion
-  **Полностью адаптивная вёрстка** для всех устройств

---

## 🌟 Особенности

### ⭐ Интерактивные секции

- **Hero Section** — яркая главная с призывом к действию
- **Team Section** — презентация команды с анимацией при скролле
- **Projects Section** — портфолио выполненных проектов
- **Services Section** — услуги с прозрачными ценами
- **Tech Stack Section** — используемые технологии
- **Contact Section** — форма обратной связи

### 🎨 Визуальные эффекты

- Плавная прокрутка между секциями
- Анимация появления элементов при скролле
- Градиентные переходы и свечения
- Адаптивная навигация с мобильным меню
- Анимированные карточки проектов

---

## 🛠 Технологии

### Frontend

- **React 18.3.1** — UI библиотека
- **TypeScript 5.6.2** — типизация
- **Vite 5.4.2** — сборщик и dev-сервер
- **Tailwind CSS 3.4.1** — utility-first CSS фреймворк
- **Framer Motion 11.15.0** — библиотека анимаций

### Иконки и UI

- **Lucide React 0.469.0** — современные SVG иконки
- **Supabase JS 2.48.1** — для будущих интеграций

### Dev Tools

- **ESLint 9.13.0** — линтер для JS/TS
- **TypeScript ESLint 8.13.0** — правила для TypeScript
- **PostCSS 8.4.41** — обработка CSS
- **Autoprefixer 10.4.20** — автопрефиксы для CSS

---

## 📦 Установка

### Требования

- Node.js >= 18.0.0
- npm или yarn

### Клонирование репозитория

```bash
git clone https://github.com/yourusername/voidteam-portfolio.git
cd voidteam-portfolio
```

### Установка зависимостей

```bash
npm install
# или
yarn install
```

### Запуск dev-сервера

```bash
npm run dev
# или
yarn dev
```

Сайт будет доступен по адресу: `http://localhost:5173`

---

##  Деплой

### Production build

```bash
npm run build
# или
yarn build
```

Готовые файлы будут в папке `dist/`

### Предпросмотр production-сборки

```bash
npm run preview
# или
yarn preview
```

### Линтинг

```bash
npm run lint
# или
yarn lint
```

---

## 📁 Структура проекта

```
voidteam-portfolio/
├── public/               # Статические файлы
│   ├── vite.png         # Favicon
│   ├── alexander.jpg    # Фото команды
│   └── enuro.jpg        # Фото команды
├── src/
│   ├── App.tsx          # Главный компонент приложения
│   ├── main.tsx         # Точка входа React
│   ├── index.css        # Глобальные стили и Tailwind
│   └── vite-env.d.ts    # TypeScript декларации Vite
├── index.html           # HTML-шаблон
├── package.json         # Зависимости и скрипты
├── tsconfig.json        # Конфигурация TypeScript
├── vite.config.ts       # Конфигурация Vite
├── tailwind.config.js   # Конфигурация Tailwind
├── postcss.config.js    # Конфигурация PostCSS
├── eslint.config.js     # Конфигурация ESLint
└── README.md           # Документация
```

---

## 🎨 Кастомизация

### Цветовая схема

Градиенты и цвета настраиваются в `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      'purple-400': '#c084fc',
      'violet-400': '#a78bfa',
      'fuchsia-400': '#e879f9',
      // ...
    }
  }
}
```

### Анимации

Анимации настраиваются через Framer Motion в `src/App.tsx`:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  // content
</motion.div>
```

---

## 📱 Адаптивность

Сайт полностью адаптирован для всех устройств:

- 📱 **Mobile** (320px+) — одноколоночная раскладка
- 📱 **Tablet** (768px+) — двухколоночная раскладка
- 💻 **Desktop** (1024px+) — трёхколоночная раскладка
- 🖥 **Large Desktop** (1280px+) — полная ширина

---

## 🔧 Скрипты

```json
{
  "dev": "vite",              // Запуск dev-сервера
  "build": "tsc -b && vite build",  // Production-сборка
  "lint": "eslint .",         // Проверка кода
  "preview": "vite preview"   // Предпросмотр сборки
}
```

## 👥 Команда

### Александр — Frontend Developer
- 🎨 Создаёт современные интерфейсы
- ⚡ Специализация: React, TypeScript, анимации
- 📧 [GitHub](https://github.com/MASHINKA34) | [Telegram](https://t.me/mashinka34r)

### Enuro — Backend Developer
- 🔧 Архитектор серверной части
- ⚡ Специализация: Rust, Python, PostgreSQL
- 📧 [GitHub](https://github.com/Enuro) | [Telegram](https://t.me/EnuroV)

---

<!-- ## 📞 Контакты -->

<!-- - 📧 Email: [voidteam@example.com](mailto:voidteam@example.com) -->
<!-- - 💬 Telegram: [@voidteam](https://t.me/voidteam) -->

<div align="center">

**Создано с 💜 командой VoiDteam**

[![GitHub](https://img.shields.io/badge/GitHub-MASHINKA34-181717?style=flat&logo=github)](https://github.com/MASHINKA34)
[![Telegram](https://img.shields.io/badge/Telegram-@mashinka34r-26A5E4?style=flat&logo=telegram)](https://t.me/mashinka34r)

</div>
