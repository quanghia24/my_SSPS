from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PurchaseOrderViewSet, UserPurchaseOrderViewSet


router = DefaultRouter()

router.register('', PurchaseOrderViewSet, basename='purchase-order')
router.register('user', UserPurchaseOrderViewSet, basename='user-order')

urlpatterns = router.urls
