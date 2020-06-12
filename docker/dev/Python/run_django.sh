#!/usr/bin/env bash

sleep 7

#python3 manage.py shell -c "from django.contrib.auth.models import User;\
#User.objects.create_superuser('root', 'root@estel.com', 'root')" 2>/dev/null

# Run django server
cd /estel/

python3 manage.py migrate --noinput
python3 manage.py collectstatic --noinput

python3 manage.py runserver 0.0.0.0:8080
# tail -f /dev/null
