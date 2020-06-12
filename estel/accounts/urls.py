from django.urls import path, include
from rest_registration.api.views import register


urlpatterns = [
    path('', include('rest_auth.urls')),
    path('register/', register, name='register'),
]
