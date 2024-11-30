
from rest_framework import serializers
from .models import User, NumberPaperDefault, ResetDate

class ResetDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResetDate
        fields = "__all__"

class NumberPaperDefaultSerializer(serializers.ModelSerializer):
    class Meta:
        model = NumberPaperDefault
        fields = "__all__"
        
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

