FROM node:16-buster-slim
# COPY . /app
WORKDIR /app/src
# RUN npm install --silent --production --prefer-offline --no-audit
CMD node index.ts --color