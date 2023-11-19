# Stage 1
FROM node:18.17.1 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/drivers.app /usr/share/nginx/html