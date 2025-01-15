# DevTree - Desarrollo Full Stack

**DevTree** es un sitio web diseñado para centralizar y gestionar redes sociales desde un perfil personalizado, permitiendo a los usuarios compartir sus información con otros de manera segura y eficiente.

## Características principales

1. **Gestor de redes sociales**: Los usuarios pueden agregar, editar y compartir sus redes sociales activas desde su perfil.
2. **Perfiles personalizados**: Cada usuario cuenta con un perfil único que puede gestionar fácilmente.
3. **Seguridad avanzada**:
   - Autenticación con identificadores únicos firmados digitalmente (JWT).
   - Contraseñas cifradas con bcrypt.
   - Rutas protegidas para garantizar la seguridad de las funcionalidades.
4. **Diseño responsivo**: Adaptado para ofrecer una experiencia óptima en dispositivos móviles y de escritorio.
5. **Rendimiento optimizado**: Implementación de patrones como Optimistic UI para mejorar la interacción del usuario.

## Tecnologías utilizadas

### Frontend
- **React**: Creación de interfaces de usuario.
- **TypeScript**: Tipado estático para un código más seguro y mantenible.
- **Axios y React Query**: Manejo eficiente de peticiones a la API.
- **React Router**: Navegación entre rutas.
- **Sonner**: Sistema de notificaciones.
- **Tailwind CSS**: Estilos modernos y responsivos.

### Backend
- **Node.js y Express**: Creación del servidor y manejo de la lógica de negocio.
- **TypeScript**: Mejora en la robustez y escalabilidad del código.
- **MongoDB y Mongoose**: Almacenamiento y manejo de la información de los usuarios.
- **JsonWebToken (JWT)**: Autenticación segura.
- **bcrypt**: Cifrado de contraseñas.

## Arquitectura

1. **Base de datos**
   - Diseñada para almacenar información de los usuarios, incluyendo datos de perfil y redes sociales.
   - Validaciones y saneamiento de datos para garantizar integridad y seguridad.

2. **API**
   - Manejo eficiente de solicitudes entre la interfaz y la base de datos.
   - Enfoque en la seguridad mediante autenticación y cifrado.
   - Operaciones optimizadas para reducir el movimiento innecesario de datos.

3. **Sitio web**
   - Interfaz clara y atractiva para presentar información obtenida desde la API.
   - Diseño centrado en la experiencia del usuario.

## Instalación y uso

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tuusuario/devtree.git
   cd devtree
   ```

2. Instala las dependencias del frontend y backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Configura las variables de entorno en el archivo `.env` en la carpeta del backend:
   ```env
   MONGO_URI=tu_url_de_mongo
   JWT_SECRET=tu_secreto_para_jwt
   ```

4. Inicia el servidor del backend:
   ```bash
   npm run dev
   ```

5. Inicia el servidor del frontend:
   ```bash
   cd ../frontend
   npm run dev
   ```

6. Abre tu navegador en [http://localhost:5173](http://localhost:5173) para explorar DevTree.
## BackEnd
Descarga el back end desde [Mi repositorio](https://github.com/valentinshu/deploy_devtree_backend)

## Demo en línea

Prueba DevTree en: [DevTree](https://steady-crisp-eb88b8.netlify.app/) *(Reemplaza con el enlace real si ya está desplegado)*.

---

Si tienes comentarios o deseas contribuir, no dudes en contactarme.

