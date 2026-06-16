# Página Zeu - Catálogo de Perfumes

Aplicación web Full Stack para la gestión y visualización de perfumes, desarrollada con React, Node.js, Express y MongoDB.

## Descripción

Página Zeu es una plataforma web que permite a los usuarios explorar un catálogo de perfumes mediante una interfaz moderna e intuitiva. Además, cuenta con un panel de administración protegido que permite gestionar el catálogo de productos de forma dinámica.

El sistema fue desarrollado siguiendo una arquitectura Full Stack, separando frontend y backend para garantizar escalabilidad y mantenimiento.

## Características Principales

* Visualización de catálogo de perfumes.
* Detalle de productos.
* Panel de administración seguro.
* Creación de nuevos perfumes.
* Edición de productos existentes.
* Eliminación de productos.
* Actualización de información en tiempo real.
* Persistencia de datos mediante MongoDB.
* API REST desarrollada con Express.
* Autenticación mediante JWT.

## Tecnologías Utilizadas

### Frontend

* React
* React Router
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* JSON Web Token (JWT)

## Estructura del Proyecto

```text
pagina-zeu/
│
├── frontend/
│
├── backend/
│
└── README.md
```

## Instalación

### Clonar el repositorio

```bash
git clone https://github.com/urielramirez99/pagina-zeu.git
```

### Instalar dependencias

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

## Variables de Entorno

Crear un archivo `.env` dentro de la carpeta `backend`.

```env
PORT=3000
MONGODB_URI=tu_uri_de_mongodb
JWT_SECRET=tu_clave_secreta
```

## Ejecutar el Proyecto

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

## Objetivos del Proyecto

* Aplicar conceptos de desarrollo Full Stack.
* Implementar autenticación y autorización.
* Construir una API REST escalable.
* Gestionar productos mediante operaciones CRUD.
* Integrar una base de datos NoSQL con MongoDB.

## Autor

Uriel Ramirez

Full Stack Web Developer

* Diplomatura Full Stack Developer - UTN
* Buenos Aires, Argentina
* Inglés fluido

GitHub:
https://github.com/urielramirez99
