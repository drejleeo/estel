import django_filters
from django.db import models
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import Parking, Spot
from .serializers import ParkingSerializer, SpotSerializer
from rest_framework.permissions import IsAuthenticated


class ParkingViewSet(viewsets.ModelViewSet):
    queryset = Parking.objects.all()
    serializer_class = ParkingSerializer
    permission_classes = [IsAuthenticated]

    # filter_backends = (DjangoFilterBackend,)
    # filterset_fields = [field.name for field in Parking._meta.get_fields()]


class SpotViewSet(viewsets.ModelViewSet):
    queryset = Spot.objects.all()
    serializer_class = SpotSerializer
    permission_classes = [IsAuthenticated]
