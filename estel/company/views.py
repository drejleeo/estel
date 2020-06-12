from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from .models import Company
from estel.company.serializers import CompanySerializer


class CompanyViewSet(viewsets.ModelViewSet):
    permission_classes = []
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
