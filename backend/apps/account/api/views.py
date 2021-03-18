  
from rest_framework import status
from django.views.generic import ListView
from rest_framework import viewsets, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import RegistrationSerializer, UserSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.core import serializers
from ..models import Account

class UserList(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = Account.objects.all()


class Registration(APIView):
    def post(self, request):
        serializer = RegistrationSerializer(data = request.data)
        print(serializer)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data['response'] = 'successfully registered new user.'
            data['email'] = account.email
            data['username'] = account.username
        else:
            data = serializer.errors
        return Response(data)

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'is_admin': user.is_superuser,
            'is_manager': user.is_admin,
            'is_staff': user.is_staff,
            'first_name': user.first_name,
            'last_name': user.last_name,
        })