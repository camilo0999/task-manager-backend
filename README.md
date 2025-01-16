
# Task Manager Backend

Backend para la aplicación Task Manager, desarrollada con Node.js, Express y PostgreSQL. Proporciona autenticación de usuarios y gestión de tareas.

## Características

- **Gestión de Tareas**: Permite crear, obtener, actualizar y eliminar tareas asociadas a usuarios individuales.
- **Autenticación**: Implementa autenticación de usuarios para acceso seguro a las funcionalidades de la aplicación.
- **API RESTful**: Proporciona endpoints para la gestión de tareas y autenticación de usuarios.

## Requisitos Previos

- [Node.js](https://nodejs.org/) v14 o superior
- [PostgreSQL](https://www.postgresql.org/) v12 o superior

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/camilo0999/task-manager-backend.git
   cd task-manager-backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   Crea un archivo `.env` en el directorio raíz con las siguientes variables:

   ```env
   DATABASE_URL=postgresql://usuario:contraseña@host:puerto/nombre_base_datos
   JWT_SECRET=una_clave_secreta_segura
   ```

   - **`DATABASE_URL`**: URL de conexión a la base de datos PostgreSQL desplegada en Render. Incluye el usuario, contraseña, host, puerto y nombre de la base de datos.
   - **`JWT_SECRET`**: Una clave secreta utilizada para firmar y verificar los tokens JWT.

4. Inicia el servidor:

   ```bash
   npm start
   ```

   El servidor estará disponible en `http://localhost:5000`.

## Uso

- **Endpoints de Autenticación**:
  - `POST /auth/register`: Registro de nuevos usuarios.
  - `POST /auth/login`: Inicio de sesión de usuarios existentes.

- **Endpoints de Tareas**:
  - `GET /tasks`: Obtiene todas las tareas del usuario autenticado.
  - `POST /tasks`: Crea una nueva tarea.
  - `GET /tasks/:id`: Obtiene una tarea específica por su ID.
  - `PUT /tasks/:id`: Actualiza una tarea existente.
  - `DELETE /tasks/:id`: Elimina una tarea.

**Nota**: Todos los endpoints de tareas requieren un token JWT válido en el encabezado de autorización.

## Despliegue

La API está desplegada en Render y está disponible en la siguiente URL:

https://task-manager-api-uzzf.onrender.com/api

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas colaborar, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commits descriptivos.
4. Envía un pull request detallando los cambios propuestos.


## Contacto

Para consultas o sugerencias, puedes contactar a [Camilo](mailto:tu_camiloibarguen999@gmail.com).
