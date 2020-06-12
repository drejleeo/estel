from estel.country.models import Country, Region
from django.contrib import admin


class RegionInline(admin.TabularInline):
    model = Region
    extra = 3


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('name', 'code')
    inlines = (RegionInline,)
