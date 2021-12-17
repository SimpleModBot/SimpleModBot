#!/bin/sh
docker stop simplemodbot -t 0
echo Stopped SimpleModBot. | lolcat
docker build -t simplemodbot .
echo Build complete. | lolcat
docker-compose up