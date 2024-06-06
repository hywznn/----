# Dockerfile for frontend
FROM node:14-alpine

WORKDIR /app/

COPY . /app/

RUN npm run build

EXPOSE 80

CMD python main.py