FROM node:15.13.0-alpine3.13 AS builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY *.config.js ./
COPY tsconfig*.json ./

RUN yarn install

ADD ./src ./src
ADD ./public ./public