FROM ubuntu:18.04

RUN apt-get -qq update && apt-get -qq -y upgrade
RUN apt-get install -y --no-install-recommends apt-utils

RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash \
    && apt-get install nodejs -yq

# Install Angular
RUN npm update
RUN npm install -g @angular/cli@8.0.2

# Enter mounted volume
WORKDIR /estel/frontend/

# Install dependecies
RUN npm install

# Expose application port
EXPOSE 4200
