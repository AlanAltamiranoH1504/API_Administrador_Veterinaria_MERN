<p align="center">
  <img src="/docs/imgs/logo.png" alt="Admin Veterinaria Logo" width="200"/>
</p>

# 🐾 VetManager — Sistema Básico de Gestión Veterinaria

VetManager es una aplicación web full-stack para la administración básica de una veterinaria. Permite gestionar usuarios, mascotas, citas médicas e historial clínico mediante una API REST segura y una interfaz moderna.

---

## 📌 Tecnologías Utilizadas

### Backend

* Node.js
* Express
* TypeScript
* MongoDB
* Mongoose
* JWT (JSON Web Tokens)
* Express Validator
* Bcrypt
* Dotenv
* Cors

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios
* React Router DOM

---

## 📁 Estructura del Proyecto

```
vetmanager/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── validators/
│   │   └── index.ts
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── context/
│   │   └── main.tsx
│   └── package.json
```

---

## ⚙️ Requisitos Previos

* Node.js >= 18
* MongoDB local o MongoDB Atlas
* NPM o Yarn

---

# 🚀 Instalación

## 1️⃣ Clonar repositorio

```
git clone https://github.com/tuusuario/vetmanager.git
cd vetmanager
```

---

## 2️⃣ Configuración Backend

### Entrar a la carpeta backend

```
cd backend
```

### Instalar dependencias

```
npm install
```

---

### Crear archivo `.env`

```
BACKEND_PORT=3000
FRONTEND_URL=http://localhost:5173
URI_DB_MONGO=

NODEMAILER_HOST=****
NODEMAILER_PORT=**
NODEMAILER_USER=****
NODEMIALER_PASSWORD=***
EMAIL_APP=Administrador de Veterinaria

JWT_SECRET=2021602569
```

---

### Ejecutar servidor

Modo desarrollo:

```
npm run dev
```

---

## 3️⃣ Configuración Frontend

### Entrar a frontend

```
cd ../frontend/Admin_Veterinaria_Front
```

### Instalar dependencias

```
npm install
```

---

### Ejecutar aplicación

```
npm run dev
```

Aplicación disponible en:

```
http://localhost:5173
```

---

# 🔐 Autenticación

VetManager utiliza autenticación basada en JWT.

### Flujo de autenticación:

1. Usuario inicia sesión
2. Backend genera token JWT
3. Token se almacena en localStorage
4. Se envía en cada petición protegida

### Header requerido:

```
Authorization: Bearer TU_TOKEN
```

---

# 📦 Funcionalidades

* Registro e inicio de sesión
* Protección de rutas
* CRUD de mascotas
* Gestión de clientes
* Historial clínico básico
* Validación de formularios
* Interfaz responsive

---

# 🧪 Validaciones

Implementadas con Express Validator:

* Emails válidos
* Password mínimo 6 caracteres
* Campos obligatorios
* IDs Mongo válidos

---

# 🗃️ Modelos Principales

## Veterinario

* nombre
* email
* password
* rol

## Paciente

* nombre
* especie
* raza
* edad
* propietario


---

# 🎨 Interfaz (Tailwind CSS)

Características:

* Diseño responsive
* Componentes reutilizables
* Formularios modernos
* Tablas administrativas
* Layout adaptable

---

# 🔒 Seguridad

* Encriptación de contraseñas (bcrypt)
* Tokens JWT
* Middleware de autenticación
* Validación de datos
* Configuración CORS

---

# 📜 Scripts Disponibles

## Backend

```
npm run dev
```

## Frontend

```
npm run dev
```

---

# 📈 Mejoras Futuras

* Dashboard administrativo
* Roles (Admin, Veterinario, Recepción)
* Subida de imágenes
* Notificaciones por correo
* Exportación de reportes
* Calendario interactivo

---


# 👨‍💻 Autor

Desarrollado por: Alan Altamirano Hernández 
GitHub: [https://github.com/AlanAltamiranoH1504](https://github.com/AlanAltamiranoH1504)

# Colección de Postman
https://web.postman.co/workspace/My-Workspace~34882cdf-2bf2-4c9e-81cc-73a8970bf2b6/folder/36549654-3d3ea2cb-570f-4c1d-af94-a64cc51257b5?action=share&source=copy-link&creator=36549654&ctx=documentation