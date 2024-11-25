from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.printer_list, name = 'printer-list'),
    path('<int:pk>/', views.printer_details, name = 'printer-details'),
    path('active/', views.active_printers, name = 'active_printers'),
    path('brand/<str:brand>/', views.brand_printers, name = 'brand_printers'),
    path('add_filetypes/', views.add_filetypes, name='add_filetypes'),
]