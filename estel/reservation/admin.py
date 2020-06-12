from django.contrib import admin
from .models import Reservation


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ['author', 'created_on', 'regime', 'start_date', 'spot',]
    # search_fields = ['author', 'created_on', 'regime', 'start_date', 'spot',]
    list_filter = ['author', 'created_on', 'spot',]

