FROM ubuntu:18.04

RUN apt-get -qq update && apt-get -qq -y upgrade
RUN apt-get install -y --no-install-recommends apt-utils
RUN apt-get update --fix-missing
RUN apt-get -qq -y -m install \
    dialog \
    curl \
    git \
    python3.7-dev \
    python3-setuptools \
    python3-pip \
    cron \
    nano
RUN apt-get install gcc -y
RUN apt-get install -y gdal-bin libgdal-dev python3-gdal

# Setup Backend - update pip and create the root directory for django server
RUN pip3 install -U pip
# RUN mkdir -p /estel/ /estel/logs - Not needed yet

# Enter working directory
WORKDIR /estel

# Copy requirements and install
COPY ./estel/requirements/ ./
RUN pip3 install -r ./dev-backend-requirements.txt

# Copy cron files to the cron.d directory
COPY ./cron/ /etc/cron.d/

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d

# Apply cron job
RUN crontab /etc/cron.d/*
