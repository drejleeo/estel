from django.contrib.auth.models import User
from django.db import models
from datetime import timedelta, datetime
from estel.config import settings
import pytz

from estel.parking.models import Spot


class Reservation(models.Model):

    FAST_CHARGE = 1
    NORMAL = 2

    regime_options = (
        (NORMAL, 'Normal (2h)'),
        (FAST_CHARGE, 'Fast-Charge (1h)'),
    )

    spot = models.ForeignKey(Spot, related_name='spot', verbose_name='Spot', on_delete=models.CASCADE, null=True)
    author = models.ForeignKey(User, related_name='reservation', verbose_name='Author', on_delete=models.CASCADE, null=True)

    description = models.TextField(max_length=255, blank=True)

    start_date = models.DateTimeField()
    regime = models.IntegerField(choices=regime_options, default=NORMAL)

    reminder = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)

    @property
    def end_date(self):
        return self.start_date + timedelta(hours=self.regime)

    @property
    def is_over(self):
        return self.spot.status == Spot.TAKEN and not self.is_happening

    @property
    def just_started(self):
        return self.spot.status == Spot.AVAILABLE and self.is_happening

    @property
    def is_happening(self):
        return self.start_date <= datetime.now(tz=pytz.timezone(settings.TIME_ZONE)) < self.end_date
