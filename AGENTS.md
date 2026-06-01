# SeguroPro — AGENTS.md

## Launch

```bash
cd backend && npm start           # Express on :3001 (start first)
cd web     && npm run dev         # Vite on :5173, proxies /api -> :3001
cd mobile  && npx expo start      # Expo (QR for phone)
```

## Project structure

| Dir | Tech | Entrypoint |
|-----|------|------------|
| `backend/` | Express + **sql.js** (pure JS SQLite, not better-sqlite3) | `src/index.js` |
| `web/` | React 18 + Vite + react-router-dom v6 | `src/main.jsx` |
| `mobile/` | RN 0.81.5 + Expo SDK 54 + @react-navigation v7 | `App.js` |

## Database (`sql.js`)

- File: `backend/aseguradora.db` (gitignored, auto-created by seed/postinstall)
- Wrapper in `backend/src/database.js`:
  - `queryAll(sql, params)` → array of rows
  - `queryOne(sql, params)` → single row or null
  - `execute(sql, params)` → `{ changes, lastInsertRowid }` (calls `saveDb()`)
  - `execRaw(sql)` → for schema DDL (calls `saveDb()`)
  - `initDb()` must resolve before requests hit routes (done at top of `index.js`)
- **Writes auto-persist** via `saveDb()` inside `execute`/`execRaw`. If adding raw `db.exec()` calls, call `saveDb()` after.
- Seed creates 12 plans + demo user. Runs on `postinstall` in Railway, or manually: `cd backend && npm run seed`.
- Demo: `demo@email.com` / `demo123`

## Web

- Vite proxy `/api` → `:3001` in dev. Prod uses `VITE_API_URL` env var.
- API client at `src/api.js` — bare `fetch` wrapper, no axios.
- Auth: JWT in `localStorage`, `Authorization: Bearer` header.
- Theme: `[data-theme]` on `<html>` + CSS vars, persisted in `localStorage`. Toggle in Navbar.
- Chatbot at `src/components/Chatbot.jsx` — client-side rule-based, no backend.

## Mobile

- API hardcoded to Railway URL (`src/services/api.js`). No local IP needed.
- Auth: JWT in `AsyncStorage`.
- Theme: `ThemeContext` + `AsyncStorage` persistence. Toggle in Dashboard screen.
- Navigation: `React Navigation` — Stack for auth flow, BottomTabs for main.
- Install with `--legacy-peer-deps` due to version conflicts (Expo 54 + RN 0.81.5 + React 19).

## API routes (all prefixed `/api`)

- `auth/register`, `auth/login`, `auth/me` — JWT auth
- `plans/` (filter `?type=health|auto|home|life|travel|student`), `plans/student`, `plans/:id`
- `appointments/` — CRUD, user-scoped (auth required)
- `quotes/` — POST to calculate premium (auth required)
- `policies/` — GET/POST, `PUT /:id/cancel` (auth required)

## Deployment

- Backend on Railway: `backend/railway.json` configures Nixpacks, `postinstall` runs seed.
- Web on Vercel: root dir `web`, env `VITE_API_URL=https://aseguropro-production.up.railway.app/api`
- Mobile: local Expo Go or build via EAS.

## Gotchas

- **Port conflicts on Windows:** `Get-NetTCPConnection -LocalPort 3001 | Stop-Process -Id OwningProcess`
- **No tests or typechecking configured** — only manual verification.
- **Expo SDK 54:** no `"main"` in `package.json`; Expo auto-detects `App.js`.
- **favicon** is an inline SVG data URI in `web/index.html`.
