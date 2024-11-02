from django.shortcuts import render
from .serializers import StudentSerializer, SPSOSerializer
from .models import Student, SPSO
from rest_framework import viewsets


# Create your views here.
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class SPSOViewSet(viewsets.ModelViewSet):
    queryset = SPSO.objects.all()
    serializer_class = SPSOSerializer

