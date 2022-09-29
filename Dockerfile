FROM node as build-deps
WORKDIR /usr/src/app/
COPY . ./
WORKDIR /usr/src/app/angular-inventory
COPY package.json  ./
RUN npm install --legacy-peer-deps
RUN npm run build

FROM nginx:1.23.1-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]