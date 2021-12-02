FROM node:lts-alpine
COPY . /app
WORKDIR /app/src
CMD node index.ts