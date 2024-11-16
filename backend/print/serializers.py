from rest_framework import serializers
from .models import print_order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = print_order
        fields = ['id', 'status', 'file_to_be_printed', 'orientation', 'sided', 'page_side', 'copies', 'timer_start', 'timer_end', 'user', 'printer', 'page_cost']