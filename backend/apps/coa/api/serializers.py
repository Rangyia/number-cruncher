from rest_framework import serializers
from ..models import COA

class COASerializer(serializers.ModelSerializer):
    class Meta:
        model = COA
        fields = '__all__'