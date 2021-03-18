from django.shortcuts import render
from .serializers import COASerializer
from rest_framework import viewsets, generics
from ..models import COA

# Create your views here.
class COAList(viewsets.ModelViewSet):
    serializer_class = COASerializer
    queryset = COA.objects.all()