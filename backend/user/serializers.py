from rest_framework import serializers
from .models import User
from rest_framework.authtoken.views import Token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'image', 'name', 'username', 'password', 'day_of_birth', 'phone_number', 'balance', 'last_signed_in', 'allowed_rule']

    def __str__(self):
       return self.name

    extra_kwargs = {'password':{
        'write_only': True,
        'required': True,
    }}

    # hashing password
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        Token.objects.create(user=user)
        return user
