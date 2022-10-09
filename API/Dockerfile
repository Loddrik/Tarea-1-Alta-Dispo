FROM node:latest AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY src src

#RUN npm run build

FROM node:14-alpine

WORKDIR /app
RUN apk add --no-cache tini

COPY package*.json ./
RUN npm ci

COPY --from=builder /app/src src/
CMD [ "/sbin/tini", "--", "node", "src/index.js"]