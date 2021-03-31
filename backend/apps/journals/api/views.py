from django.shortcuts import render
from rest_framework import viewsets, generics
from ..models import Journal
from .serializers import JournalSerializer

# Create your views here.
class JournalList(viewsets.ModelViewSet):
    serializer_class = JournalSerializer
    queryset = Journal.objects.all()