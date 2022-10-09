FROM node:latest AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY src src

RUN npm run build

FROM nginx:latest

WORKDIR /usr/share/nginx/html

RUN rm -rgf ./*
COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]