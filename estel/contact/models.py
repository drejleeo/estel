from django.db import models

# Create your models here.

class Contact(models.Model):
    name = models.CharField(max_length=50, blank=False)
    email = models.EmailField(blank=False)
    subject = models.CharField(max_length=50, blank=False)
    message = models.TextField(max_length=255, blank=False)
    creation_date = models.DateTimeField(auto_now_add=True)
