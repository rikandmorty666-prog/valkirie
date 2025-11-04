# ⚡ Быстрый старт - Чеклист

## За 30 минут до первого результата

---

## ✅ Шаг 1: Установка (5 минут)

```bash
# Проверить Node.js
node --version  # Должно быть v20.x или выше

# Если нет - скачать с nodejs.org
```

---

## ✅ Шаг 2: Создать проект (5 минут)

```bash
npm create vite@latest webui -- --template react-ts
cd webui
npm install
npm run dev
```

**Проверить:** Открыть http://localhost:5173 - должна быть страница "Vite + React"

**Остановить:** `Ctrl + C`

---

## ✅ Шаг 3: Установить Tailwind (5 минут)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Открыть:** `tailwind.config.js` - заменить на:
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

**Открыть:** `src/index.css` - заменить на:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## ✅ Шаг 4: Создать структуру (5 минут)

**Создать папки:**
```
src/
├── components/
│   └── ui/
├── pages/
└── types/
```

**PowerShell:**
```powershell
mkdir src\components\ui, src\pages, src\types
```

---

## ✅ Шаг 5: Первый компонент (10 минут)

**Создать:** `src/components/ui/Button.tsx`

```typescript
import { ButtonHTMLAttributes } from 'react';

export const Button = ({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

**Создать:** `src/pages/Dashboard.tsx`

```typescript
import { Button } from '../components/ui/Button';

export const Dashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <Button>Кнопка работает!</Button>
    </div>
  );
};
```

**Обновить:** `src/App.tsx`

```typescript
import { Dashboard } from './pages/Dashboard';

function App() {
  return <Dashboard />;
}

export default App;
```

**Проверить:** `npm run dev` - должна быть страница с кнопкой!

---

## 📋 Полный план

**Смотри файл:** `START_FROM_ZERO_PLAN.md` - там все детально по шагам

---

## 🎯 Порядок действий

1. ✅ **Этап 0-1:** Создать проект и установить Tailwind (30 мин)
2. ✅ **Этап 2:** Создать структуру папок (15 мин)
3. ✅ **Этап 3:** Базовые UI компоненты (1-2 часа)
4. ✅ **Этап 4:** Первая страница Dashboard (1 час)
5. ✅ **Этап 5:** Добавить карту (2-3 часа)
6. ✅ **Этап 6:** Список стопов и трехпанельный layout (3-4 часа)

**Итого:** ~8-10 часов работы до базового трехпанельного редактора

---

## 🚀 После базового функционала

1. Drag & Drop для стопов
2. Маркеры на карте
3. Построение маршрута
4. Редактирование стопов
5. Подключение к backend

---

**Начинайте с Этапа 0 и следуйте по порядку! 💪**

