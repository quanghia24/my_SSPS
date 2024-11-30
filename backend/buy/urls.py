from rest_framework.routers import DefaultRouter
from .views import PurchaseOrderViewSet, PaperPriceViewSet, get_current_price
from django.urls import path, include


router = DefaultRouter()
router.register('orders', PurchaseOrderViewSet, basename='purchase-order')
router.register('prices', PaperPriceViewSet, basename='purchase-price')

urlpatterns = [
    path('', include(router.urls)),
    path('current-price/', get_current_price),  # Add this new URL
]
