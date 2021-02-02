from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer
from .models import Users       

class UsersView(viewsets.ModelViewSet):
    serializer_class = UserSerializer    
    queryset = Users.objects.all()
