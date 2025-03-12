# API de Gestión de Proyectos

API REST para la gestión de proyectos, tareas y usuarios desarrollada con Node.js, Express, Sequelize y PostgreSQL.

## Descripción

Esta API permite gestionar proyectos y tareas, incluyendo funcionalidades de autenticación de usuarios mediante JWT (JSON Web Tokens), manejo de roles y permisos, y operaciones CRUD completas para los diferentes recursos.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript
- **Express.js**: Framework para desarrollo de aplicaciones web y APIs
- **Sequelize**: ORM (Object-Relational Mapping) para bases de datos relacionales
- **PostgreSQL**: Sistema de gestión de bases de datos relacional
- **JWT**: Implementación de autenticación mediante tokens
- **Bcrypt**: Librería para el cifrado de contraseñas

## Estructura del proyecto

```
api-gestion-proyectos/
├── config/
│   └── config.json         # Configuración de la base de datos
├── models/
│   ├── index.js            # Configuración de Sequelize
│   ├── usuario.js          # Modelo de Usuario
│   ├── proyecto.js         # Modelo de Proyecto
│   └── ...                 # Otros modelos
├── routes/
│   ├── users.js            # Rutas para gestión de usuarios
│   └── ...                 # Otras rutas
├── middleware/
│   └── auth.js             # Middleware de autenticación
├── server.js               # Punto de entrada de la aplicación
└── package.json            # Dependencias del proyecto
```

## Requisitos previos

- Node.js (v14 o superior)
- PostgreSQL
- npm o yarn

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd api-gestion-proyectos
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar la base de datos:
   - Crear una base de datos PostgreSQL
   - Actualizar el archivo `config/config.json` con las credenciales de tu base de datos

4. Ejecutar migraciones (si están configuradas):
   ```bash
   npx sequelize-cli db:migrate
   ```

5. Iniciar el servidor:
   ```bash
   npm start
   ```

## Uso

### Autenticación

La API utiliza JSON Web Tokens (JWT) para gestionar la autenticación de usuarios. Este sistema proporciona una forma segura de validar la identidad de los usuarios sin necesidad de almacenar información de sesión en el servidor.

#### Registro de usuario

Para crear una nueva cuenta:

```bash
POST /api/auth/register
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "rol": "user"  // Opcional, por defecto es "user"
}
```

Respuesta (200 OK):

```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "usuario@ejemplo.com",
  "rol": "user",
  "createdAt": "2023-06-15T14:23:45.000Z",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Inicio de sesión

Para obtener un token JWT válido:

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

Respuesta (200 OK):

```json
{
  "usuario": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "usuario@ejemplo.com",
    "rol": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Uso del token

Para acceder a rutas protegidas, incluye el token en el encabezado de tus peticiones:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Duración del token

Los tokens tienen una validez de 24 horas. Después de este tiempo, será necesario iniciar sesión nuevamente.

#### Verificar usuario actual

Para obtener la información del usuario actual (basada en el token):

```bash
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Respuesta (200 OK):

```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "usuario@ejemplo.com",
  "rol": "user",
  "createdAt": "2023-06-15T14:23:45.000Z",
  "updatedAt": "2023-06-15T14:23:45.000Z"
}
```

### Ejemplos de endpoints

A continuación se muestran ejemplos detallados de los principales endpoints de la API:

#### Usuarios

##### Obtener todos los usuarios
```bash
GET /api/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Respuesta (200 OK):
```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "rol": "admin",
    "createdAt": "2023-06-15T14:23:45.000Z",
    "updatedAt": "2023-06-15T14:23:45.000Z"
  },
  {
    "id": 2,
    "nombre": "María López",
    "email": "maria@ejemplo.com",
    "rol": "user",
    "createdAt": "2023-06-16T10:15:30.000Z",
    "updatedAt": "2023-06-16T10:15:30.000Z"
  }
]
```

##### Obtener un usuario por ID
```bash
GET /api/users/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Respuesta (200 OK):
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "rol": "admin",
  "createdAt": "2023-06-15T14:23:45.000Z",
  "updatedAt": "2023-06-15T14:23:45.000Z"
}
```

##### Crear un nuevo usuario (solo admin)
```bash
POST /api/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "nombre": "Carlos Gómez",
  "email": "carlos@ejemplo.com",
  "password": "contraseña123",
  "rol": "user"
}
```

Respuesta (201 Created):
```json
{
  "id": 3,
  "nombre": "Carlos Gómez",
  "email": "carlos@ejemplo.com",
  "rol": "user",
  "createdAt": "2023-06-17T09:45:12.000Z",
  "updatedAt": "2023-06-17T09:45:12.000Z"
}
```

