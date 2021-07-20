FROM node:lts-alpine

RUN apk update
RUN apk add --no-cache git
RUN apk add --update chromium

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN mkdir -p /app/node_modules

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 3333

ENTRYPOINT ["sh", "docker-entrypoint.sh"]
