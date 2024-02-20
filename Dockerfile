FROM node:18

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app

COPY --chown=node:node . .

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]
