FROM node:16-buster-slim
WORKDIR /app
RUN npm install --silent --production --prefer-offline --no-audit
WORKDIR /app/src
RUN npm install --silent --production --prefer-offline --no-audit
# CMD node index.ts --color
CMD node shard.ts --color