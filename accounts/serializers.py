from rest_framework import serializers
from .models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account 
        fields = '__all__'

class CreateStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('username', 'password', 'first_name', 'last_name', 'dob', 'address')

class CreateManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('username', 'password', 'first_name', 'last_name', 'dob', 'address', 'manager')

class CreateAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('username', 'password', 'first_name', 'last_name', 'dob', 'address', 'admin')