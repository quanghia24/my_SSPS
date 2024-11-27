from rest_framework.routers import DefaultRouter
from .views import PurchaseOrderViewSet
from django.urls import path, include


router = DefaultRouter()
router.register('orders', PurchaseOrderViewSet, basename='purchase-order')

urlpatterns = [
    path('', include(router.urls)),
]