##### Actualizar un usuario
```bash
PUT /api/users/3
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "nombre": "Carlos Rodríguez",
  "email": "carlos.rodriguez@ejemplo.com"
}
```

Respuesta (200 OK):
```json
{
  "id": 3,
  "nombre": "Carlos Rodríguez",
  "email": "carlos.rodriguez@ejemplo.com",
  "rol": "user",
  "createdAt": "2023-06-17T09:45:12.000Z",
  "updatedAt": "2023-06-17T10:12:34.000Z"
}
```

##### Eliminar un usuario
```bash
DELETE /api/users/3
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Respuesta (200 OK):
```json
{
  "message": "Usuario eliminado correctamente"
}
```

#### Proyectos

##### Obtener todos los proyectos
```bash
GET /api/projects
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Respuesta (200 OK):
```json
[
  {
    "id": 1,
    "nombre": "Desarrollo Web",
    "descripcion": "Proyecto de desarrollo web para cliente XYZ",
    "fechaInicio": "2023-06-01T00:00:00.000Z",
    "fechaFin": "2023-08-31T00:00:00.000Z",
    "estado": "en progreso",
    "usuarioId": 1,
    "createdAt": "2023-06-15T15:30:00.000Z",
    "updatedAt": "2023-06-15T15:30:00.000Z"
  },
  {
    "id": 2,
    "nombre": "App Móvil",
    "descripcion": "Desarrollo de aplicación móvil para Android e iOS",
    "fechaInicio": "2023-07-01T00:00:00.000Z",
    "fechaFin": "2023-10-31T00:00:00.000Z",
    "estado": "planificado",
    "usuarioId": 1,
    "createdAt": "2023-06-16T12:45:00.000Z",
    "updatedAt": "2023-06-16T12:45:00.000Z"
  }
]
```

##### Obtener un proyecto por ID
```bash
GET /api/projects/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Respuesta (200 OK):
```json
{
  "id": 1,
  "nombre": "Desarrollo Web",
  "descripcion": "Proyecto de desarrollo web para cliente XYZ",
  "fechaInicio": "2023-06-01T00:00:00.000Z",
  "fechaFin": "2023-08-31T00:00:00.000Z",
  "estado": "en progreso",
  "usuarioId": 1,
  "createdAt": "2023-06-15T15:30:00.000Z",
  "updatedAt": "2023-06-15T15:30:00.000Z",
  "tareas": [
    {
      "id": 1,
      "titulo": "Diseño de interfaz",
      "descripcion": "Crear wireframes y mockups",
      "estado": "completada",
      "fechaVencimiento": "2023-06-15T00:00:00.000Z",
      "proyectoId": 1,
      "usuarioId": 2
    },
    {
      "id": 2,
      "titulo": "Desarrollo frontend",
      "descripcion": "Implementar HTML, CSS y JavaScript",
      "estado": "en progreso",
      "fechaVencimiento": "2023-07-15T00:00:00.000Z",
      "proyectoId": 1,
      "usuarioId": 2
    }
  ]
}
```

##### Crear un nuevo proyecto
```bash
POST /api/projects
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "nombre": "Sistema CRM",
  "descripcion": "Desarrollo de un sistema CRM personalizado",
  "fechaInicio": "2023-08-01",
  "fechaFin": "2023-12-31",
  "estado": "planificado"
}
```

Respuesta (201 Created):
```json
{
  "id": 3,
  "nombre": "Sistema CRM",
  "descripcion": "Desarrollo de un sistema CRM personalizado",
  "fechaInicio": "2023-08-01T00:00:00.000Z",
  "fechaFin": "2023-12-31T00:00:00.000Z",
  "estado": "planificado",
  "usuarioId": 1,
  "createdAt": "2023-06-18T11:20:00.000Z",
  "updatedAt": "2023-06-18T11:20:00.000Z"
}
```

##### Actualizar un proyecto
```bash
PUT /api/projects/3
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "nombre": "Sistema CRM Empresarial",
  "estado": "en progreso"
}
```

Respuesta (200 OK):
```json
{
  "id": 3,
  "nombre": "Sistema CRM Empresarial",
  "descripcion": "Desarrollo de un sistema CRM personalizado",
  "fechaInicio": "2023-08-01T00:00:00.000Z",
  "fechaFin": "2023-12-31T00:00:00.000Z",
  "estado": "en progreso",
  "usuarioId": 1,
  "createdAt": "2023-06-18T11:20:00.000Z",
  "updatedAt": "2023-06-18T11:25:30.000Z"
}
```

##### Eliminar un proyecto
```bash
DELETE /api/projects/3
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Respuesta (200 OK):
```json
{
  "message": "Proyecto eliminado correctamente"
}
```

