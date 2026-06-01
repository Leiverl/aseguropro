# SeguroPro — AGENTS.md

## Launch order

Backend must be running before web or mobile.

```bash
cd backend && npm start           # Express on :3001
cd web     && npm run dev         # Vite on :5173, proxies /api -> :3001
cd mobile  && npm start           # Expo
```

## Database

- **sql.js** (pure JS SQLite, no native deps). Not `better-sqlite3`.
- File: `backend/aseguradora.db` (auto-created by seed.js).
- Custom async wrapper in `backend/src/database.js` exporting `{ initDb, queryAll, queryOne, execute, execRaw }`.
- `initDb()` must resolve before any request hits the routes (called at the top of `src/index.js` before `app.listen`).
- After writes, call `saveDb()` to persist the in-memory DB to disk.

## Seed

```bash
cd backend && npm run seed
```

Creates 12 plans (health, auto, home, life, travel, student) and a demo user.

**Demo account:** `demo@email.com` / `demo123`

Resets auto-increment counters via `DELETE FROM sqlite_sequence`.

## Project structure

| Directory | Tech | Entrypoint |
|-----------|------|------------|
| `backend/` | Express + sql.js | `src/index.js` |
| `web/` | React 18 + Vite + react-router-dom v6 | `src/main.jsx` |
| `mobile/` | React Native (0.81) + Expo SDK 54 + @react-navigation | `App.js` |

## API routes (all prefixed `/api`)

- `auth/register`, `auth/login`, `auth/me` — JWT auth, token in `Authorization: Bearer ...`
- `plans/`, `plans/student`, `plans/:id` — includes query filter `?type=health|auto|home|life|travel|student`
- `appointments/` — CRUD, user-scoped (auth required)
- `quotes/` — POST to calculate premium (auth required)
- `policies/` — GET/POST, `PUT /:id/cancel` (auth required)

## Theme (claro / oscuro)

- **Web:** Botón en navbar (☀️/🌙). Persiste en `localStorage`. CSS variables via `[data-theme]` en `<html>`.
- **Mobile:** Botón en pantalla Dashboard (`Cuenta`). Persiste en `AsyncStorage`. StatusBar y NavigationContainer se adaptan automáticamente; las screens individuales usan `useTheme()` para colores dinámicos. Dashboard es referencia de implementación.

## Key gotchas

- **sql.js:** `db.exec("SELECT last_insert_rowid()")` returns `[{ columns: ['id'], values: [[N]] }]`, not a single row. Use the wrapper's `execute()` which returns `{ changes, lastInsertRowid }`.
- **Web Vite:** Proxies `/api` to `:3001`. No CORS issues in dev.
- **Mobile:** API_URL uses Platform check; set `DEVICE_IP` in `src/services/api.js` to your PC's local IP (run `ipconfig`).
- **Port conflicts:** Kill lingering `:3001` with `Get-NetTCPConnection -LocalPort 3001 | Stop-Process -Id OwningProcess`.
- **No tests or typechecking configured.** Only verification is `npm start` + manual endpoint calls.
