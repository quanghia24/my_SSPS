from rest_framework import serializers
from .models import Printer

class PrinterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Printer
        # filed should be include in respond
        fields = ['id', 'image', 'model', 'brand', 'location', 'allow_types']