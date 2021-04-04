FROM node:15.13.0-alpine3.13 AS builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY *.config.js ./
COPY tsconfig*.json ./

RUN yarn install

ENV NODE_ENV=production
ENV REACT_APP_API_URL=http://localhost:8000
ADD ./src ./src
ADD ./public ./public

RUN yarn build


FROM node:15.13.0-alpine3.13 AS production

WORKDIR /app
ENV NODE_ENV=production

COPY package.json ./
COPY yarn.lock ./
COPY *.config.js ./
COPY tsconfig*.json ./

RUN yarn install --production

## We just need the build to execute the command
COPY --from=builder /app/build ./build

RUN npm install -g serve

EXPOSE 3002
CMD ["yarn", "run", "prod"]
