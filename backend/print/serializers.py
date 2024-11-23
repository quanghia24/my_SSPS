from rest_framework import serializers
from .models import print_order, print_file

class PrintOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = print_order
        fields = ['id', 'status', 'file_to_be_printed', 'orientation', 'sided', 'page_side', 'copies', 'timer_start', 'timer_end', 'user', 'printer', 'page_cost']

class PrintFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = print_file
        fields = ['id', 'file', 'user']
