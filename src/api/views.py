# REST API modules
from rest_framework import generics

# Models & serializers modules
from .models import User
from .serializers import UserSerializer

# Get the users
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer