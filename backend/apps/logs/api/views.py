from django.shortcuts import render
from .serailizers import LogSerializer
from rest_framework import viewsets, generics
from ..models import Log

# Create your views here.
class LogList(viewsets.ModelViewSet):
    serializer_class = LogSerializer
    queryset = Log.objects.all()