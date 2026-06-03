# SeguroPro — AGENTS.md

## Launch

```bash
cd backend && npm start           # Express on :3001 (start first)
cd backend && npm run dev         # same but with node --watch (Node 18+)
cd web     && npm run dev         # Vite on :5173, proxies /api -> :3001
cd mobile  && npx expo start      # Expo Go (QR for phone)
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
- **Writes auto-persist** via `saveDb()`. If using raw `db.exec()`, call `saveDb()` after.
- **Seed is destructive** — re-running deletes all existing data first. Runs via `postinstall` or manually: `cd backend && npm run seed`.
- Demo: `demo@email.com` / `demo123` — 12 plans (6 types × 2 each).
- **Ephemeral storage**: Railway filesystem is not persistent. The `.db` file is lost on restart/redeploy. Seed re-runs on deploy so demo data is always fresh, but any user registrations, appointments, etc. are reset. For real persistence, migrate to PostgreSQL.

## Web

- Vite proxy `/api` → `:3001` in dev. Prod uses `VITE_API_URL` env var.
- API client at `src/api.js` — bare `fetch` wrapper, no axios. JWT in `localStorage`, `Authorization: Bearer` header.
- Theme: `[data-theme]` on `<html>` + CSS vars, persisted in `localStorage`. Toggle in Navbar.
- Chatbot at `src/components/Chatbot.jsx` — client-side keyword matching, no backend.

## Mobile

- API hardcoded to Railway URL in `src/services/api.js` — no local dev fallback.
- Theme: `ThemeContext` + `AsyncStorage` persistence. **Defaults to dark**. Toggle in Dashboard.
- Navigation: Stack for auth flow (Login/Register), BottomTabs for main (5 tabs: Inicio, Planes, Cotizar, Citas, Cuenta).
- Install: `npm install --legacy-peer-deps` (Expo 54 + RN 0.81.5 + React 19 version conflicts).
- `src/components/` and `src/assets/` are empty — create dirs as needed.

## API routes (all prefixed `/api`)

| Path | Auth | Notes |
|------|------|-------|
| `auth/register`, `auth/login`, `auth/me` | — | JWT (7d expiry, fallback secret `.env`) |
| `plans/`, `plans/student`, `plans/:id` | No | `GET /plans?type=health\|auto\|home\|life\|travel\|student` |
| `appointments/` | Yes | Full CRUD, scoped to user |
| `quotes/` | Yes | POST to calculate premium (plan_type, coverage_amount, age) |
| `policies/`, `policies/:id/cancel` | Yes | POST to buy, PUT to cancel |
| `health` | No | `{ status: 'ok', service: 'Aseguradora API', version: '1.0.0' }` |

## Deployment

- Backend on Railway: root dir `backend/`, uses `railway.json` (Nixpacks builder), healthcheck `GET /api/plans`. Env vars set in Railway dashboard (`PORT`, `JWT_SECRET`). `.env` is gitignored.
- Web on Vercel: root dir `web`, env `VITE_API_URL=https://aseguropro-production.up.railway.app/api`
- Mobile: Expo Go or EAS build.

## Gotchas

- **No tests, lint, formatter, or typechecking** in any package — manual verification only.
- **Seed wipes data** on every run (deletes all rows + resets autoincrement).
- **Port conflicts (Windows):** `Get-NetTCPConnection -LocalPort 3001 | Stop-Process -Id OwningProcess`
- **Expo SDK 54:** no `"main"` in `package.json`; Expo auto-detects `App.js`.
- **CORS** is wide open (`app.use(cors())` no options). If deploying on a platform that strips CORS headers (e.g. Shiper), use explicit `cors({ origin: true, credentials: true, methods: [...], allowedHeaders: [...] })`.
- **favicon** is inline SVG data URI in `web/index.html`.
