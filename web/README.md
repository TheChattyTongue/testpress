# ПРЕСС-ОН — редизайн сайта

Современный одностраничный интерфейс с маршрутами (React + Vite + Tailwind CSS).

## Запуск

```bash
cd web
npm install
npm run dev
```

Сборка для production:

```bash
npm run build
npm run preview
```

## Стек

- React 19, React Router
- Tailwind CSS 4
- Framer Motion, Embla Carousel
- Radix UI Dialog
- Lucide Icons

Медиафайлы с [press-on.ru](https://www.press-on.ru) лежат в `public/media/`.

## Анимации (бесплатные аналоги React Bits Pro)

Установлены компоненты из открытой библиотеки [React Bits](https://reactbits.dev) (MIT) через `jsrepo`:

| React Bits Pro | Что используем | Где на сайте |
| --- | --- | --- |
| [Preloader](https://pro.reactbits.dev/docs/components/preloader) | `StairsPreloader` + `SiteBootLoader` (свой код, стиль «лестница») | первый заход за сессию (`App.tsx`) |
| [Modal Cards](https://pro.reactbits.dev/docs/components/modal-cards) | `ModalCards` (Framer Motion `layoutId`) | блок «Примеры работ» на главной |
| [Axial Beam](https://pro.reactbits.dev/docs/components/axial-beam) | `LightRays` из React Bits | hero главной, шапки внутренних страниц |
| [Wave Lettering](https://pro.reactbits.dev/docs/components/wave-lettering) | **`SplitText`** (React Bits, MIT) — `effect="wave"` + `hoverEffect="wave"`; полноценный Wave Lettering только в Pro | заголовок «Факты о компании» |
| [Blur Highlight](https://pro.reactbits.dev/docs/components/blur-highlight) | `BlurHighlight` (свой код) | страница «О компании» |
| [Tile Reveal](https://pro.reactbits.dev/docs/components/tile-reveal) | `TileReveal` (свой код, не подключён) | — |

Дополнительно в `src/components/react-bits/` лежат: `BlurText`, `Beams`, `SplitText`, `PixelSwap`, `LatticeLoader`, `SpotlightCard` — можно подключать в других секциях.

Добавить ещё компоненты из каталога:

```bash
cd web
npx jsrepo add <Имя-TS-TW> --yes
```

Пример: `npx jsrepo add Aurora-TS-TW --yes`. Пути заданы в `jsrepo.config.ts` (`component` → `src/components/react-bits`).
