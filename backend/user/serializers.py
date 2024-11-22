
from rest_framework import serializers
from .models import User
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields ='__all__'
    def __str__(self):
       return self.name

    extra_kwargs = {'password':{
        'write_only': True,
        'required': True,
    }}

