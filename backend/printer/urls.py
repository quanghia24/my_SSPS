from django.urls import path, include
# from rest_framework.routers import DefaultRouter
from . import views

# router = DefaultRouter()
# router.register(r'printers', PrinterViewSet, basename = 'printer')

urlpatterns = [
    path('', views.printer_list, name = 'printer-list'),
    path('<int:pk>/', views.printer_details, name = 'printer-details'),
    path('active/', views.active_printers, name = 'active_printers'),
    path('brand/<str:brand>/', views.brand_printers, name = 'brand_printers'),
]