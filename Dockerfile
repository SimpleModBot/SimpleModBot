FROM node:17-buster
WORKDIR /app/src
# CMD node index.ts --color
CMD node shard.ts --color