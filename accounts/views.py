from django.shortcuts import render
from rest_framework import generics, status
from .serializers import AccountSerializer, CreateStaffSerializer, CreateAdminSerializer, CreateManagerSerializer
from .models import Account
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class AccountView(generics.ListAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class CreateStaffView(APIView):
    serializer_class = CreateStaffSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            username = serializer.data.get('username')
            password= serializer.data.get('password')
            first_name = serializer.data.get('first_name')
            last_name= serializer.data.get('last_name')
            dob = serializer.data.get('dob')
            address= serializer.data.get('address')
            account = Account(username=username, password=password, first_name=first_name, last_name=last_name, dob=dob, address=address)
            account.save()
            return Response(CreateStaffSerializer(account).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class CreateManagerView(APIView):
    serializer_class = CreateManagerSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            username = serializer.data.get('username')
            password= serializer.data.get('password')
            first_name = serializer.data.get('first_name')
            last_name= serializer.data.get('last_name')
            dob = serializer.data.get('dob')
            address= serializer.data.get('address')
            manager = serializer.data.get('manager')
            account = Account(username=username, password=password, first_name=first_name, last_name=last_name, dob=dob, address=address, manager=manager)
            account.save()
            return Response(CreateStaffSerializer(account).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class CreateAdminView(APIView):
    serializer_class = CreateAdminSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            username = serializer.data.get('username')
            password= serializer.data.get('password')
            first_name = serializer.data.get('first_name')
            last_name= serializer.data.get('last_name')
            dob = serializer.data.get('dob')
            address= serializer.data.get('address')
            admin = serializer.data.get('admin')
            account = Account(username=username, password=password, first_name=first_name, last_name=last_name, dob=dob, address=address, admin=admin)
            account.save()
            return Response(CreateStaffSerializer(account).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)