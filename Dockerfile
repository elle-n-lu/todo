FROM node:16-alpine3.16 as build
WORKDIR /app
COPY package.json .

RUN yarn

COPY . .

RUN yarn build

FROM nginx:1.23.0-alpine
EXPOSE 8080

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/te09 /usr/share/nginx/html