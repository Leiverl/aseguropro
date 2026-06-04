# VelmacSafe — AGENTS.md

## Launch

```bash
cd backend && npm start        # Express :3001 (start first)
cd backend && npm run dev      # node --watch on :3001
cd web     && npm run dev      # Vite :5173, proxies /api -> :3001
cd mobile  && npx expo start   # Expo Go (QR for phone)
```

## Layout

| Dir | Stack | Entrypoint |
|-----|-------|------------|
| `backend/` | Express + **sql.js** (pure JS SQLite) | `src/index.js` |
| `web/` | React 18 + Vite + react-router-dom v6 | `src/main.jsx` |
| `mobile/` | RN 0.81.5 + Expo SDK 54 + @react-navigation v7 | `App.js` |

## Database

- **sql.js**, not better-sqlite3. File at `backend/velmacsafe.db` (gitignored, auto-created by seed).
- Wrapper `backend/src/database.js`: `queryAll(sql, params)`, `queryOne(sql, params)`, `execute(sql, params)` → `{ changes, lastInsertRowid }`, `execRaw(sql)` for DDL.
- **Writes auto-persist** via `saveDb()`. If using `db.exec()` directly, call `saveDb()` after.
- `initDb()` must resolve before routes — done at top of `index.js`.
- **Seed is destructive**: wipes all rows + resets autoincrement. Runs via `postinstall` or `cd backend && npm run seed`.
- Demo: `demo@email.com` / `demo123` — 12 plans (6 types × 2).
- Railway filesystem is ephemeral. DB lost on restart/redeploy; seed re-runs on deploy so demo data is fresh but user data resets.

## Web

- Vite proxy `/api` → `:3001` in dev. Prod uses `VITE_API_URL` env var.
- API client `src/api.js` — bare `fetch`, JWT in `localStorage`, `Authorization: Bearer` header.
- Theme: `[data-theme]` on `<html>` + CSS vars, persisted in `localStorage`.
- Chatbot `src/components/Chatbot.jsx` — client-side keyword matching, no backend.

## Mobile

- API **hardcoded** to `https://avelmacsafe-production.up.railway.app/api` in `src/services/api.js` — no local dev fallback.
- Theme: `ThemeContext` + `AsyncStorage`. **Defaults to dark**. Toggle in Dashboard.
- Navigation: Stack for auth (Login/Register), BottomTabs for main (Inicio, Planes, Cotizar, Citas, Cuenta).
- Install: `npm install --legacy-peer-deps` (React 19 + Expo 54 version conflicts).
- `src/components/` and `src/assets/` are empty — create dirs as needed.
- **Mobile API missing `updateAppointment`** (PUT) — web has it, mobile `api.js` only has create and delete.

## API routes (prefix `/api`)

| Path | Auth | Notes |
|------|------|-------|
| `auth/register`, `auth/login`, `auth/me` | No | JWT (7d expiry, fallback secret `velmacsafe-secret-key-2024`) |
| `plans/`, `plans/student`, `plans/:id` | No | `GET /plans?type=health\|auto\|home\|life\|travel\|student` |
| `appointments/` | Yes | Full CRUD, scoped to user |
| `quotes/` | Yes | POST (plan_type, coverage_amount, age) |
| `policies/`, `policies/:id/cancel` | Yes | POST to buy, PUT to cancel |
| `health` | No | `{ status: 'ok' }` |

## Deployment

- Backend on Railway: root `backend/`, uses `railway.json` (Nixpacks), healthcheck `GET /api/plans`. Env vars set in Railway dashboard (`PORT`, `JWT_SECRET`). `.env` is gitignored; `.env.example` committed as template.
- Web on Vercel: root `web`, env `VITE_API_URL=https://avelmacsafe-production.up.railway.app/api`
- Mobile: Expo Go or EAS build.

## Gotchas

- **No tests or typecheck** — manual verification only.
- **Prettier** at root (`.prettierrc`), **EditorConfig** (`.editorconfig`).
- **Backend validation** via `middleware/validate.js` (`required(...fields)` middleware).
- **CI** at `.github/workflows/ci.yml` — runs `npm ci` + build on push/PR.
- **Redeploy**: Railway deploys `backend/` on push; Vercel deploys `web/` on push.
- **Port conflicts (Windows):** `Get-NetTCPConnection -LocalPort 3001 | Stop-Process -Id OwningProcess`
- **Expo SDK 54:** no `"main"` in `package.json`; Expo auto-detects `App.js`.
- **CORS** wide open (`cors()` with no options). On platforms that strip CORS headers (e.g. Shiper), use explicit config.
- **favicon** is inline SVG data URI in `web/index.html`.
