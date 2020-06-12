from rest_framework import serializers
from estel.company.serializers import CompanySerializer
from .models import Parking, Spot
from drf_writable_nested import WritableNestedModelSerializer


class ParkingSerializer(WritableNestedModelSerializer):
    location = serializers.SerializerMethodField()
    company = CompanySerializer()

    def get_location(self, obj):
        return {
            'country': obj.region.country.name,
            'region': obj.region.name,
            'address': obj.address,
            'latitude': obj.coordinates.latitude,
            'longitude': obj.coordinates.longitude
        }

    def get_country(self, obj):
        return obj.country.name

    class Meta:
        model = Parking
        fields = ('id', 'company', 'location', 'total_spots', 'available_spots', 'is_full',)


class SpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spot
        fields = ('parking', 'order_number',)
