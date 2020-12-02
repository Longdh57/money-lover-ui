FROM node:14.15.1 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/

RUN npm run build:prod
