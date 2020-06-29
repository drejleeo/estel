#!/usr/bin/env bash

sleep 7
service cron start
service cron status

#python3 manage.py shell -c "from django.contrib.auth.models import User;\
#User.objects.create_superuser('root', 'root@estel.com', 'root')" 2>/dev/null

cd /estel/

python3 manage.py migrate --noinput
python3 manage.py collectstatic --noinput

# Run django server
python3 manage.py runserver 0.0.0.0:8080
