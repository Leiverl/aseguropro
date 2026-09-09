# VelmacSafe

Plataforma digital de seguros — Web, Backend y App Móvil.

## Stack

| Componente | Tecnología |
|------------|------------|
| **Backend** | Express + sql.js (SQLite puro) |
| **Web** | React 18 + Vite + react-router-dom v6 |
| **Mobile** | React Native 0.81.5 + Expo SDK 54 + @react-navigation v7 |
| **Auth** | JWT (7d expiry) |
| **DB** | `backend/velmacsafe.db` (auto-creada por seed) |

## Inicio Rápido

```bash
# Backend (Express :3001)
cd backend && npm run dev

# Web (Vite :5173, proxy /api -> :3001)
cd web && npm run dev

# Mobile (Expo Go)
cd mobile && npx expo start
```

## Demo

| Credencial | Valor |
|------------|-------|
| Email | `demo@email.com` |
| Contraseña | `demo123` |

12 planes precargados (6 tipos × 2 variantes).

## Estructura

```
aseguradora/
├── backend/          # Express + sql.js
│   ├── src/
│   │   ├── index.js         # Servidor + rutas API
│   │   ├── database.js      # Wrapper sql.js (queryAll, queryOne, execute)
│   │   ├── seed.js          # Datos demo (destructivo)
│   │   ├── routes/          # auth, plans, appointments, quotes, policies
│   │   └── middleware/      # validate.js
│   └── railway.json         # Config Railway
├── web/              # React 18 + Vite
│   ├── src/
│   │   ├── components/      # Navbar, Footer, Chatbot, Icon, Toast, ConfirmDialog, SkipLink
│   │   ├── pages/           # Home, Plans, Quote, Appointment, Login, Register, Dashboard
│   │   ├── context/         # AuthContext, ThemeContext
│   │   └── api.js           # Cliente fetch + JWT
│   └── vercel.json          # Config Vercel
├── mobile/           # React Native + Expo
│   ├── src/
│   │   ├── screens/         # Login, Register, Home, Plans, Quote, Appointment, Dashboard
│   │   ├── services/        # api.js (hardcodeado a Railway)
│   │   └── navigation/      # Stack (auth) + BottomTabs (main)
│   └── app.json             # Config Expo
└── docs/             # Documentación
```

## API Routes (`/api`)

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/auth/register` | No | Registro |
| POST | `/auth/login` | No | Login |
| GET | `/auth/me` | Sí | Usuario actual |
| GET | `/plans` | No | Lista planes (`?type=...`) |
| GET | `/plans/student` | No | Planes estudiantiles |
| GET | `/plans/:id` | No | Detalle plan |
| GET | `/appointments` | Sí | CRUD citas (scoped a usuario) |
| POST | `/appointments` | Sí | Crear cita |
| DELETE | `/appointments/:id` | Sí | Eliminar cita |
| POST | `/quotes` | Sí | Cotizar |
| POST | `/policies` | Sí | Contratar póliza |
| PUT | `/policies/:id/cancel` | Sí | Cancelar póliza |
| GET | `/health` | No | Health check |

## Despliegue

| Plataforma | Directorio | Trigger |
|------------|------------|---------|
| **Railway** | `backend/` | Push a `master` |
| **Vercel** | `web/` | Push a `master` |
| **Expo/EAS** | `mobile/` | Manual |



## Comandos Útiles

```bash
# Seed backend (destructivo)
cd backend && npm run seed

# Lint (prettier)
cd backend && npm run lint
cd web && npm run lint

# Build web
cd web && npm run build

# Ver logs Railway
railway logs
```

## Licencia

Proyecto privado — VelmacSafe 2026
