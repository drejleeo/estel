from rest_framework import viewsets
from rest_framework.views import APIView
from .models import Contact
from estel.contact.serializers import ContactSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class EmailView(APIView):
    def get(self):
        pass
