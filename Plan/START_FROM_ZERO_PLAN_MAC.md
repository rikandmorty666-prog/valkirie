# 🚀 План разработки с нуля - Пошаговая инструкция для Mac

## Почему начинаем с WebUI?

✅ **Можно сразу видеть результат** - визуальный прогресс мотивирует  
✅ **Работает без backend** - можно использовать моки данных  
✅ **Быстрее проверить идею** - UI готов, потом подключаем API  
✅ **Легче тестировать** - видно что работает, что нет  

---

## 📋 Полный план по шагам

### Этап 0: Подготовка (30 минут)

#### Шаг 0.1: Проверить Node.js

```bash
node --version
npm --version
```

**Если не установлен:**
1. Скачать с https://nodejs.org/ (LTS версия, например 20.x)
2. Установить
3. Перезапустить Terminal
4. Проверить снова

#### Шаг 0.2: Выбрать папку для проекта

**На Mac:**
```bash
# Создать папку в домашней директории
mkdir -p ~/Projects/ValkyrieTMS-New
cd ~/Projects/ValkyrieTMS-New
```

**Или на рабочем столе:**
```bash
mkdir -p ~/Desktop/ValkyrieTMS-New
cd ~/Desktop/ValkyrieTMS-New
```

---

## 🎯 Этап 1: Создание базового проекта (1-2 часа)

### Шаг 1.1: Создать React проект

```bash
npm create vite@latest webui -- --template react-ts
cd webui
npm install
```

**Что произошло:**
- Создана папка `webui`
- Установлен React + TypeScript + Vite
- Базовая структура проекта готова

### Шаг 1.2: Проверить что работает

```bash
npm run dev
```

**Должно открыться:** http://localhost:5173  
**Видите:** "Vite + React" страницу? ✅ Отлично!

**Остановить сервер:** `Ctrl + C` в терминале (или `Cmd + C`)

### Шаг 1.3: Установить Tailwind CSS v4

```bash
npm install -D tailwindcss@next @tailwindcss/vite@next
```

**Открыть файл:** `vite.config.ts`

**Добавить импорт и плагин:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

**Открыть файл:** `src/index.css`

**Заменить ВСЁ содержимое на:**
```css
@import "tailwindcss";
```

**Примечание:** В Tailwind v4 конфигурация через CSS, а не через JS файл. Если нужна кастомная конфигурация, можно добавить в `src/index.css`:

```css
@import "tailwindcss";

/* Кастомные настройки (опционально) */
@theme {
  /* Ваши кастомные значения */
}
```

**Проверить:** `npm run dev` - страница должна выглядеть так же

---

## 🎨 Этап 2: Создать базовую структуру (2-3 часа)

### Шаг 2.1: Создать папки

**В Terminal (находясь в папке `webui`):**
```bash
mkdir -p src/components/ui src/components/layout src/pages src/services src/hooks src/stores src/types src/utils
```

**Проверить что создалось:**
```bash
ls -la src/
```

**Или вручную через Finder:**
```
webui/
└── src/
    ├── components/
    │   ├── ui/
    │   └── layout/
    ├── pages/
    ├── services/
    ├── hooks/
    ├── stores/
    ├── types/
    └── utils/
```

### Шаг 2.2: Создать базовые типы

**Создать файл:** `src/types/index.ts`

```typescript
// Базовые типы для работы

export interface Stop {
  id: string;
  order: number;
  type: 'pickup' | 'delivery';
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  timeWindow: {
    start: string;
    end: string;
  };
  status: 'planned' | 'en_route' | 'arrived' | 'completed';
}

export interface Manifest {
  id: string;
  number: string;
  stops: Stop[];
  status: 'draft' | 'dispatched' | 'in_transit';
}
```

### Шаг 2.3: Создать утилиту для классов

**Создать файл:** `src/utils/cn.ts`

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Установить зависимости:**
```bash
npm install clsx tailwind-merge
```

---

## 🧩 Этап 3: Создать базовые UI компоненты (3-4 часа)

### Шаг 3.1: Кнопка (Button)

**Создать файл:** `src/components/ui/Button.tsx`

```typescript
import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  className,
  children,
  ...props 
}: ButtonProps) => {
  const baseStyles = 'font-medium rounded-lg transition-colors disabled:opacity-50';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Шаг 3.2: Поле ввода (Input)

**Создать файл:** `src/components/ui/Input.tsx`

```typescript
import { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className, ...props }: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-3 py-2 border border-gray-300 rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-blue-500',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
```

### Шаг 3.3: Карточка (Card)

**Создать файл:** `src/components/ui/Card.tsx`

```typescript
import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn('bg-white rounded-lg shadow-md p-6', className)}>
      {children}
    </div>
  );
};
```

### Шаг 3.4: Бейдж (Badge)

**Создать файл:** `src/components/ui/Badge.tsx`

```typescript
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

