#!/bin/sh
docker stop simplemodbot -t 0
echo Stopped SimpleModBot. | lolcat
cd ./src
npm install --silent --production --prefer-offline --no-audit
cd ../
echo Installed dependencies. | lolcat
docker build -t simplemodbot .
echo Build complete. | lolcat
docker-compose up