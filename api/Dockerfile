FROM node:lts-alpine

WORKDIR /usr/src/api

ENV NODE_ENV development

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN corepack enable pnpm
RUN corepack use pnpm@latest
RUN pnpm install --frozen-lockfile

COPY . .

CMD [ "pnpm", "run", "dev" ]
