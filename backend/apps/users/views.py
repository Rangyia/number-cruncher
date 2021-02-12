from .models import CustomUser
from rest_framework import generics
from .serializers import UserSerializer

# Get the users
class UserList(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer