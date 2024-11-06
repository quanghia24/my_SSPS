from django.shortcuts import render
from .serializers import UserSerializer
from .models import User
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate, login, logout
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse, JsonResponse


# Create your views here.

# CRUD  
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer