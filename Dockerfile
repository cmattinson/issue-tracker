FROM oven/bun:1-alpine

WORKDIR /usr/src/app

COPY package.json bun.lock ./

RUN bun install

COPY . .

EXPOSE 3000 6499

CMD ["bun", "run", "docker:start"]
