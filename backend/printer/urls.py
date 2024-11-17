from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PrinterViewSet

router = DefaultRouter()
# router.register('reports', ReportViewSet, basename='users')


urlpatterns = [
    path('', PrinterViewSet)    
]
