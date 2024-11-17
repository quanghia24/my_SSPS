from rest_framework import serializers
from .models import User
from rest_framework.exceptions import ValidationError

from rest_framework.authtoken.views import Token
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User as User1
from rest_framework.permissions import AllowAny


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "User registered successfully",
                "username": user.username,
                "email": user.email
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#
class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'is_superuser']

    def create(self, validated_data):

        if User1.objects.filter(username=validated_data['username']).exists():
            raise ValidationError({'username': 'Username đã tồn tại.'})
        if User1.objects.filter(email=validated_data['email']).exists():
            raise ValidationError({'email': 'Email đã tồn tại.'})
        is_superuser = validated_data.pop('is_superuser', False)
        user = User1.objects.create_user(**validated_data)
        if is_superuser:
            user.is_superuser = True
            user.is_staff = True
            user.save()

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



# class SPSOSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SPSO
#         fields = ['spso_id', 'name', 'email', 'password', 'day_of_birth', 'phone_number', 'last_signed_in']

#         extra_kwargs = {'password':{
#             'write_only': True,
#             'required': True,
#         }}