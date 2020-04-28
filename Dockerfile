FROM node:14-alpine

RUN apk --no-cache add shadow
ARG USERNAME=gtanya
ARG UID=1000
ARG GID=1000
#RUN deluser node
##RUN addgroup --gid $GID $USERNAME
##RUN cat /etc/passwd
##RUN adduser --uid $UID $USERNAME $USERNAME
RUN usermod -u $UID node
RUN groupmod -g $UID node
WORKDIR /home/node/app
