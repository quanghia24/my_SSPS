import json
from .serializers import PurchaseOrderSerializer
from .models import PurchaseOrder
from user.models import User
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404, get_list_or_404


# Create your views here.
class PurchaseOrderViewSet(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
):
    queryset = PurchaseOrder.objects.all()
    serializer_class = PurchaseOrderSerializer
    
    
    def get(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
            user_id = body.get('user_id')
            order_id = body.get('order_id')
        except json.JSONDecodeError:
            user_id = order_id = None
        
        if user_id and order_id:
            raise ValidationError(detail='Ambiguity when supplying both user_id and order_id.')
        
        if order_id:
            order = get_object_or_404(PurchaseOrder, id=order_id)
            serializer = self.serializer_class(order)
            return Response(serializer.data)
        
        if user_id:
            orders = get_object_or_404(User, user_id=user_id).purchaseorder_set.all()
        else:
            orders = get_list_or_404(PurchaseOrder)
        
        serializer = self.serializer_class(orders, many=True)
        return Response(serializer.data)