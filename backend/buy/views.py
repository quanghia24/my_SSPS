import json
from .serializers import PurchaseOrderSerializer
from .models import PurchaseOrder
from user.models import User
from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework import viewsets


# Create your views here.
class PurchaseOrderViewSet(viewsets.ModelViewSet):
    queryset = PurchaseOrder.objects.all()
    serializer_class = PurchaseOrderSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user  # Get the user from JWT
        data = request.data

        # Validate required fields
        amount = data.get("amount")
        price = data.get("price")

        if not all([amount, price]):
            raise ValidationError(detail="Missing required fields: amount or price.")

        # Ensure amount and price are positive
        if float(amount) <= 0 or float(price) <= 0:
            raise ValidationError(detail="Amount and price must be positive numbers.")

        # Calculate the total cost
        total_cost = float(amount) * float(price)


        # Update the user's balance and money_spent
        user.balance += total_cost
        user.money_spent += total_cost
        user.save()

        # Create the purchase order
        purchase_data = {
            "amount": amount,
            "price": price,
            "user": user,
        }
        serializer = self.serializer_class(data=purchase_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    # permission_classes = [IsAuthenticated]


    # def get(self, request, *args, **kwargs):
    #     try:
    #         body = json.loads(request.body)
    #         user_id = body.get('user_id')
    #         order_id = body.get('order_id')
    #     except json.JSONDecodeError:
    #         user_id = order_id = None

    #     if user_id and order_id:
    #         raise ValidationError(detail='Ambiguity when supplying both user_id and order_id.')

    #     if order_id:
    #         order = get_object_or_404(PurchaseOrder, id=order_id)
    #         serializer = self.serializer_class(order)
    #         return Response(serializer.data)

    #     if user_id:
    #         orders = get_object_or_404(User, user=user_id).purchaseorder_set.all()
    #     else:
    #         orders = get_list_or_404(PurchaseOrder)

    #     serializer = self.serializer_class(orders, many=True)
    #     return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        data = request.data

        # Validate required fields
        amount = data.get("amount")
        price = data.get("price")
        # user_id = data.get("user_id")
        user = request.user

        if not all([amount, price]):
            raise ValidationError(detail="Missing required fields: amount, price, or user_id.")

        # Ensure amount and price are positive
        if float(amount) <= 0 or float(price) <= 0:
            raise ValidationError(detail="Amount and price must be positive numbers.")


        # Fetch the user and update balance
        # try:
        #     user = User.objects.get(user_id=user_id)
        # except User.DoesNotExist:
        #     raise ValidationError(detail="User not found.")


        # Deduct the total cost from the user's balance
        user.balance += amount
        user.money_spent += (float(price) * float(amount))
        user.save()

        # Create the purchase order
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
