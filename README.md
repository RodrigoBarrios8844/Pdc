
# 🌟 Sistema de Gestión de Colaboradores y Empresas 🌍

¡Bienvenido/a! Este proyecto consiste en un sistema de mantenimiento (CRUD) para gestionar información de colaboradores y empresas en diferentes países. El sistema utiliza **Angular** para el frontend y **PHP** para el backend, con **MySQL** como base de datos.

---

## 📂 Estructura del Proyecto

```plaintext
📁 frontend/    # Proyecto Angular
📁 backend/     # API en PHP
```

### 🖥️ Frontend
El frontend está desarrollado en **Angular**, proporcionando una interfaz moderna y responsiva para la gestión de datos.

### 🖧 Backend
El backend está construido en **PHP**, ofreciendo una API segura y eficiente para interactuar con la base de datos **MySQL**.

---

## 🚀 Requisitos Previos

Asegúrate de tener instalados los siguientes componentes antes de empezar:

### General
- [Node.js](https://nodejs.org/) (Recomendado: v16+)
- [Composer](https://getcomposer.org/)

### Frontend
- Angular CLI: `npm install -g @angular/cli`

### Backend
- Servidor PHP (Ejemplo: XAMPP, WAMP, o PHP instalado localmente)
- MySQL Server

---

## 📦 Instalación y Configuración

### 1️⃣ Clona este repositorio
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

### 2️⃣ Configura el Backend
1. Ve a la carpeta `backend`:
   ```bash
   cd backend
   ```
2. Instala dependencias:
   ```bash
   composer install
   ```
3. Configura el archivo `.env`:
   - Crea un archivo `.env` a partir del ejemplo `.env.example`.
   - Configura los valores de conexión a tu base de datos MySQL.

4. Carga la base de datos:
   - Importa el archivo `database.sql` en tu base de datos MySQL.

5. Inicia el servidor:
   ```bash
   php -S localhost:8000
   ```

### 3️⃣ Configura el Frontend
1. Ve a la carpeta `frontend`:
   ```bash
   cd frontend
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Configura el archivo `environment.ts`:
   - Ve a `src/environments/environment.ts`.
   - Ajusta la URL base del backend si es necesario (`http://localhost:8000`).

4. Inicia el servidor de desarrollo:
   ```bash
   ng serve
   ```

---

## 🌐 Uso

1. Accede al frontend en tu navegador:
   ```
   http://localhost:4200
   ```
2. Asegúrate de que el backend está corriendo:
   ```
   http://localhost:8000
   ```

---

## 🛠️ Funcionalidades

- 📋 **Colaboradores**: CRUD para gestionar la información de colaboradores.
- 🏢 **Empresas**: CRUD para gestionar la información de empresas.
- 🌍 **Países**: Gestión de países asociados a empresas y colaboradores.
- 📊 **Interfaz intuitiva**: Fácil de usar con una experiencia fluida.

---

## 📖 Documentación de la API

### Endpoints principales
| Método | Endpoint             | Descripción                   |
|--------|----------------------|-------------------------------|
| GET    | `/api/colaboradores` | Listar todos los colaboradores |
| POST   | `/api/colaboradores` | Crear un nuevo colaborador     |
| PUT    | `/api/colaboradores/:id` | Actualizar un colaborador    |
| DELETE | `/api/colaboradores/:id` | Eliminar un colaborador      |

(Consulta más detalles en el archivo `backend/docs/api-documentation.md`).

---

## 🤝 Contribuciones

¡Contribuciones, reportes de errores y sugerencias son bienvenidos! Por favor, sigue estos pasos:

1. Realiza un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Haz commit de tus cambios (`git commit -m 'Agrego nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

---

## 🛡️ Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

---

## 🙌 Agradecimientos

A todos los desarrolladores que colaboran y hacen posible este proyecto. 💻🚀
