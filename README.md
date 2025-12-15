# Noctis Ops Hub

Bienvenido al proyecto **Noctis Ops Hub**, una plataforma local destinada a
orquestar múltiples mini‑proyectos operativos (por ejemplo, planificadores de
suministros, listas de inspección o notas de reunión). Este repositorio
contiene una base limpia y profesional compuesta por un backend en Node.js con
Prisma y una interfaz frontend en React con Vite. La intención es proporcionar
una estructura robusta sobre la cual se puedan ir integrando nuevas
funcionalidades a medida que crece el ecosistema de herramientas internas.

## Estructura del repositorio

```
noctis-ops-hub/
├── backend/             # API REST construida con Express y Prisma
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   └── index.js
│   └── package.json
├── frontend/            # Aplicación React creada con Vite
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── App.css
│       ├── main.jsx
│       ├── layout/
│       │   └── AppLayout.jsx
│       └── pages/
│           └── Home.jsx
└── README.md
```

### Backend

El backend se encarga de exponer una API REST básica y de gestionar la
persistencia de datos mediante Prisma y SQLite. Actualmente ofrece
una ruta de comprobación de salud (`/api/health`) y un endpoint
`/api/modules` que devolverá en el futuro los módulos registrados.

Para ejecutar el servidor localmente:

```bash
cd backend
npm install
npm run dev
```

### Frontend

El frontend está construido con React y Vite. Incluye un layout con barra
lateral, barra superior y área de contenido. Este diseño sigue los principios
de claridad, consistencia y carga cognitiva mínima descritos en las guías
modernas de diseño de dashboards【97465835146879†L302-L321】. La barra lateral está
preparada para alojar enlaces a mini‑proyectos que se incorporen en el futuro.

Para ejecutar la interfaz de desarrollo:

```bash
cd frontend
npm install
npm run dev
```

> **Nota:** Tanto el backend como el frontend se ejecutan de manera independiente
> en puertos diferentes. Cuando integres nuevas funcionalidades, recuerda
> configurar correctamente las URLs de la API.

## Próximos pasos

1. **Definir modelos de datos** para cada mini‑proyecto que quieras integrar
   (por ejemplo, planner de equipos y suministros, inventarios, etc.) y
   añadirlos a `prisma/schema.prisma`.
2. **Implementar rutas de API** para crear, leer, actualizar y eliminar
   información de cada módulo.
3. **Construir componentes de interfaz** dentro de `frontend/src/modules` que
   consuman dichas APIs y presenten los datos de manera clara y atractiva.
4. **Añadir autenticación y control de acceso** si fuese necesario para tu
   organización.

Este proyecto está pensado para ejecutarse localmente y proyectarse en
reuniones. A medida que avances, puedes adaptarlo para entornos de
producción, desplegarlo en servidores o integrarlo con bases de datos más
potentes como PostgreSQL.