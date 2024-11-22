from .serializers import PurchaseOrderSerializer
from .models import PurchaseOrder
from rest_framework import viewsets
from rest_framework.response import Response


# Create your views here.
class PurchaseOrderViewSet(viewsets.ModelViewSet):
    queryset = PurchaseOrder.objects.all()
    serializer_class = PurchaseOrderSerializer


class UserPurchaseOrderViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        orders = PurchaseOrder.objects.filter(user=pk)
        serializer = PurchaseOrderSerializer(orders, many=True)
        return Response(serializer.data)