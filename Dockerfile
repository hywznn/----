# Dockerfile for frontend
FROM node:14-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

EXPOSE 8081

CMD ["npx", "serve", "-s", "build", "-l", "3000"]