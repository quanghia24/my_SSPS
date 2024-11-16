from django.urls import path, include
# from rest_framework.routers import DefaultRouter
from . import views

# router = DefaultRouter()
# router.register(r'printers', PrinterViewSet, basename = 'printer')

urlpatterns = [
    path('printers/', views.printer_list, name = 'printer-list'),
    path('printers/<int:pk>/', views.printer_details, name = 'printer-details'),
    path('printers/active/', views.active_printers, name = 'active_printers'),
    path('printers/brand/<str:brand>/', views.brand_printers, name = 'brand_printers'),
]