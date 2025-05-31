FROM node:20-alpine as builder

WORKDIR /app
COPY . .
RUN npm install -g pnpm && pnpm install
RUN pnpm --filter api build

CMD ["node", "src/apps/api/dist/apps/api/index.js"]
