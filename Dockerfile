# Usamos una imagen oficial de Node
FROM node:20-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Construir la aplicación (Nest usa TypeScript)
RUN npm run build

# Exponer el puerto (ajústalo si usas otro)
EXPOSE 3000

# Comando para ejecutar la app
CMD ["node", "dist/main"]
