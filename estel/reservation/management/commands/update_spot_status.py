from django.core.management.base import BaseCommand
from estel.reservation.models import Reservation
from estel.parking.models import Spot
import datetime


class Command(BaseCommand):
    help = 'Command to update parking spots statuses with reservations'

    def handle(self, *args, **options):
        for reservation in Reservation.objects.all():
            changed = False
            sspot = reservation.spot
            if reservation.is_over:
                sspot.status = Spot.AVAILABLE
                changed = True
            elif reservation.is_happening:
                sspot.status = Spot.TAKEN
                changed = True
            if changed:
                sspot.save()
                self.stdout.write(self.style.SUCCESS(
                    f'{datetime.datetime.now()}: Updated status on spot {sspot.id} from parking {sspot.parking}'
                ))
        self.stdout.write('=============================================================')
