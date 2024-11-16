from django.shortcuts import render
from .models import purchase_order
from .serializers import OrderSerializer 
from django.shortcuts import render
from rest_framework import viewsets


# Create your views here.
class OrderViewSet(viewsets.ModelViewSet):
    queryset = purchase_order.objects.all()
    serializer_class = OrderSerializer
