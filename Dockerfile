FROM node as build-deps
WORKDIR /usr/src/app/
COPY angular-inventory/package.json  ./
COPY angular-inventory ./
RUN npm install --legacy-peer-deps
RUN npm run build

FROM nginx:1.23.1-alpine
#FROM nginx:stable-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
#COPY */nginx.conf /etc/nginx/conf*/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
