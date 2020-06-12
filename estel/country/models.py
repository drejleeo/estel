from django.db import models

# Create your models here.
class Country(models.Model):
    code = models.CharField(max_length=10)
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'Country'
        verbose_name_plural = 'Countries'
        ordering = ('name',)

    def __str__(self):
        return f'{self.name} ({self.code})'


class Region(models.Model):
    name = models.CharField(max_length=100)
    country = models.ForeignKey(Country, related_name='regions', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Region'
        verbose_name_plural = 'Regions'
        unique_together = ('name', 'country')
        ordering = ('name',)

    def __str__(self):
        return self.name
