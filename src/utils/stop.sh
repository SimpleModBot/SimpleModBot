#!/bin/sh
zsh
echo Stopping all SMB processes. | lolcat
docker stop simplemodbot -t 5
echo Stopped SimpleModBot. | lolcat
docker stop simplemodbot-dash -t 5
echo Stopped SimpleModBot-Dash. | lolcat
docker stop simplemodbot-db -t 5
echo Stopped SimpleModBot-DB. | lolcat
echo Stopped all SMB processes. | lolcat