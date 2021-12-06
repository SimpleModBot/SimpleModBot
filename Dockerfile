FROM node:lts-buster-slim
COPY . /app
WORKDIR /app/src
CMD node index.ts