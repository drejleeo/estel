from rest_framework import serializers
from .models import Reservation


class ReservationSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    parking = serializers.SerializerMethodField()

    def get_user(self, obj):
        return obj.author.username

    def get_parking(self, obj):
        return {
            'id': obj.spot.parking.id,
            'address': obj.spot.parking.address,
            'company': obj.spot.parking.company.name,
        }

    class Meta:
        model = Reservation
        fields = (
            'id',
            'parking',
            'spot',
            'user',
            'description',
            'start_date',
            'regime',
            'end_date',
            'created_on',
        )
