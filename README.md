# ERP Tienda General

Sistema ERP para gestión de una tienda general. Construido con React, Node.js y MariaDB.

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Base de datos | MariaDB |

## Módulos

| Módulo | Estado |
|--------|--------|
| Categorías | ✅ Completo |
| Productos | ✅ Completo |
| Clientes | 🔲 Pendiente |
| Proveedores | 🔲 Pendiente |
| Empleados | 🔲 Pendiente |
| Compras | 🔲 Pendiente |
| Ventas | 🔲 Pendiente |
| Reportes | 🔲 Pendiente |

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/martinezaguirrejuan/erp-tienda.git
cd erp-tienda
```

### 2. Configurar el backend

```bash
cd backend
npm install
cp .env.example .env
```

Edita el `.env` con tus credenciales de MariaDB:

```
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=erp_tienda
```

### 3. Configurar el frontend

```bash
cd ../frontend
npm install
```

## Arrancar el proyecto

```bash
# Terminal 1 — backend (puerto 4000)
cd backend
node index.js

# Terminal 2 — frontend (puerto 5173)
cd frontend
npm run dev
```

Abre el navegador en `http://localhost:5173`

## Estructura del proyecto

```
erp-tienda/
├── backend/
│   ├── index.js
│   ├── db.js
│   ├── .env.example
│   └── routes/
│       ├── Categorias.js
│       └── Productos.js
└── frontend/
    └── src/
        ├── App.jsx
        └── pages/
            ├── Categorias.jsx
            └── Productos.jsx
```

## Base de datos

Tablas: `categorias`, `productos`, `clientes`, `proveedores`, `empleados`, `ventas`, `detalle_venta`, `compras`, `detalle_compra`, `alertas_stock`
