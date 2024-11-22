from rest_framework import serializers
from .models import Printer

class PrinterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Printer
        fields = ['id', 'image', 'model', 'brand', 'location', 'allowed_types']