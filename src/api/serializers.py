from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = (
            'username', 
            'password', 
            'created_at', 
            'first_name', 
            'last_name', 
            'dob',
            'staff', 
            'manager', 
            'admin'
        )

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = (
            'username', 
            'password', 
            'created_at', 
            'first_name', 
            'last_name', 
            'dob',
            'staff',
            'manager',
            'admin'
        )