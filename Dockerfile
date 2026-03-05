# build environment
FROM node:20-alpine as build
WORKDIR /app

# Instalar dependencias
COPY package.json package-lock.json* ./
RUN npm ci

# Copiar código fuente y compilar
# BASE_URL='/' sobreescribe la base configurada para GitHub Pages
COPY . .
RUN npm run build -- --base=/

# production environment
FROM nginx:alpine
# Copiar configuración de nginx para SPAs (React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos compilados estáticos
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