export const Badge = ({ children, variant = 'default', className }: BadgeProps) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
```

**Проверить:** Сохранить все файлы, ошибок быть не должно

---

## 📄 Этап 4: Создать первую страницу (1-2 часа)

### Шаг 4.1: Простая страница Dashboard

**Создать файл:** `src/pages/Dashboard.tsx`

```typescript
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const Dashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2">Грузовики</h3>
          <p className="text-3xl font-bold text-blue-600">50</p>
          <Badge variant="success" className="mt-2">Активных: 45</Badge>
        </Card>
        
        <Card>
          <h3 className="text-lg font-semibold mb-2">Водители</h3>
          <p className="text-3xl font-bold text-green-600">48</p>
          <Badge variant="success" className="mt-2">На маршруте: 30</Badge>
        </Card>
        
        <Card>
          <h3 className="text-lg font-semibold mb-2">Активные рейсы</h3>
          <p className="text-3xl font-bold text-purple-600">25</p>
          <Badge variant="warning" className="mt-2">Требуют внимания: 3</Badge>
        </Card>
      </div>
      
      <Card>
        <h2 className="text-xl font-semibold mb-4">Быстрые действия</h2>
        <div className="flex gap-4">
          <Button>Создать рейс</Button>
          <Button variant="outline">Просмотреть карту</Button>
        </div>
      </Card>
    </div>
  );
};
```

### Шаг 4.2: Обновить App.tsx

**Открыть файл:** `src/App.tsx`

**Заменить всё содержимое на:**
```typescript
import { Dashboard } from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard />
    </div>
  );
}

