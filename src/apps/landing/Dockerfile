# Etapa 1: Construcción
FROM node:20-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY . .

# Instalar dependencias (recomendado usar pnpm si lo usas)
RUN npm install -g pnpm && pnpm install

# Construir el proyecto
RUN pnpm build

# Etapa 2: Servidor de producción
FROM node:20-alpine AS runner

# Crear directorio de trabajo
WORKDIR /app

# Copiar los archivos de producción desde el builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Instalar solo las dependencias necesarias para producción
RUN npm install -g pnpm && pnpm install --prod

# Comando por defecto para ejecutar el servidor
CMD ["pnpm", "preview", "--host"]
