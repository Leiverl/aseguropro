# VelmacSafe — Manual de Usuario

## Índice

1. [Introducción](#1-introducción)
2. [Acceso a la Plataforma](#2-acceso-a-la-plataforma)
3. [Página Principal](#3-página-principal)
4. [Planes de Seguro](#4-planes-de-seguro)
5. [Cotización](#5-cotización)
6. [Agendar Citas](#6-agendar-citas)
7. [Dashboard / Mis Pólizas](#7-dashboard--mis-pólizas)
8. [Chat Virtual](#8-chat-virtual)
9. [Modo Oscuro / Claro](#9-modo-oscuro--claro)
10. [App Móvil](#10-app-móvil)
11. [Créditos Demo](#11-créditos-demo)

---

## 1. Introducción

**VelmacSafe** es una plataforma digital de seguros que permite a los usuarios:

- Explorar planes de seguro (Salud, Auto, Hogar, Vida, Viajes, Estudiantes).
- Cotizar primas personalizadas en segundos.
- Agendar citas con asesores certificados.
- Contratar pólizas y darles seguimiento.
- Recibir asistencia virtual por chat.

> **Web:** se despliega automáticamente en Vercel.
> **Backend:** se despliega en Railway (Express + SQLite).
> **App Móvil:** Expo Go o EAS Build (Android/iOS).

---

## 2. Acceso a la Plataforma

### 2.1 Web (Navegador)

URL de producción: *[pendiente — Vercel]*

Para desarrollo local:

```bash
cd backend && npm run dev   # Express en :3001
cd web     && npm run dev   # Vite en :5173
```

Luego abrir `http://localhost:5173` en el navegador.

### 2.2 App Móvil (Expo)

```bash
cd mobile && npx expo start
```

Escanea el código QR con Expo Go (Android/iOS).

### 2.3 Registro

1. Haz clic en **"Registrarse"** (esquina superior derecha).
2. Completa: nombre completo, email, teléfono y contraseña (mín. 6 caracteres).
3. Haz clic en **"Crear Cuenta"**.
4. Serás redirigido automáticamente al Dashboard.

### 2.4 Inicio de Sesión

1. Haz clic en **"Ingresar"**.
2. Ingresa tu email y contraseña.
3. Haz clic en **"Ingresar"**.

> **Demo:** `demo@email.com` / `demo123`

---

## 3. Página Principal

La página principal (`/`) está compuesta por las siguientes secciones:

| Sección | Descripción |
|---------|-------------|
| **Hero** | Imagen de fondo panorámica con llamado a la acción "Cotiza Ahora" y estadísticas (50K+ clientes, 98% aprobación, 24/7 soporte). |
| **Tipos de Seguro** | 6 tarjetas con imagen representativa + icono SVG y descripción. |
| **Planes Destacados** | Los 4 planes más populares con precio y beneficios. |
| **Planes Estudiantiles** | Sección con imagen lateral y lista de beneficios para estudiantes. |
| **Cotización** | Vista previa del cotizador con barra de progreso. |
| **Asesores** | 3 tarjetas con foto, nombre, especialidad y botón para agendar cita. |
| **Testimonios** | Carrusel con reseñas de clientes y estrellas. |
| **CTA Final** | Llamado a crear cuenta gratis con imagen de fondo. |

### 3.1 Navegación

El navbar superior contiene:

- **Logo** → Inicio
- **Inicio** → Home
- **Planes** → Lista de todos los planes
- **Estudiantes** → Planes estudiantiles
- **Cotizar** → Cotizador personalizado
- **Agendar Cita** → Formulario de citas
- **☀/🌙** → Alternar modo oscuro/claro
- **Ingresar / Registrarse** → Auth (según estado)
- **Avatar** → Dashboard (cuando has iniciado sesión)

> En móvil, el menú se colapsa en un botón hamburguesa con animación de expansión.

---

## 4. Planes de Seguro

Ruta: `/plans`

### 4.1 Filtros

Usa los botones de filtro para ver planes por tipo:

| Botón | Tipo |
|-------|------|
| Todos | Muestra todos los planes |
| Salud | Seguros médicos |
| Auto | Seguros vehiculares |
| Hogar | Seguros de hogar |
| Vida | Seguros de vida |
| Viajes | Asistencia en viajes |
| Estudiantes | Planes estudiantiles |

### 4.2 Tarjeta de Plan

Cada plan muestra:

- **Badge "Más contratado"** (solo en los 3 planes más populares).
- **Nombre** del plan.
- **Descripción** breve.
- **Cobertura** incluida.
- **Precio mensual** en MXN.
- **Beneficios** etiquetados.
- **Botón "Contratar"** (requiere inicio de sesión).

### 4.3 Planes Estudiantiles

Ruta: `/plans/student`

Tabla comparativa con dos planes (Básico $9.99/mes y Completo $19.99/mes). Incluye coberturas detalladas con checkmarks. El más popular se marca con un badge.

---

## 5. Cotización

Ruta: `/quote`

1. Selecciona el **tipo de seguro** (Salud, Auto, Hogar, Vida, Viajes, Estudiantes).
2. Ingresa tu **edad**.
3. Selecciona el **monto de cobertura** deseado.
4. Haz clic en **"Cotizar"**.
5. La cotización muestra:
   - Prima mensual estimada.
   - Deducible sugerido.
   - Cobertura máxima.
   - Desglose de costos en tabla.

> El resultado incluye un botón **"Contratar Ahora"** que redirige al pago/flujo de contratación.

---

## 6. Agendar Citas

Ruta: `/appointment`

### 6.1 Agendar Nueva Cita

1. Selecciona un **asesor** del menú desplegable.
2. Aparece información del asesor seleccionado (rol y especialidades).
3. Elige una **fecha** (no puede ser anterior al día actual).
4. Elige un **horario** disponible (bloques de 30 min de 9:00 a 16:30).
5. Agrega **notas** opcionales.
6. Haz clic en **"Agendar Cita"**.
7. Confirmación vía toast + la cita aparece en "Mis Citas".

### 6.2 Cancelar Cita

1. En "Mis Citas", identifica la cita a cancelar.
2. Haz clic en **"Cancelar Cita"** (icono de papelera).
3. Aparece un diálogo de confirmación.
4. Confirma y la cita se elimina + toast de confirmación.

---

## 7. Dashboard / Mis Pólizas

Ruta: `/dashboard` (requiere autenticación)

### 7.1 Resumen

- **Pólizas Activas**: número de pólizas contratadas.
- **Citas Pendientes**: número de citas en estado pendiente.

### 7.2 Mis Pólizas

Lista de pólizas contratadas con:

- Nombre del plan e icono.
- Tipo de seguro.
- Fechas de inicio y fin.
- Precio mensual con formato MXN.
- Estado (Activa / Cancelada) con badge de color.

### 7.3 Mis Citas

Lista de citas agendadas (máx. 5 visibles en dashboard):

- Nombre del asesor.
- Fecha y hora.
- Estado (Pendiente / Confirmada) con badge.
- Botón para ir a "Agendar Cita".

### 7.4 Acciones Rápidas

Tres tarjetas con iconos:

| Tarjeta | Acción |
|---------|--------|
| Cotizar | Ir al cotizador |
| Agendar Cita | Ir a citas |
| Ver Planes | Ir a planes |

---

## 8. Chat Virtual

Flotante en la esquina inferior derecha de todas las páginas.

### 8.1 Cómo Usarlo

1. Haz clic en el botón circular con icono de chat.
2. Se abre un panel con el historial de la conversación.
3. Escribe tu mensaje en el campo de texto.
4. Presiona **Enter** o el botón de enviar.
5. El asistente responde por comparación de palabras clave.

### 8.2 Preguntas Frecuentes

El asistente reconoce estas intenciones:

| Palabras clave | Respuesta |
|----------------|-----------|
| hola, buenas | Saludo inicial |
| plan, seguro, producto | Lista los 6 tipos de seguro con precios |
| precio, costo, cuánto | Explica cómo cotizar |
| cita, asesor, hablar | Cómo agendar cita |
| contratar, comprar | Flujo de contratación |
| gracias | Agradecimiento |
| adiós, chao, bye | Despedida |
| empresa, compañía | Info corporativa |
| *otro* | Mensaje genérico de ayuda |

---

## 9. Modo Oscuro / Claro

- El tema se persiste en `localStorage`.
- Por defecto se hereda de la preferencia del sistema.
- Haz clic en el botón ☀/🌙 del navbar para alternar.
- CSS Variables se actualizan en todo el sitio.
- Respeta `prefers-reduced-motion`.

---

## 10. App Móvil

### 10.1 Navegación

- **Stack Auth**: Login / Register.
- **Bottom Tabs** (5):
  - **Inicio** — Home adaptado a móvil.
  - **Planes** — Lista de planes con filtros.
  - **Cotizar** — Cotizador simplificado.
  - **Citas** — CRUD de citas.
  - **Cuenta** — Perfil y configuración.

### 10.2 Tema

- Default oscuro.
- Se cambia desde el Dashboard vía `ThemeContext`.
- Persistido en `AsyncStorage`.

### 10.3 API

- Hardcodeada a `https://avelmacsafe-production.up.railway.app/api`.
- Para desarrollo local, editar `mobile/src/services/api.js`.

---

## 11. Créditos Demo

| Campo | Valor |
|-------|-------|
| Email | `demo@email.com` |
| Contraseña | `demo123` |
| Planes precargados | 12 (6 tipos × 2 variantes) |

> Los datos demo se regeneran en cada deploy de Railway (base de datos efímera).

---

## Notas para Desarrolladores

### Estructura del Proyecto

```
aseguradora/
├── backend/          # Express + sql.js (SQLite)
│   └── src/
│       ├── index.js         # Servidor + rutas
│       ├── database.js      # Wrapper sql.js
│       ├── seed.js          # Datos demo (destructivo)
│       └── routes/          # auth, plans, appointments, quotes, policies
├── web/              # React 18 + Vite
│   └── src/
│       ├── components/      # Navbar, Footer, Chatbot, Icon, Toast, etc.
│       ├── pages/           # Home, Plans, Quote, Appointment, etc.
│       ├── context/         # AuthContext, ThemeContext
│       └── api.js           # Cliente fetch con JWT
├── mobile/           # React Native + Expo SDK 54
│   └── src/
│       ├── screens/         # Login, Register, Home, Plans, etc.
│       ├── services/        # api.js (hardcodeado a Railway)
│       └── navigation/      # Stack + BottomTabs
└── docs/             # Documentación
```

### Dónde Agregar Imágenes

Las imágenes de la página principal se cargan desde **Unsplash** (CDN gratuito). Para reemplazarlas con imágenes propias:

**Web (`web/src/pages/Home.jsx`):**

| Sección | Línea | Variable |
|---------|-------|----------|
| Hero (fondo) | `~linea 38` | `url(https://images.unsplash.com/photo-...)` |
| Categories (6 tarjetas) | `~linea 6-11` | `cat.img` (campo en array `categories`) |
| Estudiantes (imagen lateral) | `~linea 165` | `src="https://images.unsplash.com/photo-..."` |
| Asesores (3 fotos) | `~linea 16-18` | `adv.img` (campo en array `advisors`) |
| Testimonios (avatars) | `~linea 22-24` | `testimonial.img` (campo en array `testimonials`) |
| CTA (fondo final) | `~linea 232` | `url(https://images.unsplash.com/photo-...)` |

**Recomendación:** Colocar las imágenes en `web/public/images/` y referenciarlas como `/images/mi-imagen.jpg`. Todas las imágenes de Unsplash tienen `loading="lazy"` y dimensiones definidas para evitar CLS.

---

*Documentación generada para VelmacSafe v1.0 — Junio 2026*
