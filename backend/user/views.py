from django.shortcuts import render
from .serializers import UserSerializer
from .models import User
from rest_framework import viewsets


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer