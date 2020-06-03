FROM node:14-alpine

RUN apk --no-cache add shadow

ARG UID=1000
ARG GID=1000

RUN usermod -u $UID node
RUN groupmod -g $UID node

WORKDIR /home/node/app