export default App;
```

**Проверить:** `npm run dev` - должна открыться страница Dashboard с карточками

---

## 🗺 Этап 5: Добавить карту (3-4 часа)

### Шаг 5.1: Установить Leaflet

```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet
```

### Шаг 5.2: Добавить CSS Leaflet

**Открыть файл:** `src/main.tsx` или `src/index.tsx`

**Добавить в начало (после других импортов):**
```typescript
import 'leaflet/dist/leaflet.css';
```

### Шаг 5.3: Создать простую карту

**Создать файл:** `src/components/SimpleMap.tsx`

```typescript
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Фикс для иконок маркеров
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export const SimpleMap = () => {
  const center: [number, number] = [55.7558, 37.6173]; // Москва

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border">
      <MapContainer
        center={center}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={center}>
          <Popup>
            Тестовая точка
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
```

### Шаг 5.4: Добавить карту на Dashboard

**Обновить файл:** `src/pages/Dashboard.tsx`

```typescript
import { SimpleMap } from '../components/SimpleMap';
// ... остальные импорты

export const Dashboard = () => {
  return (
    <div className="p-8">
      {/* ... существующие карточки ... */}
      
      <Card className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Карта</h2>
        <SimpleMap />
      </Card>
    </div>
  );
};
```

**Проверить:** Карта должна отображаться на странице

---

## 📋 Этап 6: Создать список стопов (3-4 часа)

### Шаг 6.1: Создать моки данных

**Создать файл:** `src/data/mockData.ts`

```typescript
import { Stop } from '../types';

export const mockStops: Stop[] = [
  {
    id: '1',
    order: 1,
    type: 'pickup',
    address: 'Москва, ул. Ленина, 1',
    location: { lat: 55.7558, lng: 37.6173 },
    timeWindow: {
      start: '2024-01-15T08:00:00',
      end: '2024-01-15T10:00:00',
    },
    status: 'planned',
  },
  {
    id: '2',
    order: 2,
    type: 'delivery',
    address: 'Москва, ул. Пушкина, 10',
    location: { lat: 55.7520, lng: 37.6156 },
    timeWindow: {
      start: '2024-01-15T12:00:00',
      end: '2024-01-15T14:00:00',
    },
    status: 'planned',
  },
  {
    id: '3',
    order: 3,
    type: 'delivery',
    address: 'Москва, ул. Гагарина, 5',
    location: { lat: 55.7580, lng: 37.6200 },
    timeWindow: {
      start: '2024-01-15T15:00:00',
      end: '2024-01-15T17:00:00',
    },
    status: 'planned',
  },
];
```

### Шаг 6.2: Создать карточку стопа

**Создать файл:** `src/components/StopCard.tsx`

```typescript
import { Stop } from '../types';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

interface StopCardProps {
  stop: Stop;
  isSelected?: boolean;
  onClick?: () => void;
}

export const StopCard = ({ stop, isSelected, onClick }: StopCardProps) => {
  const getStatusColor = (status: Stop['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'en_route':
        return 'default';
      case 'arrived':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card
      className={`cursor-pointer hover:shadow-lg transition-shadow ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">#{stop.order}</span>
            <Badge variant={stop.type === 'pickup' ? 'default' : 'success'}>
              {stop.type === 'pickup' ? 'Погрузка' : 'Разгрузка'}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mt-1">{stop.address}</p>
        </div>
        <Badge variant={getStatusColor(stop.status)}>
          {stop.status}
        </Badge>
      </div>
      
      <div className="text-sm text-gray-500">
        <p>
          Окно времени: {new Date(stop.timeWindow.start).toLocaleTimeString('ru-RU', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })} - {new Date(stop.timeWindow.end).toLocaleTimeString('ru-RU', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </Card>
  );
};
```

### Шаг 6.3: Создать список стопов

**Создать файл:** `src/components/StopList.tsx`

```typescript
import { Stop } from '../types';
import { StopCard } from './StopCard';

interface StopListProps {
  stops: Stop[];
  selectedStopId?: string;
  onStopSelect?: (stopId: string) => void;
}

export const StopList = ({ stops, selectedStopId, onStopSelect }: StopListProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Список стопов ({stops.length})</h2>
      {stops.map((stop) => (
        <StopCard
          key={stop.id}
          stop={stop}
          isSelected={stop.id === selectedStopId}
          onClick={() => onStopSelect?.(stop.id)}
        />
      ))}
    </div>
  );
};
```

### Шаг 6.4: Создать страницу редактора манифеста

**Создать файл:** `src/pages/ManifestEditor.tsx`

```typescript
import { useState } from 'react';
import { StopList } from '../components/StopList';
import { SimpleMap } from '../components/SimpleMap';
import { mockStops } from '../data/mockData';
import { Stop } from '../types';

export const ManifestEditor = () => {
  const [stops] = useState<Stop[]>(mockStops);
  const [selectedStopId, setSelectedStopId] = useState<string | undefined>();

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Левая панель - список стопов */}
      <div className="w-96 bg-white border-r overflow-y-auto p-4">
        <StopList
          stops={stops}
          selectedStopId={selectedStopId}
          onStopSelect={setSelectedStopId}
        />
      </div>

      {/* Центральная панель - карта */}
      <div className="flex-1 p-4">
        <div className="h-full">
          <SimpleMap />
        </div>
      </div>

      {/* Правая панель - детали (пока пустая) */}
      <div className="w-96 bg-white border-l p-4">
        {selectedStopId ? (
          <div>
            <h3 className="text-lg font-semibold mb-4">Детали стопа</h3>
            <p className="text-gray-600">
              Выбран стоп: {selectedStopId}
            </p>
          </div>
        ) : (
          <div className="text-gray-500">
            Выберите стоп для просмотра деталей
          </div>
        )}
      </div>
    </div>
  );
};
```

### Шаг 6.5: Добавить роутинг

```bash
npm install react-router-dom
```

**Обновить файл:** `src/App.tsx`

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { ManifestEditor } from './pages/ManifestEditor';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/editor" element={<ManifestEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

**Обновить Dashboard:** добавить ссылку на редактор

```typescript
import { Link } from 'react-router-dom';
// ... в JSX добавить:
<Link to="/editor">
  <Button>Открыть редактор манифеста</Button>
</Link>
```

**Проверить:** 
- Открыть http://localhost:5173
- Нажать "Открыть редактор манифеста"
- Должен открыться трехпанельный layout с картой и списком стопов

---

## ✅ Чеклист готовности

После выполнения всех шагов у вас должно быть:

- [x] Работающий React проект
- [x] Tailwind CSS настроен
- [x] Базовые UI компоненты (Button, Input, Card, Badge)
- [x] Страница Dashboard
- [x] Карта (Leaflet) работает
- [x] Список стопов отображается
- [x] Трехпанельный layout готов
- [x] Выбор стопа работает

---

## 🎯 Что дальше?

После базового функционала можно добавить:

1. **Drag & Drop** для изменения порядка стопов
2. **Отображение маркеров на карте** для каждого стопа
3. **Построение маршрута** между стопами
4. **Редактирование стопов** в правой панели
5. **Подключение к backend API** (когда будет готов)

---

## 📝 Полезные команды для Mac

```bash
# Запуск dev сервера
npm run dev

# Сборка проекта
npm run build

# Просмотр собранного
npm run preview

# Установка новой библиотеки
npm install название-библиотеки

# Проверка TypeScript ошибок
npm run build  # покажет ошибки

# Просмотр структуры папок
tree -L 3  # если установлен tree
# или
find src -type d | head -20

# Открыть файл в редакторе (VS Code)
code src/components/ui/Button.tsx
```

---

## 🐛 Если что-то не работает

1. **Проверить консоль браузера** (Cmd + Option + I) - там ошибки
2. **Проверить терминал** - там ошибки сборки
3. **Перезапустить dev сервер** - `Ctrl + C` (или `Cmd + C`), потом `npm run dev`
4. **Очистить кеш** - удалить папку `node_modules` и `package-lock.json`, затем `npm install`
5. **Проверить права доступа** - если ошибки с правами, использовать `sudo` (осторожно!)

---

## 🔑 Отличия от Windows

✅ **Все команды одинаковые** - npm работает одинаково  
✅ **Пути используют `/`** вместо `\`  
✅ **`mkdir -p`** создает вложенные папки автоматически  
✅ **Остановка сервера:** `Cmd + C` вместо `Ctrl + C`  
✅ **Открыть консоль браузера:** `Cmd + Option + I`  

---

**Готово! Начните с Этапа 0 и следуйте по порядку. Каждый шаг проверяйте перед переходом к следующему! 🚀**

