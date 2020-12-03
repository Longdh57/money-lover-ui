FROM node:14.15.1 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/

# Build
RUN npm run build:prod

# Move build to nginx
FROM nginx:1.19.5
COPY --from=build-stage /app/dist/ /usr/share/nginx/html/
COPY ./nginx.conf /nginx.conf

