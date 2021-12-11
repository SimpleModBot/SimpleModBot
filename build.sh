#!/bin/sh
docker stop simplemodbot
docker build -t simplemodbot .
docker-compose up