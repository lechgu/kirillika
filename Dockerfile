FROM node:alpine AS build

WORKDIR /app

ENV NODE_OPTIONS=--openssl-legacy-provider
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build/ /usr/share/nginx/html/