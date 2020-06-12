from random import randint
from estel.parking.models import Spot
from .models import Reservation
from rest_framework import viewsets
from .serializers import ReservationSerializer
from rest_framework.permissions import IsAuthenticated


class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Reservation.objects.filter(author=user).order_by('-created_on')

    def create(self, request, *args, **kwargs):
        parking = request.data['parking']
        qs = Spot.objects.filter(status=Spot.AVAILABLE, parking=parking)
        rand = randint(0, qs.count() - 1)
        request.data['spot'] = qs[rand].id
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
