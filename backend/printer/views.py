from django.shortcuts import render
from .serializers import PrinterSerializer
from .models import Printer
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate, login, logout
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse, JsonResponse


# Create your views here.
class PrintViewSet(viewsets.ModelViewSet):
    queryset = Printer.objects.all()
    serializer_class = PrinterSerializer