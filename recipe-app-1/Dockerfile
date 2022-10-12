FROM node:latest AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY src src
COPY public public

RUN npm run build

FROM nginx:latest

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]