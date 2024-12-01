import json
from .serializers import PurchaseOrderSerializer, PaperPriceSerializer
from .models import PurchaseOrder, PaperPrice
from user.models import User
from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework import viewsets
from django.http import JsonResponse
from .models import PaperPrice

def get_current_price(request):
    try:
        curr_price = PaperPrice.objects.last()
    except PaperPrice.DoesNotExist:
        # serializer = self.serializer_class()
        # serializer.is_valid(raise_exception=True)
        # serializer.save()
        PaperPrice.objects.create()
        curr_price = PaperPrice.objects.last()
        return JsonResponse({"price": curr_price.price}, status=status.HTTP_200_OK)

    return JsonResponse({"price": curr_price.price}, status=status.HTTP_200_OK)

class PaperPriceViewSet(viewsets.ModelViewSet):
    queryset = PaperPrice.objects.all()
    serializer_class = PaperPriceSerializer
    permission_classes = [IsAdminUser]
# Create your views here.


class PurchaseOrderViewSet(viewsets.ModelViewSet):
    
    queryset = PurchaseOrder.objects.all()
    serializer_class = PurchaseOrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # Staff users can view all purchase orders
        if user.is_staff:
            return super().get_queryset()

        # Regular users can only view their own purchase orders
        return super().get_queryset().filter(user=user)



    def create(self, request, *args, **kwargs):  # DRF uses `create` instead of `post` in `ModelViewSet`
        user = request.user  # Get the user from the authenticated request

        # Validate required fields
        amount = request.data.get("amount")
        curr_price = PaperPrice.objects.last()
        price = curr_price.price if curr_price else 0  # If no price is set, use 0

        if not amount:
            raise ValidationError(detail="Missing required field: amount.")
        if not price:
            raise ValidationError(detail="Paper price is not set. Please contact the administrator.")

        # Ensure amount and price are positive
        try:
            amount = int(amount)
            if amount <= 0 or price <= 0:
                raise ValueError
        except ValueError:
            raise ValidationError(detail="Amount and price must be positive numbers.")

        # Calculate the total cost
        total_cost = amount * price

        # Update the user's balance and money spent (ensure these fields exist in your User model)
        if hasattr(user, "balance") and hasattr(user, "money_spent"):
            user.balance += amount  # Deduct from balance
            user.money_spent += total_cost  # Add to money spent
            user.save()

        # Create the purchase order
        purchase_data = {
            "amount": amount,
            "price": price,
        }
        serializer = self.serializer_class(data=purchase_data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)  # Pass the authenticated user explicitly to the serializer

        return Response(serializer.data, status=status.HTTP_201_CREATED)