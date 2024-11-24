from rest_framework import serializers
from .models import print_order, print_file

class PrintOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = print_order
        fields = ['id', 'status', 'file', 'user', 'order_name', 'orientation', 'sided', 'page_side', 'copies', 'timer_start', 'timer_end', 'printer', 'page_cost']

        
class PrintFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = print_file
        fields = ['id', 'file', 'user']  # User will be set automatically

    def create(self, validated_data):
        # Link the file with the authenticated user
        return print_file.objects.create(**validated_data)
