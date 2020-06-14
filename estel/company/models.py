from django.db import models
from django.template.defaultfilters import truncatechars
from django.utils.safestring import mark_safe


class Company(models.Model):
    name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='company_logos', null=True)
    cover = models.ImageField(upload_to='company_cover', null=True)
    about = models.TextField(blank=True)

    class Meta:
        verbose_name = 'Company'
        verbose_name_plural = 'Companies'

    def __str__(self):
        return f'{self.name}'

    def __unicode__(self):
        return u'%s' % self.logo

    @property
    def short_about(self):
        return truncatechars(self.about, 100)

    def logo_tag(self):
        return mark_safe(f'<img src="/media/{self.logo}" width="150" height="150" />')
    logo_tag.short_description = 'Logo'
    logo_tag.allow_tags = True

    def cover_tag(self):
        return mark_safe(f'<img src="/media/{self.cover}" height="150" />')
    cover_tag.short_description = 'Cover'
    cover_tag.allow_tags = True
