from django.contrib.gis.db import models
from estel.company.models import Company
from estel.country.models import Region
from geoposition.fields import GeopositionField


class Parking(models.Model):
    company = models.ForeignKey(Company, related_name='parkings', on_delete=models.CASCADE, null=True)
    region = models.ForeignKey(Region, related_name='parkings', on_delete=models.CASCADE, null=True)
    address = models.CharField(max_length=255, unique=True, null=False)
    total_spots = models.IntegerField(null=True)
    coordinates = GeopositionField('GPS Coordinates', default='0.0,0.0')

    @property
    def available_spots(self):
        return Spot.objects.filter(parking=self.id, status=Spot.AVAILABLE).count()

    @property
    def is_full(self):
        return self.available_spots == 0

    def register_spots(self):
        Spot.objects.bulk_create([
            Spot(parking=self, order_number=order) for order in range(1, self.total_spots + 1)
        ])

    def save(self, *args, **kwargs):
        super(Parking, self).save(*args, **kwargs)
        self.register_spots()

    def __str__(self):
        return f'{self.address}, {self.region}, {self.region.country}'


class Spot(models.Model):

    AVAILABLE = 0
    TAKEN = 1

    STATUS = (
        (AVAILABLE, 'Available'),
        (TAKEN, 'Taken'),
    )

    active = models.BooleanField(default=True)
    parking = models.ForeignKey(Parking, related_name='spots', verbose_name='Parking', on_delete=models.CASCADE)
    status = models.IntegerField(choices=STATUS, default=AVAILABLE)
    order_number = models.IntegerField(null=True)

    def __str__(self):
        return f'No. {self.order_number} of {self.parking.address}'
