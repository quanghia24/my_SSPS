from rest_framework import serializers
from .models import PurchaseOrder, PaperPrice

class PurchaseOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrder
        fields = ['id', 'amount', 'purchase_time', 'price', 'user', 'total_amount']

class PaperPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaperPrice
        fields = ['id', 'price']