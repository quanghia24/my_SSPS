from django.shortcuts import render
from .serializers import PrinterSerializer
from .models import Printer
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate, login, logout
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse, JsonResponse


# Create your views here.
# class PrintViewSet(viewsets.ModelViewSet):
#     queryset = Printer.objects.all()
#     serializer_class = PrinterSerializer

@api_view(['POST', 'GET'])
def PrinterViewSet(request):        
    if(request.method == 'GET'):
        printers = Printer.objects.all()
        list_printers = [{
            "status": printer.status,
            "image" : printer.image,
            "model": printer.model,
            "brand": printer.brand,
            "location": printer.location,
            "allow_types": printer.allow_types            
        } for printer in printers]
        return Response({"printer":list(list_printers)}, status=200)
    else:
        return Response({"error":"request not found"}, status=404)