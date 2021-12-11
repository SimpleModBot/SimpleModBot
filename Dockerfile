FROM node:lts-buster-slim
COPY . /app
WORKDIR /app/src
RUN npm install --silent
CMD node index.ts