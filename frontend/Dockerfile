FROM node:latest as build

WORKDIR /app

ENV NODE_ENV production

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist/frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]