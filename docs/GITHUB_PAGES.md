# Публикация на GitHub Pages

Сайт собирается из папки `web/` и выкладывается через GitHub Actions.

## 1. Репозиторий на GitHub

1. Создайте **новый пустой** репозиторий на [github.com](https://github.com/new) (без README, без .gitignore).
2. Имя репозитория важно: сайт будет по адресу  
   `https://<ваш-логин>.github.io/<имя-репозитория>/`  
   Например, репозиторий `presson` → `https://username.github.io/presson/`

## 2. Загрузка кода

В PowerShell из папки проекта (`presson`):

```powershell
git init
git add .
git commit -m "Initial commit: Press-On redesign"
git branch -M main
git remote add origin https://github.com/<ВАШ-ЛОГИН>/<ИМЯ-РЕПО>.git
git push -u origin main
```

## 3. Включить GitHub Pages

1. Репозиторий → **Settings** → **Pages**
2. **Build and deployment** → Source: **GitHub Actions**
3. После push в `main` откройте вкладку **Actions** — workflow «Deploy to GitHub Pages» должен завершиться зелёным.
4. Через 1–2 минуты сайт откроется по ссылке из Settings → Pages или из job «Deploy».

## Локальная проверка «как на Pages»

```powershell
cd web
$env:VITE_BASE_PATH="/presson/"
npm run build
npm run preview
```

Подставьте своё имя репозитория вместо `presson`.

## Заметки

- Маршруты (`/about`, `/portfolio` и т.д.) работают за счёт `404.html` (копия `index.html`).
- Медиа и ассеты учитывают `base` через `import.meta.env.BASE_URL`.
- Повторный деплой: любой `git push` в `main`.
