from django.shortcuts import render
from .serializers import StudentSerializer, SPSOSerializer
from .models import Student, SPSO
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate, login, logout
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse, JsonResponse


# Create your views here.
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class SPSOViewSet(viewsets.ModelViewSet):
    queryset = SPSO.objects.all()
    serializer_class = SPSOSerializer

