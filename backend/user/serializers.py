from rest_framework import serializers
from .models import Student, SPSO
from rest_framework.authtoken.views import Token

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['student_id', 'name', 'email', 'password', 'day_of_birth', 'phone_number', 'balance', 'last_signed_in']

    extra_kwargs = {'password':{
        'write_only': True,
        'required': True,
    }}

    # hashing password
    # def create(self, validated_data):
    #     user = User.objects.create_user(**validated_data)
    #     Token.objects.create(user=user)
    #     return user


class SPSOSerializer(serializers.ModelSerializer):
    class Meta:
        model = SPSO
        fields = ['spso_id', 'name', 'email', 'password', 'day_of_birth', 'phone_number', 'last_signed_in']

        extra_kwargs = {'password':{
            'write_only': True,
            'required': True,
        }}