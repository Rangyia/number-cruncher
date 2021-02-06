# REST API modules
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

# Models & serializers modules
from .models import User
from .serializers import UserSerializer

# Get the users
class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GetUser(APIView):
    serializer_class = UserSerializer
    look_up_username = 'username'

    def get(self, request, format=None):
        username = request.GET.get(self.look_up_username)
        if username != None:
            user = User.objects.filter(username=username)
            if len(user) > 0:
                data = UserSerializer(user[0]).data
                return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

# POST: Create a user
class CreateUserView(APIView):
    serializer_class = UserSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            created_at = serializer.data.get('created_at')
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            dob = serializer.data.get('dob')
            staff = serializer.data.get('staff')
            manager = serializer.data.get('manager')
            admin = serializer.data.get('admin')
            queryset = User.objects.filter(username=username)
            
            # If the user exists throw a 400
            if queryset.exists():
                return Response({'Bad Request': 'User already exists...'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                user = User(
                    username=username,
                    password=password,
                    created_at=created_at,
                    first_name=first_name,
                    last_name=last_name,
                    dob=dob,
                    staff=staff,
                    manager=manager,
                    admin=admin
                )
                return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        else:
            return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
            