#### Tareas

##### Obtener tareas de un proyecto
```bash
GET /api/projects/1/tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Respuesta (200 OK):
```json
[
  {
    "id": 1,
    "titulo": "Diseño de interfaz",
    "descripcion": "Crear wireframes y mockups",
    "estado": "completada",
    "fechaVencimiento": "2023-06-15T00:00:00.000Z",
    "proyectoId": 1,
    "usuarioId": 2,
    "createdAt": "2023-06-15T16:00:00.000Z",
    "updatedAt": "2023-06-15T16:00:00.000Z"
  },
  {
    "id": 2,
    "titulo": "Desarrollo frontend",
    "descripcion": "Implementar HTML, CSS y JavaScript",
    "estado": "en progreso",
    "fechaVencimiento": "2023-07-15T00:00:00.000Z",
    "proyectoId": 1,
    "usuarioId": 2,
    "createdAt": "2023-06-16T10:00:00.000Z",
    "updatedAt": "2023-06-16T10:00:00.000Z"
  }
]
```

##### Crear una nueva tarea en un proyecto
```bash
POST /api/projects/1/tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "titulo": "Implementación de API REST",
  "descripcion": "Crear endpoints para recursos principales",
  "prioridad": "alta",
  "estado": "pendiente",
  "fecha_limite": "2023-07-30"
}
```

Respuesta (201 Created):
```json
{
  "message": "Tarea creada"
}
```

##### Actualizar una tarea
```bash
PUT /api/projects/1/tasks/3
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "titulo": "Implementación de API REST",
  "descripcion": "Crear endpoints para recursos principales",
  "prioridad": "alta",
  "estado": "en progreso",
  "fecha_limite": "2023-08-15"
}
```

Respuesta (200 OK):
```json
{
  "message": "Tarea actualizada"
}
```

##### Eliminar una tarea
```bash
DELETE /api/projects/1/tasks/3
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Respuesta (200 OK):
```json
{
  "message": "Tarea eliminada"
}
```

#### Comentarios

##### Obtener comentarios de una tarea
```bash
GET /api/projects/1/tasks/2/comments
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Respuesta (200 OK):
```json
[
  {
    "id": 1,
    "contenido": "Necesito más detalles sobre esta tarea",
    "tareaId": 2,
    "createdAt": "2023-06-20T11:30:00.000Z",
    "updatedAt": "2023-06-20T11:30:00.000Z"
  },
  {
    "id": 2,
    "contenido": "He añadido más información en la descripción",
    "tareaId": 2,
    "createdAt": "2023-06-20T14:45:00.000Z",
    "updatedAt": "2023-06-20T14:45:00.000Z"
  }
]
```

##### Obtener un comentario específico
```bash
GET /api/projects/1/tasks/2/comments/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Respuesta (200 OK):
```json
{
  "id": 1,
  "contenido": "Necesito más detalles sobre esta tarea",
  "tareaId": 2,
  "createdAt": "2023-06-20T11:30:00.000Z",
  "updatedAt": "2023-06-20T11:30:00.000Z"
}
```

##### Obtener comentarios de un usuario en una tarea
```bash
GET /api/projects/1/tasks/2/comments/2
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Respuesta (200 OK):
```json
[
  {
    "id": 2,
    "contenido": "He añadido más información en la descripción",
    "tareaId": 2,
    "createdAt": "2023-06-20T14:45:00.000Z",
    "updatedAt": "2023-06-20T14:45:00.000Z"
  }
]
```

##### Crear un nuevo comentario
```bash
POST /api/projects/1/tasks/2/comments
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "contenido": "Vamos a dividir esta tarea en subtareas"
}
```

Respuesta (201 Created):
```json
{
  "message": "Comentario creado"
}
```

##### Actualizar un comentario
```bash
PUT /api/projects/1/tasks/2/comments/3
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "contenido": "Vamos a dividir esta tarea en subtareas más pequeñas"
}
```

Respuesta (200 OK):
```json
{
  "message": "Comentario actualizado"
}
```

##### Eliminar un comentario
```bash
DELETE /api/projects/1/tasks/2/comments/3
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Respuesta (200 OK):
```json
{
  "message": "Comentario eliminado"
}
```

## Desarrollo

Para ejecutar el servidor en modo desarrollo con recarga automática:

```bash
npm run dev
```

## Pruebas

Para ejecutar las pruebas:

```bash
npm test
```

## Licencia

[MIT](LICENSE)

