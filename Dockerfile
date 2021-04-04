FROM node:15.13.0-alpine3.13 AS builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY *.config.js ./
COPY tsconfig*.json ./

RUN yarn install

ADD ./src ./src
ADD ./public ./public



FROM node:15.13.0-alpine3.13 AS production

WORKDIR /app
ENV NODE_ENV=production

COPY package.json ./
COPY yarn.lock ./
COPY *.config.js ./
COPY tsconfig*.json ./

RUN yarn install

## We just need the build to execute the command
COPY --from=builder /usr/src/app/build ./build
ADD ./public ./public

EXPOSE 3002
CMD ["yarn", "run", "prod"]