FROM node:20-slim AS base

WORKDIR /app
COPY package.json package-lock.json ./
RUN rm -rf node_modules package-lock.json && npm install
COPY . .

EXPOSE 5173 8545
CMD ["npm", "run", "dev"]