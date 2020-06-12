#!/usr/bin/env bash

cd /estel/frontend

# Run server
ng serve --host 0.0.0.0 --poll 1000 --disableHostCheck
# tail -f /dev/null
